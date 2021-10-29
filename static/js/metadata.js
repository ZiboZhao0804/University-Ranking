//metadata and demographic info
function buildMetadata(college_name){
    // Use D3 fetch to read the JSON file
    d3.json("/data").then((data) => {
      demoInfo = d3.select("#sample-metadata");
      demoInfo.html("");
      var selectedMetadata = data.filter(d => d.name == college_name)[0];
      console.log(selectedMetadata);
      demoInfo.append("div").text("Ranking: "+ selectedMetadata.rating + '\n');
      demoInfo.append("div").text("Niche grade: "+ selectedMetadata.niche_grade + '\n');
      demoInfo.append("div").text("Location: "+ selectedMetadata.location + '\n');
      demoInfo.append("div").text("SAT range: "+ selectedMetadata.SAT_range + '\n');
      demoInfo.append("div").text("Acceptance rate: "+ selectedMetadata['acceptance_rate (%)'] + '%' + '\n');
      demoInfo.append("div").text("Net Cost: $"+ selectedMetadata['net_price ($)'] + '\n');
    }); 
  }

  
  //initialize a plot with the first id
  function init() {
  
    d3.json("/data").then((data) => {

      //dropdown menu
      // use the data.names as test_id to build the dropdown menu
      // assign text and value to be the idselDataset
      var id = data.map(d => d.name);

      var select = d3.select("select");
      var options;
      for (var i=0; i<id.length; i++) {
        options = select.append("option");
        options.text(id[i]);
        options.attr("value",id[i]);
      }
      const first = id[0];
        // buildCharts(first);
        buildMetadata(first);
    });
  }
  
  // On change to the DOM, call optionChanged()
  var dropdownMenu = d3.select("#selDataset");
  var college_name = dropdownMenu.property("value");
  d3.selectAll("#selDataset").on("change", optionChanged(college_name));
  
  // Function called by DOM changes
  function optionChanged(college_name) {
    if (college_name)
    {
      buildMetadata(college_name);
    }
  }

  init();
  