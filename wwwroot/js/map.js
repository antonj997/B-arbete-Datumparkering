var map;
var tapMarker;
var searchMarker;
var reqcount = 0;
var tapMarkers = [];
var searchMarkers = [];

var topCoords = [
    { lat: 63.18810627977892, lng: 14.550748585343229 },
    { lat: 63.18810627977892, lng: 14.69591697758541 },
    { lat: 63.2063028918599, lng: 14.683478270236819 },
    { lat: 63.2288732851519, lng: 14.65446403338345 },
    { lat: 63.22854818844582, lng: 14.629202881426004 },
    { lat: 63.22282588750988, lng: 14.62212975925033 },
    { lat: 63.2219154170181, lng: 14.608560912627608 },
    { lat: 63.21775290108519, lng: 14.600332994994677 },
    { lat: 63.17799312449886, lng: 14.533828516573006 },
   
];
var middleCoords = [
    { lat: 63.18810627977892, lng: 14.550748585343229 },
    { lat: 63.17799312449886, lng: 14.533828516573006 },
    { lat: 63.16392089330742, lng: 14.534261564869476 },
    { lat: 63.16389705742495, lng: 14.592092129025437 },
    { lat: 63.165866354440155, lng: 14.74295023768516 },
    { lat: 63.17101358989112, lng: 14.707584626052375 },
    { lat: 63.18810627977892, lng: 14.69591697758541 },
    { lat: 63.18810627977892, lng: 14.550748585343229 },
];
var bottomCoords = [
    { lat: 63.16389705742495, lng: 14.592092129025437 },
    { lat: 63.12152322147656, lng: 14.766334845860246 },
    { lat: 63.12961437522173, lng: 14.792462093080598 },
    { lat: 63.13626831169727, lng: 14.775428860086112 },
    { lat: 63.14070342199764, lng: 14.775428860086112 },
    { lat: 63.14598553686859, lng: 14.770376630261525 },
    { lat: 63.15719869005157, lng: 14.773407968336814 },
    { lat: 63.16580119337055, lng: 14.76084956773919 },
    { lat: 63.165866354440155, lng: 14.74295023768516 },
    { lat: 63.165866354440155, lng: 14.74295023768516 },
    { lat: 63.16389705742495, lng: 14.592092129025437 },
    
];

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
    { lat: 63.12152322147656, lng: 14.766334845860246 },
];

var polygons = [];

function initMap() {
    // Initialize the map
    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lat: 63.1766832, lng: 14.636068099999989 },
        mapTypeId: "roadmap",
        mapId: "869fd3c6510ec622",
        disableDefaultUI: true,
    });
    SetBoundry(map);
    slowZoom(map);
    // Define the marker for current location
    var userPosition = new google.maps.Marker({
        map: map,
        icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, // Use an arrow icon
            scale: 5, // Set the size of the arrow
            rotation: 0, // Set the initial rotation to 0 degrees
        }
    });


    google.maps.event.addListener(map, 'zoom_changed', function () {
       deletePolygons(polygons);
    });
   
    

    // Click listener to display the info window over userPosition
    userPosition.addListener("click", () => {
        // Open infowindow for user marker
        getInfowindow(userPosition, map);
    });


    

    map.addListener("click", (event) => {
        AddMarkerWithClick(map, event);

    });

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

function deletePolygons(polygons) {

        for (var i = 0; i < polygons.length; i++) {
            polygons[i].setMap(null);
        }
    
}


navigator.geolocation.watchPosition(successCallback, errorCallback, options);
function slowZoom(map) {
    setTimeout(function () {
        // zooma in på kartan från nivå 12 till 15 i 2 sekunder
        var zoomInterval = setInterval(function () {
            var zoom = map.getZoom();
            if (zoom >= 18) {
                clearInterval(zoomInterval);
            } else {
                map.setZoom(zoom + 1);
            }
        }, 60);
    }, 3000);
}

function SetBoundry(map) {
   
    boundryCoords = new google.maps.Polyline({
        path: boundryCoords,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });
    boundryCoords.setMap(map);

    // Skapa Polygon för varje del med sin egen färg
    var topBoundry = new google.maps.Polygon({
        paths: topCoords,
        strokeColor: "#00319C",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#00319C",
        fillOpacity: 0.35
    });
    topBoundry.setMap(map);
    var middleBoundry = new google.maps.Polygon({
        paths: middleCoords,
        strokeColor: "#FFFFFF",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FFFFFF",
        fillOpacity: 0.35
    });
    middleBoundry.setMap(map);
    var bottomBoundry = new google.maps.Polygon({
        paths: bottomCoords,
        strokeColor: "#319C63",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#319C63",
        fillOpacity: 0.35
    });
    bottomBoundry.setMap(map);

    polygons.push(topBoundry, middleBoundry, bottomBoundry);
}

// Gets adress form input, adds marker and infowindow and centers map over marker
function search() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById('search-input').value + ", Östersund";
    if (address.length !== "Postgränd 10, 831 30 Östersund, Sverige, Östersund") {

    
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            // Sorts the results based on their proximity to the user's location
            results.sort(function (a, b) {
                var distanceA = google.maps.geometry.spherical.computeDistanceBetween(a.geometry.location, map.getCenter());
                var distanceB = google.maps.geometry.spherical.computeDistanceBetween(b.geometry.location, map.getCenter());
                return distanceA - distanceB;
            });

            var location = results[0].geometry.location;
            map.setCenter(location);

            // Removes the previous search marker, if there is one
            removeMarker(searchMarker)

            // Creates a new search marker at the searched location
            searchMarker = new google.maps.Marker({
                map: map,
                position: location

            });
            searchMarkers.push(searchMarker);

            // Open infowindow for search marker
            getInfowindow(searchMarker, map);

            // Adding a listener to new marker that open infowindow on click
            searchMarkers.push(searchMarker)
            searchMarkers[0].addListener("click", () => {
                getInfowindow(searchMarker, map)
            });
        } else {
            alert('Search was not successful for the following reason: ' + status);
        }
    });
    }
    else {
        alert("Search not found")
    }
}

// Removes marker
function removeMarker(marker) {
    if (marker) {
        marker.setMap(null);
        tapMarkers.pop();
        searchMarkers.pop();
    }
}

// Gets location of marker and opens a infowindow with relevant content
function getInfowindow(marker, map) {
    const geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();
    geocoder.geocode({ location: marker.position }, function (results, status) {
        if (status === "OK" && results[0]) {
            const address = results[0].formatted_address;
            const streetNumber = address.match(/\d+/); // get the street number

            // check if the street number is odd or even
            const isOddStreetNumber = streetNumber % 2 !== 0;
            const isEvenStreetNumber = streetNumber % 2 == 0;

            // check if the date is odd or even
            const date = new Date();
            const isOddDate = date.getDate() % 2 !== 0;
            const isEvenDate = date.getDate() % 2 == 0;

            // set the content of the infowindow based on the street number and date
            let content = address;

            if (isOddStreetNumber && isOddDate || isEvenStreetNumber && isEvenDate) {
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


// Addig marker on location of clicklistener
function AddMarkerWithClick(map, event) { 
    
        // Remove previous marker if there is one 
        removeMarker(tapMarker)
        // Create a new marker
        tapMarker = new google.maps.Marker({
            position: event.latLng,
            map: map,
        });
     

    // Open infowindow for tap marker
    getInfowindow(tapMarker, map);

    // Adding a listener to new marker
    tapMarkers.push(tapMarker)
    tapMarkers[0].addListener("click", () => {
        getInfowindow(tapMarker, map)
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