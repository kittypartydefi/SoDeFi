task(
    "fund",
    "Sends 1 FIL to bounty contract."
  )
    .addParam("contract", "The address of the DealRewarder contract")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name
        console.log("Sending 1 FIL to DealRewarder contract on network", networkId)

        //create a new wallet instance
        const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)

        const DataDAO = await ethers.getContractFactory("DataDAO", wallet)
        //create a DealRewarder contract instance 
        //this is what you will call to interact with the deployed contract
        const dao = await DataDAO.attach(contractAddr)

        //send a transaction to call fund() method
        transaction = await dao.fund(0, {
          value: ethers.utils.parseEther("0.2")    
        })
        transaction.wait()
        console.log("Complete!")
    })