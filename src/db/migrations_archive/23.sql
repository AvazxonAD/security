ALTER TABLE
    prixod
ADD
    COLUMN organ_gazna_number_id BIGINT REFERENCES gazna_numbers(id);

ALTER TABLE
    prixod
ADD
    COLUMN organ_account_number_id BIGINT REFERENCES organ_account_numbers(id);