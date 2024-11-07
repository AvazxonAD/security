CREATE TABLE worker (
    id SERIAL PRIMARY KEY,
    fio VARCHAR(400),
    account_number VARCHAR(20) UNIQUE,
    xisob_raqam VARCHAR UNIQUE,
    batalon_id INTEGER REFERENCES batalon(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);