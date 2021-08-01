package com.kemenu.kemenu_backend.application;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.fasterxml.jackson.databind.introspect.AnnotatedClass;
import com.fasterxml.jackson.databind.introspect.JacksonAnnotationIntrospector;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.kemenu.kemenu_backend.domain.model.ConfirmedEmail;
import com.kemenu.kemenu_backend.domain.model.ConfirmedEmailRepository;
import com.kemenu.kemenu_backend.domain.model.Customer;
import com.kemenu.kemenu_backend.domain.model.CustomerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.freemarker.FreeMarkerConfigurer;

import java.io.File;
import java.io.IOException;
import java.lang.invoke.MethodHandles;

@Slf4j
@Configuration
@EnableMongoAuditing
class WebConfig implements WebMvcConfigurer {

    @Value("${app.admin.username}")
    private String adminUsername;
    @Value("${app.admin.password}")
    private String adminPassword;

    @Bean
    ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();

        mapper.registerModule(new JavaTimeModule());
        mapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        mapper.enable(DeserializationFeature.USE_LONG_FOR_INTS);
        mapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);
        mapper.setAnnotationIntrospector(new JacksonAnnotationIntrospector() {
            @Override
            public JsonPOJOBuilder.Value findPOJOBuilderConfig(AnnotatedClass ac) {
                if (ac.hasAnnotation(JsonPOJOBuilder.class)) {
                    return super.findPOJOBuilderConfig(ac);
                }
                return new JsonPOJOBuilder.Value("build", "");
            }
        });

        return mapper;
    }

    @Bean
    CommandLineRunner initAdminUser(CustomerRepository repository, PasswordEncoder passwordEncoder,
                                    ConfirmedEmailRepository confirmedEmailRepository) {
        return args -> repository.findByEmail(adminUsername)
            .ifPresentOrElse(
                c -> log.info("Admin user already created"),
                () -> {
                    repository.save(
                        new Customer(adminUsername, passwordEncoder.encode(adminPassword), Customer.Role.ADMIN, "adminBusiness"));
                    ConfirmedEmail confirmedEmail = new ConfirmedEmail(adminUsername);
                    confirmedEmail.confirm();
                    confirmedEmailRepository.save(confirmedEmail);
                    log.info("Admin user created");
                }
            );
    }

    @Bean
    FreeMarkerConfigurer freeMarkerConfigurer() {
        FreeMarkerConfigurer configurer = new FreeMarkerConfigurer();
        configurer.setTemplateLoaderPath("classpath:/templates/");
        return configurer;
    }

    @Bean
    WebClient webClient() {
        return WebClient.builder().build();
    }

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/blog").setViewName("forward:/blog/index.html");

        try {
            ClassLoader classLoader = MethodHandles.lookup().getClass().getClassLoader();
            PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver(classLoader);
            Resource[] resources = resolver.getResources("classpath:public/blog/*");

            for (Resource resource : resources) {
                if (new File(resource.getURI()).isDirectory()) {
                    String routeName = "/blog/" + resource.getFilename();
                    String forwardRoute = "forward:/blog/" + resource.getFilename() + "/index.html";
                    log.info("Adding {} route to {}", routeName, forwardRoute);
                    registry.addViewController(routeName).setViewName(forwardRoute);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
