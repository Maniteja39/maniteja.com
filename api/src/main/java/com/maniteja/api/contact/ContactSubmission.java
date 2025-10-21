package com.maniteja.api.contact;

import java.time.Instant;

public class ContactSubmission {

    private final String name;
    private final String email;
    private final String message;
    private final Instant receivedAt;

    public ContactSubmission(String name, String email, String message, Instant receivedAt) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.receivedAt = receivedAt;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getMessage() {
        return message;
    }

    public Instant getReceivedAt() {
        return receivedAt;
    }
}
