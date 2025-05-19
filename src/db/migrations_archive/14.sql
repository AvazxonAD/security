UPDATE contract 
SET all_task_time = (
    SELECT COALESCE(SUM(t.task_time), 0)
    FROM task t
    WHERE t.isdeleted = false 
        AND t.contract_id = contract.id
)
WHERE (all_task_time IS NULL OR all_task_time = 0 OR all_task_time = 'NaN')
    AND isdeleted = false;
