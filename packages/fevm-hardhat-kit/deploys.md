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
