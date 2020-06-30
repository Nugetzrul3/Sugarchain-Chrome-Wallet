//api = "https://api.sugarchain.org"
//localStorage.setItem("api", api)
var href
var selectedEndpoint = document.getElementById("endpointSelect")
window.onload = function() {
    var getaddress = localStorage.getItem("address")
    
    // Sets overlay.html to open to settings page
    localStorage.setItem("opened", "settings.html")

    setSettingsLang()

    var apiget = localStorage.getItem("apiSet")

    // Sets History Tab to open to explorer
    if (apiget == "mainnet") {
        href = "https://sugarchain.org/explorer/#/address/" + getaddress
    }
    else if (apiget == "testnet"){
        href = "https://sugar.wtf/#/address/" + getaddress
    }
    $("#history").attr("href", href)

    selectedEndpoint.value = localStorage.getItem("apiSet")
}

selectedEndpoint.onchange = function () {
    localStorage.setItem("apiSet", this.value)
    setAPI()
    localStorage.removeItem("address")
    document.location.reload()
}

var mainnet = "https://api.sugarchain.org"
var testnet = "https://api-testnet.sugarchain.org"
function setAPI() {
    var apiSet = localStorage.getItem("apiSet")

    if (apiSet == "mainnet") {
        localStorage.setItem("api", mainnet)
    }
    else if (apiSet == "testnet") {
        localStorage.setItem("api", testnet)
    }
}

// Clear Local Storage (WIF, Address, reset overlay.html and reset endpoint)
$("#logoutButton").click(function (){
    localStorage.removeItem("wifKey")
    localStorage.removeItem("address")
    localStorage.removeItem("opened")
    // Default back to mainnet api
    localStorage.removeItem("api")
    localStorage.setItem("apiSet", "mainnet")
})

// Multi Lang
var lang = {
    'en': {
        // Page text
        'langlabel': "Language",
        'endpointlabel': "Endpoint",
        'logouttext': "Logout",
        'license': "View License",

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
        'langlabel': "Langue",
        'endpointlabel': "Backend De Portefeuille",
        'logouttext': "Se Déconnecter",
        'license': "Voir la License",

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
        'langlabel': "언어",
        'endpointlabel': "지갑 백엔드",
        'logouttext': "로그 아웃",
        'license': "라이센스보기",

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
        'langlabel': "Bahasa",
        'endpointlabel': "Backend Dompet",
        'logouttext': "Keluar",
        'license': "Lihat Lisensi",

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
        'langlabel': "Lenguaje",
        'endpointlabel': "Backend Billetera",
        'logouttext': "Cerrar sesión",
        'license': "Ver Licencia",

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
        'langlabel': "язык",
        'endpointlabel': "Бэкэнд Кошелька",
        'logouttext': "Выйти",
        'license': "Посмотреть лицензию",

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
        'langlabel': "语言",
        'endpointlabel': "钱包 后端",
        'logouttext': "登出",
        'license': "视图 执照",

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
        'langlabel': "言語",
        'endpointlabel': "財布 バックエンド",
        'logouttext': "ログアウト",
        'license': "見る ライセンス",

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

// Set mutli-lang
function setSettingsLang() {
    var langset = document.getElementById("languageSelect")
    langset.onchange = function () {
        localStorage.setItem("lang", this.value)
        document.location.reload()
    }

    if (localStorage['lang'] == null) {
        // Page text
        $("#langlabel").text(lang['en']['langlabel'])
        $("#endpointLabel").text(lang['en']['endpointlabel'])
        $("#logoutButton").text(lang['en']['logouttext'])
        $("#license1").text(lang['en']['license'])

        // Tab text
        $("#create-wallet").text(lang['en']['create-wallet'])
        $("#import-wallet").text(lang['en']['import-wallet'])
        $("#your-wallet").text(lang['en']['your-wallet'])
        $("#send").text(lang['en']['send'])
        $("#tx-history").text(lang['en']['tx-history'])
        $("#chain-info").text(lang['en']['chain-info'])
        $("#settings").text(lang['en']['settings'])
        langset.value = 'en'
    }
    else {
        // Page text
        $("#langlabel").text(lang[localStorage.getItem("lang")]['langlabel'])
        $("#endpointLabel").text(lang[localStorage.getItem("lang")]['endpointlabel'])
        $("#logoutButton").text(lang[localStorage.getItem("lang")]['logouttext'])
        $("#license1").text(lang[localStorage.getItem("lang")]['license'])

        // Tab text
        $("#create-wallet").text(lang[localStorage.getItem("lang")]['create-wallet'])
        $("#import-wallet").text(lang[localStorage.getItem("lang")]['import-wallet'])
        $("#your-wallet").text(lang[localStorage.getItem("lang")]['your-wallet'])
        $("#send").text(lang[localStorage.getItem("lang")]['send'])
        $("#tx-history").text(lang[localStorage.getItem("lang")]['tx-history'])
        $("#chain-info").text(lang[localStorage.getItem("lang")]['chain-info'])
        $("#settings").text(lang[localStorage.getItem("lang")]['settings'])
        langset.value = localStorage.getItem("lang")
    }
}