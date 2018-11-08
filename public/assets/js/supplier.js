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
    
    console.log(rowData);
    return rowData ;
}
var data
$('button').on('click',function(){

    data = tableJSON() ;
   
    fetch('add/supplier',{
        method : "POST",
        headers: {
            "Content-Type": "application/json; charset=utf-8"
        },
        body : JSON.stringify(data)
    })
    
})