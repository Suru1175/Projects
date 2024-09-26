const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 3600; // Use environment variable for port or default to 3000

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
  const {name,cno,email,Floc,Tloc,date } = req.body; // Destructure form data

  // Prepare parameterized SQL query to prevent SQL injection
  const sql = 'INSERT INTO book_car (name,cno,email,Floc,Tloc,date) VALUES (?,?,?,?,?,?)';
  const values = [name,cno,email,Floc,Tloc,date];

  try {
    const [results] = await pool.query(sql, values);
    console.log('Data inserted successfully:', results);
    res.redirect('http://127.0.0.1:5501/index.html');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error submitting form data.');
  } finally {
    // Close connection pool (optional, but recommended for production)
    await pool.end();
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
