// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import { MarketAPI } from "@filecoin/MarketAPI.sol";
import { CommonTypes } from "@filecoin/types/CommonTypes.sol";
import { MarketTypes } from "@filecoin/types/MarketTypes.sol";
import { Actor } from "@filecoin/utils/Actor.sol";
import { Misc } from "@filecoin/utils/Misc.sol";

/* 
Contract Usage
    Step   |   Who   |    What is happening  |   Why 
    ------------------------------------------------
    Deploy | contract owner   | contract owner deploys address is owner who can call addCID  | create contract setting up rules to follow
    AddCID | data pinners     | set up cids that the contract will incentivize in deals      | add request for a deal in the filecoin network, "store data" function
    Fund   | contract funders |  add FIL to the contract to later by paid out by deal        | ensure the deal actually gets stored by providing funds for bounty hunter and (indirect) storage provider
    Claim  | bounty hunter    | claim the incentive to complete the cycle                    | pay back the bounty hunter for doing work for the contract

*/
contract DealRewarder {
    mapping(bytes => bool) public cidSet;
    mapping(bytes => uint) public cidSizes;
    mapping(bytes => mapping(uint64 => bool)) public cidProviders;

    address public owner;
    address constant CALL_ACTOR_ID = 0xfe00000000000000000000000000000000000005;
    uint64 constant DEFAULT_FLAG = 0x00000000;
    uint64 constant METHOD_SEND = 0;
    
    struct GetDealDataCommitmentParams {
        uint64 id;
    }

    struct GetDealClientParams {
        uint64 id;
    }

    struct GetDealProviderParams {
        uint64 id;
    }
    constructor() {
        owner = msg.sender;
    }

    function fund(uint64 unused) public payable {}

    function addCID(bytes calldata cidraw, uint size) public {
       require(msg.sender == owner);
       cidSet[cidraw] = true;
       cidSizes[cidraw] = size;
    }

    function policyOK(bytes memory cidraw, uint64 provider) internal view returns (bool) {
        bool alreadyStoring = cidProviders[cidraw][provider];
        return !alreadyStoring;
    }

    function authorizeData(bytes memory cidraw, uint64 provider, uint size) public {
        require(cidSet[cidraw], "cid must be added before authorizing");
        require(cidSizes[cidraw] == size, "data size must match expected");
        require(policyOK(cidraw, provider), "deal failed policy check: has provider already claimed this cid?");

        cidProviders[cidraw][provider] = true;
    }

    function claim_bounty(uint64 deal_id) public {
        MarketTypes.GetDealDataCommitmentReturn memory commitmentRet = MarketAPI.getDealDataCommitment(MarketTypes.GetDealDataCommitmentParams({id: deal_id}));
        MarketTypes.GetDealProviderReturn memory providerRet = MarketAPI.getDealProvider(MarketTypes.GetDealProviderParams({id: deal_id}));

        authorizeData(commitmentRet.data, providerRet.provider, commitmentRet.size);

        // get dealer (bounty hunter client)
        MarketTypes.GetDealClientReturn memory clientRet = MarketAPI.getDealClient(MarketTypes.GetDealClientParams({id: deal_id}));

        // send reward to client 
        send(clientRet.client);
    }

    function call_actor_id(uint64 method, uint256 value, uint64 flags, uint64 codec, bytes memory params, uint64 id) public returns (bool, int256, uint64, bytes memory) {
        (bool success, bytes memory data) = address(CALL_ACTOR_ID).delegatecall(abi.encode(method, value, flags, codec, params, id));
        (int256 exit, uint64 return_codec, bytes memory return_value) = abi.decode(data, (int256, uint64, bytes));
        return (success, exit, return_codec, return_value);
    }

    // send 1 FIL to the filecoin actor at actor_id
    function send(uint64 actorID) internal {
        bytes memory emptyParams = "";
        delete emptyParams;

        uint oneFIL = 1000000000000000000;
        call_actor_id(METHOD_SEND, oneFIL, DEFAULT_FLAG, Misc.NONE_CODEC, emptyParams, actorID);

    }

}
