package com.maniteja.api.portfolio;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/portfolio", produces = MediaType.APPLICATION_JSON_VALUE)
public class PortfolioController {

    private final PortfolioService service;

    public PortfolioController(PortfolioService service) {
        this.service = service;
    }

    @GetMapping
    public Map<String, Object> getPortfolio() {
        Map<String, Object> response = new HashMap<>();
        response.put("projects", service.getProjects());
        response.put("skills", service.getSkills());
        return response;
    }
}
