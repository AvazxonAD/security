UPDATE
    contract
SET
    all_worker_number = (
        SELECT
            COALESCE(SUM(t.worker_number), 0)
        FROM
            task t
        WHERE
            t.isdeleted = false
            AND t.contract_id = contract.id
    )
WHERE
    (
        all_worker_number IS NULL
        OR all_worker_number = 0
    )
    AND isdeleted = false;