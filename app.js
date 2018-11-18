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
    host     : 'ec2-79-125-124-30.eu-west-1.compute.amazonaws.com',
    database : 'd6q6rsdjrp84mm',
    user     : 'lsklugiisgynsz',
    password : '4650053ea85ce88d0a259f0343023eb246b3c77bed8aeedb59266061ef9e15da
',
    port : '5432'
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
    console.log(customersData)
    let queryString = sqlquery.insertCustomer(customersData)
    console.log(queryString)
    connection.query(queryString,function(error){
        if(error){
            responseString = `Error Message : ${error.sqlMessage}`
            res.status(400)
        }
        
    })
    
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
            console.log(result)
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
    
    
    
    connection.query(queryString,function(error,result){
        if(error){
            responseString = `Error Message : ${error.sqlMessage}`
            res.status(400)
            throw error
        }
        res.status(200)
        res.json(result)
    })
    
})
// Sales Target vs Profit_loss
//Customer Product Trends
app.get('/examples/sales/targetActual',function(req,res) {
    
    
    let data = req.query 
    
    
    let monthly_sales_query = sqlquery.monthly_sales(data)
    let target_sales_query = sqlquery.monthly_sales_target(data)
    
    
    
    
    connection.query(target_sales_query,function(error,target_sales){
        if(error){
            responseString = `Error Message : ${error.sqlMessage}`
            res.status(400)
            throw error
        }
        connection.query(monthly_sales_query,function(error,monthly_sales) {
            if(error) {
                responseString = ` Error Message :${error.sqlMessage} `
                res.status(400)
                throw error
            }
            let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
            let response = []
            months.forEach( function(currentMonth){
                let targetData = target_sales.find(x => x.target_month == currentMonth)
                let actualSale = monthly_sales.find(x => x.sales_month == currentMonth)
                if(targetData != undefined){
                    target = targetData.target 
                }
                else{
                    target = 0 
                }
                if(actualSale != undefined){
                    actualSale = actualSale.total_sales
                }
                else{
                    actualSale = 0 ;
                }
                response.push({
                    month : currentMonth,
                    targetSale : target,
                    totalSale : actualSale
                })
                
            })
            res.status(200)
            res.json(response)
        })
        
    })
    
    
})

// Capital Item Tracing
app.get('/examples/capital_item_tracing',function(req,res) {
    
    
    
    
    
    let queryString = sqlquery.capital_item_tracing() ;
    
    
    
    connection.query(queryString,function(error,result){
        if(error){
            responseString = `Error Message : ${error.sqlMessage}`
            res.status(400)
            throw error
        }
        
        res.status(200)
        res.json(result)
    })
    
    
    
})
// To complete
// update stock
app.post('/examples/add/updateStock',function(req,res){
    
    
    let data = req.body // Parse Object as Array Object
    
    let responseString = "Successfull"
    let queryString = sqlquery.updateStock(data)
    console.log(queryString)
    res.status(200)
    connection.query(queryString,function(error){
        if(error){
            responseString = `Error Message : ${error.sqlMessage}`
            res.status(400)
            throw error
        }
        
    })
    res.send(responseString)
    
    
    
})
app.post('/examples/add/costEntry',function(req,res){
    
    
    let data = req.body // Parse Object as Array Object
    
    let responseString = "Successfull"
    let queryString = sqlquery.costEntry(data)
    console.log(queryString)
    res.status(200)
    connection.query(queryString,function(error){
        if(error){
            responseString = `Error Message : ${error.sqlMessage}`
            res.status(400)
            throw error
        }
        
    })
    res.send(responseString)
    
    
    
})











app.listen(port,'0.0.0.0', () => console.log(`Example app listening on port ${port}!`))
