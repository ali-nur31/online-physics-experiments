package repository

import (
	"context"
	"log/slog"
	"online-physics-experiments/internal/model"

	"gorm.io/gorm"
)

type ExperimentRepository interface {
	GetByID(ctx context.Context, id uint) (*model.Experiment, error)
	GetAll(ctx context.Context) (*[]model.Experiment, error)
}

type postgresExperimentRepository struct {
	db *gorm.DB
}

func NewExperimentRepository(db *gorm.DB) ExperimentRepository {
	return &postgresExperimentRepository{db: db}
}

func (er *postgresExperimentRepository) GetByID(ctx context.Context, id uint) (*model.Experiment, error) {
	var experiment model.Experiment

	err := er.db.WithContext(ctx).First(&experiment, id).Error
	if err != nil {
		slog.Error("failed to find user by presented id", "error", err)
		return nil, err
	}

	return &experiment, nil
}

func (er *postgresExperimentRepository) GetAll(ctx context.Context) (*[]model.Experiment, error) {
	var experiments []model.Experiment

	err := er.db.WithContext(ctx).Find(&experiments).Error
	if err != nil {
		slog.Error("failed to get db", "error", err)
		return nil, err
	}

	return &experiments, nil
}
