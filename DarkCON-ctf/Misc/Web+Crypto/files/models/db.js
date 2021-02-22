var mysql = require('mysql');
const path = require('path')
require('dotenv').config({path: path.resolve(__dirname,'../.env')})

var con = mysql.createConnection({
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : process.env.DB_NAME
});

con.connect(function(err) {
    if (err) throw err;
});

module.exports = con;