const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const jwt = require('jsonwebtoken');
const accountSid = 'AC21b4bf2cf3d2947cf96167abe72069f1'
const authToken = '076f82f76d7efca6be59f6d85f9f2236';
const twilio = require('twilio')
const client = new twilio(accountSid, authToken)




const app = express()
const port = 3000
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const nodemailer = require('nodemailer');
app.post('/ver', async (req, res) => {
  const { otp, email} = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shaylia469@gmail.com',
      pass: 'insxnkfmwcdcbykc'
    }
  });
  
  const mailOptions = {
    from: 'theday21company@gmail.com',
    to: email,
    subject: 'Subject',
    text: otp
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    res.status(500).send('Error sending email');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
  
})









const connection = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    password: 'password',
    database: 'users'
  });
  

  connection.connect(err => {
    if (err) throw err;
    console.log('Connected to MySQL database');
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})



app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM usersprofile';
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get('/users/:id', (req, res) => {
  const userId = req.params.id;

  const sql = 'SELECT * FROM usersprofile WHERE id = ?';
  connection.query(sql, [userId], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(results[0]);
    }
  });
});


app.post('/users', (req, res) => {
  const { name, username, email, password } = req.body;
  const id = uuidv4(); // Generate a unique ID
  const checkEmailQuery = 'SELECT COUNT(*) AS count FROM usersprofile WHERE email = ? OR username = ?';
  connection.query(checkEmailQuery, [email, username], (err, results) => {
    if (err) {
      console.error('Error checking email and username:', err);
      res.status(500).json({ message: 'Error checking email and username' });
      return;
    }
    const count = results[0].count;
    if (count > 0) {
      // Either email or username already exists, return an error
      res.status(409).json({ message: 'Email or username already exists' });
      return;
    }
    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        // Handle error
        res.status(500).json({ message: 'Error hashing password' });
        return;
      }

      const sql = 'INSERT INTO usersprofile (id, username, name, email, password) VALUES (?, ?, ?, ?, ?)';
      connection.query(sql, [id, username, name, email, hashedPassword], (err, result) => {
        if (err) {
          // Handle error
          console.error('Error creating user:', err);
          res.status(500).json({ message: 'Error creating user' });
          return;
        }
        res.status(201).json({ message: 'User created' });
      });
    });
  });
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;

  const sql = 'DELETE FROM usersprofile WHERE id = ?';
  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Failed to delete user' });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({ error: 'Failed to delete user. User not found!' });
      return;
    }

    res.status(200).json({ message: 'User deleted' });
  });
});

app.post('/verify', async (req, res) => {

  const { phonenumber, otp } = req.body;
  client.messages
  .create({
      body: 'Your LeafOD OTP is ' + otp,
      from: 'whatsapp:+14155238886',
      to: 'whatsapp:'+phonenumber
  })
  .then(() => {
    res.send('success: true');
  })
  .catch(err => {
    console.log(err);
    res.send('success: false');
  });
  
})


app.post('/wa', async (req, res) => {

 
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();
})

app.post('/login', (req, res) => {
  const secretKey = 'mysecretkeybaba'; 
  const { username, password } = req.body;
  const sql = 'SELECT * FROM usersprofile WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
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
    bcrypt.compare(password, user.password, (bcryptErr, isMatch) => {
      if (bcryptErr) {
        // Handle bcrypt error
        res.status(500).json({ message: 'Error comparing passwords' });
        return;
      }

      if (!isMatch) {
        // Passwords do not match
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      const token = jwt.sign({ name: user.name }, secretKey, { expiresIn: '1h' });
      res.status(200).json({ token });
      // Passwords match, user is authenticated
      // Generate and return a session/token
      // ...
    });
    // Add code to compare the provided password with the hashed password stored in the database
    // ...
  });

  // Add code for validating user credentials and generating a session/token
  // ...
});

app.get('/protected', (req, res) => {
  // Verify the token
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const secretKey = 'mysecretkeybaba'; // Replace with your secret key

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Token is valid, do something with the decoded data
    const name = decoded.name;
    res.status(200).json({ message: `Protected route accessed by user ${name}` });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});