package model

import "time"

type Experiment struct {
	ID               uint      `gorm:"primaryKey" json:"id"`
	Title            string    `gorm:"uniqueIndex; size:255; not null" json:"title"`
	ShortDescription string    `gorm:"size:255; not null" json:"short_description"`
	FullContent      string    `gorm:"not null" json:"full_content"`
	ImageUrl         *string   `json:"image_url"`
	VideoUrl         *string   `json:"video_url"`
	Category         string    `gorm:"size:255; not null" json:"category"`
	CreatedAt        time.Time `json:"created_at"`
}
