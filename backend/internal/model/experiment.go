package model

import "time"

type Experiment struct {
	ID               uint      `gorm:"primaryKey" json:"id"`
	Title            string    `gorm:"uniqueIndex; size:255; not null" json:"title"`
	ShortDescription string    `gorm:"size:255; not null" json:"shortDescription"`
	FullContent      string    `gorm:"not null" json:"fullContent"`
	ImageUrl         *string   `json:"imageUrl"`
	VideoUrl         *string   `json:"videoUrl"`
	Category         string    `gorm:"size:255; not null" json:"category"`
	CreatedAt        time.Time `json:"createdAt"`
}
