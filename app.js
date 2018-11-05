// app.js

// Required Modules
const express = require('express')
const sqlquery = require('./helpers/sqlquery.js')
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






app.listen(port,'0.0.0.0', () => console.log(`Example app listening on port ${port}!`))
