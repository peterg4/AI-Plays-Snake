var dps = [{x: 0, y:0}]; // dataPoints
var chart = new CanvasJS.Chart("chart-container", {
  animationEnabled: true,
  zoomEnabled:true,
  theme: "light2",
  title :{
    fontFamily: "'Open Sans', sans-serif",
    text: "Average Fitness by Generation"
  },
  axisY: {
    includeZero: false
  },      
  data: [{
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