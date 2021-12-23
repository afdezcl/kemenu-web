package com.kemenu.kemenu_backend.domain.model;

import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.bson.types.Binary;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Getter
@Document
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Photo {
    @Id
    private String id;
    private Binary content;
    private String contentType;
    private long size;
    private String cloudinaryUrl;
    private Instant createdAt;
}
