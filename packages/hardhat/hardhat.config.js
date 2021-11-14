require('@nomiclabs/hardhat-waffle');
require('dotenv').config();

module.exports = {
  solidity: '0.8.4',
  networks: {
    hardhat: {
      gas: 2100000,
      gasPrice: 8000000000,
      chainId: 1337, // https://hardhat.org/metamask-issue.html
    },
    rinkeby: {
      url: process.env.STAGING_ALCHEMY_KEY,
      accounts: [process.env.RINKEBY_PRIVATE_KEY],
    },
  },
};
