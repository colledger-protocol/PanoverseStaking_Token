import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

require('hardhat-contract-sizer');
dotenv.config();


export default {
  networks: {
    hardhat: {
      // gas: 10000000000,
      allowUnlimitedContractSize: true,

    },
    mumbaitest: {
      url: "https://rpc-mumbai.maticvigil.com/",
      accounts: [`0x${process.env.PVTKEY}`]
    },
    matic: {
      url: "https://polygon-rpc.com/",
      gas: 1000000000000000,
      accounts: [`0x${process.env.PVT_ZCO}`]
    },
    // localhost: {
    //   url: "http://127.0.0.1:8545",
    // },
    localhost: {
      url: "http://127.0.0.1:8545",
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/384158242f384bcbb27cbb663fbca37e`,
      accounts: [`0x${process.env.PVT_KEY_SEPOLIA}`],
    },
    // testnet: {
    //   url: "https://eth-sepolia.g.alchemy.com/v2/demo",
    //   chainId: 97,
    //   // gasPrice: 20000000000,
    //   accounts: [`0x${process.env.PVTKEY}`]
    // },
  },  
  etherscan: {
    apiKey: process.env.API_FOR_MUMBAI,
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: false,
    only: ['ZeroCarbonUnitToken','CarbonExchange','ZeroCarbonCredit']
  },
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      }
    }
  }
}


