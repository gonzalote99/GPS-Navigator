function initMap() {
  var map = L.map('map').setView([0, 0], 1);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Get the graph data from sessionStorage
  var graphData = JSON.parse(sessionStorage.getItem('graphData'));

  if (graphData && graphData.path) {
      var pathCoordinates = graphData.path;

      // Add a start point marker with a custom icon
      var startPoint = pathCoordinates[0];
      var startIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
      });
      var startMarker = L.marker(startPoint, { icon: startIcon }).addTo(map);
      startMarker.bindPopup('Start Point').openPopup();

      // Add an end point marker
      var endPoint = pathCoordinates[pathCoordinates.length - 1];
      var endMarker = L.marker(endPoint).addTo(map);
      endMarker.bindPopup('End Point').openPopup();

      // Create a polyline to represent the graph
      var polyline = L.polyline([], { color: 'purple' }).addTo(map);

      var index = 0;
      var animationInterval = setInterval(function() {
          if (index >= pathCoordinates.length) {
              clearInterval(animationInterval);
              map.fitBounds(polyline.getBounds());
              return;
          }

          // Animate the graph drawing
          polyline.addLatLng(pathCoordinates[index]);
          map.panTo(pathCoordinates[index]);
          index++;
      }, 30); // Adjust the animation speed here (lower value means faster)

      // Show traffic details as a popup
      var trafficDetails = graphData.traffic;
      if (trafficDetails) {
          var trafficPopup = L.popup({ className: 'dark-popup' })
              .setLatLng([0, 0])
              .setContent(trafficDetails)
              .openOn(map);
      }
  }
}

initMap();