task(
  "check-member",
  "Calls the data dao nft contract to check membership"
)
  .addParam("contract", "The address the DAOMember contract")
  .addParam("account", "The address of the account you want the balance for")
  .setAction(async (taskArgs) => {
      //store taskargs as useable variables
      const contractAddr = taskArgs.contract
      const account = taskArgs.account

      //create a new wallet instance
      const wallet = new ethers.Wallet(network.config.accounts[0], ethers.provider)

    //create a DAOMember contract factory
    const DAOMember = await ethers.getContractFactory("DAOMember", wallet)
    //create a DAOMember contract instance 
    //this is what you will call to interact with the deployed contract
    const dm = await DAOMember.attach(contractAddr)

       
      //Call the getBalance method
      let result = BigInt(await dm.getBalance(account)).toString()
      console.log("The account is a DAOMember - ", account,  " is ", result)

  })
