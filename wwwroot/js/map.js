
﻿var map;
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

    AddmarkerWithClick(map);
    
    // Define the marker for current location
    var userPosition = new google.maps.Marker({
        map: map,
        title: "Your address",
        icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, // Use an arrow icon
            scale: 5, // Set the size of the arrow
            rotation: 0 // Set the initial rotation to 0 degrees
        }
    });

  // Define the geocoder
  var geocoder = new google.maps.Geocoder();

    // Watch for location changes
    navigator.geolocation.watchPosition(function (position) {
        // Update marker position
        var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };


        userPosition.setPosition(pos);
        console.log("update");

        // Update marker rotation to indicate heading
        var heading = position.coords.heading;
        if (typeof heading !== 'undefined') {
            userPosition.setIcon({
                path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                scale: 5,
                rotation: heading // Set the rotation to the current heading
            });
        }

        // Find the closest address to the current location
        geocoder.geocode({ location: pos }, function (results, status) {
            if (status === "OK") {
                if (results[0]) {
                    userPosition.setTitle(results[0].formatted_address);
                } else {
                    userPosition.setTitle("No results found");
                }
            } else {
                userPosition.setTitle("Geocoder failed due to: " + status);
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

function AddmarkerWithClick(map) {
    map.addListener("click", (event) => {
        // Create a new marker
        const marker = new google.maps.Marker({
            position: event.latLng,
            map: map,
        });
        // Lägg till en mousedown-lyssnare på markern
        marker.addListener("mousedown", (event) => {
            // Spara tiden när musknappen trycks ned
            const startTime = new Date().getTime();

            // Lägg till en mouseup-lyssnare på markern
            marker.addListener("mouseup", (event) => {
                // Beräkna tiden som musknappen har varit nedtryckt
                const endTime = new Date().getTime();
                const duration = endTime - startTime;

                // Om musknappen har varit nedtryckt i minst 2 sekunder, ta bort markern
                if (duration >= 2000) {
                    marker.setMap(null);
                }
            });
        });
        // Find the nearest address to the marker
        const geocoder = new google.maps.Geocoder();
        geocoder
            .geocode({ location: event.latLng })
            .then((response) => {
                if (response.results[0]) {
                    const infowindow = new google.maps.InfoWindow({
                        content: response.results[0].formatted_address,
                    });

                    // Add click event listener to marker to display nearest address
                    marker.addListener("click", () => {
                        infowindow.open(map, marker);
                    });
                } else {
                    window.alert("No results found");
                }
              
            })
            .catch((e) => window.alert("Geocoder failed due to: " + e));
    });
}
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


