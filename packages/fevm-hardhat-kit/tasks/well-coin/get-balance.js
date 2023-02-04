task(
  "get-balance",
  "Calls the WellCoin contract to read the amount of WellCoins owned by the account."
)
  .addParam("contract", "The address the WellCoin contract")
  .addParam("account", "The address of the account you want the balance for")
  .setAction(async (taskArgs) => {
      //store taskargs as useable variables
      const contractAddr = taskArgs.contract
      const account = taskArgs.account
      const networkId = network.name
      console.log("Reading WellCoin owned by", account, "on network", networkId)
      
      //create a new wallet instance
      const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)

      //create a WellCoin contract factory
      const WellCoin = await ethers.getContractFactory("WellCoin", wallet)
      //Create a WellCoin contract instance 
      //This is what we will call to interact with the contract
      const WellCoinContract = await WellCoin.attach(contractAddr)
       
      //Call the getBalance method
      let result = BigInt(await WellCoinContract.getBalance(account)).toString()
      console.log("Amount of WellCoin owned by", account, "is", result)
      let mintedToken = await WellCoinContract.getMintedTokenBalance()
      console.log(`Total amount of minted tokens is ${mintedToken}`)
  })
