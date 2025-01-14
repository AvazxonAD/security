CREATE TABLE prixod (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    organization_id INTEGER REFERENCES organization(id),
    contract_id INTEGER REFERENCES contract(id),
    accaunt_number_id INTEGER REFERENCES accaunt_number(id),
    opisanie VARCHAR,
    doc_num VARCHAR,
    doc_date DATE,
    summa DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);
