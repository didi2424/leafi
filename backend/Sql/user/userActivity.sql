CREATE TABLE usersactivity (
  idactivity VARCHAR(36) PRIMARY KEY,
  userid VARCHAR(36) NOT NULL,
  date TIMESTAMP NOT NULL DEFAULT NOW(),
  action VARCHAR(36) NOT NULL,
  icon VARCHAR(38) NOT NULL,
  plantskind VARCHAR(36) NOT NULL,
  diseasesname VARCHAR(36) NOT NULL
);

ALTER TABLE usersactivity CHANGE COLUMN activity action VARCHAR(36) NOT NULL;
ALTER TABLE usersactivity CHANGE COLUMN idactivity id VARCHAR(36) NOT NULL;
ALTER TABLE usersactivity ADD idactivity VARCHAR(36);

ALTER TABLE usersactivity CHANGE COLUMN created date TIMESTAMP NOT NULL DEFAULT NOW();
delete COLUMN idactivity;