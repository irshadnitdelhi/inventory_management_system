
$('.submit-btn').on('click',function(){
  
  
  let thead = $('#thead')
  thead.empty()
  thead.append('<th>Month</th>')
  thead.append('<th>Sales Target</th>')  
  
  thead.append('<th>Actual Sales</th>')
  let tbody = $('#tbody')
  tbody.empty()
  
  let data = {} ;
  data.year = $('#year').val();
  
  
  let url = new URL('examples/sales/targetActual',"http://localhost:3000")
  url.search = new URLSearchParams(data)
  
  fetch(url).then(response => response.json())
  .then(function(res){
    
    
    
    let response_label = []
    let data_target = []
    let data_actuals = []
    let profitBorder = []
    
    res.forEach(month_sale => {
      response_label.push(month_sale.month)
      data_target.push(month_sale.targetSale)
      data_actuals.push(month_sale.totalSale)
      if(month_sale.targetSale <= month_sale.totalSale)
      profitBorder.push("#0eff00")
      else
      profitBorder.push("#ff0000")
      
    });
     
    for(i=0 ; i < response_label.length ; i++){
      tbody.append(`<tr> <td>${response_label[i]}</td><td>${data_target[i]} </td><td>${data_actuals[i]}</td></tr>`)
     }
    
    
    let ctx = document.getElementById('bigDashboardChart').getContext("2d");
    
    let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, '#FFFFFF');
    
    let gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
    
    
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: response_label,
        datasets: [{
          label: "Sales Target",
          borderColor: '#FFFFFF',
          pointBorderColor: '#FFFFFF',
          pointBackgroundColor: "#1e3d60",
          pointHoverBackgroundColor: "#1e3d60",
          pointHoverBorderColor: '#FFFFFF',
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: data_target
        },{
          label: "Actual Sales",
          borderColor: profitBorder,
          pointBorderColor: '#FFFFFF',
          pointBackgroundColor: "#1e3d60",
          pointHoverBackgroundColor: "#1e3d60",
          pointHoverBorderColor: '#FFFFFF',
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: data_actuals
        }]
      },
      options: {
        layout: { 
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0
          }
        },
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        legend: {
          position: "bottom",
          fillStyle: "#FFF",
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 10
            },
            gridLines: {
              drawTicks: true,
              drawBorder: false,
              display: true,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent"
            }
            
          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              display: false,
              
            },
            ticks: {
              padding: 10,
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold"
            }
          }]
        }
      }
    });
  })
  
})

$('#profit-btn').on('click',function(){

  
  let thead = $('#thead')
  thead.empty()
  thead.append('<th>Month</th>')
  thead.append('<th>Profit || Loss</th>')  
  let tbody = $('#tbody')
  tbody.empty()

  let data = {} ;
  data.year = $('#year-profit').val();
  
  
  let url = new URL('examples/profit_vs_loss',"http://localhost:3000")
  url.search = new URLSearchParams(data)
  
  fetch(url).then(response => response.json())
  .then(function(res){
    
    
    
    let response_label = ['January','February','March','April','May','June','July','August','September','October','November','December']
    
    
    
    
    let ctx = document.getElementById('bigDashboardChart').getContext("2d");
    
    let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, '#FFFFFF');
    
    let gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
    
    let profitBorder = []
    
    res[0].forEach( profitLossCustom => {
      
      if(profitLossCustom  > 0){
        profitBorder.push("#fff")
        
      }
      else{
        profitBorder.push("#ff0000")
        
      }
      
    });
    if(res[1] <= -5){
      // Get the snackbar DIV
      let x = document.getElementById("snackbar");
      x.textContent = "Overall Loss is greater than 5%"
      // Add the "show" class to DIV
      x.className = "show";
      
      // After 3 seconds, remove the show class from DIV
      setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
    }
    $('#profit').text(res[1] > 0 ? 'Profit : ' : 'Loss :' + res[1] +' %')
    for(i=0 ; i < response_label.length ; i++){
      tbody.append(`<tr> <td>${response_label[i]}</td><td>${res[0][i]} </td></tr>`)
    }
    
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: response_label,
        datasets: [{
          label: "Profit Loss",
          borderColor: profitBorder,
          pointBorderColor: '#FFFFFF',
          pointBackgroundColor: "#1e3d60",
          pointHoverBackgroundColor: "#1e3d60",
          pointHoverBorderColor: '#FFFFFF',
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: res[0]
        }]
      },
      options: {
        layout: { 
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0
          }
        },
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest"
        },
        legend: {
          position: "bottom",
          fillStyle: "#FFF",
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 5,
              padding: 10
            },
            gridLines: {
              drawTicks: true,
              drawBorder: false,
              display: true,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent"
            }
            
          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              display: false,
              
            },
            ticks: {
              padding: 10,
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold"
            }
          }]
        }
      }
    });
  })
  
})

