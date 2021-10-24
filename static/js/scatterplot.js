
 // function to narrow down to top 50 schools.
 function filterUniversity(school) {
    return school.rating < 51;}

 d3.json("/data").then((data) => {
 //  Use filter() to pass the function as its argument
  var filteredUniversity = data.filter(filterUniversity);
  
  //  Check to make sure your are filtering your movies.
  console.log(filteredUniversity);
  
  // 3. Use the map method with the arrow function to return all the filtered movie titles.
  var acceptance = data.map(d => d["acceptance_rate (%)"]);
    
  
  //  Check your filtered school acceptance
  console.log(acceptance);
  
  // 4. Use the map method with the arrow function to return all the filtered movie metascores.
  var tuition= data.map(d => d["net_price ($)"]);
  
  //  Check your filtered net cost.
  console.log(tuition);
  
  // 5. Create your trace.
  var trace = {
    x: acceptance,
    y: tuition,
    mode: 'markers',
    type: "scatter"
  };
  
  // 6. Create the data array for our plot
  var data = [trace];
  
  // 7. Define our plot layout
  var layout = {
    title: "The acceptance rate and Net cost for top 30 universities in US",
    xaxis: { title: "acceptance" },
    yaxis: { title: "tuition"}
  };
  
  // 8. Plot the chart to a div tag with id "scatter plot "
  Plotly.newPlot("Scatterplot", data,layout)
})