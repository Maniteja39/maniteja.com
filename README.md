# Mani Teja Platform

This repository hosts the full-stack codebase for [maniteja.com](https://maniteja.com), combining an Angular front-end playground with a Java Spring Boot API that brokers access to Cloudflare Workers AI. The project is designed so both surfaces can be developed, tested, and deployed independently while sharing a consistent developer experience.

## Repository Structure

```
├── web/   # Angular workspace served via Cloudflare Pages
└── api/   # Spring Boot service deployed to an Oracle Cloud VM
```

Each folder is self-contained with its own tooling, build pipeline, and deployment configuration. Shared documentation (including this README) lives at the repository root.

## Technology Stack

| Layer        | Technology                                                                 |
|--------------|-----------------------------------------------------------------------------|
| Frontend     | Angular 17, TypeScript, RxJS, TailwindCSS, Vite-based tooling               |
| Backend      | Java 17+, Spring Boot, Maven Wrapper, RESTful APIs                          |
| AI Services  | Cloudflare Workers AI (text generation / embedding models)                  |
| Infrastructure | Cloudflare Pages, Cloudflare DNS & SSL, Oracle Cloud Compute (Always Free) |
| Monitoring   | Cloudflare Analytics, Oracle Cloud Monitoring, systemd journal logs         |

## Architecture Overview

```
+--------------------+        HTTPS        +----------------------+        Secure Fetch        +---------------------------+
|  Browser Client    |  <----------------> |  Cloudflare Pages    |  <----------------------> |  Oracle Cloud VM (API)    |
|  (Angular app)     |                     |  (Static hosting)    |                          |  Spring Boot + Workers AI  |
+--------------------+                     +----------------------+                          +---------------------------+
                                                                           |
                                                                           | Cloudflare Workers AI (text & vision models)
                                                                           v
                                                                  +------------------+
                                                                  |  Workers AI APIs |
                                                                  +------------------+
```

* The Angular application is delivered globally from Cloudflare Pages.
* The browser communicates with the API over HTTPS (proxied through Cloudflare) using JSON.
* The Spring Boot API runs on an Oracle Cloud VM, handles authentication, and proxies LLM requests to Cloudflare Workers AI.

## Local Development

### Prerequisites

Install the following tools before working locally:

* **Node.js 18+** and **npm**
* **Angular CLI** (`npm install -g @angular/cli`)
* **Java 17 or newer**
* **Maven Wrapper** (bundled in the repo) or local Maven/Gradle installation if preferred
* **Docker** (optional, for running supporting services in the future)

### Environment Variables

Both the frontend and backend rely on Cloudflare Workers AI credentials. Create a `.env` file in each project directory (never commit it) with the following keys:

```
CLOUDFLARE_ACCOUNT_ID=xxxxxxxxxxxxxxxxxxxx
CLOUDFLARE_API_TOKEN=cf_test_token_with_workers_ai_permissions
WORKERS_AI_BASE_URL=https://api.cloudflare.com/client/v4/accounts/${CLOUDFLARE_ACCOUNT_ID}/ai/run/
WORKERS_AI_MODEL=@cf/meta/llama-3-8b-instruct
```

The backend also expects:

```
SERVER_PORT=8080
ALLOWED_ORIGINS=https://maniteja.com,https://*.maniteja.com
```

Expose the variables locally via `.env`, IntelliJ/VS Code launch configurations, or your shell profile before running the applications.

### Frontend (`web/`)

1. `cd web`
2. Install dependencies: `npm install`
3. Run the development server: `ng serve`
4. Open `http://localhost:4200` in your browser

### Backend (`api/`)

1. `cd api`
2. Ensure Java 17+ is active (`java -version`)
3. Start the service: `./mvnw spring-boot:run`
4. The API is available at `http://localhost:8080`

Use the `WORKERS_AI_*` environment variables to authenticate outbound requests; the API reads them automatically on startup.

## Building for Production

### Frontend Build

```
cd web
ng build --configuration production
```

This outputs an optimized bundle in `web/dist/` suitable for deployment to Cloudflare Pages.

### Backend Build

```
cd api
./mvnw clean package
```

The build produces a runnable JAR in `api/target/`. Copy the JAR to the Oracle VM (or use an automation pipeline) for deployment.

## Deployment Guide

### Cloudflare Pages (Frontend)

1. Log in to Cloudflare and create a Pages project.
2. Connect the GitHub repository and select the `web/` directory as the project root.
3. Set the build command to `npm install && ng build --configuration production` and output directory to `dist/<app-name>`.
4. Add the `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, and `WORKERS_AI_MODEL` variables in the Pages project settings for build-time integration.
5. Trigger a production deployment; Cloudflare will provision a global CDN-backed site.

### Oracle Cloud VM (Backend)

1. Provision an Always Free Ampere VM (Ubuntu LTS recommended).
2. Open ports 22 (SSH) and 8080 (application) in the Oracle Cloud firewall; restrict 8080 to Cloudflare IP ranges for security.
3. Copy the `api/target/*.jar` artifact to the VM.
4. Create a systemd service at `/etc/systemd/system/maniteja-api.service`:
   ```ini
   [Unit]
   Description=Mani Teja API
   After=network.target

   [Service]
   User=ubuntu
   WorkingDirectory=/opt/maniteja/api
   ExecStart=/usr/bin/java -jar /opt/maniteja/api/maniteja-api.jar
   EnvironmentFile=/opt/maniteja/api/.env
   Restart=on-failure

   [Install]
   WantedBy=multi-user.target
   ```
5. Reload systemd (`sudo systemctl daemon-reload`), enable the service (`sudo systemctl enable --now maniteja-api`).
6. Configure UFW or iptables to allow only Cloudflare ingress to port 8080.
7. Store the `.env` file beside the JAR with the required Cloudflare credentials.

### SSL and Cloudflare Proxying

1. Add the VM’s public IP to Cloudflare DNS as `api.maniteja.com` (proxied record).
2. Enable the “Full (strict)” SSL mode in Cloudflare and install the Cloudflare Origin Certificate on the VM.
3. Configure Nginx as a reverse proxy (optional) to terminate TLS locally, forwarding traffic to the Spring Boot service on `localhost:8080`.
4. For the frontend, point `maniteja.com` to the Cloudflare Pages project (automatic when using Pages’ custom domain setup).

### DNS Records

| Hostname           | Type | Target                               | Notes                               |
|--------------------|------|--------------------------------------|-------------------------------------|
| `maniteja.com`     | CNAME| `pages.dev` domain generated by CF   | Serves the Angular app              |
| `api.maniteja.com` | A    | Oracle VM public IP (proxied)        | Routes to Spring Boot API via CF    |

## Monitoring & Maintenance

* **Cloudflare Analytics**: Track request volume, cache hit rate, and error codes for the frontend.
* **Oracle Cloud Monitoring**: Set alarms on CPU, memory, and network usage of the VM.
* **systemd journal**: Review `journalctl -u maniteja-api -f` for real-time logs.
* **Application health checks**: Expose `/actuator/health` from Spring Boot and configure Cloudflare to alert on failures.
* Schedule monthly dependency updates (`npm outdated`, `./mvnw versions:display-dependency-updates`).

## Cost-Free Considerations

* Use the Oracle Always Free tier (1 VM) and Cloudflare’s free plan with Pages + Workers AI allocation.
* Keep ingress/egress minimal by caching AI responses or batching requests where possible.
* Monitor Cloudflare Workers AI usage to avoid exceeding free limits; fall back to static content if the quota is reached.
* Automate shutting down non-production VM instances when idle.

## Extending the LLM Playground

* Add new prompt templates by extending the Angular service in `web/src/app/services/llm.service.ts`.
* Support multi-model comparisons by exposing additional REST endpoints in `api/src/main/java/.../LlModelController.java`.
* Introduce persistent conversation history by integrating a lightweight datastore (e.g., Cloudflare D1 or Redis) and updating the Angular components accordingly.
* Document new capabilities in the `/docs` folder and surface them in the UI’s help panel.

For questions or contributions, please open an issue or submit a pull request.
