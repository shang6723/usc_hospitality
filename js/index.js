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
    

    function Focus_rest(id) {
        var c = id;
    }
    $(document).ready(function() {
        $("#menu").click(function() {
            $.ajax({
                type: "POST",
                url: "./php/query.php",
                dataType: "json",
                success: function(data) {
                    $("#FSRDropdown").empty();
                    $("#QSRDropdown").empty();
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].type == "FSR") {
                            $("#FSRDropdown").append("<a href='#' onclick=Focus_rest('" + data[i].id + "')>" + data[i].name + "</a>");
                        } else {
                            $("#QSRDropdown").append("<a href='#' onclick=Focus_rest('" + data[i].id + "')>" + data[i].name + "</a>");
                        }
                    }
                },
                error: function(jqXHR) {
                    alert("error:" + jqXHR.status);
                }
            });
        });
    });