
// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  //more choices @: https://docs.mapbox.com/api/maps/styles/
  id: "mapbox/light-v9",
  accessToken: API_KEY
});

var street = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  //more choices @: https://docs.mapbox.com/api/maps/styles/
  id: "mapbox/streets-v11",
  accessToken: API_KEY
});


function getColor(d) {
  return d > 60 ? '#800026' :
         d > 50  ? '#BD0026' :
         d > 40  ? '#E31A1C' :
         d > 30  ? '#FC4E2A' :
         d > 20   ? '#FD8D3C' :
         d > 10   ? '#FEB24C' :
         d > 5   ? '#FED976' :
                    '#FFEDA0';
}

d3.json('/data').then(function(data){
  //collegeLayer with data
  var collegeData = [];
  var collegeMarkers = [];
  data.forEach(
    function(college){
      var c = {};
      c.name = college.name;
      c.rating = college.rating;
      c.SAT_range = college.SAT_range;
      c.tuition = college.tuition;
      c.acceptance_rate = college['acceptance_rate (%)'];
      c.niche_grade = college.niche_grade;
      c.location = [college.college_lat,college.college_lng];
      collegeData.push(c);
    }
  );
  collegeData.forEach(
    function(c){
      collegeMarkers.push(L.marker(c.location).bindPopup("<h3><strong>" + c.name + "</strong></h3>" + "<hr><h4>Rating: "+ c.rating +"</h4>"
      + "<hr><h4>SAT range: "+ c.SAT_range +"</h4>"
      + "<hr><h4>Niche grade: "+ c.niche_grade +"</h4>"
      + "<hr><h4>tuition: "+ c.tuition +"</h4>"
      + "<hr><h4>acceptance rate: "+ c.acceptance_rate +"%</h4>"
      ))     
    }
  );
  var collegeLayer = L.layerGroup(collegeMarkers);

  //stateLayer with number of top 800 colleges per states
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.collegeNumber),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
  }
  function onEachFeature(feature, layer) {
    // Set mouse events to change map styling
    layer.on({
      // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
      mouseover: function(event) {
        layer = event.target;
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.9
        });
      },
      // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
      mouseout: function(event) {
        layer = event.target;
        layer.setStyle(style(feature));
      },
      // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
      click: function(event) {
        myMap.fitBounds(event.target.getBounds());
      }
    });
    // Giving each feature a pop-up with information pertinent to it
    layer.bindPopup("<h1>" + "State: " + feature.properties.name + "</h1> <hr> <h2>" + "Number of top 800 collges in the state: " + feature.properties.collegeNumber + "</h2>");
  }
  var stateLayer = L.geoJson(statesData, {style: style, onEachFeature: onEachFeature});


  var baseMaps = {
    Light: light,
    Street: street
  };

  var overlayMaps = {
    Colleges: collegeLayer,
    States: stateLayer
  };

  var myMap = L.map("map", {
    center: [38.58, -98.46],
    zoom: 5,
    layers: [light, stateLayer]
  });

  L.control.layers(baseMaps,overlayMaps,{collapsed: false}).addTo(myMap);

  // Add legend
  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function () {
      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 5, 10, 20, 30, 40, 50, 60];
      div.innerHTML = "<h6>Number of top <br> 800 colleges</h6>";
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      };
      return div;
  };
  legend.addTo(myMap);

});
