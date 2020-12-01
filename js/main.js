var alertmsg
var netconfig
var href
window.onload = function() {
    var getaddress = localStorage.getItem("address")

    localStorage.setItem("opened", "main.html")

    $("#addressDisplay").text(getaddress)

    setMainLang()

    var apiget = localStorage.getItem("apiSet")

    console.log(apiget)

    // Sets History Tab to open to explorer
    if (apiget == "mainnet" || apiget == null) {
        href = "https://sugarchain.org/explorer/#/address/" + getaddress
    }
    else if (apiget == "testnet") {
        href = "https://sugar.wtf/#/address/" + getaddress
    }
    $("#history").attr("href", href)

    getMainAPI()

}

function getMainAPI() {
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

$("#generateAddress").click(function() {
    var addresstype = $("#addressType").val()
    var key = bitcoin.ECPair.makeRandom({'network': netconfig['network']})
    var wif = key.toWIF()

    if (addresstype == "3") {
        address = bitcoin.payments.p2pkh({'pubkey': key.publicKey, 'network': netconfig['network']}).address
        $("#addressDisplay").text(address)
        localStorage.setItem("address", address)
    }
    else if (addresstype == "2") {
        redeem = bitcoin.payments.p2wpkh({'pubkey': key.publicKey, 'network': netconfig['network']})
        address = bitcoin.payments.p2sh({'redeem': redeem, 'network': netconfig['network']}).address
        $("#addressDisplay").text(address)
        localStorage.setItem("address", address)
    }
    else if (addresstype == "1"){
        address = bitcoin.payments.p2wpkh({'pubkey': key.publicKey, 'network': netconfig['network']}).address
        $("#addressDisplay").text(address)
        localStorage.setItem("address", address)
    }

    // Sets WIF key in local storage for sending
    localStorage.setItem("wifKey", wif)
    // WIF key only showed once for security purposes
    $("#wifDisplay").text(wif)

    alert(alertmsg)

    var getaddress = localStorage.getItem("address")

    var apiget = localStorage.getItem("apiSet")

    // Sets History Tab to open to explorer
    if (apiget == "mainnet" || apiget == null) {
        href = "https://sugarchain.org/explorer/#/address/" + getaddress
    }
    else if (apiget == "testnet") {
        href = "https://sugar.wtf/#/address/" + getaddress
    }
    $("#history").attr("href", href)
})

// Multi Lang
var lang = {
    'en': {
        // Page text
        'generateAddress': "Generate Address",
        'addressTypeLabel': "Address type:",
        'your-address': "Your Address:",
        'your-wif': "Your WIF:",
        'importantmsg': "IMPORTANT: Make sure you store your WIF key in a secure place before doing anything else",
        'alertmsg': "Address Generated Successfully",
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
        'generateAddress': "Produire Adresse",
        'addressTypeLabel': "Adresse Catégorie:",
        'your-address': "Votre Adresse:",
        'your-wif': "Votre WIF:",
        'importantmsg': "IMPORTANT: Assurez-vous conserver votre WIF clé dans un sécurise endroit avant faire quelque chose autre",
        'alertmsg': "Adresse Généré Avec succès",
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
        'generateAddress': "주소를 생성",
        'addressTypeLabel': "주소를 유형:",
        'your-address': "너의 주소를:",
        'your-wif': "너의 WIF:",
        'importantmsg': "중대한: 하다 확실한 당신 저장되다 너의 WIF 열쇠 안에 튼튼한 곳 전에 하기 아무것도 그밖에",
        'alertmsg': "주소 생성됨 성공적으로",
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
        'generateAddress': "Menghasilkan Alamat",
        'addressTypeLabel': "Tipe Alamat:",
        'your-address': "Anda Alamat:",
        'your-wif': "Anda WIF:",
        'importantmsg': "Penting: Yakinkan kamu menyimpan Anda WIF kunci di sebuah tempat yang aman sebelum perbuatan ada yang lain",
        'alertmsg': "Alamat Dihasilkan Berhasil",
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
        'generateAddress': "Generar la Alocución",
        'addressTypeLabel': "Tipo Dirección:",
        'your-address': "Tu alocución:",
        'your-wif': "Tu WIF:",
        'importantmsg': "Importante: Asegurarse tú almacenar Tu WIF llave en un seguro lugar antes de hacer Algo más",
        'alertmsg': "Alocución Generado Exitosamente",
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
        'generateAddress': "Сгенерировать адрес",
        'addressTypeLabel': "Тип адреса:",
        'your-address': "Ваш адрес:",
        'your-wif': "Ваш WIF ключ:",
        'importantmsg': "Важно: Убедитесь, что вы храните ваш ключ WIF в безопасном месте, прежде чем делать что-либо еще",
        'alertmsg': "Адрес сгенерировано успешно",
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
        'generateAddress': "生成地址",
        'addressTypeLabel': "地址类型:",
        'your-address': "你的地址:",
        'your-wif': "你的WIF:",
        'importantmsg': "重要: 在执行其他任何操作之前，请确保将WIF密钥存储在安全的地方",
        'alertmsg': "地址产生的成功",
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
        'generateAddress': "生成する アドレス",
        'addressTypeLabel': "アドレス 形式:",
        'your-address': "きみの アドレス:",
        'your-wif': "きみの WIF:",
        'importantmsg': "重要: 他の作業を行う前に、WIFキーを安全な場所に保管してください。",
        'alertmsg': "住所 生成された 成功した",
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

// Set mutli-lang
function setMainLang() {
    if (localStorage['lang'] == null) {
        // Page text
        $("#generateAddress").text(lang['en']['generateAddress'])
        $("#addressTypeLabel").text(lang['en']['addressTypeLabel'])
        $("#your-address").text(lang['en']['your-address'])
        $("#your-wif").text(lang['en']['your-wif'])
        $("#importantmsg").text(lang['en']['importantmsg'])
        $("#part1").text(lang['en']['logoutreminder']['part1'])
        $("#logoutlink").text(lang['en']['logoutreminder']['logoutlink'])
        $("#part2").text(lang['en']['logoutreminder']['part2'])
        alertmsg = lang['en']['alertmsg']

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
        $("#generateAddress").text(lang[localStorage.getItem("lang")]['generateAddress'])
        $("#addressTypeLabel").text(lang[localStorage.getItem("lang")]['addressTypeLabel'])
        $("#your-address").text(lang[localStorage.getItem("lang")]['your-address'])
        $("#your-wif").text(lang[localStorage.getItem("lang")]['your-wif'])
        $("#importantmsg").text(lang[localStorage.getItem("lang")]['importantmsg'])
        $("#part1").text(lang[localStorage.getItem("lang")]['logoutreminder']['part1'])
        $("#logoutlink").text(lang[localStorage.getItem("lang")]['logoutreminder']['logoutlink'])
        $("#part2").text(lang[localStorage.getItem("lang")]['logoutreminder']['part2'])
        alertmsg = lang[localStorage.getItem("lang")]['alertmsg']

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
