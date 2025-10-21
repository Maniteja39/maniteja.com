package com.maniteja.api.playground;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.concurrent.atomic.AtomicReference;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.reactive.function.client.ClientRequest;
import org.springframework.web.reactive.function.client.ClientResponse;
import org.springframework.web.reactive.function.client.ExchangeFunction;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

class PlaygroundChatServiceTest {

    @Test
    void sendMessageReturnsReply() {
        AtomicReference<ClientRequest> requestRef = new AtomicReference<>();
        ExchangeFunction exchangeFunction = clientRequest -> {
            requestRef.set(clientRequest);
            return Mono.just(ClientResponse.create(HttpStatus.OK)
                    .header("Content-Type", MediaType.APPLICATION_JSON_VALUE)
                    .body("{\"result\":{\"output\":{\"text\":\"Hello from AI\"}}}")
                    .build());
        };

        WebClient webClient = WebClient.builder().exchangeFunction(exchangeFunction).build();
        CloudflareAiProperties properties = new CloudflareAiProperties();
        properties.setAccountId("acct");
        properties.setModel("model");
        properties.setApiToken("token");

        PlaygroundChatService service = new PlaygroundChatService(webClient, properties);
        PlaygroundChatResponse response = service.sendMessage("Hi");

        assertThat(response.getReply()).isEqualTo("Hello from AI");
        assertThat(requestRef.get().url().getPath()).isEqualTo("/client/v4/accounts/acct/ai/run/model");
    }
}
