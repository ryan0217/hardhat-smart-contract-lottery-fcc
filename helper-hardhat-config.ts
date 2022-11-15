import { ethers } from "hardhat"

export const networkConfig = {
  5: {
    name: "goerli",
    vrfCoordinatorV2: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    entranceFee: ethers.utils.parseEther("0.01"),
    keyHash:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    subscriptionId: "6513",
    callbackGasLimit: "500000",
    interval: "30",
  },
  31337: {
    name: "hardhat",
    vrfCoordinatorV2: "",
    entranceFee: ethers.utils.parseEther("0.01"),
    keyHash:
      "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    subscriptionId: "6513",
    callbackGasLimit: "500000",
    interval: "30",
  },
}

export const developmentChains = ["hardhat", "localhost"]
// export const DECIMALS = 8
// export const INITIAL_ANSWER = 200000000000
