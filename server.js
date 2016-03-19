var express = require('express');
var app = express();


//------------------------------------
var bodyParser = require('body-parser');
var multer =require('multer');
var uuid=require('node-uuid');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
//app.use(uuid());

// require is not working
require("./public/assignment/server/app.js")(app,uuid);
//-------------------------------------


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.get('/hello', function(req, res){
    res.send('hello world');
});
app.listen(port, ipaddress);