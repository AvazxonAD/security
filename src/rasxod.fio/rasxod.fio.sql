CREATE TABLE rasxod_fio_doc (
  id SERIAL PRIMARY KEY,
  doc_num VARCHAR,
  doc_date DATE,
  user_id INTEGER REFERENCES users(id),
  batalon_id INTEGER REFERENCES batalon(id),
  opisanie VARCHAR(1000),
  account_number_id INTEGER REFERENCES account_number(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isdeleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE rasxod_fio (
  id SERIAL PRIMARY KEY,
  worker_task_id INTEGER REFERENCES worker_task(id),
  rasxod_fio_doc_id INTEGER REFERENCES rasxod_doc(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isdeleted BOOLEAN DEFAULT FALSE
);
