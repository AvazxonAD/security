ALTER TABLE
    rasxod_fio_doc
ADD
    COLUMN batalon_gazna_number_id BIGINT REFERENCES gazna_numbers(id);

ALTER TABLE
    rasxod_fio_doc
ADD
    COLUMN batalon_account_number_id BIGINT REFERENCES organ_account_numbers(id);