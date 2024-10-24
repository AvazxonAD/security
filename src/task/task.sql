CREATE TABLE task (
    id BIGSERIAL PRIMARY KEY,
    batalon_id INTEGER REFERENCES batalon(id),
    task_time FLOAT,
    remaining_task_time FLOAT,
    worker_number INTEGER,
    user_id INTEGER REFERENCES users(id),
    summa DECIMAL,
    task_date DATE,
    contract_id INTEGER REFERENCES contract(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
)