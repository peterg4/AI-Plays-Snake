var dps = [{x: 0, y:-1000}]; // dataPoints
var chart = new CanvasJS.Chart("chart-container", {
  animationEnabled: true,
  zoomEnabled:true,
  backgroundColor: "#101111",
  theme: "light2",
  title :{
    text: " ",
    fontSize: 18,
    margin: 25,
    padding: 4,
  },
  axisX: {
    tickColor: '#101010',
    gridColor: '#101010',
    lineColor: '#101010'
  },
  axisY: {
    tickColor: '#101010',
    gridColor: '#101010',
    includeZero: false
  },      
  data: [{
    markerType: "none",
    lineThickness: 3,
    color: "#61DBFB",
    type: "spline",
    dataPoints: dps
  }]
});

var xVal = 0;
var yVal = 100; 
var dataLength = 500; // number of dataPoints visible at any point

var updateChart = function (count) {

  count = count || 1;

  if (dps.length > dataLength) {
    dps.shift();
  }

  chart.render();
};