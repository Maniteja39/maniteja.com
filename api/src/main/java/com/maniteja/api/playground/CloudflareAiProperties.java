package com.maniteja.api.playground;

import jakarta.validation.constraints.NotBlank;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "cloudflare.ai")
public class CloudflareAiProperties {

    @NotBlank
    private String accountId;

    @NotBlank
    private String model;

    @NotBlank
    private String apiToken;

    private String baseUrl = "https://api.cloudflare.com";

    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) {
        this.accountId = accountId;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public String getApiToken() {
        return apiToken;
    }

    public void setApiToken(String apiToken) {
        this.apiToken = apiToken;
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String buildChatUrl() {
        return String.format("/client/v4/accounts/%s/ai/run/%s", accountId, model);
    }
}
