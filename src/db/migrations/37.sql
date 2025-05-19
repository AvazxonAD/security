UPDATE
    task
SET
    address = COALESCE(contract.adress, 'nomalum')
FROM
    contract
WHERE
    task.contract_id = contract.id
    AND task.address IS NULL;