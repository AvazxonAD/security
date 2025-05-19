update
    task
set
    deadline = (
        select
            end_date + INTERVAL '5 days'
        from
            contract
        where
            id = task.contract_id
    )