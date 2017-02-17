// instantiate a leaflet map into my container
// set the initial view
var map = L.map('mapContainer').setView([40.735021, -73.994787], 11);

// L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>'
}).addTo(map);

// L.marker([40.682047, -73.976196]).addTo(map)
//   .bindPopup('Chris likes to eat pizza at Patsy\'s')

// L.marker([40.646028, -73.971141]).addTo(map)
//   .bindPopup('Felipe likes to eat pizza at Rocky\'s Pizza')

// L.marker([40.730710, -74.002130]).addTo(map)
//   .bindPopup('Mick likes to eat pizza at Joe\'s Pizza')


var manhattanCrew = [
  {
    name: 'Mick',
    restaurant: 'Joe\'s',
    coord: [40.730710, -74.002130],
  },
  {
    name: 'Al',
    restaurant: 'Bono Trattoria',
    coord: [40.831393, -73.947458],
  },
  {
    name: 'Fernanda',
    restaurant: 'Artichoke',
    coord: [40.730166, -74.000668],
  },
  {
    name: 'Robert',
    restaurant: 'La Mia Pizza',
    coord: [40.771294, -73.953209],
  },
]

var brooklynCrew = [
  {
    name: 'Chris',
    restaurant: 'Rocky\'s',
    coord: [40.682047, -73.976196],
  },
  {
    name: 'Felipe',
    restaurant: 'Patsy\'s',
    coord: [40.646028, -73.971141],
  },
  {
    name: 'Santiago',
    restaurant: 'Roberta\'s',
    coord: [40.705446, -73.934281],
  },
]

// create an empty layerGroup
var manhattanLayerGroup = L.layerGroup();

manhattanCrew.forEach(function(data) {
  var thisMarker = L.marker(data.coord, {
    title: data.name, 
  });

  thisMarker.bindPopup(data.name + ' likes to eat pizza at ' + data.restaurant);

  // add the marker to the layergroup
  manhattanLayerGroup.addLayer(thisMarker);
  
});

var brooklynLayerGroup = L.layerGroup();

brooklynCrew.forEach(function(data) {
  var thisCircleMarker = L.circleMarker(data.coord, {
    color: 'orange',
    fillColor: 'steelblue',
    fillOpacity: .9,
    weight: 1,
  })
    .bindPopup(data.name + ' likes to eat pizza at ' + data.restaurant)
    .addTo(map)

    brooklynLayerGroup.addLayer(thisCircleMarker);
});

// finally, add the fully populated layergroup to the map
manhattanLayerGroup.addTo(map);
brooklynLayerGroup.addTo(map);

// create an object with the two layerGroups in it, which we can pass into L.control.group

var boroughs = {
  "Manhattan": manhattanLayerGroup,
  "Brooklyn": brooklynLayerGroup,
}

L.control.layers(null, boroughs, {
  collapsed: false
}).addTo(map);

