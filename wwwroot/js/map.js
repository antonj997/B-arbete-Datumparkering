﻿var map;
var address;
var streetNumber;
var isOddStreetNumber;
var date;
var isOddDate;
var reqcount = 0;

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
    SetBoundry(map);
    // Define the marker for current location
    var userPosition = new google.maps.Marker({
        map: map,
        icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, // Use an arrow icon
            scale: 5, // Set the size of the arrow
            rotation: 0 // Set the initial rotation to 0 degrees
        }
    });

   
    // Define the info window for current location marker
    var userPositionInfoWindow = new google.maps.InfoWindow();

    // Add a mouseover listener to the current location marker to display the info window
    userPosition.addListener("click", (event) => {
        // Call the geocodeLocationAndSetContent function to get the content for the info window
        geocodeLocationAndSetContent(event, userPosition, userPositionInfoWindow, map);

        // Open the info window
        userPositionInfoWindow.open(map, userPosition);
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
        isUserOnRoad(pos);
        

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

        // Update marker title to the closest address to the current location
        geocodeLocationAndSetContent(geocoder, map, userPosition, pos, function (formattedAddress) {
            userPosition.setTitle(formattedAddress);
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
}
function SetBoundry(map) {
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

var searchMarker;


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

            // Remove the previous search marker, if there is one
            removeMarker(searchMarker)

            // Create a new search marker at the searched location
            searchMarker = new google.maps.Marker({
                map: map,
                position: location
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

// Removes marker
function removeMarker(marker) {
    if (marker) {
        marker.setMap(null);
    }
}

navigator.geolocation.watchPosition(successCallback, errorCallback, options);

// Define a function to geocode a location and set the infowindow content
function geocodeLocationAndSetContent(event, marker, infowindow, map) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: event.latLng }, function (results, status) {
        if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            const streetNumber = address.match(/\d+/); // get the street number

            // check if the street number is odd or even
            const isOddStreetNumber = streetNumber % 2 !== 0;

            // check if the date is odd or even
            const date = new Date();
            const isOddDate = date.getDate() % 2 !== 0;

            // set the content of the infowindow based on the street number and date
            let content = address;
            if (isOddStreetNumber && isOddDate) {
                content += "<br><span style='color:green'>Inatt mellan 00:00-07:00 får du stå på denna adress.</span>";
            } else {
                content += "<br><span style='color:red'>Inatt mellan 00:00-07:00 får du inte stå här.</span>";
            }

            // set the content of the infowindow and open it
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    });
}

var tapMarker
// Define the AddmarkerWithClick method
function AddmarkerWithClick(map) { 
    map.addListener("click", (event) => {
        // Remove previous marker if there is one 
        removeMarker(tapMarker)
        // Create a new marker
        tapMarker = new google.maps.Marker({
            position: event.latLng,
            map: map,
        });
        const infowindow = new google.maps.InfoWindow();

        // Call the geocodeLocationAndSetContent function to geocode the location and set the infowindow content
        geocodeLocationAndSetContent(event, tapMarker, infowindow, map);
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

function isUserOnRoad(position) {
  
    var nearestRoads = getNearestRoads(position);
    if (nearestRoads && nearestRoads.length > 0) {
        var request = {
            origin: nearestRoads[0].location,
            destination: nearestRoads[0].location,
            travelMode: google.maps.TravelMode.DRIVING
        };

        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                var route = response.routes[0];
                var legs = route.legs;
                var distance = google.maps.geometry.spherical.computeDistanceBetween(latLng, legs[0].start_location);
                if (distance < 10) {
                    console.log("Användaren är på en väg");
                } else {
                    console.log("Användaren är inte på en väg");
                }

            } else {
                console.log("Det uppstod ett fel när vi försökte kolla om användaren var på en väg.");
            }
        });
    } else {
        console.log("Could not find nearest road.");
    }
    
}
function getNearestRoads(position) {
    var test = "60.170880%2C24.942795%7C60.170879%2C24.942796%7C60.170877%2C24.942796";
    var url = "https://roads.googleapis.com/v1/nearestRoads?points="+position.lat+","+position.lng+"&key=AIzaSyBkBbF39y-c4swhua_X7KozY0W8nSMnqKA";

    fetch(url)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            return data;
            
        })
        .catch(function (error) {
            console.log(error);
    });
    
}