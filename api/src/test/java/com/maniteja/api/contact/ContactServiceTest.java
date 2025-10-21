package com.maniteja.api.contact;

import static org.assertj.core.api.Assertions.assertThat;

import java.time.Clock;
import java.time.Instant;
import java.time.ZoneOffset;
import org.junit.jupiter.api.Test;

class ContactServiceTest {

    @Test
    void submitStoresSubmissionWithTimestamp() {
        Clock fixedClock = Clock.fixed(Instant.parse("2024-01-01T00:00:00Z"), ZoneOffset.UTC);
        ContactService service = new ContactService(fixedClock);
        ContactRequest request = new ContactRequest();
        request.setName("Jane");
        request.setEmail("jane@example.com");
        request.setMessage("Hi there");

        ContactSubmission submission = service.submit(request);

        assertThat(submission.getReceivedAt()).isEqualTo(Instant.parse("2024-01-01T00:00:00Z"));
        assertThat(service.getSubmissions()).hasSize(1);
        assertThat(service.getSubmissions().get(0).getMessage()).isEqualTo("Hi there");
    }
}
