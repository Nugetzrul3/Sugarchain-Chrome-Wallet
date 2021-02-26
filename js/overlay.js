window.onload = function() {
    var pageopen = localStorage.getItem("opened")

    if (pageopen == null) {
        window.open("index.html", "_self")
    }
    else {
        window.open(pageopen, "_self")
    }
}