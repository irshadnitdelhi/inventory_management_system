let url = new URL('examples/capital_item_tracing',"http://localhost:3000") 
   
fetch(url).then(res => res.json())
.then(function(res){

    let tbody = $('#tbody')
    // calculate current value 
    res.forEach(function(capital_item){
        

        let currentValue = capital_item.Price - (capital_item.Price*capital_item.RateDep*( (new Date()).getFullYear() - capital_item.year ) / 100)

        

        let tableData = `<tr >
        <td>${capital_item.CPid}</td>
        <td>${capital_item.CPname}</td>
        <td>${capital_item.Price}</td>
        <td>${capital_item.Quantity}</td>
        <td>${capital_item.RateDep}</td>
        <td>${capital_item.year}</td>
        <td>${currentValue}</td>
    </tr>`;
        tbody.append(tableData)
    })

})


