// Add chart.destory() option to destory the chart 





//Date Wise
function display_date_wise() {

        
    let thead = $('#thead')
    thead.empty()
    thead.append('<th>Date </th>')
    thead.append('<th>Sale</th>')  
    let tbody = $('#tbody')
    tbody.empty()
    let data = {} ;
    data.date_range_min = $('#date-datewise-min').val();
    data.date_range_max = $('#date-datewise-max').val();
    console.log(data.date_range_min,'-',data.date_range_max) 

    
    let url = new URL('examples/reports/variance/datewise',"http://localhost:3000")
    url.search = new URLSearchParams(data)

    fetch(url).then(response => response.json())
     .then(function(res){
        $('#variance').text('Variance :' + res[0].var)

     })
    url = new URL('examples/reports/datewise',"http://localhost:3000")
    url.search = new URLSearchParams(data)
    
    fetch(url).then(response => response.json())
    .then(function(res){

        let response_label = []
        let response_data = []
        res.forEach(day_sale => {
            response_label.push(day_sale.SellDate)
            response_data.push(day_sale.TotalSale)
          
        });
         
       for(i=0 ; i < response_label.length ; i++){

        tbody.append(`<tr> <td>${response_label[i]}</td><td>${response_data[i]} </td></tr>`)
       }

        let ctx = document.getElementById('bigDashboardChart').getContext("2d");

        let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
        gradientStroke.addColorStop(0, '#80b6f4');
        gradientStroke.addColorStop(1, '#FFFFFF');
        
        let gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
        gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
        gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
    
    
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: response_label,
                datasets: [{
                  label: "Sales ",
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
                  data: response_data
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
                    display : false
                  }]
                }
            }
        });
      
    })


  
   
}
$('#datewise-submit').on('click',display_date_wise)
// Display Product Wise
function display_product_wise() {

  
        
  let thead = $('#thead')
  thead.empty()
  thead.append('<th>Product </th>')
  thead.append('<th>Sale</th>')  
  let tbody = $('#tbody')
  tbody.empty()

  let data = {} ;
  data.date_range_min = $('#pro_date-range-min').val();
  data.date_range_max = $('#pro_date-range-max').val();
  
  
  let url = new URL('examples/reports/variance/productwise',"http://localhost:3000")
  url.search = new URLSearchParams(data)

  fetch(url).then(response => response.json())
   .then(function(res){
      $('#variance').text('Variance :' + res[0].var)

   })

  url = new URL('examples/reports/productwise',"http://localhost:3000")
  url.search = new URLSearchParams(data)

  fetch(url).then(response => response.json())
  .then(function(res){

      let response_label = []
      let response_data = []
      res.forEach(day_sale => {
          response_label.push(day_sale.Pname)
          response_data.push(day_sale.total_sale)
        
      });

       
       for(i=0 ; i < response_label.length ; i++){

        tbody.append(`<tr> <td>${response_label[i]}</td><td>${response_data[i]} </td></tr>`)
       }

      let ctx = document.getElementById('bigDashboardChart').getContext("2d");

      let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, '#80b6f4');
      gradientStroke.addColorStop(1, '#FFFFFF');
      
      let gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
  

      let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: response_label,
              datasets: [{
                label: "Data",
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
                data: response_data
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
 
}
$('#product-wise-btn').on('click',display_product_wise)
// Display Week Wise
function display_week_wise() {

   
  let thead = $('#thead')
  thead.empty()
  thead.append('<th>Week </th>')
  thead.append('<th>Sale</th>')  
  let tbody = $('#tbody')
  tbody.empty()
  let data = {} ;
  data.year = $('#yearVal').val();

  
  let url = new URL('examples/reports/variance/weekwise',"http://localhost:3000")
  url.search = new URLSearchParams(data)

  fetch(url).then(response => response.json())
   .then(function(res){
      $('#variance').text('Variance :' + res[0].var)

   })
  
  url = new URL('examples/reports/weekwise',"http://localhost:3000")
  url.search = new URLSearchParams(data)

  fetch(url).then(response => response.json())
  .then(function(res){

      let response_label = []
      let response_data = []
      res.forEach(day_sale => {
          response_label.push(day_sale.week_wise)
          response_data.push(day_sale.total_sales)
        
      });
    
       for(i=0 ; i < response_label.length ; i++){

        tbody.append(`<tr> <td>${response_label[i]}</td><td>${response_data[i]} </td></tr>`)
       }
      let ctx = document.getElementById('bigDashboardChart').getContext("2d");

      let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, '#80b6f4');
      gradientStroke.addColorStop(1, '#FFFFFF');
      
      let gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
  

      let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: response_label,
              datasets: [{
                label: "Data",
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
                data: response_data
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
}
$('#weekwise-btn').on('click',display_week_wise)
//Display Month Wise
function display_month_wise() {

  
  let thead = $('#thead')
  thead.empty()
  thead.append('<th>Month </th>')
  thead.append('<th>Sale</th>')  
  let tbody = $('#tbody')
  tbody.empty()

  let data = {} ;
  data.month_range_min = $('#month-range-min').val();
  data.month_range_max = $('#month-range-max').val();
  data.year_range_min = $('#year-range-min').val() ;
  data.year_range_max = $('#year-range-max').val();

  
  let url = new URL('examples/reports/variance/monthwise',"http://localhost:3000")
  url.search = new URLSearchParams(data)

  fetch(url).then(response => response.json())
   .then(function(res){
      $('#variance').text('Variance :' + res[0].var)

   })

  url = new URL('examples/reports/monthwise',"http://localhost:3000")
  url.search = new URLSearchParams(data)

  fetch(url).then(response => response.json())
  .then(function(res){

      let response_label = []
      let response_data = []
      res.forEach(day_sale => {
          response_label.push(day_sale.sell_month)
          response_data.push(day_sale.total_sales)
        
      });
     
       
       for(i=0 ; i < response_label.length ; i++){

        tbody.append(`<tr> <td>${response_label[i]}</td><td>${response_data[i]} </td></tr>`)
       }
      let ctx = document.getElementById('bigDashboardChart').getContext("2d");

      let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, '#80b6f4');
      gradientStroke.addColorStop(1, '#FFFFFF');
      
      let gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
  

      let myChart = new Chart(ctx, {
          type: 'bar',
          data: {
              labels: response_label,
              datasets: [{
                label: "Data",
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
                data: response_data
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
}
$('#month-wise-btn').on('click',display_month_wise)

// Product Trend

$('#product-trend-btn').on('click',function(){

   
  let thead = $('#thead')
  thead.empty()
  thead.append('<th>Season</th>')
  thead.append('<th>Sale</th>')  
  let tbody = $('#tbody')
  tbody.empty()
  let data = {} ;
  data.year_range_min = $('#year-trend-min').val();
  data.year_range_max = $('#year-trend-max').val();
  data.pid = $("#pid").val()

  
  let url = new URL('examples/customer_product_trend',"http://localhost:3000")
  url.search = new URLSearchParams(data)

  fetch(url).then(response => response.json())
  .then(function(res){

     let response_label = ["Winter","Spring","Summer","Autumn"]
     let response_data = [0,0,0,0]
     res.forEach((monthSale) => {
      
      if(monthSale.month in [12,1,2]){
        // Winter
        response_data[0] += monthSale.total_sale


      }
      else if(monthSale.month in [3,4,5]){
        // Spring
        response_data[1] += monthSale.total_sale
        

      }
      else if(monthSale.month in [6,7,8]){
        // Summer
        response_data[2] += monthSale.total_sale
        

      }
      else{
        // Autumn
        response_data[3] += monthSale.total_sale
        

      }
     })
     
     for(i=0 ; i < response_label.length ; i++){

      tbody.append(`<tr> <td>${response_label[i]}</td><td>${response_data[i]} </td></tr>`)
     }

     

      let ctx = document.getElementById('bigDashboardChart').getContext("2d");

      let gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, '#80b6f4');
      gradientStroke.addColorStop(1, '#FFFFFF');
      
      let gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");
  
  
      var myChart = new Chart(ctx, {
          type: 'line',
          data: {
              labels: response_label,
              datasets: [{
                label: "Data",
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
                data: response_data
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
 
  

});