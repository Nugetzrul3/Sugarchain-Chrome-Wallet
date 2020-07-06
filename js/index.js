window.onload = function() {
    setIndexLang()
}

var lang = {
    'en': {
        // Page text
        'langlabel': "Language",
        'create-wallet-button': "Create Wallet",
        'import-wallet-button': "Import Wallet",
    },
    

    'fr': {
        // Page text
        'create-wallet-button': "Créer Portefeuille",
        'import-wallet-button': "Importer Portefeuille",       
    },

    'kr': {
        // Page text
        'create-wallet-button': "창조하다 지갑",
        'import-wallet-button': "수입 지갑",
    },

    'id': {
        // Page text
        'create-wallet-button': "Dompet Membuat",
        'import-wallet-button': "Dompet Impor",
    },

    'es': {
        // Page text
        'create-wallet-button': "Billetera Crear",
        'import-wallet-button': "Billetera Importar",
    },

    'ru': {
        // Page text
        'create-wallet-button': "Кошелька Создайте",
        'import-wallet-button': "Кошелька ввозить",
    },

    'zh': {
        // Page text
        'create-wallet-button': "创建钱包",
        'import-wallet-button': "导入钱包",
    },

    'ja': {
        // Page text
        'create-wallet-button': "作成する 財布",
        'import-wallet-button': "インポート 財布",
    },
}

function setIndexLang() {
    if (localStorage['lang'] == null){
        $("#create-wallet-button").text(lang['en']['create-wallet-button'])
        $("#import-wallet-button").text(lang['en']['import-wallet-button'])
    }
    else {
        $("#create-wallet-button").text(lang[localStorage.getItem("lang")]['create-wallet-button'])
        $("#import-wallet-button").text(lang[localStorage.getItem("lang")]['import-wallet-button'])
    }
}
