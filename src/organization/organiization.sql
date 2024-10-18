CREATE TABLE organization (
    id SERIAL PRIMARY KEY,
    name VARCHAR(400),
    address VARCHAR(500),
    str VARCHAR(100),
    bank_name VARCHAR(200),
    mfo VARCHAR(10),
    account_number VARCHAR(40),
    treasury1 VARCHAR(50),
    treasury2 VARCHAR(50),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);