
// Map initiation ------
// Define the map
var mymap = L.map('mapid');

// BM1: Carto BaseMap
/**
 * This project uses raster tiles taken from https://carto.com/basemaps with 
 * source data from https://openmaptiles.org/schema
*/ 
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
  attribution:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attributions">CARTO</a> | Data: <a href="https://open.toronto.ca/dataset/street-furniture-poster-board/">Toronto Open Data: Street Furniture - Poster Board </a> | <a href="https://www12.statcan.gc.ca/census-recensement/2021/dp-pd/prof/index.cfm?Lang=E/">Statistics Canada: Census Profile, 2021 Census of Population </a>',
  subdomains: 'abcd',
  maxZoom: 18,
  minZoom: 11,
}).addTo(mymap);


// Load Layer and Functions ------
// L1: Load the local GeoJSON TorontoLayer and display 
var TorontoLayer = L.geoJSON(to_areaLine, {
  style: {
    fillColor: 'white',
    fillOpacity: 0,     // fill opacity
    weight: 2,          // outline width based on zoom level
    opacity: 1,         // outline opacity
    color: '#cccccc', // outline color
    interactive: false  // deactivate interaction
  }
}).addTo(mymap);

// Define the web map center
mymap.setView(TorontoLayer.getBounds().getCenter(), 11);


// L2: Load the local GeoJSON pop_byEthnicOriginLayer and display 
var style_pop_byEthnicOriginLayer = {
  radius: 2,              // Radius of the circle in pixels
  fillColor: "#525252", // Fill color
  color: "#000",        // Border color
  weight: 1,              // Border weight
  opacity: 0,             // Border opacity
  fillOpacity: 0.3,       // Fill opacity
  interactive: false      // deactivate interaction
};

// Create individual layers for each ethnicity based on `source`
// Create chineseLayer based on `source`
var chineseLayer = L.geoJSON(pop_byEthnicOrigin, {
  filter: function (feature) {
    return feature.properties.source === 'Chinese';
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_pop_byEthnicOriginLayer);
  },
  style: function (feature) {
    return { fillColor: "#66c2a5" };
  },
  maxZoom : 12
});

// Create englishLayer based on `source`
var englishLayer = L.geoJSON(pop_byEthnicOrigin, {
  filter: function (feature) {
    return feature.properties.source === 'English';
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_pop_byEthnicOriginLayer);
  },
  style: function (feature) {
    return { fillColor: "#fc8d62" };
  },
  maxZoom : 12
});

// Create filipinoLayer based on `source`
var filipinoLayer = L.geoJSON(pop_byEthnicOrigin, {
  filter: function (feature) {
    return feature.properties.source === 'Filipino';
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_pop_byEthnicOriginLayer);
  },
  style: function (feature) {
    return { fillColor: "#8da0cb" };
  },
  maxZoom : 12
});

// Create germanLayer based on `source`
var germanLayer = L.geoJSON(pop_byEthnicOrigin, {
  filter: function (feature) {
    return feature.properties.source === 'German';
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_pop_byEthnicOriginLayer);
  },
  style: function (feature) {
    return { fillColor: "#e78ac3" };
  },
  maxZoom : 12
});

// Create indianLayer based on `source`
var indianLayer = L.geoJSON(pop_byEthnicOrigin, {
  filter: function (feature) {
    return feature.properties.source === 'Indian (India)';
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_pop_byEthnicOriginLayer);
  },
  style: function (feature) {
    return { fillColor: "#a6d854" };
  },
  maxZoom : 12
});

// Create irishLayer based on `source`
var irishLayer = L.geoJSON(pop_byEthnicOrigin, {
  filter: function (feature) {
    return feature.properties.source === 'Irish';
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_pop_byEthnicOriginLayer);
  },
  style: function (feature) {
    return { fillColor: "#ffd92f" };
  },
  maxZoom : 12
});

// Create italianLayer based on `source`
var italianLayer = L.geoJSON(pop_byEthnicOrigin, {
  filter: function (feature) {
    return feature.properties.source === 'Italian';
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_pop_byEthnicOriginLayer);
  },
  style: function (feature) {
    return { fillColor: "#e5c494" };
  },
  maxZoom : 12
});

