var map;
var marker;

function initMap() {
  // Initialize the map
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 63.1766832, lng: 14.636068099999989 },
    mapTypeId: "roadmap",
    mapId: "869fd3c6510ec622",
    disableDefaultUI: true,
  });

  // Define the marker for current location
  marker = new google.maps.Marker({
    map: map,
    title: "Your address",
    icon: {
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, // Use an arrow icon
      scale: 5, // Set the size of the arrow
      rotation: 0, // Set the initial rotation to 0 degrees
    },
  });

  // Define the geocoder
  var geocoder = new google.maps.Geocoder();

  // Watch for location changes
  navigator.geolocation.watchPosition(
    function (position) {
      // Update marker position
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      marker.setPosition(pos);
      console.log("update");

      // Update marker rotation to indicate heading
      var heading = position.coords.heading;
      if (typeof heading !== "undefined") {
        marker.setIcon({
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          scale: 5,
          rotation: heading, // Set the rotation to the current heading
        });
      }

      // Find the closest address to the current location
      geocoder.geocode({ location: pos }, function (results, status) {
        if (status === "OK") {
          if (results[0]) {
            marker.setTitle(results[0].formatted_address);
          } else {
            marker.setTitle("No results found");
          }
        } else {
          marker.setTitle("Geocoder failed due to: " + status);
        }
      });

      // Center the map over the marker
      map.setCenter(pos);
    },
    function () {
      // If geolocation is not enabled, default to center of map
      map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
    },
    { enableHighAccuracy: true, maximumAge: 3000 }
  );

  // Add event listener to search button
  //var searchBtn = document.getElementById("search-btn");
  //searchBtn.addEventListener("click", search);
}

function search() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('search-input').value;

    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            // Sort the results based on their proximity to the user's location
            results.sort(function (a, b) {
                var distanceA = google.maps.geometry.spherical.computeDistanceBetween(a.geometry.location, map.getCenter());
                var distanceB = google.maps.geometry.spherical.computeDistanceBetween(b.geometry.location, map.getCenter());
                return distanceA - distanceB;
            });

            var location = results[0].geometry.location;
            map.setCenter(location);
            var marker = new google.maps.Marker({
                map: map,
                position: location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

var reqcount = 0;

navigator.geolocation.watchPosition(successCallback, errorCallback, options);

function successCallback(position) {
    const { accuracy, latitude, longitude, heading, speed } = position.coords;
    // Show a map centered at latitude / longitude.
    reqcount++;
    details.innerHTML = "Accuracy: " + accuracy + "<br>";
    details.innerHTML += "Latitude: " + latitude + " | Longitude: " + longitude + "<br>";
    details.innerHTML += "Heading: " + heading + "<br>";
    details.innerHTML += "Speed: " + speed + "<br>";
    details.innerHTML += "reqcount: " + reqcount;
}
function errorCallback(error) {

}
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};


