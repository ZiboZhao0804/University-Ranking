console.log("!!!!!!!")
d3.json("/data").then((data) => {
    //  Create the Traces

var nicheGradeAP = data.filter(d=>d.niche_grade=="A+").map(d => d["niche_grade"]);
var nicheGradeA = data.filter(d=>d.niche_grade=="A").map(d => d["niche_grade"]);
var nicheGradeBP = data.filter(d=>d.niche_grade=="B+").map(d => d["niche_grade"]);
var nicheGradeB = data.filter(d=>d.niche_grade=="B").map(d => d["niche_grade"]);

var satAP = data.filter(d=>d.niche_grade=="A+").map(d => d["SAT_average"]);
var satA = data.filter(d=>d.niche_grade=="A").map(d => d["SAT_average"]);
var satBP = data.filter(d=>d.niche_grade=="B+").map(d => d["SAT_average"]);
var satB = data.filter(d=>d.niche_grade=="B").map(d => d["SAT_average"]);

var nameAP = data.filter(d=>d.niche_grade=="A+").map(d => d["name"]);
var nameA = data.filter(d=>d.niche_grade=="A").map(d => d["name"]);
var nameBP = data.filter(d=>d.niche_grade=="B+").map(d => d["name"]);
var nameB = data.filter(d=>d.niche_grade=="B").map(d => d["name"]);

console.log("!!!!!!!")
// console.log(sat)

    var trace1 = {
      x: nicheGradeAP,
      y: satAP,
      type: "box",
      name: "A+",
      boxpoints: "all",
      hovertext: nameAP,
      jitter: 0.5,
      whiskerwidth: 0.2,
      fillcolor: 'cls',
      marker: {
          size: 2
      }

    };

    var trace2 = {
        x: nicheGradeA,
        y: satA,
        type: "box",
        name: "A",
        boxpoints: "all",
        hovertext: nameA,
        jitter: 0.5,
        whiskerwidth: 0.2,
        fillcolor: 'cls',
        marker: {
            size: 2
        }

      };

      var trace3 = {
        x: nicheGradeBP,
        y: satBP,
        type: "box",
        name: "B+",
        boxpoints: "all",
        hovertext: nameBP,
        jitter: 0.5,
        whiskerwidth: 0.2,
        fillcolor: 'cls',
        marker: {
            size: 2
        }

      };

      var trace4 = {
        x: nicheGradeB,
        y: satB,
        type: "box",
        name: "B",
        boxpoints: "all",
        hovertext: nameB,
        jitter: 0.5,
        whiskerwidth: 0.2,
        fillcolor: 'cls',
        marker: {
            size: 2
        }

      };
  
    // Create the data array for the plot
    var data = [trace1,trace2,trace3,trace4];
  
    var layout = {
      title: "SAT Score vs Niche Grade",
      xaxis: { title: "Niche Grade" },
      yaxis: { title: "SAT Score" }
    };
  
    // Plot the chart to a div tag with id "plot"
    Plotly.newPlot("boxplot", data, layout);
  });