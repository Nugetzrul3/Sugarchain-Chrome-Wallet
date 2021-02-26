//api = "https://api.sugarchain.org"
//localStorage.setItem("api", api)

window.onload = function() {
    var getaddress = localStorage.getItem("address")
    var href = "https://sugarchain.org/explorer/#/address/" + getaddress

    localStorage.setItem("opened", "settings.html")

    $("#history").attr("href", href)
}

var selectedEndpoint = $(this).children("option:selected").val()

if (selectedEndpoint == "1") {
    api = "https://api.sugarchain.org"
    localStorage.setItem("api", api)
}

else if (selectedEndpoint == "2") {
    api = "https://api-testnet.sugarchain.org"
    localStorage.setItem("api", api)
}
api = localStorage.getItem("api")
console.log(api)

$("#logoutButton").click(function (){
    localStorage.removeItem("wifKey")
    localStorage.removeItem("address")
    localStorage.removeItem("opened")
})