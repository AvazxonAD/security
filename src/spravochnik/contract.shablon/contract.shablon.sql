CREATE TABLE contract_shablon (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    shablon_name VARCHAR(200),
    main_section TEXT,
    section_1 TEXT,
    section_2 TEXT,
    section_3 TEXT,
    section_4 TEXT,
    section_5 TEXT,
    section_6 TEXT,
    section_7 TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);