//Display Products
let url = new URL('examples/products',"http://localhost:3000") 
   
fetch(url).then(res => res.json())
.then(function(res){

    let tbody = $('#tbody')
    // calculate current value 
    res.forEach(function(product){
        

        let tableData = `<tr >
        <td>${product.Pid}</td>
        <td>${product.Pname}</td>
        <td>${product.Price}</td>
        <td>${product.CurrentStock}</td>
        </tr>`;
        tbody.append(tableData)
    })

})





$('#stock-btn').on('click',function(){
                    
    let data = {} 
    data.pid = $('#product').val()
    data.newStock = $('#newStock').val()
    
    fetch('add/updateStock',{
        method : "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body : JSON.stringify(data)
    }).then( (res) => res.text())
    
})
$('#cost-btn').on('click',function(){
    
    let data = {} 
    data.month = $('#month').val().split('-')[1]
    data.year = $('#month').val().split('-')[0]
    data.cost = $('#cost').val()
    
    fetch('add/costEntry',{
        method : "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body : JSON.stringify(data)
    }).then( (res) => res.text())
 
$('#targetsale-btn').on('click',function(){
    
    let data = {} 
    data.month = $('#targetmonth').val().split('-')[1]
    data.year = $('#targetmonth').val().split('-')[0]
    data.targetsale = $('#targetsale').val()
    console.log(data)
    
    fetch('add/targetSaleEntry',{
        method : "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body : JSON.stringify(data)
    }).then( (res) => res.text())
    .then( function(res){
        
        if(res == "Successfull"){
            console.log('Success')
        }
        else{
            console.log('Fail')
        }
        
        
    })
})
})
