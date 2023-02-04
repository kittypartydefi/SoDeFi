require("hardhat-deploy")
require("hardhat-deploy-ethers")

const { networkConfig } = require("../helper-hardhat-config")


const private_key = network.config.accounts[0]
const wallet = new ethers.Wallet(private_key, ethers.provider)

module.exports = async ({ deployments }) => {
    console.log("Wallet Ethereum Address:", wallet.address)
    const chainId = network.config.chainId
    const tokensToBeMinted = networkConfig[chainId]["tokensToBeMinted"]
    //deploy DAOMember
    const DAOMember = await ethers.getContractFactory('DAOMember', wallet);
    console.log('Deploying DAOMemberNFT...');
    const DAOMemberNFT = await DAOMember.deploy();
    await DAOMemberNFT.deployed()
    console.log('DAOMemberNFT deployed to:', DAOMemberNFT.address);

    //deploy Simplecoin
    const WellCoin = await ethers.getContractFactory('WellCoin', wallet);
    console.log('Deploying WellCoin...');
    const Wellcoin = await WellCoin.deploy(DAOMemberNFT.address);
    await Wellcoin.deployed()
    console.log('WellCoin deployed to:', Wellcoin.address);

    //deploy DealRewarder
    const DataDAO = await ethers.getContractFactory('DataDAO', wallet);
    console.log('Deploying DataDAO...');
    const Datadao = await DataDAO.deploy(DAOMemberNFT.address, Wellcoin.address);
    await Datadao.deployed()
    console.log('DataDAO deployed to:', Datadao.address);
}