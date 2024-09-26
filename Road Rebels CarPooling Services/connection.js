//const database = require("mime-db");

var mysql = require("mysql");
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Srushti@1175",
    database:"car"
});

module.exports = con;