// Create scottishLayer based on `source`
var scottishLayer = L.geoJSON(pop_byEthnicOrigin, {
  filter: function (feature) {
    return feature.properties.source === 'Scottish';
  },
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_pop_byEthnicOriginLayer);
  },
  style: function (feature) {
    return { fillColor: "#b3b3b3" };
  },
  maxZoom : 12
});


// L3: Load the local GeoJSON posterPopLayer and display with address
var style_poster_PopLayer = {
  fillColor: "#525252", // Fill color
  color: "#000",        // Border color
  weight: 1,              // Border weight
  opacity: 0,             // Border opacity
  fillOpacity: 0.3,       // Fill opacity
  interactive: false      // deactivate interaction
};

var poster_PopLayer = L.geoJSON(poster_Pop, {
  pointToLayer: function (feature, latlng) {
    // Get max value
    var max = feature.properties.max;

    // Set default radius if max is undefined or too small
    var radius = 5; // Minimum radius value

    // Example: Scale the radius by 'max'
    if (max && max > 0) {
      radius = Math.log2(max)*3; // scaling formula
    }

    // Return a circle marker with the dynamic radius
    return L.circleMarker(latlng, {
      ...style_poster_PopLayer, // Use the default style for other properties
      radius: radius           // Set the dynamic radius
    });
  },
  style: function(feature) {
    switch (feature.properties.max_pop) {
      case 'Chinese': return {fillColor: "#66c2a5"};
      case 'English': return {fillColor: "#fc8d62"};
      case 'Filipino': return {fillColor: "#8da0cb"};
      case 'German': return {fillColor: "#e78ac3"};
      case 'Indian (India)': return {fillColor: "#a6d854"};
      case 'Irish': return {fillColor: "#ffd92f"};
      case 'Italian': return {fillColor: "#e5c494"};
      case 'Scottish': return {fillColor: "#b3b3b3"};
      default: return {color: "#525252" }
    }
  }
}).addTo(mymap);


// L4: Load the local GeoJSON posterAdressLayer and display with address
var style_poster_AddressLayer = {
    radius: 2,            // Radius of the circle in pixels
    fillColor: "#f0f0f0",  // Fill color
    color: "#000",         // Border color
    weight: 0,             // Border weight
    opacity: 0,            // Border opacity
    fillOpacity: 0.8       // Fill opacity
};

var poster_AddressLayer = L.geoJSON(poster_Address, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_poster_AddressLayer);
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties && feature.properties.ADDRESS) {
      
      // Create the popup content with the <div class="popup-content">
      var popupContent = '<div class="popup-content">' + feature.properties.ADDRESS + '</div>';
      
      // Bind the popup to the layer with the custom content
      layer.bindPopup(popupContent);
      
      // Show popup on mouseover
      layer.on('mouseover', function (e){
        this.openPopup();
      });
      // Close popup on mouseout
      layer.on('mouseout', function (e){
        this.closePopup();
      })
    }
  }
}).addTo(mymap);


// L5: Load the local GeoJSON poster_DemoLayer and display with address
// Function to generate the popup content
function generatePopupContent(properties) {
  var content = "<div class='popup-content'><b>Population by <br>Ethnic Origin:</b><br>"; // Add a title for the popup

  // Loop through the properties and format them into a list
  for (var key in properties) {
    if (properties.hasOwnProperty(key) && key !== "Total" && key !== "OBJECTID") { // Exclude non-origin fields
      content += key + ": " + properties[key]*100 + "<br>"; // Add each origin and its value to the popup
    }
  }
  
  // Return the formatted content
  return content; 
}

var style_poster_DemoLayer = {
    radius: 2,            // Radius of the circle in pixels
    fillColor: "#f0f0f0",  // Fill color
    color: "#000",         // Border color
    weight: 0,             // Border weight
    opacity: 0,            // Border opacity
    fillOpacity: 0.8       // Fill opacity
};

var poster_DemoLayer = L.geoJSON(poster_Demo, {
  pointToLayer: function (feature, latlng) {
    return L.circleMarker(latlng, style_poster_DemoLayer);
  },
  onEachFeature: function (feature, layer) {
    // Bind the popup to the layer with the formatted content
    layer.bindPopup(generatePopupContent(feature.properties));
  }
}).addTo(mymap);


