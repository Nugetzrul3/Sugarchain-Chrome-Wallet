var netconfig
var href
window.onload = function() {
    var getaddress = localStorage.getItem("address")
    // Set overlay.js to open to import page
    localStorage.setItem("opened", "import.html")

    setImportLang()

    var apiget = localStorage.getItem("apiSet")

    // Sets History Tab to open to explorer
    if (apiget == "mainnet" || apiget == null) {
        href = "https://sugarchain.org/explorer/#/address/" + getaddress
    }
    else if (apiget == "testnet") {
        href = "https://sugar.wtf/#/address/" + getaddress
    }
    $("#history").attr("href", href)

    getImportAPI()
}

function getImportAPI() {
    // Set Network config according to Endpoint selection
    if (localStorage.getItem("api") == "https://api.sugarchain.org" || localStorage.getItem("api") == null){
        netconfig = {					
           'network': {
                'messagePrefix': '\x19Sugarchain Signed Message:\n',
                'bip32': {
                    'public': 0x0488b21e,
                    'private': 0x0488ade4
                },
               'bech32': 'sugar',
               'pubKeyHash': 0x3F,
               'scriptHash': 0x7D,
                'wif': 0x80}
        }
    }
    
    else if (localStorage.getItem("api") == "https://api-testnet.sugarchain.org") {
        netconfig = {					
            'network': {
                'messagePrefix': '\x19Sugarchain Signed Message:\n',
                'bip32': {
                    'public': 0x0488b21e,
                    'private': 0x0488ade4
                },
                'bech32': 'tugar',
                'pubKeyHash': 0x42,
                'scriptHash': 0x80,
                'wif': 0xEF}
        }
    }
}

var alert1
var alert2
$("#wifImport").click(function() {
    // If the WIF Key is 51 or 52 character length, run import function
    if ($("#wifInput").val().length == 52 || $("#wifInput").val().length == 51) {

        // Get WIF from the user input
        var wifInput = $("#wifInput").val()

        var wifKey = bitcoin.ECPair.fromWIF(wifInput, netconfig['network'])
        var redeem = bitcoin.payments.p2wpkh({'pubkey': wifKey.publicKey, 'network': netconfig['network']})
    
        var legacyadd = bitcoin.payments.p2pkh({'pubkey': wifKey.publicKey, 'network': netconfig['network']}).address
        var segwitadd = bitcoin.payments.p2sh({'redeem': redeem, 'network': netconfig['network']}).address
        var bech32add = bitcoin.payments.p2wpkh({'pubkey': wifKey.publicKey, 'network': netconfig['network']}).address

        alert(alert1)

        // Only set bech32 address and WIF key
        localStorage.setItem("address", bech32add)
        localStorage.setItem("wifKey", $("#wifInput").val())
    
        $("#showLegacy").text(legacyadd)
        $("#showBech32").text(bech32add)
        $("#showSegwit").text(segwitadd)
    }
    // Else show error
    else if ($("#wifInput").val().length != 52 || $("#wifInput").val().length != 51){
        alert(alert2)

        $("#showLegacy").text('')
        $("#showBech32").text('')
        $("#showSegwit").text('')
    }

    var getaddress = localStorage.getItem("address")

    var apiget = localStorage.getItem("apiSet")

    // Sets History Tab to open to explorer
    if (apiget == "mainnet") {
        href = "https://sugarchain.org/explorer/#/address/" + getaddress
    }
    else if (apiget == "testnet") {
        href = "https://sugar.wtf/#/address/" + getaddress
    }
    $("#history").attr("href", href)
})

