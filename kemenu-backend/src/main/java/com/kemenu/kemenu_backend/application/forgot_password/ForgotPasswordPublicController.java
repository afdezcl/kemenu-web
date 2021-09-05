package com.kemenu.kemenu_backend.application.forgot_password;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.kemenu.kemenu_backend.domain.model.CustomerRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@Controller
@AllArgsConstructor
@RequestMapping("/public/forgot/password")
class ForgotPasswordPublicController {

    private final ForgotPasswordRepository forgotPasswordRepository;
    private final CustomerRepository customerRepository;
    private final ObjectMapper mapper;

    @Value("${app.cors}")
    private List<String> allowedOrigins;

    @GetMapping("/{forgotPasswordId}")
    RedirectView confirm(@PathVariable String forgotPasswordId) {
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl(allowedOrigins.get(1));
        return forgotPasswordRepository.findById(forgotPasswordId)
                .map(forgotPassword -> customerRepository.findByEmail(forgotPassword.getEmail())
                        .map(customer -> {
                            try {
                                ForgotPasswordResponse forgotPasswordResponse = new ForgotPasswordResponse(forgotPasswordId, customer.getEmail());
                                String jsonResponse = mapper.writeValueAsString(forgotPasswordResponse);
                                String jsonEncoded = URLEncoder.encode(jsonResponse, StandardCharsets.UTF_8);
                                redirectView.setUrl(allowedOrigins.get(1) + "/changePassword/" + jsonEncoded);
                                return redirectView;
                            } catch (JsonProcessingException e) {
                                return redirectView;
                            }
                        }).orElse(redirectView)
                ).orElse(redirectView);
    }
}
