package service

import (
	"context"
	"online-physics-experiments/internal/model"
	"online-physics-experiments/internal/repository"
)

type ExperimentService interface {
	GetByID(ctx context.Context, id uint) (*model.Experiment, error)
	GetByCategory(ctx context.Context, category string) (*[]model.Experiment, error)
	GetAll(ctx context.Context) (*[]model.Experiment, error)
}

type experimentService struct {
	experimentRepository repository.ExperimentRepository
}

func NewExperimentService(repository repository.ExperimentRepository) ExperimentService {
	return &experimentService{experimentRepository: repository}
}

func (es experimentService) GetByID(ctx context.Context, id uint) (*model.Experiment, error) {
	return es.experimentRepository.GetByID(ctx, id)
}

func (es experimentService) GetByCategory(ctx context.Context, category string) (*[]model.Experiment, error) {
	return es.experimentRepository.GetByCategory(ctx, category)
}

func (es experimentService) GetAll(ctx context.Context) (*[]model.Experiment, error) {
	return es.experimentRepository.GetAll(ctx)
}