var lang = {
    'en': {
        // Page text
        'wifImport': "Import WIF",
        'legacy': "Legacy address:",
        'segwit': "Segwit address:",
        'bech32': "Bech32 address:",
        'alert1': "WIF Imported Successfully",
        "alert2": "WIF Invalid",
        'logoutreminder': {
            'part1': "Remember to",
            'logoutlink': "Logout",
            'part2': "before exiting Chrome",
        },

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
        'wifImport': "Importer WIF",
        'legacy': "Legacy Adresse:",
        'segwit': "Segwit Adresse:",
        'bech32': "Bech32 Adresse:",
        'alert1': "WIF Importé Succès",
        "alert2": "WIF invalide",
        'logoutreminder': {
            'part1': "Se souvenir de",
            'logoutlink': "Se Déconnecter",
            'part2': "avant de sortir Chrome",
        },

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
        'wifImport': "수입 WIF",
        'legacy': "Legacy 주소를:",
        'segwit': "Segwit 주소를:",
        'bech32': "Bech32 주소를:",
        'alert1': "WIF 수입품 성공적으로",
        "alert2": "WIF 무효로 하는",
        'logoutreminder': {
            'part1': "기억해",
            'logoutlink': "로그 아웃",
            'part2': "종료하기 전에",
        },

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
        'wifImport': "Impor WIF",
        'legacy': "Legacy Alamat:",
        'segwit': "Segwit Alamat:",
        'bech32': "Bech32 Alamat:",
        'alert1': "WIF yg diimpor Berhasil",
        "alert2": "WIF batal",
        'logoutreminder': {
            'part1': "Ingat untuk",
            'logoutlink': "Keluar",
            'part2': "sebelum keluar Chrome",
        },

        // Tab text
        'create-wallet': "Membuat Dompet",
        'import-wallet': "Impor Dompet",
        'your-wallet': "Dompet Anda",
        'send': "Kirim",
        'tx-history': "Riwayat",
        'chain-info': "Data Rantai",
        'settings': "Pengaturan"
    },

    'es': {
        // Page text
        'wifImport': "Importar WIF",
        'legacy': "Legacy Alocución:",
        'segwit': "Segwit Alocución:",
        'bech32': "Bech32 Alocución:",
        'alert1': "WIF Importado Exitosamente",
        "alert2": "WIF inválido",
        'logoutreminder': {
            'part1': "Recuerda a",
            'logoutlink': "Cerrar sesión",
            'part2': "antes de irse Chrome",
        },

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
        'wifImport': "Импорт WIF ключа",
        'legacy': "Legacy адрес:",
        'segwit': "Segwit адрес:",
        'bech32': "Bech32 адрес:",
        'alert1': "WIF ключ успешно импортирован",
        "alert2": "Недействительный WIF",
        'logoutreminder': {
            'part1': "Помните в",
            'logoutlink': "Выйти",
            'part2': "перед выходом",
        },
    
        // Tab text
        'create-wallet': "Создать кошелек",
        'import-wallet': "Импорт кошелька",
        'your-wallet': "Ваш кошелек",
        'send': "Отправить",
        'tx-history': "История",
        'chain-info': "Информация о сети",
        'settings': "Настройки"
    },

    'zh': {
        // Page text
        'wifImport': "导入WIF",
        'legacy': "Legacy地址:",
        'segwit': "Segwit地址:",
        'bech32': "Bech32地址:",
        'alert1': "导入WIF地址成功",
        "alert2": "无效的WIF",
        'logoutreminder': {
            'part1': "记得 至",
            'logoutlink': "登出",
            'part2': "退出前 Chrome",
        },

        // Tab text
        'create-wallet': "创建钱包",
        'import-wallet': "导入钱包",
        'your-wallet': "你的钱包",
        'send': "发送",
        'tx-history': "历史",
        'chain-info': "网络信息",
        'settings': "设置"
    },

    'ja': {
        // Page text
        'wifImport': "インポート WIF",
        'legacy': "Legacy 住所:",
        'segwit': "Segwit 住所:",
        'bech32': "Bech32 住所:",
        'alert1': "WIF 舶来 成功した",
        "alert2": "WIF 病弱な",
        'logoutreminder': {
            'part1': "覚えて に",
            'logoutlink': "ログアウト",
            'part2': "出る前に Chrome",
        },

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

function setImportLang() {
    if (localStorage['lang'] == null) {
        // Page text
        $("#segwit").text(lang['en']['segwit'])
        $("#legacy").text(lang['en']['legacy'])
        $("#wifImport").text(lang['en']['wifImport'])
        $("#bech32").text(lang['en']['bech32'])
        $("#part1").text(lang['en']['logoutreminder']['part1'])
        $("#logoutlink").text(lang['en']['logoutreminder']['logoutlink'])
        $("#part2").text(lang['en']['logoutreminder']['part2'])
        alert1 = lang['en']['alert1']
        alert2 = lang['en']['alert2']

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
        $("#segwit").text(lang[localStorage.getItem("lang")]['segwit'])
        $("#legacy").text(lang[localStorage.getItem("lang")]['legacy'])
        $("#wifImport").text(lang[localStorage.getItem("lang")]['wifImport'])
        $("#bech32").text(lang[localStorage.getItem("lang")]['bech32'])
        $("#part1").text(lang[localStorage.getItem("lang")]['logoutreminder']['part1'])
        $("#logoutlink").text(lang[localStorage.getItem("lang")]['logoutreminder']['logoutlink'])
        $("#part2").text(lang[localStorage.getItem("lang")]['logoutreminder']['part2'])
        alert1 = lang[localStorage.getItem("lang")]['alert1']
        alert2 = lang[localStorage.getItem("lang")]['alert2']

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
