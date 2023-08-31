function initMap() {
  var map = L.map('map').setView([0, 0], 1);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  var graphData = JSON.parse(sessionStorage.getItem('graphData'));
  if(graphData && graphData.path) {
       var pathCoordinates = graphData.path;

       var startPoint = pathCoordinates[0];
       var startIcon = L.icon({
         iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
         iconSize: [25, 41],
         iconAnchor: [12 , 41],
         popupAnchor: [1, -34],
       });

       var startMarker = L.marker(startPoint, {icon: startIcon}).addTo(map);
       startMarker.bindPopup('start point').openPopup();

       var endPoint = pathCoordinates[pathCoordinates.length - 1];
       var endMarker = L.marker(endPoint).addTo(map);
       endMarker.bindPopup('end point').openPopup();

       var polyline = L.polyline([], {color: 'purple'}).addTo(map);

       var index = 0;
       var animationInterval = setInterval(function () {
         if(index >= pathCoordinates.length) { 
         clearInterval(animationInterval);
         map.fitBounds(polyline.getBounds());
         return;

         }
         polyline.addLatLng(pathCoordinates[index]);
         map.panTo(pathCoordinates[index]);
         index++
       }, 30);

       var trafficDetails = graphData.traffic;
       if(trafficDetails) {
         var trafficPopup = L.popup({className: 'dark-popup'})
         .setLatLng([0, 0])
         .setContent(trafficDetails)
         .openOn(map);
       }

  }
}
initMap();