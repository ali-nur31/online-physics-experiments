package app

import (
	"net/http"
	"online-physics-experiments/internal/api"

	"gorm.io/gorm"
)

type App struct {
	Router http.Handler
}

func NewApp(db *gorm.DB) *App {
	router := api.NewRouter(db)

	return &App{
		Router: router,
	}
}
