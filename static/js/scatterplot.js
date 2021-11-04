d3.json("/data").then((data) => {

  var uniname = data.map(d => d["name"]);
  //3.1 Use the map method with the arrow function to return all the filtered school Ranking 
  var ranking = data.map(d => d["rating"]);
  // 3.2 Use the map method with the arrow function to return all the filtered school acceptance rate .
  var acceptance = data.map(d => d["acceptance_rate (%)"]);
  // 3.3 Use the map method with the arrow function to return all the filtered school tuition.
  var tuition= data.map(d => d["net_price ($)"]);
  // 3.4 Use the map method with the arrow function to return all the filtered school avg SAT score 
  var AvgSAT= data.map(d => d["SAT_average"]);

  // Initializes the page with a default plot
  function init() {
    var trace2 = {
      x: ranking,
      y: acceptance,
      text: uniname,
      mode: 'markers',
      marker: {
        color:Array(800).fill("47CACC")
      },
      type: "scatter"
    };

    var data = [trace2];
    
    var layout = {
      title: "The acceptance rate and ranking for top 800 universities in US",
      xaxis: { title: "Ranking " },
      yaxis: { title: "Acceptance Rate (%)"}
    };
    var config = {responsive: true};
    // 8. Plot the chart to a div tag with id "scatter plot "
    Plotly.newPlot("scatterplot", data,layout,config);
  }

  // Call updatePlotly() when a change takes place to the DOM
  d3.selectAll("#selScatterDataset").on("change", updatePlotly);

  // This function is called when a dropdown menu item is selected
  function updatePlotly() {
    // Use D3 to select the dropdown menu
    var dropdownMenu = d3.select("#selScatterDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    console.log(dataset);

    var data;
    var layout;
    var config = {responsive: true};
    if (dataset === 'dataset1') {
      var trace2 = {
        x: ranking,
        y: acceptance,
        text: uniname,
        mode: 'markers',
        marker: {
          color:Array(800).fill("47CACC")
        },
        type: "scatter"
      };
      data = [trace2];
      layout = {
        title: "The acceptance rate and ranking for top 800 universities in US",
        xaxis: { title: "Ranking " },
        yaxis: { title: "Acceptance Rate (%)"}
      };
    }

    else if (dataset === 'dataset2') {
      var trace3 = {
        x: ranking,
        y: tuition,
        text: uniname,
        mode: 'markers',
        marker: {
          color:Array(800).fill("FFBE88")
        },
        type: "scatter"
      };
      data = [trace3];

      layout = {
          title: "The Average net cost($) and ranking for top 800 universities in US",
          xaxis: { title: "Ranking " },
          yaxis: { title: "Net cost ($)"}
      };

    }

    else if (dataset === 'dataset3') {
      var trace1 = {
        x: ranking,
        y: AvgSAT,
        text: uniname,
        mode: 'markers',
        marker: {
          color:Array(800).fill("CDB3D4")
        },
        type: "scatter"
      };
      data = [trace1];

      layout = {
        title: "The Average SAT Score and ranking for top 800 universities in US",
        xaxis: { title: "Ranking " },
        yaxis: { title: "Avg SAT Score"}
      };


    }
    // 8. Plot the chart to a div tag with id "scatter plot "
    Plotly.newPlot("scatterplot", data,layout,config);
  };

  init();
  
});