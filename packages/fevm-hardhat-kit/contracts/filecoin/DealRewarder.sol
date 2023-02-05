// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.17;

import { MarketAPI, MarketAPIOld } from "../lib/filecoin-solidity/contracts/v0.8/MarketAPI.sol";
import { CommonTypes } from "../lib/filecoin-solidity/contracts/v0.8/types/CommonTypes.sol";
import { MarketTypes } from "../lib/filecoin-solidity/contracts/v0.8/types/MarketTypes.sol";
import { Actor, HyperActor } from "../lib/filecoin-solidity/contracts/v0.8/utils/Actor.sol";
import { Misc } from "../lib/filecoin-solidity/contracts/v0.8/utils/Misc.sol";

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
    mapping(bytes => int64) public cidTermEnds;
    mapping(bytes => uint) public cidSizes;
    mapping(bytes => mapping(uint64 => bool)) public cidProviders;

    address public owner;
    address constant CALL_ACTOR_ID = 0xfe00000000000000000000000000000000000005;
    uint64 constant DEFAULT_FLAG = 0x00000000;
    uint64 constant METHOD_SEND = 0;
    uint feeFIL = 1000000000000;//12 decimals

    
    
    constructor() {
        owner = msg.sender;
    }

    function setFee(uint _newFee) public {
        require(msg.sender == owner);
        feeFIL = _newFee;
    }

    function fund(uint64 unused) public payable {}

    function addCID(bytes calldata cidraw, uint size) internal {
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
        MarketTypes.GetDealTermReturn memory dealTerm = MarketAPIOld.getDealTerm(MarketTypes.GetDealTermParams({id: deal_id}));

        //when someone claims a bounty for a deal also store the deal term
        //later allow dao to incentivise expiring deals
        cidTermEnds[commitmentRet.data] = dealTerm.end;


        authorizeData(commitmentRet.data, providerRet.provider, commitmentRet.size);

        // get dealer (bounty hunter client)
        MarketTypes.GetDealClientReturn memory clientRet = MarketAPI.getDealClient(MarketTypes.GetDealClientParams({id: deal_id}));

        // send reward to client 
        send(clientRet.client);
    }

    function requestBountyForRenewal(bytes memory cidraw, uint64 new_deal) public {
        //check whether the cidTerm is about to end
        require(block.number <= uint64(cidTermEnds[cidraw] + 6), "not yet mature!");
        claim_bounty(new_deal);//if valid deal, then let user claim the new request
    }


    // send a little FIL to the filecoin actor at actor_id
    function send(uint64 actorID) internal {
        bytes memory emptyParams = "";
        delete emptyParams;

        HyperActor.call_actor_id(METHOD_SEND, feeFIL, DEFAULT_FLAG, Misc.NONE_CODEC, emptyParams, actorID);

    }

}
