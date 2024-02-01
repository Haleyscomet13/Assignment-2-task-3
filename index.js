require([
  "esri/Map",
  "esri/layers/CSVLayer",
  "esri/views/MapView",
  "esri/widgets/Legend"
], function(Map, CSVLayer, MapView, Legend) {
  const url = "https://raw.githubusercontent.com/orhuna/WebGIS_SLU_M1/main/Module%202/stl_crime_wgs_84.csv";

  const template = {
    title: "Crime committed at {ILEADSStreet}"
  };

  const renderer = {
    type: "heatmap",
    colorStops: [
      { color: "rgba(0, 0, 0, 0)", ratio: 0 },
      { color: "#00ffff", ratio: 0.1 }, // Cyan
      { color: "#00bfff", ratio: 0.2 }, // Deep Sky Blue
      { color: "#0000ff", ratio: 0.3 }, // Blue
      { color: "#0000b3", ratio: 0.4 }, // Dark Blue
      { color: "#800080", ratio: 0.5 }, // Purple
      { color: "#4b0082", ratio: 0.6 }, // Indigo
      { color: "#ff00ff", ratio: 0.7 }, // Magenta
      { color: "#ff0080", ratio: 0.8 }, // Dark Pink
      { color: "#ff0000", ratio: 0.9 }, // Red
      { color: "#b30000", ratio: 1 }   // Dark Red
    ],
    maxPixelIntensity: 10,
    minPixelIntensity: 0
  };

  const layer = new CSVLayer({
    url: url,
    title: "St. Louis Crime Heatmap",
    copyright: "St. Louis Police Department",
    latitudeField: "Lat",
    longitudeField: "Lon",
    popupTemplate: template,
    renderer: renderer
  });

  const map = new Map({
    basemap: "gray-vector",
    layers: [layer]
  });

  const view = new MapView({
    container: "viewDiv",
    center: [-90.1994, 38.6270], // St. Louis coordinates
    zoom: 13,
    map: map
  });

  view.ui.add(
    new Legend({
      view: view
    }),
    "bottom-left"
  );
});
