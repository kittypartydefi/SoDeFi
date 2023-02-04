task("send-coin", "Sends WellCoin")
.addParam("contract", "The WellCoin address")
.addParam("amount", "The amount to send")
.addParam("toaccount", "The account to send to")
.setAction(async (taskArgs) => {
    //store taskargs as useable variables
    const contractAddr = taskArgs.contract
    const amount = taskArgs.amount
    const toAccount = taskArgs.toaccount

    //create a new wallet instance
    const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)

    //create a WellCoin contract factory
    const WellCoin = await ethers.getContractFactory("WellCoin", wallet)
    //create a WellCoin contract instance 
    //this is what you will call to interact with the deployed contract
    const WellCoinContract = await WellCoin.attach(contractAddr)

    console.log("Sending:", amount, "WellCoin to", toAccount)

    //send transaction to call the sendCoin() method
    const transaction = await WellCoinContract.sendCoin(toAccount, amount)
    const receipt = await transaction.wait()
    let result = BigInt(await WellCoinContract.getBalance(toAccount)).toString()
    console.log("Total WellCoin at:", toAccount, "is", result)
})