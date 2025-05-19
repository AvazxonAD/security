ALTER TABLE
    users
ADD
    COLUMN user_id INTEGER REFERENCES users(id);