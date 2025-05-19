CREATE
OR REPLACE FUNCTION set_task_deadline() RETURNS trigger AS $$ DECLARE effective_end_date date;

BEGIN -- end_date NULL bo'lsa, doc_date ni olamiz, aks holda end_date ni olamiz
SELECT
    COALESCE(end_date, doc_date) INTO effective_end_date
FROM
    Contracts
WHERE
    Contracts.id = NEW.contract_id;

-- deadline = effective_end_date + 5 kun
NEW.deadline := effective_end_date + INTERVAL '5 days';

RETURN NEW;

END;

$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_task_deadline BEFORE
INSERT
    OR
UPDATE
    ON Tasks FOR EACH ROW EXECUTE FUNCTION set_task_deadline();