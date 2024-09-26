const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3400; // Use environment variable for port or default to 3400

// Configure body-parser to handle form data
app.use(bodyParser.urlencoded({ extended: true }));

// Replace with your actual MySQL connection details
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Srushti@1175',
  database: 'car'
});

// Route to handle form submission (POST request)
app.post('/submit-form', async (req, res) => {
  const { cno, cname, floc, tloc, compname, price } = req.body; // Destructure form data

  // Prepare parameterized SQL query to prevent SQL injection
  const sql = 'INSERT INTO add_car (cno, cname, floc, tloc, compname, price) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [cno, cname, floc, tloc, compname, price];

  try {
    const [results] = await pool.query(sql, values);
    console.log('Data inserted successfully:', results);
    // res.send('Form data submitted successfully!');
    res.redirect('http://127.0.0.1:5501/login_new.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting form data.');
  }
});

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/add_car.html');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});