// Add Functionalities ------
// F1: Add controls to toggle visibility of layers
var overlayMaps = {
  "Chinese": chineseLayer,
  "English": englishLayer,
  "Filipino": filipinoLayer,
  "German" : germanLayer,
  "Indian" : indianLayer,
  "Irish" : irishLayer,
  "Italian" : italianLayer,
  "Scottish" : scottishLayer,
  //"Poster Board" : poster_AddressLayer,
  //"Poster Pop" : poster_PopLayer,
};

// Add a Layer Control to toggle visibility of layers
var layerControl = L.control.layers(null, overlayMaps).addTo(mymap);


// F2: Function to toggle layer visibility based on zoom level
function toggleLayersByZoom() {
    var zoomLevel = mymap.getZoom();

    // L2: Show/Hide pop_byEthnicOriginLayers ----
    // Show/Hide chineseLayer
    if (zoomLevel <= 12) {
      if (!mymap.hasLayer(chineseLayer)) {
        mymap.addLayer(chineseLayer);
      }
    } else {
      if (mymap.hasLayer(chineseLayer)) {
        mymap.removeLayer(chineseLayer);
      }
    }

    // Show/Hide englishLayer
    if (zoomLevel <= 12) {
      if (!mymap.hasLayer(englishLayer)) {
        mymap.addLayer(englishLayer);
      }
    } else {
      if (mymap.hasLayer(englishLayer)) {
        mymap.removeLayer(englishLayer);
      }
    }

    // Show/Hide filipinoLayer
    if (zoomLevel <= 12) {
      if (!mymap.hasLayer(filipinoLayer)) {
        mymap.addLayer(filipinoLayer);
      }
    } else {
      if (mymap.hasLayer(filipinoLayer)) {
        mymap.removeLayer(filipinoLayer);
      }
    }

    // Show/Hide germanLayer
    if (zoomLevel <= 12) {
      if (!mymap.hasLayer(germanLayer)) {
        mymap.addLayer(germanLayer);
      }
    } else {
      if (mymap.hasLayer(germanLayer)) {
        mymap.removeLayer(germanLayer);
      }
    }

    // Show/Hide indianLayer
    if (zoomLevel <= 12) {
      if (!mymap.hasLayer(indianLayer)) {
        mymap.addLayer(indianLayer);
      }
    } else {
      if (mymap.hasLayer(indianLayer)) {
        mymap.removeLayer(indianLayer);
      }
    }

    // Show/Hide irishLayer
    if (zoomLevel <= 12) {
      if (!mymap.hasLayer(irishLayer)) {
        mymap.addLayer(irishLayer);
      }
    } else {
      if (mymap.hasLayer(irishLayer)) {
        mymap.removeLayer(irishLayer);
      }
    }

    // Show/Hide italianLayer
    if (zoomLevel <= 12) {
      if (!mymap.hasLayer(italianLayer)) {
        mymap.addLayer(italianLayer);
      }
    } else {
      if (mymap.hasLayer(italianLayer)) {
        mymap.removeLayer(italianLayer);
      }
    }

    // Show/Hide scottishLayer
    if (zoomLevel <= 12) {
      if (!mymap.hasLayer(scottishLayer)) {
        mymap.addLayer(scottishLayer);
      }
    } else {
      if (mymap.hasLayer(scottishLayer)) {
        mymap.removeLayer(scottishLayer);
      }
    }

    // L3: Show/Hide posterPop Layer
    if (zoomLevel > 12) {
      if (!mymap.hasLayer(poster_PopLayer)) {
        mymap.addLayer(poster_PopLayer);
      }
    } else {
      if (mymap.hasLayer(poster_PopLayer)) {
        mymap.removeLayer(poster_PopLayer);
      }
    }

    // L4: Show/Hide posterAdress Layer
    if (zoomLevel > 11 && zoomLevel < 14) {
      if (!mymap.hasLayer(poster_AddressLayer)) {
        mymap.addLayer(poster_AddressLayer);
      }
    } else {
      if (mymap.hasLayer(poster_AddressLayer)) {
        mymap.removeLayer(poster_AddressLayer);
      }
    }

    // L5: Show/Hide posterDemo Layer
    if (zoomLevel >= 14) {
      if (!mymap.hasLayer(poster_DemoLayer)) {
        mymap.addLayer(poster_DemoLayer);
      }
    } else {
      if (mymap.hasLayer(poster_DemoLayer)) {
        mymap.removeLayer(poster_DemoLayer);
      }
    }
}

