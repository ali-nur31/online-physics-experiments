CREATE TABLE experiments (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description VARCHAR(255) NOT NULL,
    full_content TEXT NOT NULL,
    image_url TEXT,
    video_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
