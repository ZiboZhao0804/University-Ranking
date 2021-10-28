
 // function to narrow down to top 50 schools.
 function filterUniversity(school) {
  return school.rating < 51;}

d3.json("/data").then((data) => {
//  Use filter() to pass the function as its argument
var filteredUniversity = data.filter(filterUniversity);

//  Check to make sure your are filtering your movies.
console.log(filteredUniversity);

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
//   mode: 'markers',
//   type: "scatter"
// };

// 6. Create the data array cnsists of three traces for our plot
var data = [trace1, trace2, trace3];
var listtitle =["The Average SAT score, and ranking for top 50 universities in US","The Acceptance Rate, and ranking for top 50 universities in US","The Average SAT score, and ranking  for top 50 universities in US"]
var yaxislist = ["Average SAT score","Acceptance Rate","Net cost($)"]

// 7. Define our plot layout
var layout = {
  title: listtitle[i],
  xaxis: { title: "Ranking "},
  yaxis: { title: yaxislist[i]}
};

// 8. Plot the chart to a div tag with id "scatter plot "
Plotly.newPlot("scatterplot",data[i],layout)
})


// build a drop down menu to show 3 scatterplots options
// function init() {

//   d3.json("/data").then((data) => {

//     //dropdown menu
//     // use the data.names as test_id to build the dropdown menu
//     // assign text and value to be the idselDataset
  var id = ["SAT score vs Ranking "," Acceptance rate vs Ranking"," Net cost vs Ranking"];

//     var select = d3.select("select");
  var options;
  for (var i=0; i<id.length; i++) {
    options = select.append("option");
    options.text(id[i]);
    options.attr("value",id[i]);
  }
  const first = id[0];
    buildMetadata(first);
// });
// }

// // On change to the DOM, call optionChanged()
// var dropdownMenu = d3.select("#selDataset");
// var chosenplot = dropdownMenu.property("value");
// d3.selectAll("#selDataset").on("change", optionChanged(college_name));

// // Function called by DOM changes
// function optionChanged() {
//   if (chosenplot)
//   {
//     buildMetadata(chosenplot);
//   }
// }

// init();