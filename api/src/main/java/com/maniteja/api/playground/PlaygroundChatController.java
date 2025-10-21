package com.maniteja.api.playground;

import jakarta.validation.Valid;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/playground/chat", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public class PlaygroundChatController {

    private final PlaygroundChatService service;

    public PlaygroundChatController(PlaygroundChatService service) {
        this.service = service;
    }

    @PostMapping
    public PlaygroundChatResponse chat(@Valid @RequestBody PlaygroundChatRequest request) {
        return service.sendMessage(request.getMessage());
    }
}
