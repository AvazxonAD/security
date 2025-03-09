ALTER TABLE
    contract
ADD
    COLUMN gazna_number_id BIGINT REFERENCES gazna_numbers(id);

ALTER TABLE
    contract
ADD
    COLUMN organ_account_number_id BIGINT REFERENCES organ_account_numbers(id);