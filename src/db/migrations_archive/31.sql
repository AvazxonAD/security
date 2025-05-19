ALTER TABLE
    task
add
    column deadline DATE;

UPDATE
    task
SET
    deadline = '2025-12-31'
WHERE
    deadline IS NULL;

ALTER TABLE
    task
ALTER COLUMN
    deadline
SET
    NOT NULL;