# ArbiBot

This project is set up with Docker Compose running n8n and PostgreSQL.

## Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

1.  Navigate to the project directory:
    ```bash
    cd ArbiBot
    ```

2.  Start the services:
    ```bash
    docker-compose up -d
    ```

3.  Access n8n:
    Open your browser and navigate to [http://localhost:5678](http://localhost:5678).

4.  Stop the services:
    ```bash
    docker-compose down
    ```

## Project Structure

- `backend/`: Backend logic (to be implemented).
- `frontend/`: Frontend application (to be implemented).
- `docker-compose.yml`: Service configuration.
