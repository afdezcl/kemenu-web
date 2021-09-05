package com.kemenu.kemenu_backend.domain.model;

import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
public class Customers {

    private final List<Customer> customers;

    public Optional<Customer> findByEmail(String email) {
        return customers.stream()
            .filter(c -> c.getEmail().equals(email))
            .findFirst();
    }

    public List<String> getAllEmails() {
        return customers.stream().map(Customer::getEmail).toList();
    }
}
