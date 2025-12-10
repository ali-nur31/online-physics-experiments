package handlers

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"online-physics-experiments/internal/service"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type ExperimentHandler struct {
	experimentService service.ExperimentService
}

func NewExperimentHandler(service service.ExperimentService) *ExperimentHandler {
	return &ExperimentHandler{experimentService: service}
}

func (eh *ExperimentHandler) GetExperiment(w http.ResponseWriter, r *http.Request) {
	if idStr := chi.URLParam(r, "id"); idStr != "" {
		id, err := strconv.Atoi(idStr)
		if err != nil || id < 0 {
			slog.Error("failed parse int from query param id", "error", err)
			http.Error(w, "Invalid ID parameter", http.StatusBadRequest)
			return
		}

		experiment, err := eh.experimentService.GetByID(r.Context(), uint(id))
		if err != nil {
			slog.Error("experiment not found", "error", err)
			http.Error(w, "Experiment not found", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(experiment)
	} else {
		experiments, err := eh.experimentService.GetAll(r.Context())
		if err != nil {
			slog.Error("experiment not found", "error", err)
			http.Error(w, "Experiment not found", http.StatusNotFound)
			return
		}

		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(experiments)
	}
}
