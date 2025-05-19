update
    task
set
    address = (
        select
            address
        from
            contract
        where
            id = task.contract_id
    )
where
    address is null;