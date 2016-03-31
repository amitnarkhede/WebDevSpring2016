var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var uuid = require('node-uuid');
var mongoose  = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');

//Configure app to use body parser.
//This parser helps to fetch the data that is part of html json body

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// define process.env.PASSPORT_SECRET in your local environment!

app.use(session({
    secret:process.env.PASSPORT_SECRET,
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());

var connectionString = 'mongodb://127.0.0.1:27017/cs5610fall2015exmpl1';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

// connect to the database
var db = mongoose.connect(connectionString);

require("./public/assignment/server/app.js")(app,uuid,db,mongoose);
require("./public/project/server/app.js")(app,uuid);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.use(express.static(__dirname + '/public'));

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);