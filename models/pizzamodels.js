var mongoose = require("mongoose");
var Schema = mongoose.Schema;


// Order Schema
var orderSchema = new mongoose.Schema({
    pizzaType : String,
    pizzaSize : String,
    toppings : [String],
    customerName : String,
    customerAddress : String,
    customerPhone : String,
    totalPrice : Number,
    orderDate : Date,
    completed : Boolean
});

// Employee Schema
var employeeSchema = new mongoose.Schema ({
    name : String,
    position : String,
    password : String
}, {collection : 'employee'});

mongoose.connect('mongodb://pizzaUserAdmin:cheesystuffedcrust@localhost:27017/pizzastore?auto_reconnect');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log("succesful db connection...");
});

var Order = mongoose.model('orders', orderSchema, 'orders');
var Employee = mongoose.model('employee', employeeSchema, 'employee');

exports.Order = Order;
exports.Employee = Employee;

