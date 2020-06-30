var api
var prefix
var href
window.onload = function (){
    var getaddress = localStorage.getItem("address")

    localStorage.setItem("opened", "balance.html")

    var inputPlaceholder = $("#addressInput")

    $("#addressInput").val(getaddress)
    
    apiget = localStorage.getItem("apiSet")

    if (apiget == "mainnet") {
        api = "https://api.sugarchain.org"
        prefix = "SUGAR"
        inputPlaceholder.attr("placeholder", "sugar1q...")
        href = "https://sugarchain.org/explorer/#/address/" + getaddress
        $("#history").attr("href", href)
    }
    else if (apiget == "testnet"){
        api = "https://api-testnet.sugarchain.org"
        prefix = "TUGAR"
        inputPlaceholder.attr("placeholder", "tugar1q...")
        href = "https://sugar.wtf/#/address/" + getaddress
        $("#history").attr("href", href)
    }

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
            $("#currentBalance").text(balance + " " + prefix)
        })
    }

    function getReceived() {
        $("#currentRecieved").text("loading...")
        apiCall().then(function (data) {
            var getreceived = data.result.received
            var received = getreceived / 100000000
            $("#currentRecieved").text(received + " " + prefix)
            })
    }

    function caclSpent() {
        $("#currentSpent").text("loading...")
        apiCall().then(function (data) {
            var getreceived = data.result.received
            var getbalance = data.result.balance
            var spent = (getreceived - getbalance) / 100000000
            $("#currentSpent").text(spent + " " + prefix)
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

    setWalletInfoLang()
}

// Multi Lang
var lang = {
    'en': {
        // Page text
        'current-balance': "Current Balance:",
        'total-received': "Total Received:",
        'total-sent': "Total Sent:",

        // Tab text
        'create-wallet': "Create Wallet",
        'import-wallet': "Import Wallet",
        'your-wallet': "Your Wallet",
        'send': "Send",
        'tx-history': "History",
        'chain-info': "Chain Info",
        'settings': "Settings"
    },
    

    'fr': {
        // Page text
        'current-balance': "Existant équilibre:",
        'total-received': "Total Admis:",
        'total-sent': "Total Expédié:",

        // Tab text
        'create-wallet': "Créer Portefeuille",
        'import-wallet': "Importer Portefeuille",
        'your-wallet': "Votre Portefeuille",
        'send': "Envoyer",
        'tx-history': "L'histoire",
        'chain-info': "Chaîne Données",
        'settings': "Paramètres"        
    },

    'kr': {
        // Page text
        'current-balance': "흘림글씨의 밸런스:",
        'total-received': "합계 백엔드:",
        'total-sent': "합계 보냄:",

        // Tab text
        'create-wallet': "창조하다 지갑",
        'import-wallet': "수입 지갑",
        'your-wallet': "너의 지갑",
        'send': "보내다",
        'tx-history': "역사",
        'chain-info': "체인 정보",
        'settings': "설정"
    },

    'id': {
        // Page text
        'current-balance': "Mutakhir Saldo:",
        'total-received': "Total Diterima:",
        'total-sent': "Total Dikirim:",

        // Tab text
        'create-wallet': "Dompet Membuat",
        'import-wallet': "Dompet Impor",
        'your-wallet': "Dompet Anda",
        'send': "Kirim",
        'tx-history': "Sejarah",
        'chain-info': "Data Rantai",
        'settings': "Pengaturan"
    },

    'es': {
        // Page text
        'current-balance': "Presente Saldo:",
        'total-received': "Total Recibido:",
        'total-sent': "Total Expedido:",

        // Tab text
        'create-wallet': "Billetera Crear",
        'import-wallet': "Billetera Importar",
        'your-wallet': "Billetera Tu",
        'send': "Enviar",
        'tx-history': "Historia",
        'chain-info': "Informacion Red",
        'settings': "El Ajuste"
    },

    'ru': {
        // Page text
        'current-balance': "современный Баланс:",
        'total-received': "итог полученный:",
        'total-sent': "итог посланный:",

        // Tab text
        'create-wallet': "Кошелька Создайте",
        'import-wallet': "Кошелька ввозить",
        'your-wallet': "Кошелька Ваш",
        'send': "послать",
        'tx-history': "история",
        'chain-info': "Информация сеть",
        'settings': "настройки"
    },

    'zh': {
        // Page text
        'current-balance': "当前 平衡:",
        'total-received': "总 被认为标准的:",
        'total-sent': "总 已发送:",

        // Tab text
        'create-wallet': "创造 钱包",
        'import-wallet': "进口 钱包",
        'your-wallet': "你的 钱包",
        'send': "发送",
        'tx-history': "历史",
        'chain-info': "网络 信息",
        'settings': "设定值"
    },

    'ja': {
        // Page text
        'current-balance': "電流 残高:",
        'total-received': "総計 受け取った:",
        'total-sent': "総計 送った:",

        // Tab text
        'create-wallet': "作成する 財布",
        'import-wallet': "インポート 財布",
        'your-wallet': "きみの 財布",
        'send': "送る",
        'tx-history': "歴史",
        'chain-info': "通信網 情報",
        'settings': "設定"
    },
}

function setWalletInfoLang() {
    if (localStorage['lang'] == null) {
        // Page text
        $("#current-balance").text(lang['en']['current-balance'])
        $("#endpointLabel").text(lang['en']['total-received'])
        $("#logoutButton").text(lang['en']['total-sent'])
        $("#license1").text(lang['en']['license'])

        // Tab text
        $("#create-wallet").text(lang['en']['create-wallet'])
        $("#import-wallet").text(lang['en']['import-wallet'])
        $("#your-wallet").text(lang['en']['your-wallet'])
        $("#send").text(lang['en']['send'])
        $("#tx-history").text(lang['en']['tx-history'])
        $("#chain-info").text(lang['en']['chain-info'])
        $("#settings").text(lang['en']['settings'])
    }
    else {
        // Page text
        $("#current-balance").text(lang[localStorage.getItem("lang")]['current-balance'])
        $("#total-received").text(lang[localStorage.getItem("lang")]['total-received'])
        $("#total-sent").text(lang[localStorage.getItem("lang")]['total-sent'])
        $("#license1").text(lang[localStorage.getItem("lang")]['license'])

        // Tab text
        $("#create-wallet").text(lang[localStorage.getItem("lang")]['create-wallet'])
        $("#import-wallet").text(lang[localStorage.getItem("lang")]['import-wallet'])
        $("#your-wallet").text(lang[localStorage.getItem("lang")]['your-wallet'])
        $("#send").text(lang[localStorage.getItem("lang")]['send'])
        $("#tx-history").text(lang[localStorage.getItem("lang")]['tx-history'])
        $("#chain-info").text(lang[localStorage.getItem("lang")]['chain-info'])
        $("#settings").text(lang[localStorage.getItem("lang")]['settings'])
    }
}