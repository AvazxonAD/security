CREATE TABLE rasxod_organ (
    id BIGSERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    organization_id INT NOT NULL REFERENCES organization(id),
    opisanie VARCHAR(1000),
    doc_num DECIMAL NOT NULL,
    doc_date DATE NOT NULL,
    summa DECIMAL NOT NULL,
    account_number_id INT NOT NULL REFERENCES account_number(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);