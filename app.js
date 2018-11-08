// app.js

// Required Modules
const express = require('express')
const sqlquery = require('./helpers/sql_query.js')
const mysql = require('mysql')

//Express setup
const app = express()
const port = 3000

// MySQL Connection set up
let connection = mysql.createConnection({
    host     : 'localhost',
    database : 'inventory',
    user     : 'root',
    password : 'root',
    port : '3306'
})

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        throw err 
    }

    console.log('Connected as id ' + connection.threadId);
})





// Express Middlewares
app.use(express.json());
app.use(express.static('public'))


// Routes
// Add Customer
app.post('/examples/add/customers',function(req,res){

    
    let customersData = Object.values(req.body) // Parse Object as Array Object

    let responseString = "Successfull"
    res.status(200)
    customersData.forEach(customer => {
        
        let queryString = sqlquery.insertCustomer(customer)
        
        connection.query(queryString,function(error){
            if(error){
                responseString = `Error Message : ${error.sqlMessage}`
                res.status(400)
                throw error
            }
            
        })
        
    });
    res.send(responseString)
   

    
})
// Add Supplier
app.post('/examples/add/supplier',function(req,res){

    
    let suppliersData = Object.values(req.body) // Parse Object as Array Object

    let responseString = "Successfull"
    res.status(200)
    suppliersData.forEach(suppliers => {
        
        let queryString = sqlquery.insertSupplier(suppliers)
        
        connection.query(queryString,function(error){
            if(error){
                responseString = `Error Message : ${error.sqlMessage}`
                res.status(400)
                throw error
            }
            
        })
        
    });
    res.send(responseString)
   

    
})


app.get('/examples/reports/:option',function(req,res) {

    
    let date_range = req.query 
    console.log(date_range)
   
    let queryString = '' ;
    if (req.params.option == 'datewise'){
        queryString = sqlquery.sales_date_wise(date_range)
    }
    else if(req.params.option == 'productwise'){
        queryString = sqlquery.sales_product_wise(date_range)
    }
    else if(req.params.option == 'weekwise'){
        queryString = sqlquery.sales_week_wise(date_range)
    }
    else if(req.params.option == 'monthwise'){
        queryString = sqlquery.sales_month_wise(date_range)
    }
    else{
        queryString = '' 
    }

    if(queryString){
        let responseString = "Successfull"
        res.status(200)
            
        connection.query(queryString,function(error,result){
                if(error){
                    responseString = `Error Message : ${error.sqlMessage}`
                        res.status(400)
                        throw error
                }
                res.json(result)
        })
    }
    else{
        res.status(404).send("Not Found")
    }
        
})
 
   









app.listen(port,'0.0.0.0', () => console.log(`Example app listening on port ${port}!`))
