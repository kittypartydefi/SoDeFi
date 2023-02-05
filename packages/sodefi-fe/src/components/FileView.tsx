import React from "react";
import {ethers} from 'ethers';
import lighthouse from '@lighthouse-web3/sdk';
import { useAccount, useBalance, useSignMessage, useNetwork } from "wagmi";

interface FileviewObj {
  cid:string;
}

export const Fileview = (filelistInst: FileviewObj) => {
  const { address, isConnected } = useAccount()
  const [fileURL, setFileURL] = React.useState("");

  const { data, error, isLoading, signMessage } = useSignMessage({
    async onSuccess(signedMessage, variables) {
      // Verify signature when sign message succeeds
      console.log("Signature was verified", address, signedMessage,filelistInst.cid)
      console.log("signed data - ", signedMessage)
      if(address && signedMessage){
        const keyObject = await lighthouse.fetchEncryptionKey(
          filelistInst.cid,
          address,
          signedMessage
        );
    
        // Decrypt file
        /*
          decryptFile(cid, key, mimeType)
            Parameters:
              CID: CID of the file to decrypt
              key: the key to decrypt the file
              mimeType: default null, mime type of file
        */
       
        const decrypted = await lighthouse.decryptFile(filelistInst.cid, keyObject.data.key);
        console.log(decrypted)
           
        // View File
        const url = URL.createObjectURL(decrypted);
        console.log(url);
        setFileURL(url);
      }
    },
  })

  const sign_auth_message = async() =>{
    if(address){
      const message = (await lighthouse.getAuthMessage(address)).data.message;
      signMessage({ message });
    }

    // return({publicKey: publicKey, signedMessage: signedMessage});
  }

  /* Decrypt file */
  const decrypt = async() =>{
    // Fetch file encryption key
    const cid = "QmcuuAtmYqbPYmPx3vhJvPDi61zMxYvJbfENMjBQjq7aM3"; //replace with your IPFS CID
    await sign_auth_message();  
  }

  return (
    <div className="App">
      <button className="btn btn-xs btn-outline" onClick={()=>decrypt()}>decrypt</button>
      {
        fileURL?
          <a href={fileURL} target="_blank"> view file</a>
        :
          null
      }
    </div>
  );
}
