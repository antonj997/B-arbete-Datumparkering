function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 63.1766832, lng: 14.636068099999989 },
        zoom: 20,
        mapTypeId: 'roadmap',
        mapId: '869fd3c6510ec622',
        disableDefaultUI: true
    });

    // Define the geocoder
    var geocoder = new google.maps.Geocoder();

    // Track the user's location and update the map as the user moves
    if (navigator.geolocation) {
        var currentLocationMarker = null;
        var currentLocation = null;
        navigator.geolocation.watchPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Update the current location marker
            if (!currentLocationMarker) {
                currentLocationMarker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: 'Your Location'
                });
            } else {
                currentLocationMarker.setPosition(pos);
            }

            // Update the current location and find the closest address
            currentLocation = new google.maps.LatLng(pos.lat, pos.lng);
            geocoder.geocode({ location: currentLocation }, function (results, status) {
                if (status === "OK") {
                    if (results[0]) {
                        console.log(results[0].formatted_address);
                    } else {
                        console.log("No results found");
                    }
                } else {
                    console.log("Geocoder failed due to: " + status);
                }
            });

            // Center the map on the current location
            map.setCenter(pos);
        }, function () {
            // If geolocation is not enabled, default to center of map
            map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
        }, { enableHighAccuracy: true, maximumAge: 3000, timeout: 5000 });
    } else {
        // If geolocation is not supported, default to center of map
        map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
    }
}