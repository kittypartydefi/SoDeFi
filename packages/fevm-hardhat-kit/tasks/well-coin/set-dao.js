task("set-dao", "Set DAO WellCoin")
.addParam("contract", "The WellCoin address")
.addParam("daoaddress", "The DataDAO address")
.setAction(async (taskArgs) => {
    //store taskargs as useable variables
    const contractAddr = taskArgs.contract
    const daoaddress = taskArgs.daoaddress

    //create a new wallet instance
    const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)

    //create a WellCoin contract factory
    const WellCoin = await ethers.getContractFactory("WellCoin", wallet)
    //create a WellCoin contract instance 
    //this is what you will call to interact with the deployed contract
    const WellCoinContract = await WellCoin.attach(contractAddr)

    //send transaction to call the sendCoin() method
    const transaction = await WellCoinContract.setDAO(daoaddress)
    const receipt = await transaction.wait()
    console.log("Set DAO")
})