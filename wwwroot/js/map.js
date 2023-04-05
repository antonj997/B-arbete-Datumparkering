function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 63.1766832, lng: 14.636068099999989 },
        zoom: 20,
        mapTypeId: 'roadmap',
        mapId: '869fd3c6510ec622',
        disableDefaultUI: true
    });

    // Define the marker
    var marker = new google.maps.Marker({
        map: map,
        title: "Closest address"
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

        marker.setPosition(pos);
        console.log("update");

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
    }, function () {
        // If geolocation is not enabled, default to center of map
        map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
    }, { enableHighAccuracy: true, maximumAge: 3000 });
}