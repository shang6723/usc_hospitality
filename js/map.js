    var map;
    function initMap() {
        // map focus on
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 34.021, lng: -118.286},
            zoom: 16
        });
        
        var locations = [{lat: 34.020443, lng: -118.286224},
                        {lat: 34.019138, lng: -118.287956}];
        
        // Create an array of alphabetical characters used to label the markers.
        var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Add some markers to the map.
        // Note: The code uses the JavaScript Array.prototype.map() method to
        // create an array of markers based on a given "locations" array.
        // The map() method here has nothing to do with the Google Maps API.
        var markers = locations.map(function(location, i) {
          return new google.maps.Marker({
            position: location,
            label: labels[i % labels.length]
          });
        });

        // Add a marker clusterer to manage the markers.
        var markerCluster = new MarkerClusterer(map, markers,
            {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
        
        // map style
        var styledMapType = new google.maps.StyledMapType(
            [
                {"elementType": "geometry", "stylers": [{"color": "#242f3e"}]},
                {"elementType": "labels.text.fill", "stylers": [{"color": "#746855"}]},
                {"elementType": "labels.text.stroke", "stylers": [{"color": "#242f3e"}]},
                {"featureType": "administrative.locality", "elementType": "labels.text.fill","stylers": [{"color": "#d59563"}]},
                {"featureType": "poi", "elementType": "labels.text.fill", "stylers": [{"color": "#d59563"}]},
                {"featureType": "poi.park", "elementType": "geometry", "stylers": [{"color": "#263c3f"}]},
                {"featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{"color": "#6b9a76"}]},
                {"featureType": "road", "elementType": "geometry", "stylers": [{"color": "#38414e"}]},
                {"featureType": "road", "elementType": "geometry.stroke", "stylers": [{"color": "#212a37"}]},
                {"featureType": "road", "elementType": "labels.text.fill", "stylers": [{"color": "#9ca5b3"}]},
                {"featureType": "road.highway", "elementType": "geometry","stylers": [{"color": "#746855"}]},
                {"featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{"color": "#1f2835"}]},
                {"featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{"color": "#f3d19c"}]},
                {"featureType": "transit", "elementType": "geometry", "stylers": [{"color": "#2f3948"}]},
                {"featureType": "transit.station", "elementType": "labels.text.fill", "stylers": [{"color": "#d59563"}]},
                {"featureType": "water", "elementType": "geometry", "stylers": [{"color": "#17263c"}]},
                {"featureType": "water", "elementType": "labels.text.fill","stylers": [{"color": "#515c6d"}]},
                {"featureType": "water", "elementType": "labels.text.stroke", "stylers": [{"color": "#17263c"}]}
            ],
            {name: 'Styled Map'});
        map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');
    }