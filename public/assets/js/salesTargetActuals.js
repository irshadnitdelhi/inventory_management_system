
$('.submit-btn').on('click',function(){
  let data = {} ;
  data.month_range_min = $('#month-range-min').val();
  data.month_range_max = $('#month-range-max').val();
  data.year_range_min = $('#year-range-min').val() ;
  data.year_range_max = $('#year-range-max').val();
  
  let url = new URL('examples/sales/targetActual',"http://localhost:3000")
  url.search = new URLSearchParams(data)
  
  fetch(url).then(response => response.json())
  .then(function(res){
    
    let response_label = []
    let data_target = []
    let data_actuals = []
    
    res.forEach(month_sale => {
      response_label.push(month_sale.month)
      data_target.push(month_sale.targetSale)
      data_actuals.push(month_sale.totalSale)
      
    });
    
    
    
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
