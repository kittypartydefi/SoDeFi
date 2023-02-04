// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IWellCoin {
    function mintAndSend(address receiver, uint amount) external returns(bool sufficient);
}