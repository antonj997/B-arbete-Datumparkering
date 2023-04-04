function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 63.1766832, lng: 14.636068099999989 },
        zoom: 20,
        mapTypeId: "roadmap",
        mapId: "869fd3c6510ec622",
        disableDefaultUI: true,
    });

    // Define the geocoder
    var geocoder = new google.maps.Geocoder();

    // Define the marker
    var marker = new google.maps.Marker({
        map: map,
        title: "Your Location",
    });

    // Define the info window
    var infoWindow = new google.maps.InfoWindow();

    // Use watchPosition to track the user's location
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
            function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                // Update the marker position
                marker.setPosition(pos);

                // Update the map center
                map.setCenter(pos);

                // Find the closest address to the current location
                geocoder.geocode({ location: pos }, function (results, status) {
                    if (status === "OK") {
                        if (results[0]) {
                            // Update the info window content
                            infoWindow.setContent(results[0].formatted_address);
                            infoWindow.open(map, marker);
                        } else {
                            console.log("No results found");
                        }
                    } else {
                        console.log("Geocoder failed due to: " + status);
                    }
                });
            },
            function () {
                // If geolocation is not enabled, default to center of map
                map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
            }
        );
    } else {
        // If geolocation is not supported, default to center of map
        map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
    }
}