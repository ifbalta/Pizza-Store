:: ensures pizza store test data is consistent across Quentin and Cutten Street databases
@echo off
mongoimport -d pizzastore -c orders --file orddata.json --drop
mongoimport -d pizzastore -c employee --file empdata.json --drop