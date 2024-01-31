require('dotenv').config();

const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Initialize app and database connection
const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // replace with your application's actual origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
}));


app.use((req, res, next) => {
  console.log('Incoming headers:', req.headers);
  next();
});


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.DB_PASSWORD, 
  database: 'journal_db'
});

// Connect
db.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database');
});

// Middleware to parse JSON
app.use(express.json());

// Save entry
app.post('/save', (req, res) => {
  console.log("Received request body: ", req.body);
  // Convert the date to MySQL-compatible format
  const jsDate = new Date(req.body.date);
  const mysqlDate = `${jsDate.getFullYear()}-${jsDate.getMonth() + 1}-${jsDate.getDate()}`;

  // Ensure content is a string
  const content = typeof req.body.content === 'object' ? JSON.stringify(req.body.content) : req.body.content;

  // SQL query
  let sql = `INSERT INTO entries(date, content) VALUES ('${mysqlDate}', '${content}')`;
  
  // Execute query
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send('Entry saved...');
  });
});

// Listen on port
app.listen(3001, () => {
  console.log('Server started on http://localhost:3001');
});
