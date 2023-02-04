const CID = require('cids')

task("get-cid", "Gets Filecoin f4 address and corresponding Ethereum address.")
.addParam("cid", "piece cid")
  .setAction(async (taskArgs) => {
  const cid = taskArgs.cid;
        //convert piece CID string to hex bytes
        const cidHexRaw = new CID(cid).toString('base16').substring(1)
        const cidHex = "0x00" + cidHexRaw
        console.log("Hex bytes are:", cidHex)
})