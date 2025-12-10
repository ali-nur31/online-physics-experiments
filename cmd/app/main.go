package main

import (
	"database/sql"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"online-physics-experiments/internal/app"
	"os"

	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type config struct {
	addr string
	db   dbConfig
}

type dbConfig struct {
	dsn string
	c   *sql.DB
}

func main() {
	if err := godotenv.Load(); err != nil {
		slog.Info("No .env file found. Assuming variables are set in the environment")
	}

	cfg := &config{
		addr: os.Getenv("ADDR"),
		db: dbConfig{
			dsn: fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
				os.Getenv("HOST"),
				os.Getenv("DB_PORT"),
				os.Getenv("PG_USERNAME"),
				os.Getenv("PG_PASSWORD"),
				os.Getenv("DB_NAME"),
			),
		},
	}

	logger := slog.New(slog.NewTextHandler(os.Stdout, nil))
	slog.SetDefault(logger)

	if err := runMigrations(); err != nil {
		log.Fatalf("Failed to run migrations: %v", err)
	}

	conn, err := gorm.Open(postgres.Open(cfg.db.dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}

	cfg.db.c, err = conn.DB()
	if err != nil {
		slog.Error("failed to get db", "error", err)
		os.Exit(1)
	}

	defer cfg.db.c.Close()

	slog.Info("connected to database", "dsn", cfg.db.dsn)

	a := app.NewApp(conn)

	err = http.ListenAndServe(fmt.Sprintf(":%s", os.Getenv("ADDR")), a.Router)
	if err != nil {
		slog.Error("server has failed to start", "error", err)
		os.Exit(1)
	}
}

func runMigrations() error {
	dbDSN := fmt.Sprintf("postgresql://%s:%s@%s:%s/%s?sslmode=disable",
		os.Getenv("PG_USERNAME"),
		os.Getenv("PG_PASSWORD"),
		os.Getenv("HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	if dbDSN == "" {
		return fmt.Errorf("DATABASE_DSN environment variable not set")
	}

	m, err := migrate.New(
		"file://./internal/repository/migrations",
		dbDSN,
	)
	if err != nil {
		return fmt.Errorf("failed to initialize migrations: %v", err)
	}

	if err := m.Up(); err != nil && err != migrate.ErrNoChange {
		return fmt.Errorf("failed to apply migrations: %v", err)
	}

	log.Println("Migrations applied successfully!")
	return nil
}
