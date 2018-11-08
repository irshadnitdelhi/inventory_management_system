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
//Sales Reports
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

//Variance Reports 
app.get('/examples/reports/variance/:option',function(req,res) {
    
    
    let date_range = req.query 
    console.log(date_range)
    
    let queryString = '' ;
    if (req.params.option == 'datewise'){
        queryString = sqlquery.variance_date_wise(date_range)
    }
    else if(req.params.option == 'productwise'){
        queryString = sqlquery.variance_product_wise(date_range)
    }
    else if(req.params.option == 'weekwise'){
        queryString = sqlquery.variance_week_wise(date_range)
    }
    else if(req.params.option == 'monthwise'){
        queryString = sqlquery.variance_month_wise(date_range)
    }
    else{
        queryString = '' 
    }
    
    if(queryString){
        let responseString = "Successfull"
        
        connection.query(queryString,function(error,result){
            if(error){
                responseString = `Error Message : ${error.sqlMessage}`
                res.status(400)
                throw error
            }
            res.status(200)
            res.json(result)
        })
    }
    else{
        res.status(404).send("Not Found")
    }
    
})
//Customer Product Trends
app.get('/examples/customer_product_trend',function(req,res) {
    
    
    let data = req.query 
    
    
    let queryString = sqlquery.customer_product_trends(data) ;
    
    
    if(queryString){
        
        connection.query(queryString,function(error,result){
            if(error){
                responseString = `Error Message : ${error.sqlMessage}`
                res.status(400)
                throw error
            }
            res.status(200)
            res.json(result)
        })
    }
    else{
        res.status(404).send("Not Found")
    }
    
})

// Capital Item Tracing
app.get('/examples/capital_item_tracing',function(req,res) {
    
    
    let data = req.query 
    
    
    let queryString = sqlquery.capital_item_tracing(data) ;
    

    
    connection.query(queryString,function(error,result){
        if(error){
            responseString = `Error Message : ${error.sqlMessage}`
            res.status(400)
            throw error
        }

        let init_price = result[0].Price 
        let init_year = result[0].year_purchase
        let rateDep = result[0].RateDep
        let depr_data = []
        depr_data.push({year : init_year, price : init_price})

        for(i = init_year+1 ; i <= data.current_year ; i++ ){
            init_price = init_price * ((100-rateDep)/100)
            depr_data.push({year : i,price : init_price})
        }
        res.json(depr_data)
    })
    
    
    
})















app.listen(port,'0.0.0.0', () => console.log(`Example app listening on port ${port}!`))
