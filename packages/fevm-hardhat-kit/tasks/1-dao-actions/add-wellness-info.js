const CID = require('cids')

task(
    "add-wellness",
    "Adds a CID (piece CID) of wellness info from a user that you would like to put a storage bounty on."
  )
    .addParam("contract", "The address of the DealRewarder contract")
    .addParam("piececid", "The piece CID of the data you want to put up a bounty for")
    .addParam("size", "Size of the data you are putting a bounty on")
    .addParam("user", "The address of the user that submitted this wellness data")
    .addParam("reward", "The current monetary reward that should be sent to the user")
    .setAction(async (taskArgs) => {
        //store taskargs as useable variables
        const contractAddr = taskArgs.contract
        const cid = taskArgs.piececid
        const size = taskArgs.size
        const user = taskArgs.user
        const reward = taskArgs.reward
        const networkId = network.name
        console.log("Adding CID", cid, "as a bounty on network", networkId)

        //create a new wallet instance
        const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)
        
        //create a DealRewarder contract factory
        const DataDAO = await ethers.getContractFactory("DataDAO", wallet)
        //create a DealRewarder contract instance 
        //this is what you will call to interact with the deployed contract
        const dao = await DataDAO.attach(contractAddr)
        
        //convert piece CID string to hex bytes
        const cidHexRaw = new CID(cid).toString('base16').substring(1)
        const cidHex = "0x00" + cidHexRaw
        console.log("Hex bytes are:", cidHex)
        
        //send a transaction to call addCID() method
        transaction = await dao.rewardAndAddBounty(cidHex, size, user, reward)
        transaction.wait()
       
        console.log("Completed adding the wellness info!")
    })