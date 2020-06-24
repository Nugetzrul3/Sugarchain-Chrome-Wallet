//api = "https://api.sugarchain.org"
//localStorage.setItem("api", api)
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