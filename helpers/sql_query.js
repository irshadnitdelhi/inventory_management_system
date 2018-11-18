exports.insertCustomer = function(customer){

    let insertCustomer = `INSERT INTO customer VALUES(${customer[0]},'${customer[1]}',${customer[2]},'${customer[3]}');` 
    return insertCustomer ;
}
exports.insertSupplier = function(supplier){
    return `INSERT INTO supplier VALUES(${supplier.Sid},'${supplier.Sname}','${supplier.Type}',${supplier.ContactNo}) ;`
}
exports.sales_date_wise = function(date_range){
    return `SELECT SellDate , SUM(Amount) AS TotalSale
            FROM sellsto
            WHERE SellDate  BETWEEN '${date_range.date_range_min}' AND '${date_range.date_range_max}'
            GROUP BY SellDate
            ORDER BY SellDate ;` ;
}
exports.sales_product_wise = function(date_range){


    return `SELECT Pname, SUM(si.Price) as total_sale
            FROM sellsto AS s, salesinvoice AS si, products AS p
            WHERE s.SInvNo = si.SInvNo AND si.Pid = p.Pid AND
                   SellDate  BETWEEN '${date_range.date_range_min}' AND '${date_range.date_range_max}'
            GROUP BY Pname ;`;
}
exports.sales_week_wise = function(data){
    return `
    SELECT WEEK(SellDate) as week_wise,SUM(Amount) AS total_sales
    FROM sellsto 
    where YEAR(SellDate) = ${data.year}
    group by week_wise
    order by week_wise 
    `;
}
exports.sales_month_wise = function(date_range){

    return ` SELECT CONCAT(MONTHNAME(SellDate),'-',YEAR(SellDate)) AS sell_month , SUM(Amount) AS total_sales
    FROM sellsto WHERE MONTH(SellDate)  BETWEEN ${date_range.month_range_min} AND ${date_range.month_range_max}
    AND YEAR(SellDate) BETWEEN ${date_range.year_range_min} AND ${date_range.year_range_max} 
    GROUP BY sell_month
    ORDER BY YEAR(SellDate),MONTH(SellDate)`;
}
//Variance Reports
exports.variance_date_wise = function(data){
    return `select variance(TotalSale) AS var from
        (SELECT SellDate , SUM(Amount) AS TotalSale
         FROM sellsto
         WHERE SellDate BETWEEN '${data.date_range_min}' AND '${data.date_range_max}'
         GROUP BY SellDate
        ) AS saleTable;
                
                ` ;
}
exports.variance_product_wise = function(data){


    return `select variance(total_sale) as var 
            FROM (
                SELECT Pname, SUM(si.Price) as total_sale
                FROM sellsto AS s, salesinvoice AS si, products AS p
                WHERE s.SInvNo = si.SInvNo AND si.Pid = p.Pid AND
                SellDate  BETWEEN '${data.date_range_min}' AND '${data.date_range_max}'
                GROUP BY Pname ) as saleTable;`;
}
exports.variance_week_wise = function(data){
    return `SELECT variance(total_sales) AS var 
    FROM (SELECT WEEK(SellDate) as week_wise,SUM(Amount) AS total_sales
          FROM sellsto 
          where YEAR(SellDate) = ${data.year}
          group by week_wise
          order by week_wise
    ) AS saleTable
    `;
}
exports.variance_month_wise = function(data){
    return ` SELECT variance(total_sales) as var
    FROM (
        SELECT CONCAT(MONTHNAME(SellDate),'-',YEAR(SellDate)) AS sell_month , SUM(Amount) AS total_sales
        FROM sellsto WHERE MONTH(SellDate)  BETWEEN ${data.month_range_min} AND ${data.month_range_max}
        AND YEAR(SellDate) BETWEEN ${data.year_range_min} AND ${data.year_range_max} 
        GROUP BY sell_month
        ORDER BY YEAR(SellDate),MONTH(SellDate)
    ) AS saleTable
    `;
}
//Customer Trends for Products
exports.customer_product_trends = function(data) {

    return `          
    SELECT MONTH(SellDate) as month , SUM(Price) as total_sale
    FROM sellsto AS s , SALESINVOICE as si
    WHERE s.SInvNo = si.SInvNo AND 
          YEAR(s.SellDate) BETWEEN ${data.year_range_min} AND ${data.year_range_max} AND si.Pid = ${data.pid}
    GROUP BY month
    order by month` ;

}
// Capital Item Tracing

