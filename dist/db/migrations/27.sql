UPDATE
    organization
SET
    str = REGEXP_REPLACE(str, '\s+', '', 'g');