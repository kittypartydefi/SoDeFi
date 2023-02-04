// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

interface IDealRewarder {
    function addCID(bytes calldata cidraw, uint size) external;
}