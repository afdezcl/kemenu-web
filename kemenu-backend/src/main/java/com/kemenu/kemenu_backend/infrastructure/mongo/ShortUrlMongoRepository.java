package com.kemenu.kemenu_backend.infrastructure.mongo;

import com.kemenu.kemenu_backend.domain.model.ShortUrl;
import com.kemenu.kemenu_backend.domain.model.ShortUrlRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
class ShortUrlMongoRepository implements ShortUrlRepository {

    private final ShortUrlSpringMongoRepository springMongoRepository;

    @Override
    public String save(ShortUrl shortUrl) {
        return springMongoRepository.save(shortUrl).getId();
    }

    @Override
    public Optional<ShortUrl> findById(String id) {
        return springMongoRepository.findById(id);
    }

    @Override
    public Optional<ShortUrl> findByCustomerEmail(String customerEmail) {
        return springMongoRepository.findByCustomerEmail(customerEmail);
    }

    @Override
    public List<ShortUrl> findAllInCustomerEmails(List<String> customerEmails) {
        return springMongoRepository.findAllByCustomerEmailIn(customerEmails);
    }
}
