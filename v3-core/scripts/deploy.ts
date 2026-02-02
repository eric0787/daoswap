require("dotenv").config();

import { ethers } from 'hardhat';

async function main() {
    const signer = (await ethers.getSigners())[0];
    // Check deployer balance
    let balance = await ethers.provider.getBalance(signer.address);
    console.log("Balance before deploy: ", ethers.utils.formatEther(balance));
    // Deploy UniswapV3Factory
    const UniswapV3Factory = await ethers.getContractFactory("UniswapV3Factory");
    let factory = await UniswapV3Factory.deploy();
    console.log("UniswapV3Factory address=>", factory.address);
    // Get POOL_INIT_CODE_HASH
    const UniswapV3Pool = await ethers.getContractFactory("UniswapV3Pool");
    console.log("POOL_INIT_CODE_HASH=>", ethers.utils.keccak256(ethers.utils.hexlify(UniswapV3Pool.bytecode)));
    // Check deployer balance
    balance = await ethers.provider.getBalance(signer.address);
    console.log("Balance after deploy: ", ethers.utils.formatEther(balance));
}

main().catch(e => {
    console.log(e);
})