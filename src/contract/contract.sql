CREATE TABLE contract (
    id SERIAL PRIMARY KEY,
    doc_num VARCHAR(255),
    doc_date DATE,
    period DATE,
    adress VARCHAR(255),
    start_date DATE,
    end_date DATE,
    start_time VARCHAR,
    end_time VARCHAR,
    discount FLOAT,
    summa DECIMAL,
    payment BOOLEAN,
    payment_date DATE,
    organization_id INT REFERENCES organization(id),
    account_number_id INT REFERENCES account_number(id),
    user_id INT REFERENCES users(id)
);
