import React from "react";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import { useAccount, useBalance, useSignMessage, useNetwork } from "wagmi";
import configData from "../../src/assets/contracts.json";

interface ApplyConditonsObj {
  cid:string;
}

export const ApplyConditons = (applyInst: ApplyConditonsObj) => {
  const { address, isConnected } = useAccount()
  const [fileURL, setFileURL] = React.useState("");
  const conditions = [
    {
      id: 1,
      chain: "Hyperspace",
      method: "balanceOf",
      standardContractType: "ERC721",
      contractAddress:configData.MEMBERSHIPNFT,
      returnValueTest: {
        comparator: ">=",
        value: "1"
      },
      parameters: [":userAddress"]
    },
  ];
  const aggregator = "([1])";

  const { data, error, isLoading, signMessage } = useSignMessage({
    async onSuccess(signedMessage, variables) {
      // Verify signature when sign message succeeds
      console.log("Signature was verified", address, signedMessage,applyInst.cid)
      console.log("signed data - ", signedMessage)
      if(address && signedMessage){
        const response = await lighthouse.accessCondition(
          address,
          applyInst.cid,
          signedMessage,
          conditions,
          aggregator
        );
       
      }
    },
  })

  const encryptionSignature = async() =>{
    if(address){
      const message = (await lighthouse.getAuthMessage(address)).data.message;
      signMessage({ message });
    }

    // return({publicKey: publicKey, signedMessage: signedMessage});
  }

  /* Decrypt file */
  const applyAccessConditions = async() =>{
     await encryptionSignature();
  }

  return (
    <div>
      <button className="btn btn-xs btn-outline" onClick={()=>applyAccessConditions()}>Permit DAO Access</button>
    </div>
  );
}
