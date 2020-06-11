var dps = [{x: 0, y:0}]; // dataPoints
var interval = 1;
var chart = new CanvasJS.Chart("chart-container", {
  animationEnabled: true,
  zoomEnabled:true,
  backgroundColor: "#101111",
  theme: "light2",
  title :{
    fontFamily: "'Open Sans', sans-serif",
    text: "Average Fitness by Generation",
    fontSize: 18,
    margin: 25,
    padding: 4,
    fontColor: "white",
    fontWeight: "lighter"
  },
  axisX: {
    interval: interval,
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
    lineThickness: 4,
    color: "#af2f81",
    type: "spline",
    dataPoints: dps
  }]
});

var xVal = 0;
var yVal = 100; 
var dataLength = 500; // number of dataPoints visible at any point

var updateChart = function (count) {

  count = count || 1;
  if(count > 11) {
    interval = null;
  }

  if (dps.length > dataLength) {
    dps.shift();
  }

  chart.render();
};