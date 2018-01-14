    var map;
    //var locations = [
    //                    {lat: 34.020443, lng: -118.286224},
    //                    {lat: 34.019138, lng: -118.287956}
    //                    ];
    var marker;
    var markerarr = [];
    function initMap() {
        // map focus on
        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 34.021, lng: -118.286},
            zoom: 16
        });
        var customLabel = {
            restaurant: {
              label: 'R'
            },
            bar: {
              label: 'B'
            }
        };
        var infoWindow = new google.maps.InfoWindow;

          // Change this depending on the name of your PHP or XML file
          downloadUrl('http://www2.cs.ccu.edu.tw/~hsc100u/project/uscfoodmap/php/location.php', function(data) {
            var xml = data.responseXML;
            var markers = xml.documentElement.getElementsByTagName('marker');
            Array.prototype.forEach.call(markers, function(markerElem) {
              var name = markerElem.getAttribute('name');
              var address = markerElem.getAttribute('address');
              var type = markerElem.getAttribute('type');
              var point = new google.maps.LatLng(
                  parseFloat(markerElem.getAttribute('lat')),
                  parseFloat(markerElem.getAttribute('lng')));

              var infowincontent = document.createElement('div');
              var strong = document.createElement('strong');
              strong.textContent = name;
              infowincontent.appendChild(strong);
              infowincontent.appendChild(document.createElement('br'));

              var text = document.createElement('text');
              text.textContent = address;
              infowincontent.appendChild(text);
              var icon = customLabel[type] || {};
              marker = new google.maps.Marker({
                map: map,
                position: point,
                label: icon.label
              });
              marker.addListener('click', function() {
                infoWindow.setContent(infowincontent);
                infoWindow.open(map, marker);
              });
              markerarr.push(marker);
            });
          });
        
        
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
    
    function downloadUrl(url, callback) {
        var request = window.ActiveXObject ?
            new ActiveXObject('Microsoft.XMLHTTP') :
            new XMLHttpRequest;

        request.onreadystatechange = function() {
          if (request.readyState == 4) {
            request.onreadystatechange = doNothing;
            callback(request, request.status);
          }
        };

        request.open('GET', url, true);
        request.send(null);
    }

    function doNothing() {}