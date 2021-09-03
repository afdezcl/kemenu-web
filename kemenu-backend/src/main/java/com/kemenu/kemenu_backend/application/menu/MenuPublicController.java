package com.kemenu.kemenu_backend.application.menu;

import com.kemenu.kemenu_backend.application.customer.CustomerService;
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
}
