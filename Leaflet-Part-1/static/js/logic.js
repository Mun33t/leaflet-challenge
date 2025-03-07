// Create the 'basemap' tile layer that will be the background of our map.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap,/a> contributors'
})

// OPTIONAL: Step 2
// Create the 'street' tile layer as a second background of the map


// Create the map object with center and zoom options.


// Then add the 'basemap' tile layer to the map.

// OPTIONAL: Step 2
// Create the layer groups, base maps, and overlays for our two sets of data, earthquakes and tectonic_plates.
// Add a control to the map that will allow the user to change which layers are visible.


// Make a request that retrieves the earthquake geoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {

  // This function returns the style data for each of the earthquakes we plot on
  // the map. Pass the magnitude and depth of the earthquake into two separate functions
  // to calculate the color and radius.
  function styleInfo(feature) {
    return {
      fillOpacity: 0.75,
      color: getColor(feature.geometry.coordinates[2]),
      radius: getRadius(feature.properties.mag)
    };

  }

  // This function determines the color of the marker based on the depth of the earthquake.
  function getColor(depth) {
      if (depth < 10) return '#00FF00';
      else if (depth < 30) return '#ADFF2F';
      else if (depth < 50) return '#FFFF00';
      else if (depth < 70) return '#FFA500';
      else if (depth < 90) return '#FF4500';
      else return '#FF0000'
  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
      return magnitude * 4;
  }

  // Add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // Turn each feature into a circleMarker on the map.
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng, {
        radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      })
    },
    // Set the style for each circleMarker using our styleInfo function.
    style: styleInfo,
    // Create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function (feature, layer) {
      layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]} km</p>`);
    }
  // OPTIONAL: Step 2
  // Add the data to the earthquake layer instead of directly to the map.
  }).addTo(map);

  // Create a legend control object.
  let legend = L.control({
    position: "bottomright"
  });

  // Then add all the details for the legend
  legend.onAdd = function () {
    let div = L.DomUtil.create("div", "info legend");

    // Initialize depth intervals and colors for the legend
    let depths = [-10, 10, 30, 50, 70, 90];
    let colors = ['#00FF00', '#ADFF2F', '#FFFF00', 'FFA500', 'FF4500', 'FF0000'];

    // Loop through our depth intervals to generate a label with a colored square for each interval.
    for(let i = 0; i < depths.length; i++) {
        div.innerHTML +=
            `<i style="background:${colors[i]}"></i> ${depths[i]}${depths[i + 1]

            }`
    }


    return div;
  };

  // Finally, add the legend to the map.
  legend.addTo(map);

  // OPTIONAL: Step 2
  // Make a request to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (plate_data) {
    // Save the geoJSON data, along with style information, to the tectonic_plates layer.
    

    // Then add the tectonic_plates layer to the map.

  });
});
