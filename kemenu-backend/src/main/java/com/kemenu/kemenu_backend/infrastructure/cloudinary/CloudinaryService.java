package com.kemenu.kemenu_backend.infrastructure.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.Transformation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    public CloudinaryService(@Value("${app.cloudinary.key}") String key,
                             @Value("${app.cloudinary.secret}") String secret,
                             @Value("${app.cloudinary.cloudname}") String cloudName) {
        this.cloudinary = new Cloudinary(
            Map.of(
                "api_key", key,
                "api_secret", secret,
                "cloud_name", cloudName
            )
        );
    }

    public String uploadResized(MultipartFile file) {
        return upload(file);
    }

    public String upload(MultipartFile file) {
        try {
            return uploadToCloudinary(file.getBytes());
        } catch (IOException e) {
            log.error("[Cloudinary] Failure when converting file to bytes", e);
            return "";
        }
    }

    public String getOptimizedUrl(String url) {
        int lastDashIndex = url.lastIndexOf("/");
        if (lastDashIndex == -1) {
            return "";
        }
        // Get from database
        // if null get from cloudinary and store in database
        //    1. Download image from cloudinary programmatically
        //    2. store as binary GRIDFs in mongodb
        // otherwise return
        String imageName = url.substring(lastDashIndex + 1);
        return cloudinary
            .url()
            .transformation(new Transformation().quality("auto").fetchFormat("auto"))
            .secure(true)
            .generate(imageName);
    }

    private String uploadToCloudinary(byte[] image) {
        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(image, Map.of("resource_type", "auto"));
            CloudinaryUploadResponse uploadResponse = CloudinaryUploadResponse.from(uploadResult);
            return getOptimizedUrl(uploadResponse.getSecureUrl());
        } catch (IOException e) {
            log.error("Failure while uploading photo to Cloudinary", e);
            return "";
        }
    }
}
