ALTER TABLE
    account_number
ADD
    COLUMN organ_id BIGINT REFERENCES organization(id);

ALTER TABLE
    account_number
ADD
    COLUMN batalon_id BIGINT REFERENCES batalon(id);

ALTER TABLE
    gazna_numbers
ADD
    COLUMN batalon_id BIGINT REFERENCES batalon(id);