CREATE TABLE IF NOT EXISTS worker (
    id SERIAL PRIMARY KEY,
    fio VARCHAR(400),
    account_number VARCHAR(20) UNIQUE,
    xisob_raqam VARCHAR UNIQUE,
    batalon_id INTEGER REFERENCES batalon(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS worker_task (
    id SERIAL PRIMARY KEY,
    worker_id INT REFERENCES worker(id),
    task_id INT REFERENCES task(id) ON DELETE CASCADE,
    summa DECIMAL,
    task_time FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS task (
    id BIGSERIAL PRIMARY KEY,
    batalon_id INTEGER REFERENCES batalon(id),
    task_time FLOAT,
    worker_number INTEGER,
    user_id INTEGER REFERENCES users(id),
    summa DECIMAL,
    discount_money DECIMAL,
    result_summa DECIMAL,
    task_date DATE,
    contract_id INTEGER REFERENCES contract(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS account_number (
    id SERIAL PRIMARY KEY,
    account_number VARCHAR(50),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS adress (
    id SERIAL PRIMARY KEY,
    adress VARCHAR(1000),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS bank (
    id SERIAL PRIMARY KEY,
    bank VARCHAR(1000),
    mfo VARCHAR(5),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS boss (
    id SERIAL PRIMARY KEY,
    boss VARCHAR(100),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS bxm (
    id SERIAL PRIMARY KEY,
    summa NUMERIC,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS shablon (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    shablon_name VARCHAR(200),
    title VARCHAR,
    main_section TEXT[],
    section_1 TEXT[],
    section_1_title VARCHAR,
    section_2 TEXT[],
    section_2_title VARCHAR,
    section_3 TEXT[],
    section_3_title VARCHAR,
    section_4 TEXT[],
    section_4_title VARCHAR,
    section_5 TEXT[],
    section_5_title VARCHAR,
    section_6 TEXT[],
    section_6_title VARCHAR,
    section_7 TEXT[],
    section_7_title VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS deduction (
    id SERIAL PRIMARY KEY,
    name VARCHAR(400),
    percent INTEGER NOT NULL,
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS doer (
    id SERIAL PRIMARY KEY,
    doer VARCHAR(100),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS str (
    id SERIAL PRIMARY KEY,
    str VARCHAR(100),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS rasxod_fio_doc (
  id SERIAL PRIMARY KEY,
  doc_num VARCHAR,
  doc_date DATE,
  user_id INTEGER REFERENCES users(id),
  batalon_id INTEGER REFERENCES batalon(id),
  opisanie VARCHAR(1000),
  account_number_id INTEGER REFERENCES account_number(id),
  deductions INTEGER[],
  "from" DATE,
  "to" DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS rasxod_fio_deduction (
  id SERIAL PRIMARY KEY,
  deduction_id INTEGER REFERENCES deduction(id),
  rasxod_fio_doc_id INTEGER REFERENCES rasxod_fio_doc(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS rasxod_fio (
  id SERIAL PRIMARY KEY,
  worker_task_id INTEGER REFERENCES worker_task(id),
  rasxod_fio_doc_id INTEGER REFERENCES rasxod_fio_doc(id),
  summa DECIMAL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isdeleted BOOLEAN DEFAULT FALSE
);


CREATE TABLE IF NOT EXISTS rasxod_doc (
  id SERIAL PRIMARY KEY,
  doc_num VARCHAR NOT NULL,
  doc_date DATE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  batalon_id INTEGER REFERENCES batalon(id),
  opisanie VARCHAR(1000),
  account_number_id INTEGER REFERENCES account_number(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS rasxod (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES task(id) ON DELETE CASCADE,
  rasxod_doc_id INTEGER REFERENCES rasxod_doc(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS prixod (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    organization_id INTEGER REFERENCES organization(id),
    contract_id INTEGER REFERENCES contract(id),
    accaunt_number_id INTEGER REFERENCES accaunt_number(id),
    opisanie VARCHAR,
    doc_num VARCHAR,
    doc_date DATE,
    summa DECIMAL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS batalon (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    birgada BOOLEAN,
    address VARCHAR(500),
    str VARCHAR(100),
    bank_name VARCHAR(200),
    mfo VARCHAR(10),
    account_number VARCHAR(40),
    treasury1 VARCHAR(50),
    treasury2 VARCHAR(50),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    fio VARCHAR,
    login VARCHAR(100),
    password VARCHAR(100),
    image VARCHAR(10000),
    region_id INTEGER REFERENCES regions(id) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS regions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);