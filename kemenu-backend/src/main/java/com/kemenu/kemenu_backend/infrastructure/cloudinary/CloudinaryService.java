package com.kemenu.kemenu_backend.infrastructure.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import com.kemenu.kemenu_backend.domain.model.Photo;
import com.kemenu.kemenu_backend.infrastructure.mongo.PhotoMongoRepository;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.time.Instant;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CloudinaryService {

    private static final String IMAGE_PATH = "/public/image/";

    private final Cloudinary cloudinary;
    private final PhotoMongoRepository photoMongoRepository;
    @Value("${app.cors}")
    private List<String> allowedOrigins;

    public CloudinaryService(@Value("${app.cloudinary.key}") String key,
                             @Value("${app.cloudinary.secret}") String secret,
                             @Value("${app.cloudinary.cloudname}") String cloudName,
                             PhotoMongoRepository photoMongoRepository) {
        this.cloudinary = new Cloudinary(
            Map.of(
                "api_key", key,
                "api_secret", secret,
                "cloud_name", cloudName
            )
        );
        this.photoMongoRepository = photoMongoRepository;
    }

    public String uploadResized(MultipartFile file) {
        return upload(file);
    }

    public String upload(MultipartFile file) {
        try {
            return uploadToCloudinary(file.getBytes(), file);
        } catch (IOException e) {
            log.error("[Cloudinary] Failure when converting file to bytes", e);
            return "";
        }
    }

    public String getOptimizedUrl(String url, MultipartFile file) {
        var lastDashIndex = url.lastIndexOf("/");
        if (lastDashIndex == -1) {
            return "";
        }

        var imageName = url.substring(lastDashIndex + 1);
        return photoMongoRepository.findById(imageName)
            .map(photo -> allowedOrigins.get(0) + IMAGE_PATH + imageName)
            .orElseGet(() -> {
                var optimizedImageUrl = cloudinary
                    .url()
                    .transformation(new Transformation().quality("auto").fetchFormat("auto"))
                    .secure(true)
                    .generate(imageName);

                try (var in = new URL(optimizedImageUrl).openStream()) {
                    var photo = new Photo(
                        imageName,
                        new Binary(in.readAllBytes()),
                        file.getContentType(),
                        file.getSize(),
                        optimizedImageUrl,
                        Instant.now()
                    );
                    photoMongoRepository.save(photo);
                    return allowedOrigins.get(0) + IMAGE_PATH + imageName;
                } catch (MalformedURLException e) {
                    log.error("URL from cloudinary is not well formed", e);
                    return "";
                } catch (Exception e) {
                    log.error("Something wrong happened when trying to download image from cloudinary", e);
                    return "";
                }
            });
    }

    private String uploadToCloudinary(byte[] image, MultipartFile file) {
        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(image, Map.of("resource_type", "auto"));
            CloudinaryUploadResponse uploadResponse = CloudinaryUploadResponse.from(uploadResult);
            return getOptimizedUrl(uploadResponse.getSecureUrl(), file);
        } catch (IOException e) {
            log.error("Failure while uploading photo to Cloudinary", e);
            return "";
        }
    }
}
