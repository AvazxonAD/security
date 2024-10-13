CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    login VARCHAR(100),
    password VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE batalon ( 
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    user_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE bxm (summa DECIMAL);

CREATE TABLE commands (
    id SERIAL NOT NULL PRIMARY KEY,
    commanddate DATE NOT NULL,
    date1 DATE NOT NULL,
    date2 DATE NOT NUll,
    commandnumber double precision NOT NULL,
    status BOOLEAN DEFAULT false,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER
);

CREATE TABLE workers (
    id SERIAL NOT NULL PRIMARY KEY,
    FIO VARCHAR(200) NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    admin_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contracts (
    id SERIAL NOT NULL PRIMARY KEY,
    contractnumber double precision NOT NULL,
    contractdate DATE NOT NULL,
    clientname VARCHAR(300) NOT NULL,
    clientaddress VARCHAR(400),
    clientmfo VARCHAR(20),
    clientaccount VARCHAR(23),
    clientstr VARCHAR(20),
    treasuryaccount VARCHAR(100),
    treasuryaccount27 VARCHAR(100),
    timelimit VARCHAR(500) NOT NULL,
    address VARCHAR(500) NOT NUll,
    discount double precision,
    allworkernumber INTEGER NOT NULL,
    allmoney double precision NOT NULL,
    timemoney double precision NOT NULL,
    money double precision NOT NULL,
    discountmoney double precision,
    ispay BOOLEAN DEFAULT false,
    tasktime double precision NOT NULL,
    taskdate DATE NOT NULL,
    accountnumber VARCHAR(40) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    validityperiod DATE NOT NULL,
    user_id INTEGER
);

CREATE TABLE tasks (
    id SERIAL NOT NULL PRIMARY KEY,
    battalionname VARCHAR(200) NOT NULL,
    contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
    contractnumber double precision NOT NULL,
    clientName VARCHAR(300) NOT NULL,
    taskDate DATE NOT NULL,
    workernumber INTEGER NOT NULL,
    timemoney double precision NOT NULL,
    tasktime double precision NOT NULL,
    allmoney double precision NOT NULL,
    discountmoney double precision,
    money double precision NOT NULL,
    done BOOLEAN DEFAULT false,
    inProgress BOOLEAN DEFAULT true,
    notDone BOOLEAN DEFAULT false,
    address VARCHAR(500) NOT NULL,
    discount double precision,
    timelimit VARCHAR(500) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    ispay BOOLEAN,
    user_id INTEGER
);

CREATE TABLE worker_tasks (
    id SERIAL NOT NULL PRIMARY KEY,
    worker_name VARCHAR(300) NOT NULL,
    task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
    onetimemoney double precision NOT NULL,
    contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
    tasktime double precision NOT NULL,
    summa double precision NOT NULL,
    taskdate DATE NOT NULL,
    clientname VARCHAR(200) NOT NULL,
    ispay BOOLEAN DEFAULT false,
    address VARCHAR(400) NOT NULL,
    pay BOOLEAN DEFAULT false,
    command_id INTEGER REFERENCES commands(id),
    user_id INTEGER NOT NUll,
    discount double precision,
    contractnumber double precision NOT NULL,
    worker_id INTEGER,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE iib_tasks (
    id SERIAL NOT NULL PRIMARY KEY,
    battalionname VARCHAR(200) NOT NULL,
    contract_id INTEGER REFERENCES contracts(id) ON DELETE CASCADE,
    contractnumber double precision NOT NULL,
    clientname VARCHAR(300) NOT NULL,
    taskdate DATE NOT NULL,
    workernumber INTEGER NOT NULL,
    timemoney double precision NOT NULL,
    tasktime double precision NOT NULL,
    allmoney double precision NOT NULL,
    discountmoney double precision,
    money double precision NOT NULL,
    ispay BOOLEAN DEFAULT false,
    pay BOOLEAN DEFAULT false,
    command_id INTEGER REFERENCES commands(id),
    address VARCHAR(500) NOT NULL,
    discount double precision,
    timelimit VARCHAR(500) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER
);

CREATE TABLE accountNumber(
    id SERIAL NOT NULL PRIMARY KEY,
    accountnumber VARCHAR(50) NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    user_id INTEGER
);

CREATE TABLE executors (
    id SERIAL PRIMARY KEY,
    executor VARCHAR(500) NOT NULL,
    user_id INTEGER
);

CREATE TABLE leaders (
    id SERIAL PRIMARY KEY,
    leader VARCHAR(100) NOT NULL,
    user_id INTEGER
);

CREATE TABLE addresses (
    id SERIAL PRIMARY KEY,
    address VARCHAR(100) NOT NULL,
    user_id INTEGER
);

CREATE TABLE banks (
    id SERIAL PRIMARY KEY,
    bank VARCHAR(100) NOT NULL,
    user_id INTEGER
);

CREATE TABLE mfos (
    id SERIAL PRIMARY KEY,
    mfo VARCHAR(100) NOT NULL,
    user_id INTEGER
);

CREATE TABLE strs (
    id SERIAL PRIMARY KEY,
    str VARCHAR(100) NOT NULL,
    user_id INTEGER
);

CREATE TABLE files (
    id SERIAL PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    file_data BYTEA NOT NULL,
    createdAt TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE EXTENSION unaccent;

CREATE TABLE infos (
    id SERIAL PRIMARY KEY,
    url VARCHAR(1000) NOT NULL,
    title VARCHAR(100) NOT NULL,
    descr VARCHAR(300) NOT NULl,
    admin_status BOOLEAN NOT NULL
);