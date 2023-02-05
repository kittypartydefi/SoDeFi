import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  Button,
  Card,
  Collapse,
  Divider,
  Input,
  Navbar,
  Select,
  Stats,
  Tabs,
} from "react-daisyui";
import React from "react";
import porabi from "./assets/porabi.json";
import { Profile } from "./components/Profile";
import ErrorBoundary from './components/ErrorBoundary';
import { useAccount, useBalance, useSignMessage, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { verifyMessage } from 'ethers/lib/utils'
import configData from "./assets/contracts.json";
import lighthouse from '@lighthouse-web3/sdk';
import { Filetasks } from "./components/FileTasks";

function DAOApp() {
  const [ dataLoadProgress, setDataLoadProgress ] = useState(0);
  const [ e, setE ] = useState("");
  const { address, isConnected } = useAccount()
  const { chain, chains } = useNetwork()
  const { data, error, isLoading, signMessage } = useSignMessage({
    async onSuccess(signedMessage, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables.message, signedMessage)
      console.log("Signature was verified", address, signedMessage)
      console.log("signed data - ", signedMessage)
      if(address && signedMessage){
        const response = await lighthouse.uploadEncrypted(
          e,
          address,
          "cdbb3877-4500-4197-bea5-fdca2c43e5e2",
          signedMessage,
          progressCallback
        );
      }
    },
  })
  const encryptionSignature = async() =>{
    
    const message = (await lighthouse.getAuthMessage(address||'0x00')).data.message;
    signMessage({ message });
    return message;
  }
  
  const progressCallback = (progressData: { total: number; uploaded: number; }) => {
    setDataLoadProgress(100 - (progressData?.total / progressData?.uploaded))
      
    console.log(dataLoadProgress);
  };

  /* Deploy file along with encryption */
  const deployEncrypted = async(e:any) =>{
    console.log("Address is", address)
    setE(e);
    setDataLoadProgress(0);
    await encryptionSignature();  
  }
  
  const [value, setValue] = useState("default");

  const [tabValue, setTabValue] = React.useState(0);
  return (
    <div className="gap-2 font">
      <ErrorBoundary>
        <Navbar className="bg-base-100 shadow-xl rounded-box">
          <Navbar.Start>
            <Button className="text-xl normal-case" color="ghost">
            SoDeFI - Get paid to be well!
            </Button>
          </Navbar.Start>
          <Navbar.End>
            <Profile />
          </Navbar.End>
        </Navbar>
        <div className="App text-xl font-bold flex content-center justify-center h-screen w-auto">
          <div className="item w-128 h-auto">
            <div className="flex flex-col justify-center items-center h-auto w-auto">
              <Filetasks></Filetasks>
              
                    <Divider></Divider>
                    <h2>This is a mock site for a Hackathon</h2>
                    <h5>!!!Do Not Upload Real Data!!!</h5>
              <div className="h-2 w-auto"></div>

            </div>
          </div>
        </div>
        </ErrorBoundary>
    </div>
  );
}

export default DAOApp;
