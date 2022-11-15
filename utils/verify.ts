import { run } from "hardhat"

export const verify = async (
  contractAddress: string,
  constructorArguments: any[]
) => {
  console.log("Verifying contract...")

  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments,
    })
  } catch (error: any) {
    if (error.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!")
    } else {
      console.log(error)
    }
  }
}
