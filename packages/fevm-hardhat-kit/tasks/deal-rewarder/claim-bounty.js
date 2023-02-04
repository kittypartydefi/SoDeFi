task(
    "claim-bounty",
    "Sends 1 FIL to a whomever the client on the bountied deal is."
  )
    .addParam("contract", "The address of the DealRewarder contract")
    .addParam("dealid", "The id of the deal with the completed bounty")
    .setAction(async (taskArgs) => {
        //store taskargs as useable variables
        const contractAddr = taskArgs.contract
        const dealid = taskArgs.dealid
        const networkId = network.name
        console.log("Claiming Bounty on network", networkId)

        //create a new wallet instance
        const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)

        const DataDAO = await ethers.getContractFactory("DataDAO", wallet)
        //create a DealRewarder contract instance 
        //this is what you will call to interact with the deployed contract
        const dao = await DataDAO.attach(contractAddr)
        
        //send a transaction to call claim_bounty() method
        transaction = await dao.claim_bounty(dealid)
        transaction.wait()
        console.log("Complete!")
    })