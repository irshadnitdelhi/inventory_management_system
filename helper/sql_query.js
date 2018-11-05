exports.insertCustomer = function(customer){

    let insertCustomer = `INSERT INTO customer VALUES(${customer.Cid},'${customer.Cname}',${customer.ContactNo},'${customer.EmailId}');` 
    return insertCustomer ;
}
