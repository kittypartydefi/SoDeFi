task("add-member", "Sends Membership NFT to account")
.addParam("contract", "The DAO Member NFT address")
.addParam("toaccount", "The account to send to")
.setAction(async (taskArgs) => {
    //store taskargs as useable variables
    const contractAddr = taskArgs.contract
    const toAccount = taskArgs.toaccount

    //create a new wallet instance
    const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)

    //create a DAOMember contract factory
    const DAOMember = await ethers.getContractFactory("DAOMember", wallet)
    //create a DAOMember contract instance 
    //this is what you will call to interact with the deployed contract
    const dm = await DAOMember.attach(contractAddr)

    console.log("Sending:",  "NFT to", toAccount)

    //send transaction to call the DAOMember safeMint() method
    const transaction = await dm.safeMint(toAccount)
    const receipt = await transaction.wait()
    let result = BigInt(await dm.balanceOf (toAccount)).toString()
    console.log("Total WellCoin at:", toAccount, "is", result)
})