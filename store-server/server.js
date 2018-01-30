var express = require('express');
var bodyBarser = require('body-parser');
var jwt = require('jsonwebtoken');

var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection({
  host : 'localhost',
  user : 'sa',
  password : 'root'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
  console.log('The solution is: ', rows[0].solution);
});

connection.end();