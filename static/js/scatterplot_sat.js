// function to narrow down to top 50 schools.
function filterUniversity(school) {
    return school.rating < 51;}

 d3.json("/data").then((data) => {
 //  Use filter() to pass the function as its argument
  var filteredUniversity = data.filter(filterUniversity);
  
  //  Check to make sure your are filtering your movies.
  console.log(filteredUniversity);

  // Use the map method with the arrow function to return all the filtered school names
  var uniname = data.map(d => d["name"]);
  //  Check your filtered school namne
  console.log(uniname);

  //3.1 Use the map method with the arrow function to return all the filtered school Ranking 
  var ranking = data.map(d => d["rating"]);
  //  Check your filtered school ranking.
  console.log(ranking);
  
  // 3.2 Use the map method with the arrow function to return all the filtered school acceptance rate .
  var acceptance = data.map(d => d["acceptance_rate (%)"]);
    //  Check your filtered school acceptance
  console.log(acceptance);
  
  // 3.3 Use the map method with the arrow function to return all the filtered school tuition.
  var tuition= data.map(d => d["net_price ($)"]);
  //  Check your filtered school tuition.
  console.log(tuition);

// 3.4 Use the map method with the arrow function to return all the filtered school avg SAT score 
 var AvgSAT= data.map(d => d["SAT_average"]);
  //  Check your filtered school tuition.
console.log(AvgSAT);



 // 4.1 Create trace1 to hold the ranking vs SAT plot .
  var trace1 = {
    x: ranking,
    y: AvgSAT,
    text: uniname
    mode: 'markers',
    type: "scatter"
  };

// // 4.2 Create trace3 to hold the ranking vs acceptance plot .
// var trace2 = {
//   x: ranking,
//   y: acceptance,
//   mode: 'markers',
//   type: "scatter"
// };

// // 4.3 Create  trace1 to hold the ranking vs tuition plot .
// var trace3 = {
//   x: ranking,
//   y: tuition,
//   text: uniname,
//   mode: 'markers',
//   type: "scatter"
// };

  // 6. Create the data array cnsists of three traces for our plot
  var data = [trace1];
  
  // 7. Define our plot layout
  var layout = {
    title: "The Average SAT Score and ranking  for top 800 universities in US",
    xaxis: { title: "Ranking " },
    yaxis: { title: "Avg SAT"}
  };
  
  // 8. Plot the chart to a div tag with id "scatter plot "
  Plotly.newPlot("scatterplot2", data,layout)
})