const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');

const loginRouter = require('./ServicesUser/login')
const registerRouter = require('./ServicesUser/register')
const otpRouter = require('./ServicesUser/otp');
const deleteRouter = require('./ServicesUser/delete')
const userRouter = require('./ServicesUser/user')
const userActivity = require('./ServicesUser/useractivity')
const diseasesRouter = require('./ServicesAdmin/diseases')


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
    from: 'shaylia469@gmail.com',
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
    password: 'Berenangkelautjawa?',
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

app.post('/users', (req, res) => {
  const {email} = req.body;
  
  const checkEmailQuery = 'SELECT COUNT(*) AS count FROM usersprofile WHERE email = ? ';
  connection.query(checkEmailQuery, email, (err, results) => {
    if (err) {
      console.error('Error checking email:', err);
      res.status(500).json({ message: 'Error checking email and username' });
      return;
    }
    const count = results[0].count;
    if (count > 0) {
      // Either email or username already exists, return an error
      res.status(409).json({ message: 'Email or username already exists' });
      return;
    }
    if (count === 0) {
      // Either email or username already exists, return an error
      res.status(408).json({ message: 'user not found' });
      return;
    }
    // Hash the password
   
  });
});

app.use('/Auth', otpRouter(connection));
app.use('/Auth', loginRouter(connection));
app.use('/Auth', registerRouter(connection));
app.use('/Auth', deleteRouter(connection));
app.use('/Auth', userRouter(connection));
app.use('/Auth', userActivity(connection));

app.use('/diseasesv1', diseasesRouter(connection))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});