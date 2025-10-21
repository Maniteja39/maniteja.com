package com.maniteja.api.playground;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientResponseException;

@Service
public class PlaygroundChatService {

    private final WebClient webClient;
    private final CloudflareAiProperties properties;

    public PlaygroundChatService(WebClient webClient, CloudflareAiProperties properties) {
        this.webClient = webClient;
        this.properties = properties;
    }

    public PlaygroundChatResponse sendMessage(String message) {
        try {
            Map<String, Object> response = webClient.post()
                    .uri(properties.buildChatUrl())
                    .bodyValue(Map.of(
                            "messages", List.of(Map.of(
                                    "role", "user",
                                    "content", List.of(Map.of(
                                            "type", "text",
                                            "text", message))))))
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block(Duration.ofSeconds(30));

            String reply = extractReply(response);
            return new PlaygroundChatResponse(reply);
        } catch (WebClientResponseException ex) {
            throw new PlaygroundChatServiceException("Cloudflare AI request failed: " + ex.getStatusCode(), ex);
        } catch (Exception ex) {
            throw new PlaygroundChatServiceException("Unable to reach Cloudflare AI", ex);
        }
    }

    @SuppressWarnings("unchecked")
    private String extractReply(Map<String, Object> response) {
        if (response == null) {
            return "";
        }
        Object result = response.get("result");
        if (result instanceof Map<?, ?> resultMap) {
            Object output = resultMap.get("output");
            if (output instanceof Map<?, ?> outputMap) {
                Object text = outputMap.get("text");
                if (text instanceof String textValue) {
                    return textValue;
                }
            }
        }
        return response.toString();
    }
}
