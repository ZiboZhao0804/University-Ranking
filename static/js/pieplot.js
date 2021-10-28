// //option1: pie plot
// d3.json("/state").then(function(data){
//     var number = Object.values(data["Total Count"]).slice(0,15);
//     var name = Object.values(data["state_full"]).slice(0,15);
//     var trace1 = {
//         labels: name,
//         values: number,
//         hoverinfo: 'label+percent',
//         textinfo: 'none',
//         hole: .4,
//         type: 'pie'
//     };
    
//     var data = [trace1];
    
//     var layout = {
//         title: 'Top 15 states with the most number of top 800 colleges',
//         height: 300,
//         width: 500
//     };
    
//     Plotly.newPlot("pieplot", data, layout);
// });

// option2: bar plots
d3.json("/state").then(function(data){
    var number = Object.values(data["Total Count"]).slice(0,15);
    var name = Object.values(data["state_full"]).slice(0,15);
    var trace1 = {
    x: name,
    y: number,
    marker: {
        color: ["6F7BF7","7284F7","758DF7","7896F6","7C9FF6","7FA8F6","82B1F6","85BAF6","88C2F5","8BCBF5","8ED4F5","92DDF5","95E6F4","98EFF4","9BF8F4"]
      },
    type: 'bar'
  };
  
  var data = [trace1];
  
  var layout = {
    title: 'Top 15 states with the most number of top 800 colleges',
    xaxis: {
        tickangle: -45
    },
    yaxis: {
        title: 'Number of colleges'
      },
    height: 300,
    width: 550
  };
  
  Plotly.newPlot("pieplot", data, layout);
});

