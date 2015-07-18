var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var router = express.Router();
var path = require("path");
var MongoClient = mongo.MongoClient,
    format = require('util').format;

var orderSchema = new mongoose.Schema({
    pizzaType : String,
    pizzaSize : String,
    toppings : [String],
    customerName : String,
    customerAddress : String,
    customerPhone : String,
    totalPrice : Number,
    orderDate : Date
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));


// POST method
app.post('/submitpizza', function(req, res){
    var order = {
        pizzaType : req.body.pizzatype,
        pizzaSize : req.body.pizzasize,
        toppings : req.body.toppings,
        customerName : req.body.customername,
        customerAddress : req.body.customeraddress,
        customerPhone : req.body.customerphone,
        totalPrice : req.body.totalPrice,
        orderDate : new Date()
    };

    insertOrder(order);

    console.log(req.body.totalPrice);
    var html = "Your pizza will be arriving soon."
    res.send(html);
});

/**
 * Inserting the record.
 * */
function insertOrder(order){
    MongoClient.connect('mongodb://localhost:27017/pizzastore?auto_reconnect', function (err, db){
        if (err) {
            next (err);
        }
        console.log("Connected to pizzastore");
        db.collection('ordercollection').insertOne(order, function(err, records){
           if (err) {
            next (err);
           };
            console.log("Record added as " + records[0]._id);
        });
    });
}

// Error handling
// app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//         message: err.message,
//         error: {}
//     });
// });

app.listen(process.env.PORT || 3000);
console.log("started server");
/*
    ***   Example insert ***
     db.ordercollection.insert({
         pizzaType : "pepperoni",
         toppings : ["cheese", "bellpepper", "jalapeno"],
         customerName : "Cheska Baltazar",
         customerAddress : "4 Quentin Avenue",
         customerPhone : "027 9179593",
         orderDate : new Date()
     })
* */