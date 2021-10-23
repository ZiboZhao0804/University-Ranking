
d3.json("/data").then(function(data){
    var tableData =[]; 
    data.forEach(function(d){
        var name = d.name;
        var rating = d.rating;
        var niche_grade = d.niche_grade;
        var city = d.city;
        var state = d.state;
        var SAT_range = d.SAT_range;
        var acceptance_rate = d['acceptance_rate (%)'];
        var tuition =  d['net_price ($)'];
        var college = {'name':name,'rating':rating,'niche_grade':niche_grade,'city':city,'state':state,'SAT_range':SAT_range,'acceptance_rate':acceptance_rate,'tuition':tuition};
        tableData.push(college);
    });

console.log(tableData);

// Get a reference to the table body
var tbody = d3.select("tbody");

// part1. append all data
tableData.forEach(
    function(college) {
        var row = tbody.append("tr");
        var values = Object.values(college);
        values.forEach(
            function(val){
                row.append("td").text(val);
            }
        )
    }
);

// part2. search city, state

// Select the button
var button = d3.select("button#filter-btn");

// Select the form
var form = d3.select(".form-group");

// get all the possible value for datetime, city, state, country and shape in teh tableData
// bring in underscore.js in the index.html
var nameAll = _.keys(_.countBy(tableData, function(tableData) { return tableData.name; }));
var gradeAll = _.keys(_.countBy(tableData, function(tableData) { return tableData.niche_grade; }));
var cityAll = _.keys(_.countBy(tableData, function(tableData) { return tableData.city; }));
var stateAll = _.keys(_.countBy(tableData, function(tableData) { return tableData.state; }));

// Create event handlers 
button.on("click", runEnter);
form.on("submit",preventSubmit);

function preventSubmit() {
  d3.event.preventDefault;
}

// Complete the event handler function for the form
function runEnter() {
    // Select the input element and get the raw HTML node
    var inputNameElement = d3.select("#name");
    var inputGradeElement = d3.select("#grade");
    var inputCityElement = d3.select("#city");
    var inputStateElement = d3.select("#state");

    // Get the value property of the input element
    // if there is no input for particular element, then return all the possible values in the tableData
    // put the result in an array
    if (inputNameElement.property("value")) {
        var inputName = [inputNameElement.property("value")];
    } else {
        inputName = nameAll;
    }
    if (inputGradeElement.property("value")) {
        var inputGrade = [inputGradeElement.property("value")];
    } else {
        inputGrade = gradeAll;
    }
    if (inputCityElement.property("value")) {
        var inputCity = [inputCityElement.property("value")];
    } else {
        inputCity = cityAll;
    }
    if (inputStateElement.property("value")) {
        var inputState = [inputStateElement.property("value")];
    } else {
        inputState = stateAll;
    }

    // Use the form input to filter the data
    // use includes function to return true or false in an array
    var matches = tableData.filter(function(college){
        return (inputName.includes(college.name) && inputGrade.includes(college.niche_grade) && inputCity.includes(college.city) && inputState.includes(college.state) );
  });

  // Finally, display the matches ufo sightings

  tbody.html(""); //clear out the output before doing new
  matches.forEach(
    function(college) {
        var row = tbody.append("tr");
        var values = Object.values(college);
        values.forEach(
            function(val){
                row.append("td").text(val);
            }
        )
    }
)};
});
