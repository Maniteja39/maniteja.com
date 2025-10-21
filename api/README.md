# maniteja-api

Spring Boot 3 backend for [maniteja.com](https://maniteja.com). It exposes portfolio metadata, handles contact submissions, and proxies chat requests to Cloudflare Workers AI.

## Prerequisites

* Java 17+
* Maven 3.9+ (or use a JDK distribution that bundles Maven)
* Cloudflare Workers AI account + API token with `Workers AI:Read`/`Workers AI:Create` permissions

## Configuration

Set the following environment variables (or provide them via `application.yaml`).

| Key | Description |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` | API token used for Bearer authentication when calling Workers AI |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare account ID that owns the Workers AI deployment |
| `CLOUDFLARE_MODEL` | Workers AI model identifier (default `text-generator-1`) |
| `CLOUDFLARE_API_BASE` | Optional override for the Workers AI base URL |
| `PORT` | Optional server port (default `8080`) |

## Building

```bash
./scripts/build.sh
```

This runs `./mvnw clean package` and produces `target/maniteja-api-0.0.1-SNAPSHOT.jar`.

## Running locally

```bash
export CLOUDFLARE_API_TOKEN=...
export CLOUDFLARE_ACCOUNT_ID=...
export CLOUDFLARE_MODEL=text-generator-1
./scripts/run.sh
```

Endpoints are available at `http://localhost:8080`:

* `GET /api/portfolio`
* `POST /api/contact`
* `POST /playground/chat`

## Testing

```bash
./mvnw test
```

## Docker

Build and run with Docker Compose:

```bash
docker compose up --build
```

## Oracle Cloud Always Free deployment

1. Provision an Oracle Linux 8+ VM and install system dependencies:
   ```bash
   sudo dnf install -y java-17-openjdk git
   ```
2. Clone this repository and build the jar:
   ```bash
   git clone https://github.com/<your-org>/maniteja.com.git
   cd maniteja.com/api
   ./scripts/build.sh -DskipTests
   ```
3. Copy the resulting jar to `/opt/maniteja-api` and create an `.env` file with your secrets:
   ```bash
   sudo mkdir -p /opt/maniteja-api
   sudo cp target/maniteja-api-0.0.1-SNAPSHOT.jar /opt/maniteja-api/
   cat <<'ENV' | sudo tee /opt/maniteja-api/.env
CLOUDFLARE_API_TOKEN=... 
CLOUDFLARE_ACCOUNT_ID=... 
CLOUDFLARE_MODEL=text-generator-1
ENV
   ```
4. Create a systemd unit at `/etc/systemd/system/maniteja-api.service`:
   ```ini
   [Unit]
   Description=maniteja.com Spring Boot API
   After=network.target

   [Service]
   EnvironmentFile=/opt/maniteja-api/.env
   WorkingDirectory=/opt/maniteja-api
   ExecStart=/usr/bin/java -jar /opt/maniteja-api/maniteja-api-0.0.1-SNAPSHOT.jar
   User=opc
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
5. Reload systemd and enable the service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now maniteja-api.service
   ```
6. Expose port `8080` via the Oracle Cloud security list and (optionally) place an Nginx reverse proxy in front to terminate TLS.

## Notes

* CORS is restricted to `https://maniteja.com`.
* Update `application.yaml` to tweak portfolio content.
* The `/playground/chat` endpoint uses `WebClient` to forward the request body to Cloudflare Workers AI.
