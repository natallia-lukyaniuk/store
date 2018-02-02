var express = require('express');
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
var config = require('./config');

var app = express();
var mysql = require('mysql');
var connection = mysql.createConnection(config.dbConnection);
connection.connect();

var app = express();
var port = process.env.PORT || 8000;
app.set('superSecret', config.secret);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var apiRoutes = express.Router();
require('./app/routes/authenticate')(apiRoutes, app, connection);

apiRoutes.use(function (req, res, next) {
  var token = req.body.token || req.query.token || req.headers['token'];

  if (token) {
    jwt.verify(token, app.get('superSecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
    
  } else {
    
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

require('./app/routes')(apiRoutes, app, connection);

app.use('/api', apiRoutes);

app.listen(port);
