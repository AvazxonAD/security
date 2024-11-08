CREATE TABLE rasxod_doc (
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

CREATE TABLE rasxod (
  id SERIAL PRIMARY KEY,
  task_id INTEGER REFERENCES task(id),
  rasxod_doc_id INTEGER REFERENCES rasxod_doc(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  isdeleted BOOLEAN DEFAULT FALSE
);
