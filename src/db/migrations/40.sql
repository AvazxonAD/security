ALTER TABLE
    worker_task
ADD
    COLUMN user_id INTEGER REFERENCES users(id);