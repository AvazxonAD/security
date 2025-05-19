UPDATE
    task
SET
    address = COALESCE(contract.address, 'nomalum')
FROM
    contract
WHERE
    task.contract_id = contract.id
    AND task.address IS NULL;