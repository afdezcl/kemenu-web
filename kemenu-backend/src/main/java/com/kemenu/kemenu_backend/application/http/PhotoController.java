package com.kemenu.kemenu_backend.application.http;

import com.kemenu.kemenu_backend.infrastructure.mongo.PhotoMongoRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
public class PhotoController {

    private final PhotoMongoRepository photoMongoRepository;

    @GetMapping(value = "/public/image/{id}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE, MediaType.IMAGE_GIF_VALUE})
    ResponseEntity<byte[]> getImage(@PathVariable String id) {
        return photoMongoRepository.findById(id)
            .map(photo -> ResponseEntity.ok(photo.getContent().getData()))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
