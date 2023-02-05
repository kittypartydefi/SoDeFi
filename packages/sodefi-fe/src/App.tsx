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
import { Profile } from "./components/Profile";
import ErrorBoundary from './components/ErrorBoundary';
import { useAccount, useBalance, useSignMessage, useNetwork } from "wagmi";
import { ethers } from "ethers";
import { verifyMessage } from 'ethers/lib/utils'
import configData from "../src/assets/contracts.json";
import lighthouse from '@lighthouse-web3/sdk';

function App() {
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
          "19c1a096-9fb1-437d-b691-5b64ecfeb9bf",
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
              <div className="w-128 items-center  justify-center h-auto">
                <Stats className="stats-vertical lg:stats-horizontal shadow">
                  <Stats.Stat>
                    <Stats.Stat.Item variant="title">Total Steps</Stats.Stat.Item>
                    <Stats.Stat.Item variant="value">1000K</Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      Feb 1st - Feb 2nd
                    </Stats.Stat.Item>
                  </Stats.Stat>

                  <Stats.Stat>
                    <Stats.Stat.Item variant="title">Sleep Quality</Stats.Stat.Item>
                    <Stats.Stat.Item variant="value">:-)</Stats.Stat.Item>

                    <Stats.Stat.Item variant="desc">
                      ↗︎ 400 (22%)
                    </Stats.Stat.Item>
                  </Stats.Stat>

                  <Stats.Stat>
                    <Stats.Stat.Item variant="title">Weight</Stats.Stat.Item>
                    <Stats.Stat.Item variant="value">100kg</Stats.Stat.Item>
                    <Stats.Stat.Item variant="desc">
                      ↘︎ 90 (10%)
                    </Stats.Stat.Item>
                  </Stats.Stat>
                </Stats>
              </div>
              <div className="item w-32 h-8"></div>
              <div className="w-64 justify-center h-auto">
              <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Upload your wellness data</span>
                    
                  </label>
                  <input type="file"  onChange={e=>deployEncrypted(e)} className="file-input file-input-bordered w-full max-w-xs" />
                  <label className="label">
                    <span className="label-text-alt">** Encryption powered by lighthouse </span>
                  </label>
                </div>
                <progress className="progress progress-primary w-56" value={dataLoadProgress} max="100"></progress>
              </div>
              
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

export default App;
