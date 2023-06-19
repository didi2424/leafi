USE users;

CREATE TABLE users (
  id INT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

const token = req.headers.authorization;

ALTER TABLE users ADD created TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE users ADD username VARCHAR(255) NOT NULL;