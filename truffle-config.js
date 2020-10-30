const path = require('path')
const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "vapp/src/contracts"),
  compilers: {
    solc: {
      version: "^0.7.4", // A version or constraint - Ex. "^0.5.0"
      // Can also be set to "native" to use a native solc
      parser: "solcjs",  // Leverages solc-js purely for speedy parsing
      settings: {
        optimizer: {
          enabled: true,
          // runs: 5   // Optimize for how many times you intend to run the code
        },
        // evmVersion: <string> // Default: "petersburg"
      }
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*" // Match any network id
    },
    goerli: {
      provider() {
        return new HDWalletProvider({
          privateKeys: ["f6bba3e4459b060dc9c089209e31b4558776429eafd9c47b0912f6b526239ef1"],
          // mnemonic: "below swamp muscle hollow afford loud profit artist water clinic egg involve",
          providerOrUrl: "https://goerli.infura.io/v3/e46e0f25c70c4538808c8a1c017aae0f"

          // providerOrUrl: "https://ropsten.infura.io/v3/e46e0f25c70c4538808c8a1c017aae0f"
        });
      },
      gasPrice: 1000000000,
      skipDryRun: true,
      // network_id: 3,
      network_id: '5',
    }
  }
};
