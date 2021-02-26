window.onload = function (){
    var apiget = localStorage.getItem("api")
    var getaddress = localStorage.getItem("address")

    localStorage.setItem("opened", "balance.html")

    var href = "https://sugarchain.org/explorer/#/address/" + getaddress

    $("#history").attr("href", href)

    $("#addressInput").val(getaddress)
    
    if (apiget == null) {
        var api = "https://api.sugarchain.org"
    }
    else {
        var api = apiget
    }
    console.log(api)

    function apiCall() {
        return Promise.resolve($.ajax({
            url: api + "/balance/" + $("#addressInput").val(),
            dataType: 'json',
            type: 'GET'
        }))
    }

    function getBalance() {
        $("#currentBalance").text("loading...")
        apiCall().then(function(data) {
            var getbalance = data.result.balance
            var balance = getbalance / 100000000
            $("#currentBalance").text(balance + " SUGAR")
        })
    }

    function getReceived() {
        $("#currentRecieved").text("loading...")
        apiCall().then(function (data) {
            var getreceived = data.result.received
            var received = getreceived / 100000000
            $("#currentRecieved").text(received + " SUGAR")
            })
    }

    function caclSpent() {
        $("#currentSpent").text("loading...")
        apiCall().then(function (data) {
            var getreceived = data.result.received
            var getbalance = data.result.balance
            var spent = (getreceived - getbalance) / 100000000
            $("#currentSpent").text(spent + " SUGAR")
            })
    }

    function checkAPI() {
        apiCall().then(function(data) {
            if (data.error == null) {
                getBalance()
                getReceived()
                caclSpent()
            }
            else {
                $("#currentBalance").text("Enter a valid Sugarchain address")
                $("#currentRecieved").text("")
                $("#currentSpent").text("")
            }
        })
    }

    setInterval(function() {
        checkAPI()
    }, 5000)
}