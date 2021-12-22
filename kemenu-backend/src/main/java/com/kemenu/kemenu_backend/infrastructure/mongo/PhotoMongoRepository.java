package com.kemenu.kemenu_backend.infrastructure.mongo;

import com.kemenu.kemenu_backend.domain.model.Photo;
import org.springframework.data.mongodb.repository.MongoRepository;

interface PhotoMongoRepository extends MongoRepository<Photo, String> {
}