// Initial check for layer visibility
toggleLayersByZoom();

// Event listener for zoom changes
mymap.on('zoomend', toggleLayersByZoom);


// F3: Create and add legend to map
function createLegend() {
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'info legend');

    // Add the title of the legend
    div.innerHTML = '<b>Population by <br>Ethnic Origin</b><br>';

    // Define categories and colors
    const categories = [
      { color: '#66c2a5', name: 'Chinese' },
      { color: '#fc8d62', name: 'English' },
      { color: '#8da0cb', name: 'Filipino' },
      { color: '#e78ac3', name: 'German' },
      { color: '#a6d854', name: 'Indian' },
      { color: '#ffd92f', name: 'Irish' },
      { color: '#e5c494', name: 'Italian' },
      { color: '#b3b3b3', name: 'Scottish' },
    ];
    
    // Loop through categories to build legend HTML
    categories.forEach(function(category) {
      div.innerHTML +=
        `<div class="legend-item">
          <span class="legend-symbol" style="background-color:${category.color};"></span> 
          ${category.name}
        </div>`;
    });

    return div;
  };

  legend.addTo(mymap);
}

// Call the function to add the legend
createLegend();


// F4: Create and add a Poster Board legend to map
function createPosterLegend() {
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'info legend');

    // Define categories and colors
    const categories = [
      { color: '#f0f0f0', name: 'Poster Board' },
    ];
    
    // Loop through categories to build legend HTML
    categories.forEach(function(category) {
      div.innerHTML +=
        `<div class="legend-item">
          <span class="legend-poster-symbol" style="background-color:${category.color};"></span> 
          ${category.name}
        </div>`;
    });

    return div;
  };

  legend.addTo(mymap);
}

// Call the function to add the legend
createPosterLegend();


// F5: Create and add a Poster_Pop size legend to map
function createPopSizeSLegend() {
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = function() {
    const div = L.DomUtil.create('div', 'info legend');

    // Add the title of the legend
    div.innerHTML = '<b>Poster Board<br>Population</b><br>';
    
    // Define categories and colors
    const categories = [
      { borderColor: '#08519c', name: '<= 400', size: 6 },
      { borderColor: '#08519c', name: '<= 1600', size: 12 },
      { borderColor: '#08519c', name: '<= 6400', size: 18 },
    ];
    
    // Loop through categories to build legend HTML
    categories.forEach(function(category) {
      div.innerHTML +=
        `<div class="legend-popsize-item">
          <span class="legend-popsize-symbol" style="border: 1px solid ${category.borderColor}; width:${category.size}px; height:${category.size}px;"></span> 
          ${category.name}
        </div>`;
    });

    return div;
  };

  legend.addTo(mymap);
}

// Call the function to add the legend
createPopSizeSLegend();


// F6: Define a Title aka Info Window
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
  this.update();
  return this._div;
};

// Update method to display different titles depending on the zoom level
info.update = function () {
  // Get the current zoom level
  const zoomLevel = mymap.getZoom();
  
  // Check if zoom level is greater than 11
  if (zoomLevel <= 12) {
    this._div.innerHTML = '<h3>CITY OF TORONTO</h3>' +
      '<strong>2021 Population by <br>Largest Ethnic Groups</strong><br>'
  } else {
    this._div.innerHTML = '<h3>CITY OF TORONTO</h3>' +
      '<strong>Poster Boards by Population<br> within 500 meters radius</strong><br>';
  }
};

// Add the info control to the map
info.addTo(mymap)

// Update info control based on zoom level changes
mymap.on('zoomend', function () {
  info.update();  // Re-run the update function after zoom changes
});