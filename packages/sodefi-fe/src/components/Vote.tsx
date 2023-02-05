import * as React from 'react'
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction } from 'wagmi'
import configData from "../../src/assets/contracts.json";

import { ethers } from "ethers";
interface VoteObj{
    cid: string,
    vote:boolean
}
export function Vote(voteinst: VoteObj) {
 const { config } = usePrepareContractWrite({
 address: configData.DATADAO,
 abi: [ { "inputs": [ { "internalType": "address", "name": "_DAOMemberNFT", "type": "address" }, { "internalType": "address", "name": "_wellCoin", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "DAOMemberNFT", "outputs": [ { "internalType": "contract IERC721", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "WellCoin", "outputs": [ { "internalType": "contract IWellCoin", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes", "name": "_cidraw", "type": "bytes" }, { "internalType": "bool", "name": "_vote", "type": "bool" } ], "name": "approveOrRejectCID", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes", "name": "cidraw", "type": "bytes" }, { "internalType": "uint64", "name": "provider", "type": "uint64" }, { "internalType": "uint256", "name": "size", "type": "uint256" } ], "name": "authorizeData", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes", "name": "", "type": "bytes" }, { "internalType": "uint64", "name": "", "type": "uint64" } ], "name": "cidProviders", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "cidSet", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "cidSizes", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes", "name": "", "type": "bytes" } ], "name": "cidVoteSet", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint64", "name": "deal_id", "type": "uint64" } ], "name": "claim_bounty", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint64", "name": "unused", "type": "uint64" } ], "name": "fund", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bytes", "name": "_cidraw", "type": "bytes" }, { "internalType": "uint256", "name": "_size", "type": "uint256" }, { "internalType": "address", "name": "_user", "type": "address" }, { "internalType": "uint256", "name": "_reward", "type": "uint256" } ], "name": "rewardAndAddBounty", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_newFee", "type": "uint256" } ], "name": "setFee", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ],
 functionName: 'approveOrRejectCID',
 args: [`0x${voteinst.cid}`, voteinst.vote ]
 })
 const { data, write } = useContractWrite(config)
 const { isLoading, isSuccess } = useWaitForTransaction({
  hash: data?.hash,
})
 return (
  <div>
    <button className="btn btn-xs btn-outline"  disabled={!write || isLoading} onClick={() => write?write():null}>
      {isLoading ? 'Voting...' : 'Vote'}
    </button>
  </div>
)
}