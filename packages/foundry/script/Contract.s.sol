// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "@forge-std/Script.sol";
import "../src/DAOMember.sol";
import "../src/WellCoin.sol";
import "../src/DataDAO.sol";

contract MyScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        DAOMember daoNFT = new DAOMember();
        WellCoin wellCoin = new WellCoin(address(daoNFT));
        DataDAO dataDAO = new DataDAO(address(daoNFT), address(wellCoin));

        vm.stopBroadcast();
    }
}