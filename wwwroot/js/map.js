function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 63.1766832, lng: 14.636068099999989 },
        zoom: 20,
        mapTypeId: 'roadmap',
        mapId: '869fd3c6510ec622',
        disableDefaultUI: true
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            var marker = new google.maps.Marker({
                position: pos,
                map: map,
                title: 'Your Location'
            });

            map.setCenter(pos);

            // Define the current location
            var currentLocation = new google.maps.LatLng(pos.lat, pos.lng);

            // Define the geocoder
            var geocoder = new google.maps.Geocoder();

            // Find the closest address to the current location
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
        }, function () {
            // If geolocation is not enabled, default to center of map
            map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
        });
    } else {
        // If geolocation is not supported, default to center of map
        map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
    }
}