const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = parseInt(process.env.PORT || 4200, 10);

app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Srushti@1175',
  database: 'mdb',
  idleTimeout: 10000
});

app.post('/submit-form', async (req, res) => {
  const { name, cno, eid, addr, people, Tno, time, date } = req.body;

  // Check table availability before inserting the booking
  const tableAvailable = await checkTableAvailability(Tno, time, date);

  if (!tableAvailable) {
    return res.status(409).send('Error: The table is not available at the specified time and date.');
  }

  const sql = 'INSERT INTO book (name, cno, eid, addr, people, Tno, time, date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [name, cno, eid, addr, people, Tno, time, date];

  try {
    const [results] = await pool.query(sql, values);
    console.log('Data inserted successfully:', results);
    // res.status(200).send('Data inserted successfully');
    res.redirect('http://127.0.0.1:5500/index.html');
  } catch (error) {
    console.error(error);
    if (error.errno === 1062) {
      res.status(409).send('Error: Duplicate entry. Name might already exist.');
    } else {
      res.status(500).send('Error submitting form data.');
    }
  }
});

async function checkTableAvailability(Tno, time, date) {
  try {
    const [rows] = await pool.query('SELECT * FROM book WHERE Tno = ? AND time = ? AND date = ?', [Tno, time, date]);
    return rows.length === 0; // If rows.length is 0, table is available
  } catch (error) {
    console.error('Error checking table availability:', error);
    return false; // Return false in case of any error
  }
}

// Listen for process termination and close the pool
process.on('SIGINT', () => {
  console.log('Received SIGINT. Closing connection pool...');
  pool.end().then(() => {
    console.log('Connection pool closed');
    process.exit(0);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
