import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import "hardhat-deploy"
import "@openzeppelin/hardhat-upgrades"
import * as dotenv from 'dotenv'
dotenv.config()

const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY ?? ""

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.16",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
        chainId: 31337,
    },
    mumbai: {
        chainId: 80001,
        url: MUMBAI_RPC_URL,
        accounts: [PRIVATE_KEY]
    }
  },
  namedAccounts: {
    deployer: {
        default: 0,
    },
  },
};

export default config;