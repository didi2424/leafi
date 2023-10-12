const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

function registerRouter(connection) {
    router.post('/register', (req, res) => {
        const { email, password, roleid } = req.body;
        const registered = 'no'
        const id = uuidv4();
        // Check if email already exists in the database
        const checkQuery = 'SELECT * FROM usersprofile WHERE email = ?';

        connection.query(checkQuery, [email], (err, results) => {
            if (err) {
              console.log(err);
              res.status(500).json({ message: 'Internal server error' });
            } else if (results.length > 0) {
              res.status(409).json({ message: 'Email already registered' });
            } else {
              // Insert the user into the database
              bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                  console.log(err);
                  res.status(500).send('Failed to hash password');
                  return;
                }
                const insertQuery = 'INSERT INTO usersprofile (id, email, password, registered, RoleID) VALUES (?, ?, ?, ?,?)';
                connection.query(insertQuery, [id, email, hashedPassword, registered, roleid], (err, results) => {
                  if (err) {
                    console.log(err);
                    res.status(500).send('Failed to insert user');
                  } else {
                    console.log('User registered');
                    res.status(200).json({ message: 'User registered successfully' });
                  }
                });
              });
            }
        });
    });

  
    return router;
  }
module.exports = registerRouter;