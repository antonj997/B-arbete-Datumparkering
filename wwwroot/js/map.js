function initMap() {
    var map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 63.1766832, lng: 14.636068099999989 },
        zoom: 20,
        mapTypeId: "roadmap",
        mapId: "869fd3c6510ec622",
        disableDefaultUI: true,
    });

    var marker = new google.maps.Marker({
        map: map,
        title: "Your Location",
    });

    // Define the geocoder
    var geocoder = new google.maps.Geocoder();

    // Track user's location and update map and closest address
    navigator.geolocation.watchPosition(
        function (position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
            };

            marker.setPosition(pos);
            map.setCenter(pos);

            // Find the closest address to the current location
            geocoder.geocode({ location: pos }, function (results, status) {
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
        },
        function () {
            // If geolocation is not enabled, default to center of map
            map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
        }
    );
}