const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function loginRouter(connection) {
    router.post('/login', (req, res) => {
      const { email, password } = req.body;
      // Check if the provided OTP is valid and not expired
      const secretKey = 'mysecretkeybaba';
      const checkQuery = 'SELECT * FROM usersprofile WHERE email = ?';
  
      connection.query(checkQuery, [email], (err, results) => {
        if (err) {
          // Handle database error
          res.status(500).json({ message: 'Error retrieving user' });
          return;
        }
  
        if (results.length === 0) {
          // User with the provided email does not exist
          res.status(401).json({ message: 'Invalid credentials' });
          return;
        }
  
        const user = results[0];
        if (user.registered === 'no') {
          // Account found but not registered yet
          res.status(402).json({ message: 'Account found but not registered yet' });
          return;
        }
  
        bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
          if (bcryptErr) {
            // Handle bcrypt error
            res.status(500).json({ message: 'Error comparing passwords' });
            return;
          }
  
          if (!isMatch) {
            // Passwords do not match
            res.status(401).json({ message: 'Invalid credentials 2' });
            return;
          }
          const tokenPayload = {
            id: user.id,
            name: user.email,
            role: user.RoleID,
            
          };
          const token = jwt.sign(tokenPayload, secretKey, { expiresIn: '24h' });
          
          res.status(200).json({ token });
          // Passwords match, user is authenticated
          // Generate and return a session/token
          // ...
        });
        // Add code to compare the provided password with the hashed password stored in the database
        // ...
      });
    });
  
    return router;
  }
module.exports = loginRouter;