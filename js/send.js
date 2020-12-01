var wif
var wifKey
var api
var address
var netconfig
var href
window.onload = function() {
    // Get WIF and address from local storage
    wifKey = localStorage.getItem("wifKey")
    address = localStorage.getItem("address")

    // Define variable to set placeholder if user chooses mainnet or testnet
    var inputPlaceholder = $("#sendInput")

    // Set overlay.js to open to send page
    localStorage.setItem("opened", "send.html")

    setSendPageLang()

    apiget = localStorage.getItem("apiSet")

    // Set history page to open to explorer & sets placeholder to testnet or mainnet prefix
    if (apiget == "mainnet" || apiget == null) {
        api = "https://api.sugarchain.org"
        inputPlaceholder.attr("placeholder", "sugar1q...")
        href = "https://sugarchain.org/explorer/#/address/" + address
    }
    else if (apiget == "testnet"){
        api = "https://api-testnet.sugarchain.org"
        inputPlaceholder.attr("placeholder", "tugar1q...")
        href = "https://sugar.wtf/#/address/" + address
    }
    $("#history").attr("href", href)

    getSendAPI()
}

var errororsuccess
function getSendAPI() {
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

$("#sendTx").click(function () {
    var feeinput = document.getElementById("feeSugar")
    console.log(feeinput.value)
    var fee = undefined
    var feeShow = undefined
    if (feeinput && feeinput.value) {
        fee = convertAmountFormat(feeinput.value, true)
        feeShow = convertAmountFormat(fee)
    }
    else {
        fee = 1000
        feeShow = convertAmountFormat(fee)
    }
    // Don't put fee in convertion of amount format
    var amount = convertAmountFormat(parseFloat($("#amountSUGAR").val()), true) + fee
    var amountShow = convertAmountFormat(amount)
    var receiver = $("#sendInput").val()

    var scripts = []

    ask = confirm("Confirm Transaction. You are about to send " + $("#amountSUGAR").val() + " SUGAR to " + receiver + ". The fee is " + feeShow/*(amountShow - Number($("#amountSUGAR").val()))*/ + " SUGAR\nTotal Cost: " + amountShow + " SUGAR")
    if (ask == true){
        var showErrororSuccess = $("#showErrororSuccess")
        showErrororSuccess.text("Sending Transaction...")

        wif = bitcoin.ECPair.fromWIF(wifKey, netconfig['network'])

        // Get unspent values to calculate change and sending value
        Promise.resolve($.ajax({
            url: api + "/unspent/" + address + "?amount=" + parseInt(amount, 10),
            dataType: 'json',
            type: 'GET'
        })).then(function(data) {

            var txbuilder = new bitcoin.TransactionBuilder(netconfig['network'])
            txbuilder.setVersion(2)

            txbuilder.addOutput(receiver, (amount - fee))
            
            var txvalue = 0
            for (var i = 0, size = data.result.length; i < size; i++) {
                var prevtxid = data.result[i].txid
                var txindex = data.result[i].index
                txvalue += data.result[i].value

                var script = bitcoin.Buffer(data.result[i].script, 'hex')
                var typeofaddress = scriptType(script)

                if (typeofaddress == 'bech32') {
                    var bech32script = bitcoin.payments.p2wpkh({'pubkey': wif.publicKey, 'network': netconfig['network']})

                    txbuilder.addInput(prevtxid, txindex, null, bech32script.output)
                }

                else {
                    txbuilder.addInput(prevtxid, txindex)
                }

                scripts.push({'script': script, 'type': typeofaddress, 'value': data.result[i].value})
            }

            if (txvalue >= amount) {
                var txchange = txvalue - amount
                // If the change is greater than 0, send the change back to the sender
                if (txchange > 0) {
                    // Send change back to sender
                    txbuilder.addOutput(address, txchange)
                }

                for (var i = 0, size = scripts.length; i < size; i++){
                    switch (scripts[i].type) {
                        case 'bech32':
                            var value = scripts[i].value
                            txbuilder.sign(i, wif, null, null, value, null)
                            break
                        
                        case 'segwit':
                            var value = scripts[i].value
                            var redeem = bitcoin.payments.p2wpkh({'pubkey': wif.publicKey, 'network': netconfig['network']})
                            var segwitscript = bitcoin.payments.p2sh({'redeem': redeem, 'network': netconfig['network']})

                            txbuilder.sign(i, wif, segwitscript.output, null, value, null)
                            break
                        
                        case 'legacy':
                            txbuilder.sign(i, wif)
                            break
                        
                        default:
                            showErrororSuccess.text("Bad UTXO")
                    }
                }
                var txfinal = txbuilder.build()
                
                // Broadcast the transaction to the network
                Promise.resolve($.ajax({
                    'url': api + '/broadcast',
                    'method': 'POST',
                    'data': {
                        'raw': txfinal.toHex()
                    }
                })).then(function(data) {
                    if (data.error == null) {
                        // Success message according to language set
                        showErrororSuccess.text(errororsuccess['success'] + data.result)
                    }

                    else {
                        // Broadcast error according to language set
                        showErrororSuccess.text(errororsuccess['error']['broadcast'] + data.error.message)
                    }

                    resetForm()
                })
                
            }

            else {
                // Fund error according to language set
                showErrororSuccess.text(errororsuccess['error']['funds'])
            }
        })
    }
    else {
        // User transaction canceled according to language set
        var showErrororSuccess = $("#showErrororSuccess")
        showErrororSuccess.text(errororsuccess['error']['cancel'])
    }
})

// Get type of address given the script hash
function scriptType(script) {
    var type = undefined

    if (script[0] == bitcoin.opcodes.OP_0 && script[1] == 20) {
        type = 'bech32'
    }

    if (script[0] == bitcoin.opcodes.OP_HASH160 && script[1] == 20) {
        type = 'segwit'
    }

    if (script[0] == bitcoin.opcodes.OP_DUP && script[1] == bitcoin.opcodes.OP_HASH160 && script[2] == 20) {
        type = 'legacy'
    }

    return type

}

// Reset the values after user sends
function resetForm() {
    $("#amountSUGAR").val('')
    $("#sendInput").val('')
    $("#feeSugar").val('')
}

// Conversion of standars integer to satoshis
function convertAmountFormat(amount, invert = false) {
    decimals = 8
    if (!invert) {
        return parseFloat((amount / Math.pow(10, decimals)).toFixed(decimals))
    }
    else {
        return parseInt(amount * Math.pow(10, decimals))
    }
}

// Multi Lang
var lang = {
    'en': {
        // Page text
        'send-to': "Send To: ",
        'amount-sugar': "Amount: ",
        'sendTx': "Send Transaction",
        'showErrororSuccess': {
            'success': "Success! Transaction ID: ",
            'error': {
                'broadcast': "Broadcast Failed! Error: ",
                'funds': "Error: Not enough funds",
                'cancel': "Transaction Cancelled",
            },
        },
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
        'send-to': "Envoyer pour: ",
        'amount-sugar': "Quantité: ",
        'sendTx': "Envoyer Transaction",
        'showErrororSuccess': {
            'success': "Succès! Transaction ID: ",
            'error': {
                'broadcast': "Diffuser Échoué! Erreur: ",
                'funds': "Erreur: Pas assez fonds",
                'cancel': "Transaction Annulé",
            },
        },
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
        'send-to': "보내다 에게: ",
        'amount-sugar': "양: ",
        'sendTx': "보내다 트랜잭션",
        'showErrororSuccess': {
            'success': "성공! 트랜잭션 ID: ",
            'error': {
                'broadcast': "방송 실패한! 오류: ",
                'funds': "오류: 부족한 자금",
                'cancel': "트랜잭션 취소 된",
            },
        },
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
        'send-to': "Kirim Untuk: ",
        'amount-sugar': "Jumlahnya: ",
        'sendTx': "Kirim Transaksi",
        'showErrororSuccess': {
            'success': "Keberhasilan! Transaksi ID: ",
            'error': {
                'broadcast': "Siaran Gagal! Kesalahan: ",
                'funds': "Kesalahan: Tidak cukup dana",
                'cancel': "Transaksi Dibatalkan",
            },
        },
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
        'send-to': "Enviar a: ",
        'amount-sugar': "Cantidad: ",
        'sendTx': "Enviar Transacción",
        'showErrororSuccess': {
            'success': "Éxito! Transacción ID: ",
            'error': {
                'broadcast': "Transmitir Fracasado! Error: ",
                'funds': "Error: No es Suficiente fondos",
                'cancel': "Transacción Anulado",
            },
        },
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
        'send-to': "Отправить к: ",
        'amount-sugar': "Сумма: ",
        'sendTx': "Отправить",
        'showErrororSuccess': {
            'success': "Транзакция успешно отправлена: ",
            'error': {
                'broadcast': "Ошибка передачи: ",
                'funds': "Ошибка: недостаточный баланс",
                'cancel': "Отменить",
            },
        },
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
        'send-to': "发送至: ",
        'amount-sugar': "数量: ",
        'sendTx': "发送交易",
        'showErrororSuccess': {
            'success': "成功! 交易 ID: ",
            'error': {
                'broadcast': "广播失败! 错误: ",
                'funds': "错误: 资金不足",
                'cancel': "交易已取消",
            },
        },
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
        'tx-history': "历史信息",
        'chain-info': "网络信息",
        'settings': "设置"
    },

    'ja': {
        // Page text
        'send-to': "に 送る: ",
        'amount-sugar': "量: ",
        'sendTx': "送る トランザクション",
        'showErrororSuccess': {
            'success': "成功! トランザクション ID: ",
            'error': {
                'broadcast': "放送 失敗! エラー: ",
                'funds': "エラー: 十分ではない 資金",
                'cancel': "トランザクション キャンセル",
            },
        },
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

// Set Multi Lang
function setSendPageLang() {
    if (localStorage['lang'] == null) {
        // Page Text
        $("#send-to").text(lang['en']['send-to'])
        $("#amount-sugar").text(lang['en']['amount-sugar'])
        $("#sendTx").text(lang['en']['sendTx'])
        $("#part1").text(lang['en']['logoutreminder']['part1'])
        $("#logoutlink").text(lang['en']['logoutreminder']['logoutlink'])
        $("#part2").text(lang['en']['logoutreminder']['part2'])
        errororsuccess = lang['en']['showErrororSuccess']

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
        // Page Text
        $("#send-to").text(lang[localStorage.getItem("lang")]['send-to'])
        $("#amount-sugar").text(lang[localStorage.getItem("lang")]['amount-sugar'])
        $("#sendTx").text(lang[localStorage.getItem("lang")]['sendTx'])
        $("#part1").text(lang[localStorage.getItem("lang")]['logoutreminder']['part1'])
        $("#logoutlink").text(lang[localStorage.getItem("lang")]['logoutreminder']['logoutlink'])
        $("#part2").text(lang[localStorage.getItem("lang")]['logoutreminder']['part2'])
        errororsuccess = lang[localStorage.getItem("lang")]['showErrororSuccess']

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
