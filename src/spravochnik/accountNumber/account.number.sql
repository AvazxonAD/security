CREATE TABLE account_number (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(50),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);