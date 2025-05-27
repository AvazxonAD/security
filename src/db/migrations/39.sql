UPDATE
    task
SET
    deadline = now() + INTERVAL '5 days'
WHERE
    batalon_id = 29
    and isdeleted = false
    and EXTRACT(
        YEAR
        FROM
            deadline
    ) = 2025