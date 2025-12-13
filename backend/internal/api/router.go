package api

import (
	"net/http"
	"online-physics-experiments/internal/api/handlers"
	"online-physics-experiments/internal/repository"
	"online-physics-experiments/internal/service"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/cors"
	"gorm.io/gorm"
)

func NewRouter(db *gorm.DB) *chi.Mux {
	r := chi.NewRouter()
	r.Use(cors.Handler(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}))

	r.Use(middleware.RequestID)
	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello"))
	})

	experimentRepository := repository.NewExperimentRepository(db)
	experimentService := service.NewExperimentService(experimentRepository)
	experimentHandler := handlers.NewExperimentHandler(experimentService)

	r.Route("/experiments", func(r chi.Router) {
		r.Get("/", experimentHandler.GetExperiment)
		r.Get("/{category}", experimentHandler.GetExperiment)
		r.Get("/{id}", experimentHandler.GetExperiment)
	})

	return r
}
