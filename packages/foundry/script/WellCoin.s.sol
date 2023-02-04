// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

import "@forge-std/Script.sol";
import "../src/DAOMember.sol";
import "../src/WellCoin.sol";
import "../src/filecoinMockAPIs/MinerAPI.sol";
import "../src/filecoinMockAPIs/MarketAPI.sol";

contract MyScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        DAOMember daoNFT = new DAOMember();

        WellCoin coin = new WellCoin(address(daoNFT));
        MinerAPI miner_api = new MinerAPI("0x0000001");
        MarketAPI market_api = new MarketAPI();

        vm.stopBroadcast();
    }
}