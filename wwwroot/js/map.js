function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 63.1766832, lng: 14.636068099999989 },
        zoom: 20,
        mapTypeId: 'roadmap',
        mapId: '869fd3c6510ec622'
        
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
        }, function () {
            // If geolocation is not enabled, default to center of map
            map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
        });
    } else {
        // If geolocation is not supported, default to center of map
        map.setCenter({ lat: 63.1766832, lng: 14.636068099999989 });
    }
}


