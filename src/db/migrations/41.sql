update
    prixod
set
    isdeleted = true
where
    extract(
        year
        from
            doc_date
    ) = 2025