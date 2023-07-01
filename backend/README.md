sudo mysql -u root -p

make a user for SQL:

CREATE USER 'admin'@'localhost' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON usersprofile TO 'admin'@'localhost';
ALTER USER 'admin'@'localhost' IDENTIFIED BY 'password';
ALTER USER 'admin'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';

FLUSH PRIVILEGES;

SHOW GRANTS FOR 'admin'@'localhost';

CREATE DATABASE users;

show database
SHOW DATABASES; 

USE users;
Describe Table :
DESCRIBE usersprofile;



Delete database :
DROP DATABASE database_name;

delete table
DROP TABLE usersprofile;

REVOKE ALL PRIVILEGES ON *.* FROM 'username'@'hostname';


