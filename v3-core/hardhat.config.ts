import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path';

import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import '@nomiclabs/hardhat-etherscan'


dotenvConfig({ path: resolve(__dirname, './.env') })

const PRIVATE_KEY = process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [];

export default {
  networks: {
    hardhat: {
      allowUnlimitedContractSize: false,
    },
    mainnet: {
      chainId: 56,
      url: `https://bsc-dataseed.bnbchain.org`,
      accounts: PRIVATE_KEY
    },
    testnet: {
      chainId: 97,
      url: `https://bsc-testnet-dataseed.bnbchain.org`,
      accounts: PRIVATE_KEY
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  solidity: {
    version: '0.7.6',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      metadata: {
        // do not include the metadata hash, since this is machine dependent
        // and we want all generated code to be deterministic
        // https://docs.soliditylang.org/en/v0.7.6/metadata.html
        bytecodeHash: 'none',
      },
    },
  },
}
