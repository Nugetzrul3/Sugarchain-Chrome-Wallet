window.onload = function (){
    api = "https://api.sugarchain.org"

    function apiCall() {
        return Promise.resolve($.ajax({
            url: api + "/balance/" + $("#addressInput").val(),
            dataType: 'json',
            type: 'GET'
        }))
    }

    document.getElementById("balanceButton").onclick = function() {getBalance(), getReceived(), caclSpent()}

    function getBalance() {
        apiCall().then(function(data) {
            var getbalance = data.result.balance
            var balance = getbalance / 100000000
            $("#currentBalance").text(balance + " SUGAR")
        })
    }

    function getReceived() {
        apiCall().then(function (data) {
            var getreceived = data.result.received
            var received = getreceived / 100000000
            $("#currentRecieved").text(received + " SUGAR")
            })
    }

    function caclSpent() {
        apiCall().then(function (data) {
            var getreceived = data.result.received
            var getbalance = data.result.balance
            var spent = (getreceived - getbalance) / 100000000
            $("#currentSpent").text(spent + " SUGAR")
            })
    }
}