// Import required packages
const mysql = require('mysql');
// MySQL connection configuration
const connection = mysql.createConnection({
  host: 'localhost',  // Replace with your MySQL host
  user: 'root',       // Replace with your MySQL username
  password: 'password',   // Replace with your MySQL password
  database: 'northwind'  // Replace with your database name
});
// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});
// Query to select all records from Region table
const query = 'SELECT * FROM Region';
// Execute the query
connection.query(query, (err, results) => {
  if (err) {
    console.error('Error querying database: ' + err.stack);
    return;
  }
  // Log the retrieved records
  console.log('Records from Region table:');
  results.forEach((row) => {
    console.log(`${row.RegionID} | ${row.RegionDescription}`);
  });
  // Close the connection
  connection.end((err) => {
    if (err) {
      console.error('Error closing database connection: ' + err.stack);
      return;
    }
    console.log('Connection closed.');
  });
});