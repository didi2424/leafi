CREATE DATABASE users;
USE users;

-- Create the UserRoles table
CREATE TABLE UserRoles (
    RoleID INT PRIMARY KEY,
    RoleName VARCHAR(50)
);

-- Insert roles into the table
INSERT INTO UserRoles (RoleID, RoleName) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'botanis');