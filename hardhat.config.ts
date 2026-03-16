import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require("dotenv").config();

const { SEPOLIA_RPC_URL, PRIVATE_KEY } = process.env;

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: `${SEPOLIA_RPC_URL}`,
      chainId: 11155111,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
};

export default config;
