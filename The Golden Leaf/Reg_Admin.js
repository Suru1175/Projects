const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const app = express();
const port = parseInt(process.env.PORT || 3900, 10);

app.use(bodyParser.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Srushti@1175',
  database: 'mdb',
  idleTimeout: 10000
});

app.post('/submit-form', async (req, res) => {
  const {Fname,eid,cno,ccno,Uname,pwd} = req.body;
  const sql = 'INSERT INTO admin (Fname,eid,cno,ccno,Uname,pwd) VALUES (?,?,?,?,?,?)';
  const values = [Fname,eid,cno,ccno,Uname,pwd];

  try {
    const [results] = await pool.query(sql, values);
    console.log('Data inserted successfully:', results);
    // res.status(200).send('Data inserted successfully');
    res.redirect('http://127.0.0.1:5500/admin.html');
  } catch (error) {
    console.error(error);
    if (error.errno === 1062) {
      res.status(409).send('Error: Duplicate entry. Name might already exist.');
    } else {
      res.status(500).send('Error submitting form data.');
    }
  }
});

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
