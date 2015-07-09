var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongo = require('mongodb');
var path = require("path");
var MongoClient = mongo.MongoClient,
    format = require('util').format;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/'));


// POST method
app.post('/submitpizza', function(req, res){
    //retrieve toppings
    var selectedToppings =
        $('input[type=checkbox]:checked').map(function(_, el) {
        return $(el).val();
    }).get();
    var pizzaType = req.body.pizzatype;
    var customerAddress = req.body.customeraddress;

    var order = {
        pizzaType : req.body.pizzatype,
        toppings : selectedToppings,
        customerName : req.body.customername,
        customerAddress : req.body.customeraddress,
        customerPhone : req.body.customerphone,
        orderDate : new Date()
    };

    insertOrder(order);

    if(pizzaType == "cheesesupreme")pizzaType = "cheese supreme";
    if(pizzaType == "meatlovers") pizzaType = "meat lover's"

    var html = "Your " + pizzaType + " pizza will be arriving at " +
    customerAddress + " soon."
    res.send("/submitpizzatest");
    console.log(req.body.pizzatype);
    console.log(req.body.customername);
});

/**
 * Inserting the record
 * */
function insertOrder(order){
    MongoClient.connect('127.0.0.0.1:27017/pizzastore', function (err, db){
        if (err) throw err;
        console.log("Connected to pizzastore");
        db.collection('ordercollection').insertOne(order, function(err, records){
           if (err) throw err;
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