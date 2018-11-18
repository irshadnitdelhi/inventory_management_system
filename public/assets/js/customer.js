
function tableJSON(){
    let headers = [] ;
    $('thead td').each(function(){
        headers.push(this.getAttribute('value')) ;

    })
    console.log(headers) ;
    let rowData = [] ;

    $('tbody').each(function(rowIndex){
        $cellsInput = $(this).find('td input') ;
        rowData[rowIndex] = {} ;
        $cellsInput.each(function(columnIndex){
            rowData[rowIndex][headers[columnIndex]] = $(this)[0].value ;
        })
    });

    return JSON.stringify(rowData) ;
}
var data
$('button').on('click',function(){

    data = tableJSON() ;
   
    fetch('add/customers',{
        method : "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body : data
    })
    
})