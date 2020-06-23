window.onload = function (){
    api = "https://api.sugarchain.org"

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

    setInterval(function() {
        if ($("#addressInput").val().length == 45) {
            getBalance()
            getReceived()
            caclSpent()
        }

        else if ($("#addressInput").val().length != 45) {
            $("#currentBalance").text("Enter a valid sugarchain address")
        }
    }, 5000)
}