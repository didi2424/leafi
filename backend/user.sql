


USE users;

CREATE TABLE usersprofile (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

const token = req.headers.authorization;

ALTER TABLE users ADD created TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE users ADD username VARCHAR(255) NOT NULL;


unique uuid

ALTER TABLE users ADD COLUMN id_string VARCHAR(36);
UPDATE users SET id_string = CAST(id AS CHAR);
ALTER TABLE users DROP COLUMN id;
ALTER TABLE users CHANGE COLUMN id_string id VARCHAR(36) PRIMARY KEY;