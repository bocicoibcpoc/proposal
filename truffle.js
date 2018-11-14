var HDWalletProvider = require("truffle-hdwallet-provider");

var infura_apikey = "bc9ad02aefe8432da4a8111b092a2732";
var mnemonic = "chimney side north convince option roast frown barely allow valid resemble hotel";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/"+infura_apikey)
      },
	  network_id: 3
    }
  }
};
