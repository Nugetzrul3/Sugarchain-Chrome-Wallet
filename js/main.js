const { getScript } = require("jquery");
const bitcoin = require("./bitcoin");

var bitcoinscript = getScript(bitcoin)

bitcoinscript.ECPair.makeRandom()