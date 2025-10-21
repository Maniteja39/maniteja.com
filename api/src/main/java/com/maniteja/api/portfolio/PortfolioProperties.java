package com.maniteja.api.portfolio;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.util.List;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "portfolio")
public class PortfolioProperties {

    @NotEmpty
    private List<Project> projects;

    @NotEmpty
    private List<@NotBlank String> skills;

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public static class Project {

        @NotBlank
        private String name;

        @NotBlank
        private String description;

        @NotEmpty
        private List<@NotBlank String> technologies;

        @Size(max = 2048)
        private String url;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public List<String> getTechnologies() {
            return technologies;
        }

        public void setTechnologies(List<String> technologies) {
            this.technologies = technologies;
        }

        public String getUrl() {
            return url;
        }

        public void setUrl(String url) {
            this.url = url;
        }
    }
}
