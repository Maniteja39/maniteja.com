package com.maniteja.api.contact;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.Instant;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(ContactController.class)
class ContactControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ContactService service;

    @Test
    void submitReturnsAccepted() throws Exception {
        ContactSubmission submission = new ContactSubmission("John Doe", "john@example.com", "Hello", Instant.parse("2024-01-01T00:00:00Z"));
        org.mockito.Mockito.when(service.submit(any(ContactRequest.class))).thenReturn(submission);

        mockMvc.perform(post("/api/contact")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"John Doe\",\"email\":\"john@example.com\",\"message\":\"Hello\"}"))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$.status").value("received"))
                .andExpect(jsonPath("$.receivedAt").value("2024-01-01T00:00:00Z"));

        verify(service).submit(any(ContactRequest.class));
    }
}
