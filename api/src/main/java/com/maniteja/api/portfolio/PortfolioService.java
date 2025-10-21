package com.maniteja.api.portfolio;

import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PortfolioService {

    private final PortfolioProperties properties;

    public PortfolioService(PortfolioProperties properties) {
        this.properties = properties;
    }

    public List<PortfolioProperties.Project> getProjects() {
        return properties.getProjects();
    }

    public List<String> getSkills() {
        return properties.getSkills();
    }
}
