// this should be run within pizzastore db
db.createUser( { user : "pizzaUserAdmin",
                 pwd: "cheesystuffedcrust",
                 roles : [ { role: "userAdmin", db : "pizzastore" }]  
});