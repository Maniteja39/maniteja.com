package com.maniteja.api.contact;

import java.time.Clock;
import java.time.Instant;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);

    private final Clock clock;
    private final List<ContactSubmission> submissions = Collections.synchronizedList(new LinkedList<>());

    public ContactService(Clock clock) {
        this.clock = clock;
    }

    public ContactSubmission submit(ContactRequest request) {
        Instant now = clock.instant();
        ContactSubmission submission = new ContactSubmission(request.getName(), request.getEmail(), request.getMessage(), now);
        submissions.add(submission);
        log.info("Received contact submission from {} <{}>", request.getName(), request.getEmail());
        return submission;
    }

    public List<ContactSubmission> getSubmissions() {
        return Collections.unmodifiableList(submissions);
    }
}
