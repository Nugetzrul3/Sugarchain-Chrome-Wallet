window.onload = function (){
    api = "https://api.sugarchain.org"
    var sugaraddress = $("#addressInput").val();
    console.log(sugaraddress)

    function apiCall() {
        return Promise.resolve($.ajax({
            url: api + "/balance/sugar1qtl7u435t4jly2hdaa7hrcv5qkpvwa0spd9zzc7", //+ sugaraddress
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
            console.log(sugaraddress)
        })
    }
}