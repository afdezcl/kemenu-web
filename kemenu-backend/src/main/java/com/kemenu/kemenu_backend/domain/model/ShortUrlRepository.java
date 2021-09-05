package com.kemenu.kemenu_backend.domain.model;

import java.util.List;
import java.util.Optional;

public interface ShortUrlRepository {
    String save(ShortUrl shortUrl);

    Optional<ShortUrl> findById(String id);

    Optional<ShortUrl> findByCustomerEmail(String customerEmail);

    List<ShortUrl> findAllInCustomerEmails(List<String> customerEmails);
}
