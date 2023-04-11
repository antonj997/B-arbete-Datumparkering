function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 63.1766832, lng: 14.636068099999989 },
        mapTypeId: 'roadmap',
        mapId: '869fd3c6510ec622'
    });
    var datumparkeringBoundaryCoords = [
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
        { lat: 63.18359405562867, lng: 14.573741135545484 },
        { lat: 63.17968654358582, lng: 14.572225466507843 },
        { lat: 63.17656015431034, lng: 14.566379314123928 },
        { lat: 63.17799312449886, lng: 14.533828516573006 },
        { lat: 63.16392089330742, lng: 14.534261564869476 },
        { lat: 63.16389705742495, lng: 14.592092129025437 },
        { lat: 63.121792308944016, lng: 14.76607945140348 }
    ];
    var datumparkeringBoundary = new google.maps.Polyline({
        path: datumparkeringBoundaryCoords,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };

                var marker = new google.maps.Marker({
                    position: pos,
                    map: map,
                    title: "Your Location",
                });

                map.setCenter(pos);
            },
            function () {
                // If geolocation is not enabled, default to center of map
                map.setCenter(center);
            }
        );
    } else {
        // If geolocation is not supported, default to center of map
        map.setCenter(center);
    }
}


