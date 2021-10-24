// Create a map object
var myMap = L.map("map", {
    center: [41.7886079, -87.5987133],
    zoom: 3
  });

//add a maplayer to the object
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

  //set color degree to the map for later on SAT scores
 function getColor(d) {
   return d > 800  ? '#E31A1C' :
          d > 1100  ? '#FC4E2A' :
          d > 1400  ? '#FD8D3C' :
          d > 1500  ? '#FEB24C' :
          d > 1550   ? '#FED976' :
                      '#FFEDA0';
 }
// // Add a legend for the color levels
 var legend = L.control({position: 'bottomright'});

 legend.onAdd = function () {

var div = L.DomUtil.create('div', 'info legend'),
 grades =[700,800,1100,1400,1500,1550] ;


//   //loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
      div.innerHTML +=
          '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
          grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
  }

return div;
};

legend.addTo(myMap); 

// Perform a GET request data from the stored URL :
d3.json("/data").then(function(data) {
    console.log(data);
    //Loop through the University array and collect the location coordinations into the var for each univerity
    
    // var coordinations=[]

    // for (var i = 0; i < data.length; i++) {
    //   var latitude[i] = data[i].college_lat;
    //   var longtitute[i] = data[i].college_lng;
    //   coordinations[i]=(latitude[i],longtitute[i]);
    //   coordinations=coordinations.append（coordinations[i]);}
      
    
//create one marker for each uiniversity, color the circle marker based on its avg SAT score and add it to the map
    for (var i = 0; i < data.length; i++) {
        var SATavg = data[i].SAT_average;
        L.circleMarker(coordinations,{
          fillOpacity:0.75,
          color:getColor(data.SAT_average),
          radius: e.mag*5,
          fillColor: getColor(data.SAT_average)
        }）
          .addTo(myMap);}
     
    
