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
// Invoice Insertion 

// Input data header  table sells to
// 1. Cid 2. Invoice No 3.Sell Date 4. Amount 5. Feedback 