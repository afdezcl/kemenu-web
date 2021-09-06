package com.kemenu.kemenu_backend.application.menu;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Value;

@Value
@Builder(toBuilder = true)
@EqualsAndHashCode(of = "businessName")
@JsonDeserialize(builder = ShortUrlResponse.ShortUrlResponseBuilder.class)
public class ShortUrlResponse {
    String shortUrlId;
    String businessName;
}
