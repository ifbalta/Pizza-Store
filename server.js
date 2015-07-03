var express = require("express");
var app = express();

var mongo = require('mongodb');

app.use(express.static(__dirname + '/'));
app.listen(process.env.PORT || 3000);
console.log("started server");