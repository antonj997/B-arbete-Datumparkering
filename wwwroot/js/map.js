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
  var searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", search);
}

function search() {
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById("search-input").value;

  geocoder.geocode({ address: address }, function (results, status) {
    if (status === "OK") {
      var location = results[0].geometry.location;
      map.setCenter(location);
      if (marker) {
        marker.setMap(null); // Remove previous marker from map
      }
      marker = new google.maps.Marker({
        map: map,
        position: location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}
    var boundryCoords = [
        { lat: 63.12152322147656, lng: 14.766334845860246 },
        { lat: 63.12961437522173, lng: 14.792462093080598 },
        { lat: 63.13626831169727, lng: 14.775428860086112 },
        { lat: 63.14070342199764, lng: 14.775428860086112 },
        { lat: 63.14598553686859, lng: 14.770376630261525 },
        { lat: 63.15719869005157, lng: 14.773407968336814 },
        { lat: 63.16580119337055, lng: 14.76084956773919 },
        { lat: 63.165866354440155, lng: 14.74295023768516 },
        { lat: 63.16873328187736, lng: 14.72331871491186 },
        { lat: 63.17101358989112, lng: 14.707584626052375 },
        { lat: 63.2063028918599, lng: 14.683478270236819 },
        { lat: 63.2288732851519, lng: 14.65446403338345 },
        { lat: 63.22854818844582, lng: 14.629202881426004 },
        { lat: 63.22282588750988, lng: 14.62212975925033 },
        { lat: 63.2219154170181, lng: 14.608560912627608 },
        { lat: 63.21775290108519, lng: 14.600332994994677 },
        { lat: 63.205904415903404, lng: 14.580696235034345 },
        { lat: 63.1910645055729, lng: 14.555723782359848 },
        { lat: 63.17799312449886, lng: 14.533828516573006 },
        { lat: 63.16392089330742, lng: 14.534261564869476 },
        { lat: 63.16389705742495, lng: 14.592092129025437 },
        { lat: 63.121792308944016, lng: 14.76607945140348 }
    ];
    boundryCoords = new google.maps.Polyline({
        path: boundryCoords,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    boundryCoords.setMap(map);

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


