import { ethers, network } from "hardhat"
import { developmentChains, networkConfig } from "./../helper-hardhat-config"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { verify } from "../utils/verify"

const VRF_SUB_FUND_AMOUNT = ethers.utils.parseEther("1")

async function deployRaffle({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy, log } = deployments
  const { deployer, player } = await getNamedAccounts()
  const isDevChain = developmentChains.includes(network.name)
  const chainId = network.config.chainId as keyof typeof networkConfig
  let vrfCoordinatorV2Address, subscriptionId

  if (isDevChain) {
    const vrfCoordinatorV2Mock = await ethers.getContractAt(
      "VRFCoordinatorV2Mock",
      deployer
    )
    vrfCoordinatorV2Address = vrfCoordinatorV2Mock.address
    const transactionResponse = await vrfCoordinatorV2Mock.createSubscription()
    const transactionReceipt = await transactionResponse.wait(1)
    // subscriptionId = transactionReceipt.events?.[0]?.args?.subId
    subscriptionId = await transactionResponse.value
    await vrfCoordinatorV2Mock.fundSubscription(
      subscriptionId,
      VRF_SUB_FUND_AMOUNT
    )
  } else {
    vrfCoordinatorV2Address = networkConfig[chainId].vrfCoordinatorV2
    subscriptionId = networkConfig[chainId].subscriptionId
  }

  const { entranceFee, keyHash, callbackGasLimit, interval } =
    networkConfig[chainId]
  const args = [
    vrfCoordinatorV2Address,
    entranceFee,
    keyHash,
    subscriptionId,
    callbackGasLimit,
    interval,
  ]

  const raffleContract = await deploy("Raffle", {
    from: deployer,
    args,
    log: true,
    waitConfirmations: 1,
  })

  if (!isDevChain && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(raffleContract.address, args)
  }

  log("-------------------------------------------------")
}

deployRaffle.tags = ["all", "raffle"]

export default deployRaffle
