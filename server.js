var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var passport = require('passport');
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
    resave: true,
    saveUninitialized: true,
    secret: process.env.PASSPORT_SECRET }));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

var connectionString = 'mongodb://127.0.0.1:27017/webdev2016';

// use remote connection string
// if running in remote server
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
};

// connect to the database
var db = mongoose.connect(connectionString);

require("./public/assignment/server/app.js")(app,uuid,db,mongoose);
require("./public/project/server/app.js")(app,uuid,db,mongoose);


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.use(express.static(__dirname + '/public'));

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.listen(port, ipaddress);