exports.capital_item_tracing = function(data) {


    return `SELECT c.CPid,c.CPname,ci.Price,c.Quantity,c.RateDep,pb.PurDate , YEAR(pb.PurDate) AS year 
    FROM capitalinvoice as ci, purchasedby as pb , capitalitems as c
    WHERE ci.CPInvNo = pb.PInvNo  AND c.CPid = ci.CPid
     ;`

}

//Monthly Sales Target
exports.monthly_sales_target = function(data) {

    return `
    select monthname(concat('2018-',Mnth,'-11')) AS target_month,target
    from salestarget
    where Yr = ${data.year} 
    order by target_month; 
    
    `; 


}
exports.monthly_sales = function(data) {

    return `
    SELECT monthname(SellDate) AS sales_month , SUM(Amount) AS total_sales
    FROM sellsto
    WHERE YEAR(SellDate) = ${data.year}
    GROUP BY sales_month
    ORDER BY sales_month ;
    ` ;


}
// Update stock Daily
exports.updateStock = function(data){

    return ` UPDATE products
             SET CurrentStock =  CurrentStock + ${data.newStock}
             WHERE Pid = ${data.pid} ;
    `;
}

// Cost Entry 
exports.costEntry = function(data){

    return ` INSERT INTO produces 
        VALUES( ${data.month}, ${data.year}, ${data.cost});`

}
exports.targetSaleEntry = function(data){

    return ` INSERT INTO salestarget
             VALUES(${data.month},${data.year},${data.targetsale},'user1')` ;

}

// Profit vs Loss
exports.cost_price = function(data){
    return `    SELECT month,year,SUM(cost_price) as cost_price
                FROM (
                    SELECT MONTH(pb.PurDate) as month,YEAR(pb.PurDate) as year,SUM(pi.Price) as cost_price
                    FROM productinvoice as pi , purchasedby as pb
                    WHERE pi.PInvNo = pb.PInvNo 
                    GROUP BY month,year 
                    UNION
                    select Mnth as month,Yr as year,Production_cost as cost_price
                    from produces
                ) AS costTable
                WHERE year = ${data.year}
                GROUP BY month,year
                ORDER BY month,year
    ` ;
}
exports.sale_month_profit = function(data){

    return `SELECT MONTH(SellDate) as month ,YEAR(SellDate) as year , SUM(Amount) AS total_sales
            FROM sellsto 
            WHERE YEAR(SellDate) = ${data.year} 
            GROUP BY month,year
            ORDER BY month,year
    ` ;
}
exports.products = function(){
    return 'SELECT * FROM products'
}
exports.customers = function(){
    return 'SELECT * FROM customer'
}
exports.addSellsto = function(data){

    return ` INSERT INTO sellsto VALUES(${data[2]},${data[1]},${data.date},${data['totalAmount']},${data.feedback})` ;


}
exports.addInvoiceProducts = function(products,invno){

    let queryString = "INSERT INTO salesinvoice VALUES " ;

    for(i=0 ; i < products.length ; i++){
        if( i == (products.length - 1)){
            queryString += `(${products[i]['ProductID']},${invno},${products[i]['Quantity']},${products[i]['Price']});`
        
        }
        else{
            queryString += `(${products[i]['ProductID']},${invno},${products[i]['Quantity']},${products[i]['Price']}),`
        }
    }
}