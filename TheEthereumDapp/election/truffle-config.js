
var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "使用你的助记词";

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic,"使用你的infura rinkeby ENDPOINT ");
      },
      network_id: "*" // Match any network id
    },
    mainnet: {
      provider: function() {
        return new HDWalletProvider(mnemonic,"使用你的infura mainnet ENDPOINT");
      },
      network_id: "*" // Match any network id
    }
  }
};
