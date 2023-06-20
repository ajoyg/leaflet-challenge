# Leaflet Challenge
This challenge is part of the UCB Data analytics bootcamp that builds a Leaflet.js visualization for the USGS earthquake data. 

## Part 1 - Create the Earthquake Visualization
The index.html gets the Leaflet CSS and javascript, along with D3.js. The logic.js file in the Leaflet-Part-1/static/js folder does the following:
1. Gets the GeoJSON data from [USGS Data Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) for the last 7 days.
2. Create a world map from OSM to plot all the earthquakes in the last 7 days.
3. Adds markers to the world map from the GeoJSON data to reflect the magnitude for the earthquake by the size of the maker, depth of the earthquake by the color.
4. Popups that provide additional information about the earthquake like the location when the associated marker is clicked.
5. A legend that provides context on the depth of the earthquakes.
![Earthquake Visualization](https://github.com/ajoyg/leaflet-challenge/blob/main/images/EarthquakeMap.jpg)

## Part 2 - Plot the tectonic plates
Part 2 provides an option to switch between 2 maps layers, outdoors and satellite maps. In addition, you can choose to see both eathquake points and tectonic plates or either one of them.
The logic.js in the Leaflet-Part-2/static/js folder does the following:
1. Gets the GeoJSON data from [USGS Data Feed](https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) and from https://github.com/fraxen/tectonicplatesLinks
2. Creates the two maps and picks the outdoor map as default
3. Adds the eathquake data points and the tectonic plates layers to the map
4. Add option to toggle between outdoor and satellite maps. Provides additonal filter to select earthquake points and/or tectonic plates.
5. The popups and legend show the same information as in Part 1.
![Earthquakes and Tectonic Plates](https://github.com/ajoyg/leaflet-challenge/blob/main/images/SatelliteMapwithTectonicPlates.jpg)

