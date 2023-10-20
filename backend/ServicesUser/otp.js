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

function otpRouter(connection) {
      router.get('/getotp', (req, res) => {
        const { email } = req.body;
        const selectQuery = 'SELECT otp, request_count,expiration_time, reset_time FROM otp WHERE email = ?';
        connection.query(selectQuery, [email], (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send('Failed to query database');
          } else if (results.length === 0) {
            res.status(404).send('OTP not found');
          } else {
            const { otp, expiration_time,request_count,reset_time } = results[0];
            res.status(200).json({ otp, expiration_time,request_count,reset_time });
          }
        });
      });

      router.post('/sendotp', (req, res) => {
        const { email } = req.body;
        const OTP = generateOTP(6);
        console.log(OTP)
        const expirationTime = new Date(Date.now() + (2 * 60 * 1000)); // Set expiration time to 2 minutes from now
        const resetTime = new Date(Date.now() + (5 * 60 * 1000)); // Set reset time to 5 minutes from now
      
        // Check if email is not registered and registered = 'no'
        const checkQuery = 'SELECT * FROM usersprofile WHERE email = ? AND registered = ?';
        connection.query(checkQuery, [email, 'no'], (err, results) => {
          if (err) {
            console.log(err);
            res.status(500).send('Failed to query database');
          } else if (results.length > 0) {
            const updateQuery = 'UPDATE otp SET otp = ?, expiration_time = ?, request_count = request_count + 1, reset_time = ? WHERE email = ?';
            const insertQuery = 'INSERT INTO otp (otp, expiration_time, email, request_count, reset_time) VALUES (?, ?, ?, 1, NULL)';
            const resetQuery = 'UPDATE otp SET request_count = 0, reset_time = ? WHERE email = ?';
            const queryParams = [OTP, expirationTime, email];
      
            // Check if OTP request limit is reached
            const otpRequestLimit = 2; // Define the number of OTP requests allowed
            const otpRequestQuery = 'SELECT request_count, reset_time FROM otp WHERE email = ?';
            connection.query(otpRequestQuery, [email], (err, requestCountResults) => {
              if (err) {
                console.log(err);
                res.status(500).send('Failed to query database');
              } else {
                const requestCount = requestCountResults.length > 0 ? requestCountResults[0].request_count : 0;
                const previousResetTime = requestCountResults.length > 0 ? requestCountResults[0].reset_time : null;
      
                if (requestCount >= otpRequestLimit && previousResetTime) {
                  // If the request count exceeds the limit and a reset time is set, check if the reset time has passed
                  const currentTime = new Date();
                  if (currentTime < previousResetTime) {
                    // Reset time has not passed yet, return with error
                    res.status(403).json({ message: 'OTP request limit exceeded. Please wait for the reset time.', reset_time: previousResetTime });
                    return;
                  } else {
                    // Reset time has passed, reset the request count and set the reset_time to null
                    connection.query(resetQuery, [null, email], (err, resetResults) => {
                      if (err) {
                        console.log(err);
                        res.status(500).send('Failed to reset OTP request count');
                      } else {
                        console.log('OTP request limit exceeded. Request count reset.');
                      }
                    });
                  }
                }
      
                // Request count is within the limit, update or insert the OTP
                connection.query(updateQuery, [OTP, expirationTime, resetTime, email], (err, otpUpdateResults) => {
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
              }
            });
          } else {
            // Email is already registered or OTP is already set
            res.status(409).send('Email already registered or OTP already set');
          }
        });
      });

      router.post('/verifyotp', (req, res) => {
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
      return router;
  }

module.exports = otpRouter;