exports.insertCustomer = function(customer){

    let insertCustomer = `INSERT INTO customer VALUES(${customer.Cid},'${customer.Cname}',${customer.ContactNo},'${customer.EmailId}');` 
    return insertCustomer ;
}
exports.insertSupplier = function(supplier){
    return `INSERT INTO supplier VALUES(${supplier.Sid},'${supplier.Sname}','${supplier.Type}',${supplier.ContactNo}) ;`
}
exports.sales_date_wise = function(date_range){
    return `SELECT DAY(SellDate) AS Day , SUM(Amount) AS Total_Sale
            FROM sellsto
            WHERE MONTH(SellDate)  BETWEEN ${date_range.month_range_min} AND ${date_range.month_range_max}
            AND YEAR(SellDate) BETWEEN ${date_range.year_range_min} AND ${date_range.year_range_max} 
            GROUP BY Day
            ORDER BY Day ;` ;
}
exports.sales_product_wise = function(date_range){


    return `SELECT Pname, SUM(si.Price) as total_sale
            FROM sellsto AS s, salesinvoice AS si, products AS p
            WHERE s.SInvNo = si.SInvNo AND si.Pid = p.Pid AND
                  MONTH(SellDate)  BETWEEN ${date_range.month_range_min} AND ${date_range.month_range_max}
                  AND YEAR(SellDate) BETWEEN ${date_range.year_range_min} AND ${date_range.year_range_max} 
            GROUP BY Pname ;`;
}
exports.sales_week_wise = function(date_range){
    return `
    SELECT WEEK(SellDate) as week_wise,SUM(Amount) AS total_sales
    FROM sellsto 
    WHERE 
        MONTH(SellDate)  BETWEEN ${date_range.month_range_min} AND ${date_range.month_range_max}
        AND YEAR(SellDate) BETWEEN ${date_range.year_range_min} AND ${date_range.year_range_max} 
	GROUP BY week_wise ;
    `;
}
exports.sales_month_wise = function(date_range){
    return `
    SELECT MONTH(SellDate) AS sell_month , SUM(Amount) AS total_sales
    FROM sellsto
    WHERE 
        MONTH(SellDate)  BETWEEN ${date_range.month_range_min} AND ${date_range.month_range_max}
        AND YEAR(SellDate) BETWEEN ${date_range.year_range_min} AND ${date_range.year_range_max} 
    GROUP BY sell_month
    ORDER BY sell_month

    `;
}
//Variance Reports
exports.variance_date_wise = function(date_range){
    return `SELECT DAY(SellDate) AS Day , variance(Amount) AS variance
            FROM sellsto
            WHERE MONTH(SellDate)  BETWEEN ${date_range.month_range_min} AND ${date_range.month_range_max}
            AND YEAR(SellDate) BETWEEN ${date_range.year_range_min} AND ${date_range.year_range_max} 
            GROUP BY Day
            ORDER BY Day ;` ;
}
exports.variance_product_wise = function(date_range){


    return `SELECT Pname, variance(si.Price) as variance
            FROM sellsto AS s, salesinvoice AS si, products AS p
            WHERE s.SInvNo = si.SInvNo AND si.Pid = p.Pid AND
                  MONTH(SellDate)  BETWEEN ${date_range.month_range_min} AND ${date_range.month_range_max}
                  AND YEAR(SellDate) BETWEEN ${date_range.year_range_min} AND ${date_range.year_range_max} 
            GROUP BY Pname ;`;
}
exports.variance_week_wise = function(date_range){
    return `
    SELECT WEEK(SellDate) as week_wise,variance(Amount) AS variance
    FROM sellsto 
    WHERE 
        MONTH(SellDate)  BETWEEN ${date_range.month_range_min} AND ${date_range.month_range_max}
        AND YEAR(SellDate) BETWEEN ${date_range.year_range_min} AND ${date_range.year_range_max} 
	GROUP BY week_wise ;
    `;
}
exports.variance_month_wise = function(date_range){
    return `
    SELECT MONTH(SellDate) AS sell_month , variance(Amount) AS variance
    FROM sellsto
    WHERE 
        MONTH(SellDate)  BETWEEN ${date_range.month_range_min} AND ${date_range.month_range_max}
        AND YEAR(SellDate) BETWEEN ${date_range.year_range_min} AND ${date_range.year_range_max} 
    GROUP BY sell_month
    ORDER BY sell_month

    `;
}
//Customer Trends for Products
exports.customer_product_trends = function(data) {

    return `SELECT MONTH(s.SellDate) AS monthwise,COUNT(*) AS countnum
            FROM sellsto AS s, salesinvoice AS si, products AS p
            WHERE s.SInvNo = si.SInvNo AND si.Pid = p.Pid AND
                  MONTH(SellDate)  BETWEEN ${data.month_range_min} AND ${data.month_range_max}
                  AND YEAR(SellDate) BETWEEN ${data.year_range_min} AND ${data.year_range_max}
                  AND si.Pid = ${data.pid} AND s.Cid = ${data.cid}
            GROUP BY monthwise;` ;

}
// Capital Item Tracing

exports.capital_item_tracing = function(data) {


    return `select c.CPname,ci.Price,c.RateDep,YEAR(pb.PurDate) AS year_purchase
    from capitalinvoice as ci, purchasedby as pb , capitalitems as c
    where ci.CPInvNo = pb.PInvNo  AND c.CPid = ci.CPid AND c.CPid = ${data.capital_item_id}
    ORDER BY pb.PurDate DESC ;`

}

//Monthly Sales Target
exports.monthly_sales_target = function(data) {

    return `
    select monthname(concat('2018-',Mnth,'-11')) AS target_month,target
    from salestarget
    where Mnth between ${data.month_range_min} AND ${data.month_range_max} and
    Yr between ${data.year_range_min} AND ${data.year_range_max} 
    order by target_month; 
    
    `; 


}
exports.monthly_sales = function(data) {

    return `
    SELECT monthname(SellDate) AS sales_month , SUM(Amount) AS total_sales
    FROM sellsto
    WHERE 
        MONTH(SellDate)  BETWEEN ${data.month_range_min} AND ${data.month_range_max}
        AND YEAR(SellDate) BETWEEN ${data.year_range_min} AND ${data.year_range_max}
    GROUP BY sales_month
    ORDER BY sales_month ;

    ` ;


}





// Invoice Insertion 

// Input data header  table sells to
// 1. Cid 2. Invoice No 3.Sell Date 4. Amount 5. Feedback 