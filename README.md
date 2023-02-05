# SoDeFi - Token Gated DataDAO for Wellness (Earn for X via FEVM)
![Logo](./assets/images/SoDeFi-logos/SoDeFi-logos-50.jpeg)


This project aims to create a social app to help with a Data DAO around creating a journal for an individual. 
We enable citizens to journal their wellness and also interesting pics from their daily life.

The wellness data will be used to capture important data points to later train a ML algorithm to predict what you can do better.

The basic flow is as shown below - 

![Flow](./assets/images/sodefiver2.png)

## Flows - 
1. Allow an end user to upload a file with a unique hash using lighthouse in an encrypted setup.
1. Allow a DAO to vet the file (The DAO to be compensated via credits)
1. If file is good -> create a bounty for storage of the CID
1. The DAO to send the user credits if the file is good
1. Allow the DAO to fund renewal of expiring deals for data that needs analysis
1. The DAO earns credits from users who want a fitness coach based on the data analyzed
1. User has to pay for advanced coaching and fitness info

## Smart Contracts

1. WellCoin - We will need a token for credits (Mintable by the DAO to users who upload tokens, premint 10% for liquidity pools)
2. DataDAO - Deal and fevm contracts
3. DAOMember -  NFT membership

### Setup
1. cd packages/fevm-hardhat-kit
1. yarn
1. yarn hardhat deploy
1. Run various tasks

### Testing
1. Deploy contracts
1. Mint NFT to 3 addresses (Guardians)
1. Top up the DataDAO contract with a little FIL(this is to fund the bounty hunters)
1. Get the CID for making the deal
1. Add CID as a guardian 
1. Approve CID as 3 guardians
1. Add to the CID list
1. Make a deal and try to claim bounty

#### hackathon todos
TODO: Convert to monorepo
TODO: solve the challenge of 2GB lighthouse uploads for piece CID

### Deployment
1. Deploy in the following order - 
1. DAO membership, token, Data DAO
1. A user uploads an image and gets a CID
1. Next the guardians approve the CID (atleast 2)
1. Any Guardian can create a bounty request, as part of the request the user who uploaded the data gets a reward

DAOMemberNFT deployed to: 0xA49399eFcCF8506f3BBb63650AfF0AD873891eF7
Deploying WellCoin...
WellCoin deployed to: 0x01d494D675Aa56047db75C27bBBAdF2198a85DC6
Deploying DataDAO...
DataDAO deployed to: 0xcf1Eb6a4a03a8795Be5CdF586d6b49d2829DA5A7

Addresses
g1 - 0xFF8F016D5702113fA734ea78f168c0BF8c059797
g2 - 0xAb0340C559Be41B2423B65A7F246444057bCa0Cf
g3 - 0xA8B42CD40acC31d2e4810e833de5F06E034A605C

["0xFF8F016D5702113fA734ea78f168c0BF8c059797"]
["0xAb0340C559Be41B2423B65A7F246444057bCa0Cf"]
["0xA8B42CD40acC31d2e4810e833de5F06E034A605C"]
["0x000181e20392202034194f3b7cae3042a57b63ea4c36a962478e41bfa8ddc80dd61cae8bebdedf23",1000,"0x4Db32ee262D2F2FcA54CFA0dA5991690255B5659",10000]

Step 1. Add members
yarn hardhat add-member --contract "0xA49399eFcCF8506f3BBb63650AfF0AD873891eF7" --toaccount "0xFF8F016D5702113fA734ea78f168c0BF8c059797"
yarn hardhat add-member --contract "0xA49399eFcCF8506f3BBb63650AfF0AD873891eF7" --toaccount "0xAb0340C559Be41B2423B65A7F246444057bCa0Cf"
yarn hardhat add-member --contract "0xA49399eFcCF8506f3BBb63650AfF0AD873891eF7" --toaccount "0xA8B42CD40acC31d2e4810e833de5F06E034A605C"


Step 2. Add DATA DAO in wellcoin
yarn hardhat set-dao --contract "0x01d494D675Aa56047db75C27bBBAdF2198a85DC6" --daoaddress "0xcf1Eb6a4a03a8795Be5CdF586d6b49d2829DA5A7"

Step 3. Approve the piece CID via app
["0x000181e20392202034194f3b7cae3042a57b63ea4c36a962478e41bfa8ddc80dd61cae8bebdedf23",true]

Step 4. set wellness cid and reward the end user
yarn hardhat add-wellness --contract "0xcf1Eb6a4a03a8795Be5CdF586d6b49d2829DA5A7" --piececid "baga6ea4seaqmp4lz362o24d64xyc6gibe4z6k3taghcb2kncq2a7rj6jndlkooa" --size 1000 --user "0x4Db32ee262D2F2FcA54CFA0dA5991690255B5659" --reward 10000

Step 5. Claim bounty as the bounty hunter
yarn hardhat claim-bounty --contract "0xcf1Eb6a4a03a8795Be5CdF586d6b49d2829DA5A7" --dealid 865

### References
We used the https://github.com/lotus-web3/deal-bounty-contract for creating the fevm flows around storage of CID. 