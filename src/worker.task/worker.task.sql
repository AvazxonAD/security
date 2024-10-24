CREATE TABLE worker_task (
    id SERIAL PRIMARY KEY,
    worker_id INT REFERENCES worker(id),
    task_id INT REFERENCES task(id) ON DELETE CASCADE,
    summa DECIMAL,
    task_time FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);
