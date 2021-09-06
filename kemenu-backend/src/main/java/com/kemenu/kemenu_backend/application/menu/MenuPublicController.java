package com.kemenu.kemenu_backend.application.menu;

import com.kemenu.kemenu_backend.application.customer.CustomerService;
import com.kemenu.kemenu_backend.domain.model.Customers;
import com.kemenu.kemenu_backend.domain.model.ShortUrlRepository;
import com.kemenu.kemenu_backend.domain.model.Tuple;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Locale;

@Slf4j
@RestController
@AllArgsConstructor
@RequestMapping("/public")
class MenuPublicController {

    private final CustomerService customerService;
    private final ShortUrlRepository shortUrlRepository;

    @Deprecated(forRemoval = true)
    @GetMapping("/short/{shortUrlId}")
    ResponseEntity<MenuResponse> readMenu(@PathVariable String shortUrlId, Locale locale) {
        return customerService.readMenus(shortUrlId, locale)
            .map(menus -> ResponseEntity.ok(menus.get(0)))
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/v1/short/{shortUrlId}")
    ResponseEntity<List<MenuResponse>> readMenus(@PathVariable String shortUrlId, Locale locale) {
        return customerService.readMenus(shortUrlId, locale)
            .map(menus -> {
                log.info("Showing {} shortUrl", shortUrlId);
                return ResponseEntity.ok(menus);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/v1/short")
    ResponseEntity<List<ShortUrlResponse>> getAll() {
        Customers customers = new Customers(
            customerService.all().stream()
                .filter(c -> !c.isOld())
                .filter(c -> !c.isEmpty())
                .toList()
        );
        List<ShortUrlResponse> response = shortUrlRepository.findAllInCustomerEmails(customers.getAllEmails()).stream()
            .map(shortUrl -> Tuple.of(shortUrl, customers.findByEmail(shortUrl.getCustomerEmail())))
            .filter(tuple -> tuple.getRight().isPresent())
            .map(tuple -> Tuple.of(tuple.getLeft(), tuple.getRight().get()))
            .map(tuple -> new ShortUrlResponse(tuple.getLeft().getId(), tuple.getRight().firstBusiness().getName()))
            .distinct()
            .toList();

        return ResponseEntity.ok(response);
    }
}
