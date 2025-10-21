package com.maniteja.api.playground;

import jakarta.validation.constraints.NotBlank;

public class PlaygroundChatRequest {

    @NotBlank
    private String message;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
