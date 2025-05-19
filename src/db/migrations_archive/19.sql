ALTER TABLE
    rasxod_organ
ADD
    COLUMN gazna_number_id BIGINT REFERENCES gazna_numbers(id);

ALTER TABLE
    rasxod_organ
ADD
    COLUMN organ_account_number_id BIGINT REFERENCES organ_account_numbers(id);