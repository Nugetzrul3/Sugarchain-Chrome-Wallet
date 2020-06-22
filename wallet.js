window.onload = function (){
    api = "https://api.sugarchain.org"

    function apiCall() {
        return Promise.resolve($.ajax({
            url: api + "/balance/" + $("#addressInput").val(),
            dataType: 'json',
            type: 'GET'
        }))
    }

    document.getElementById("balanceButton").onclick = function() {getBalance()}

    function getBalance() {
        apiCall().then(function(data) {
            var getbalance = data.result.balance
            var balance = getbalance / 100000000
            $("#getBalance").text(balance + " SUGAR")
        })
    }
}