# syntax=docker/dockerfile:1
FROM eclipse-temurin:17-jdk AS builder
WORKDIR /workspace
COPY . .
RUN apt-get update \
    && apt-get install -y --no-install-recommends maven \
    && rm -rf /var/lib/apt/lists/*
RUN ./mvnw -q -DskipTests clean package

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=builder /workspace/target/maniteja-api-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENV PORT=8080
ENTRYPOINT ["java","-jar","/app/app.jar"]
