import { ethers } from "ethers"
import { network } from "hardhat"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { developmentChains } from "../helper-hardhat-config"

const BASE_FEE = ethers.utils.parseEther("0.25") // 0.25 is the premium. It costs 0.25 Link per request
const GAS_PRICE_LINK = 1e9 // calculated value based on the gas price of the chain.

async function deployMocks({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments
  const { deployer, player } = await getNamedAccounts()
  const args = [BASE_FEE, GAS_PRICE_LINK]

  if (developmentChains.includes(network.name)) {
    log("Local network detected! Deploying mocks...")
    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      args,
      log: true,
      waitConfirmations: 1,
    })
    log("Mocks Deployed!")
    log("-------------------------------------------------")
  }
}

deployMocks.tags = ["all", "mocks"]

export default deployMocks
