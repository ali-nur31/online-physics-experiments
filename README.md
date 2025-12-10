# ⚛️ Online Physics Experiments API

A RESTful API service for managing physics experiments. Built with **Go (Golang)**, following Clean Architecture principles, and containerized with **Docker**.

## 🚀 Tech Stack

- **Language:** Go 1.25
- **Database:** PostgreSQL
- **ORM:** GORM
- **Router:** Chi Router
- **Migrations:** golang-migrate
- **Architecture:** Clean Architecture (Repository <- Service <- Handler)
- **Deployment:** Docker & Docker Compose

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ali-nur31/online-physics-experiments.git
cd online-physics-experiments
```
### 2. Environment Variables

Create a .env file in the root directory. You can copy from .env.example file

🐳 Run with Docker (Recommended)

You can run the entire application (API + Database) with a single command. The migrations will be applied automatically.
```bash

# Build and start services
docker compose up --build
```
```bash
# To stop services
docker compose down
```
The server will start at http://localhost:8080.
🏃 Run Locally

If you want to run Go without Docker (you still need a running Postgres database):

Ensure PostgreSQL is running.

Run migrations (using CLI or let the app handle it if configured).

Start the app:

```bash
go run ./cmd/app/main.go
```
🔌 API Endpoints
Experiments
Method	URL	Description
```
GET	/experiments	        Get all experiments
GET	/experiments/{id}	Get specific experiment details
```
📂 Project Structure

The project follows the standard Go project layout and Clean Architecture:
```
.
├── cmd
│   └── app
│       └── main.go          # Entry point, dependency injection
├── internal
│   ├── domain
│   │   └── models           # Database models (GORM structs)
│   ├── repository           # Data Access Layer (SQL/GORM operations)
│   │   └── migrations       # SQL migration files
│   ├── service              # Business Logic Layer
│   └── transport
│       └── rest             # HTTP Handlers (Controllers)
├── Dockerfile
├── docker-compose.yml
└── go.mod
```