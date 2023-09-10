require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
};
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: __dirname + "/.env" });
const privateKey = process.env.PRIVATE_KEY;
module.exports = {
  networks: {
    hardhat: {
      chainId: 1337,
    },
    basemainnet: {
      url: "https://mainnet.base.org",
      accounts: [privateKey],
    },
    basegoerli: {
      url: "https://goerli.base.org",
      accounts: [privateKey],
    },
    baselocal: {
      url: "http://localhost:8545",
      accounts: [privateKey],
    },
  },
  solidity: "0.8.4",
};
