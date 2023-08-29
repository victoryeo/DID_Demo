import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"

const func: DeployFunction = async function ({
    deployments,
    getNamedAccounts,
}: HardhatRuntimeEnvironment) {
    let args: any[] = []
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    console.log("deploy from account", deployer)

    args[0] = <logic>
    args[1] = <admin>
    args[2] = <data>
    await deploy("TransparentUpgradeableProxy", {
        from: deployer,
        args: args,
        log: true,
    })
}

export default func

func.tags = ["State"]