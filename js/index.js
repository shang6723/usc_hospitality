    var location_data;
    
    function RestaurantDropdown_func() {
        document.getElementById("MenuDropdown").classList.toggle("show");
    }
    
    function FSRDropdown_func() {
        var tag = document.getElementById("FSRDropdown");
        if (tag.style.display === "block") tag.style.display = "none";
        else if (tag.style.display === "none" || tag.style.display === "") tag.style.display = "block";
    }
    
    function QSRDropdown_func() {
        var tag = document.getElementById("QSRDropdown");
        if (tag.style.display === "block") tag.style.display = "none";
        else if (tag.style.display === "none" || tag.style.display === "") tag.style.display = "block";
    }
    

    function Focus_rest(lat, lng, name, address) {
        
        //Remove previous Marker.
        for (var i = 0; i < markerarr.length; i++) {
          markerarr[i].setMap(null);
        }
 
        //Set Marker on Map.
        var myLatlng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            position: myLatlng,
            map: map,
            title: name
        });
        
        markerarr.push(marker);
        
        //Create and open InfoWindow.
        var infoWindow = new google.maps.InfoWindow();
        var infowincontent = document.createElement('div');
        var strong = document.createElement('strong');
        strong.textContent = decodeURIComponent(name);
        infowincontent.appendChild(strong);
        infowincontent.appendChild(document.createElement('br'));
        var text = document.createElement('text');
        text.textContent = decodeURIComponent(address);
        infowincontent.appendChild(text);
        infoWindow.setContent(infowincontent);
        infoWindow.open(map, marker);
        //set marker clickable
        marker.addListener('click', function() {
            infoWindow.open(map, marker);
          });
    }
    $(document).ready(function() {
        $("#dropbtn").click(function() {
            $.ajax({
                type: "POST",
                url: "./php/query.php",
                dataType: "json",
                success: function(data) {
                    location_data = data;
                    $("#FSRDropdown").empty();
                    $("#QSRDropdown").empty();
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].type == "FSR") {
                            $("#FSRDropdown").append("<a href='#' onclick=Focus_rest('" + data[i].lat + "','" + data[i].lng + "','" + encodeURIComponent(data[i].name) + "','" + encodeURIComponent(data[i].address) + "')>" + data[i].name + "</a>");
                        } else {
                            $("#QSRDropdown").append("<a href='#' onclick=Focus_rest('" + data[i].lat + "','" + data[i].lng + "','" + encodeURIComponent(data[i].name) + "','" + encodeURIComponent(data[i].address) + "')>" + data[i].name + "</a>");
                        }
                    }
                },
                error: function(jqXHR) {
                    alert("error:" + jqXHR.status);
                }
            });
        });
    });