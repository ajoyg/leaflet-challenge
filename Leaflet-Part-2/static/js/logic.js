// Store the API endpoints as queryUrl and tectonicPlatesjson.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
let tectonicPlatesjson = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
    // Once we get a response, send the data.features object get the tectonic plates json.
   
  // GET the tectonic plates GeoJSON data. 
 d3.json(tectonicPlatesjson).then(function (tectonicData) {
  // Create the map layers
  let mapLayers = {
    earthquakes: new L.layerGroup(),
    tectonicPlates: new L.layerGroup(),
    };
  
// Create the base map layers earthquakeMap and satelliteMap.
  let earthquakeMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'});

  let satelliteMap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/satellite-v9",
    tileSize: 512,
    zoomOffset: -1,
    accessToken: config.apikey
  });

// Set the map view and add the layers to the map.
  let myMap = L.map("map", {
      center: [37.09, -95.71],
      zoom: 5,
      layers: [mapLayers.earthquakes, mapLayers.tectonicPlates]
      });
      
// Set objects for the base and the overlay layers.
  let baseMaps = {
    "Outdoor": earthquakeMap,
    "Satellite Map": satelliteMap,
  };

  let overlayMaps = {
    "Earthquakes" : mapLayers.earthquakes,
  };
// Add the earthquakeMap basemap  
earthquakeMap.addTo(myMap);
 
// Create the markers for the earthquakes and add them to an array.
let earthquakeArray =[]
  for (let i = 0; i < data.features.length; i++) 
  {
    let mag = data.features[i].properties.mag*4;
    let depth = Math.round(data.features[i].geometry.coordinates[2]*10000)/10000;
    let lat = data.features[i].geometry.coordinates[1];
    let lng = data.features[i].geometry.coordinates[0];
    
    cMarker = L.circleMarker([lat, lng], {radius: mag, color:"#000", fillColor: getColor(depth) , fillOpacity: 0.5, weight:0.5})
    .bindPopup(`<h3>Mag: ${data.features[i].properties.mag}, Depth: ${depth}km, Loc: ${data.features[i].properties.place}</h3>`);
    earthquakeArray.push(cMarker);
  };
// Create the tectonic plates layer
let tectonicPlatesLayer = L.geoJson(tectonicData, {style: function(){return {color:"#d90429",weight:2}}});

// Add the earthquakes array to the earthquakes layer
L.layerGroup(earthquakeArray).addTo(mapLayers.earthquakes);

// Add the earthquake overlay and control to the base map
let layerControl = L.control.layers(baseMaps, overlayMaps,{collapsed:false}).addTo(myMap);

// Add the tectonic plates overlay to the base map
layerControl.addOverlay(tectonicPlatesLayer, "Tectonic Plates");

// Create a legend control  
let legend = L.control({position: "bottomright"});

// function to display the earthquake density color
function getColor(d) {
  return d > 90 ? '#780000' :
         d > 70  ? '#EF233C' :
         d > 50  ? '#FF006E' :
         d > 30  ? '#FFC247' :
         d > 10   ? '#B5DD7E' :
         d > -10   ? '#69D025' :
                    '#FFEDA0';} 

// Create the legend of density intervals and add it to the map.
legend.onAdd = function (map) 
{
    let div = L.DomUtil.create('div', 'info legend');
    grades = [-10,10,30,50,70,90];
   

    // loop through our density intervals and generate a label with a colored square for each interval
    for (let i = 0; i < grades.length; i++) 
    {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        
    };
    return div;
};
legend.addTo(myMap);
 });

});




