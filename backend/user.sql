

CREATE DATABASE users;
USE users;

CREATE TABLE usersprofile (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE otp (
  email VARCHAR(255) NOT NULL,
  otp VARCHAR(6),
  expiration_time TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 2 MINUTE),
  created TIMESTAMP NOT NULL DEFAULT NOW()
);

const token = req.headers.authorization;

ALTER TABLE users ADD created TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE users ADD username VARCHAR(255) NOT NULL;

ALTER TABLE usersprofile ALTER COLUMN registered VARCHAR(20) NOT NULL;



unique uuid

ALTER TABLE users ADD COLUMN id_string VARCHAR(36);
UPDATE users SET id_string = CAST(id AS CHAR);
ALTER TABLE users DROP COLUMN id;
ALTER TABLE users CHANGE COLUMN id_string id VARCHAR(36) PRIMARY KEY;