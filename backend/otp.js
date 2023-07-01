const express = require('express');
const router = express.Router();

// Generate a random OTP of specified length
function generateOTP(length) {
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < length; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

// Endpoint to generate and send OTP via email
function otpRouter(connection) {
    router.post('/verify', (req, res) => {
        const { email, otp } = req.body;
      
        // Check if the provided OTP is valid and not expired
        const checkQuery = 'SELECT * FROM otp WHERE email = ? AND otp = ? AND expiration_time > NOW()';
        connection.query(checkQuery, [email, otp], (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send('Failed to query database');
          } else if (results.length > 0) {
            // OTP is valid
            // Update the 'registered' column in the 'usersprofile' table
            const updateQuery = 'UPDATE usersprofile SET registered = ? WHERE email = ?';
            connection.query(updateQuery, ['yes', email], (err, updateResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Failed to update registration status');
              } else {
                console.log('Registration status updated');
                res.status(200).send('OTP verified and registration status updated');
              }
            });
          } else {
            // OTP is invalid or expired
            res.status(400).send('Invalid or expired OTP');
          }
        });
      });
    router.post('/send', (req, res) => {
      const { email } = req.body;
      const OTP = generateOTP(6);
      const expirationTime = new Date(Date.now() + (2 * 60 * 1000)); // Set expiration time to 2 minutes from now
  
      // Check if email is not registered and registered = 'no'
      const checkQuery = 'SELECT * FROM usersprofile WHERE email = ? AND registered = ?';
      connection.query(checkQuery, [email, 'no'], (err, results) => {
        if (err) {
          console.log(err);
          res.status(500).send('Failed to query database');
        } else if (results.length > 0) {
          // Email is not registered and OTP is not set
  
          // TODO: Send OTP via email using Nodemailer or any other email service
  
          // Update or insert the OTP in the database
          const updateQuery = 'UPDATE otp SET otp = ?, expiration_time = ? WHERE email = ?';
          const insertQuery = 'INSERT INTO otp (otp, expiration_time, email) VALUES (?, ?, ?)';
          const queryParams = [OTP, expirationTime, email];
          
          connection.query(updateQuery, queryParams, (err, otpUpdateResults) => {
            if (err) {
              console.log(err);
              res.status(500).send('Failed to update OTP');
            } else if (otpUpdateResults.affectedRows > 0) {
              console.log('OTP updated in the database');
              res.status(200).send('OTP updated and sent successfully');
            } else {
              connection.query(insertQuery, queryParams, (err, otpInsertResults) => {
                if (err) {
                  console.log(err);
                  res.status(500).send('Failed to insert OTP');
                } else {
                  console.log('OTP inserted into database');
                  res.status(200).send('OTP sent successfully');
                }
              });
            }
          });
        } else {
          // Email is already registered or OTP is already set
          res.status(409).send('Email already registered or OTP already set');
        }
      });
    });
  
    return router;
  }

module.exports = otpRouter;