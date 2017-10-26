    function myFunction() {
        document.getElementById("MenuDropdown").classList.toggle("show");
    }
    
    function FSRDropdown_fun() {
        var tag = document.getElementById("FSRDropdown");
        if (tag.style.display === "block") tag.style.display = "none";
        else if (tag.style.display === "none" || tag.style.display === "") tag.style.display = "block";
    }
    
    function QSRDropdown_fun() {
        var tag = document.getElementById("QSRDropdown");
        if (tag.style.display === "block") tag.style.display = "none";
        else if (tag.style.display === "none" || tag.style.display === "") tag.style.display = "block";
    }