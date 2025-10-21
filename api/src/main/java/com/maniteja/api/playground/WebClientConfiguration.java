package com.maniteja.api.playground;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfiguration {

    @Bean
    public WebClient cloudflareWebClient(CloudflareAiProperties properties) {
        ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(configurer -> configurer.defaultCodecs().maxInMemorySize(4 * 1024 * 1024))
                .build();
        return WebClient.builder()
                .baseUrl(properties.getBaseUrl())
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + properties.getApiToken())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, "application/json")
                .exchangeStrategies(strategies)
                .build();
    }
}
