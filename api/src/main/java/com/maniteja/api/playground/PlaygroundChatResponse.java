package com.maniteja.api.playground;

public class PlaygroundChatResponse {

    private final String reply;

    public PlaygroundChatResponse(String reply) {
        this.reply = reply;
    }

    public String getReply() {
        return reply;
    }
}
