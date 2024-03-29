package com.kemenu.kemenu_backend.domain.model;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.PersistenceConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Getter
@Document
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@AllArgsConstructor(access = AccessLevel.PRIVATE, onConstructor = @__(@PersistenceConstructor))
public class Customer implements GrantedAuthority {

    @Id
    @EqualsAndHashCode.Include
    private String id;
    @Indexed(unique = true)
    private String email;
    private String password;
    private List<Business> businesses;
    private Role role;
    private MarketingInfo marketingInfo;
    @CreatedDate
    private Instant createdAt;
    @LastModifiedDate
    private Instant updatedAt;

    public Customer(String email, String password, String businessName) {
        this(email, password, Role.USER, businessName);
    }

    public Customer(String email, String password, Role role, String businessName) {
        this(UUID.randomUUID().toString(), email, password, role, businessName);
    }

    public Customer(String id, String email, String password, Role role, String businessName) {
        this(id, email, password, new ArrayList<>(), role);
        businesses.add(new Business(businessName));
    }

    public Customer(String id, String email, String password, List<Business> businesses, Role role) {
        this(
                id,
                email,
                password,
                businesses,
                role,
                MarketingInfo.builder()
                        .newsletterStatus(NewsletterStatus.ACCEPTED)
                        .build(),
                Instant.now(),
                Instant.now()
        );
    }

    public void changeEmail(String email) {
        this.email = email;
    }

    public Optional<String> createMenu(String businessId, Menu menu) {
        return findBusiness(businessId).map(b -> b.createMenu(menu));
    }

    public Optional<Menu> changeMenu(String businessId, Menu newMenu) {
        return findBusiness(businessId).flatMap(b -> b.changeMenu(newMenu));
    }

    public Optional<Menu> findMenu(String businessId, String menuId) {
        return findBusiness(businessId).flatMap(b -> b.findMenu(menuId));
    }

    public void deleteMenu(String businessId, String menuId) {
        findBusiness(businessId).ifPresent(b -> b.deleteMenu(menuId));
    }

    public Optional<String> changeBusiness(Business newBusiness) {
        for (int i = 0; i < businesses.size(); i++) {
            if (businesses.get(i).getId().equals(newBusiness.getId())) {
                businesses.set(i, newBusiness);
                return Optional.of(newBusiness.getId());
            }
        }

        return Optional.empty();
    }

    public Optional<Business> findBusiness(String businessId) {
        return businesses.stream()
                .filter(b -> b.getId().equals(businessId))
                .findFirst();
    }

    public Business firstBusiness() {
        return businesses.get(0);
    }

    public void changePassword(String password) {
        this.password = password;
    }

    public void changeMarketing(MarketingInfo marketingInfo) {
        this.marketingInfo = marketingInfo;
    }

    public void putAsOldNewsletterCustomer() {
        changeMarketing(MarketingInfo.builder().newsletterStatus(NewsletterStatus.OLD).build());
    }

    public boolean isOld() {
        return marketingInfo.getNewsletterStatus().isOld();
    }

    public boolean isEmpty() {
        return firstBusiness().isEmpty();
    }

    @Override
    public String getAuthority() {
        return "ROLE_" + role;
    }

    public enum Role {
        ADMIN, USER
    }
}
