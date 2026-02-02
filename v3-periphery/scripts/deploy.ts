require("dotenv").config();

import { ethers } from 'hardhat';

const {
    FACTORY_ADDRESS,
    WETH9_ADDRESS
} = process.env;

async function main() {
    
    const signer = (await ethers.getSigners())[0];
    // Check deployer balance
    let balance = await ethers.provider.getBalance(signer.address);
    console.log("Balance before deploy: ", ethers.utils.formatEther(balance));
    // Deploy QuoterV2
    const QuoterV2 = await ethers.getContractFactory("QuoterV2");
    let quoterV2 = await QuoterV2.deploy(
        FACTORY_ADDRESS,
        WETH9_ADDRESS
    );
    console.log("QuoterV2 address=>", quoterV2.address);
    // Deploy SwapRouter
    const SwapRouter = await ethers.getContractFactory("SwapRouter");
    let swapRouter = await SwapRouter.deploy(
        FACTORY_ADDRESS,
        WETH9_ADDRESS
    );
    console.log("SwapRouter address=>", swapRouter.address);
    // Deploy NFTDescriptor
    const NFTDescriptor = await ethers.getContractFactory("NFTDescriptor");
    let nftDescriptor = await NFTDescriptor.deploy();
    console.log("NFTDescriptor address=>", nftDescriptor.address);
    // Deploy NonfungibleTokenPositionDescriptor
    const NonfungibleTokenPositionDescriptor = await ethers.getContractFactory(
        "NonfungibleTokenPositionDescriptor",
        {
            libraries: {
                NFTDescriptor: nftDescriptor.address
            }
        }
    );
    let nonfungibleTokenPositionDescriptor = await NonfungibleTokenPositionDescriptor.deploy(
        WETH9_ADDRESS,
        ethers.utils.formatBytes32String("BNB")
    );
    console.log("NonfungibleTokenPositionDescriptor address=>", nonfungibleTokenPositionDescriptor.address);
    // Deploy NonfungiblePositionManager
    const NonfungiblePositionManager = await ethers.getContractFactory("NonfungiblePositionManager");
    let nonfungiblePositionManager = await NonfungiblePositionManager.deploy(
        FACTORY_ADDRESS,
        WETH9_ADDRESS,
        nftDescriptor.address
    );
    console.log("NonfungiblePositionManager address=>", nonfungiblePositionManager.address);
    // Deploy V3Migrator
    const V3Migrator = await ethers.getContractFactory("V3Migrator");
    let v3Migrator = await V3Migrator.deploy(
        FACTORY_ADDRESS,
        WETH9_ADDRESS,
        nonfungiblePositionManager.address
    );
    console.log("V3Migrator address=>", v3Migrator.address);
    // Check deployer balance
    balance = await ethers.provider.getBalance(signer.address);
    console.log("Balance after deploy: ", ethers.utils.formatEther(balance));
}

main().catch(e => {
    console.log(e);
})