const http = require('http');
const mysql = require('mysql');

// Create a connection to MySQL database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Srushti@1175',
  database: 'car'
});

// Connect to MySQL
connection.connect();

// Create a basic server
const server = http.createServer((req, res) => {
  // Set CORS headers to allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Query to fetch data from MySQL
  const query = 'SELECT * FROM book_car';

  // Execute the query
  connection.query(query, (error, results, fields) => {
    if (error) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(results));
    }
  });
});

// Listen on port 2000
server.listen(2000, () => {
  console.log('Server running at http://localhost:2000/');
});
