

CREATE DATABASE users;
USE users;

CREATE TABLE usersprofile (
  id VARCHAR(36) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  firstname VARCHAR(255),
  lastname VARCHAR(255),
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  registered VARCHAR(20) NOT NULL,
  RoleID INT
);

CREATE TABLE otp (
  email VARCHAR(255) NOT NULL,
  otp VARCHAR(6),
  expiration_time TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 2 MINUTE),
  created TIMESTAMP NOT NULL DEFAULT NOW(),
  reset_time VARCHAR(255) NOT NULL
);

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'Berenangkemana?';
GRANT ALL PRIVILEGES ON users.* TO 'admin'@'localhost';
FLUSH PRIVILEGES;
ALTER USER 'admin'@'localhost' IDENTIFIED WITH 'mysql_native_password' BY 'Berenangkelautjawa?';

ALTER TABLE usersprofile
DROP COLUMN RoleID;

const token = req.headers.authorization;

ALTER TABLE users ADD created TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE users ADD username VARCHAR(255) NOT NULL;

ALTER TABLE otp ADD request_count VARCHAR(255) NOT NULL;
ALTER TABLE otp ADD reset_time VARCHAR(255) NOT NULL;

ALTER TABLE usersprofile ADD registered VARCHAR(20) NOT NULL;
ALTER TABLE usersprofile ALTER COLUMN registered VARCHAR(20) NOT NULL;


ALTER TABLE otp MODIFY reset_time TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL 5 MINUTE);

unique uuid

ALTER TABLE users ADD COLUMN id_string VARCHAR(36);
UPDATE users SET id_string = CAST(id AS CHAR);
ALTER TABLE users DROP COLUMN id;
ALTER TABLE users CHANGE COLUMN id_string id VARCHAR(36) PRIMARY KEY;

