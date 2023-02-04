// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "./interfaces/IWellCoin.sol";
import "./DealRewarder.sol";
/**
 * @title DataDAO
 * @notice This contract checks the permissions of the member and if a valid guardian allows for the guardian to approve the data
 */
contract DataDAO is DealRewarder {
    /************************************************
     *  STORAGE
     ***********************************************/
    IERC721 public DAOMemberNFT;
    IWellCoin public WellCoin;
    mapping(bytes => uint) public cidVoteSet;


    /// @dev Initialize with the address of the DAO NFT
    /// @dev Initialize with the address of the DAO token
    constructor(address _DAOMemberNFT, address _wellCoin) {
        DAOMemberNFT = IERC721(_DAOMemberNFT);
        WellCoin = IWellCoin(_wellCoin);
    }

    /// @dev Allow the DAO members to approve a particular CID and then add to the bounty list
    /// @dev Also at the same time reward the user by sending them WellCoin
    function rewardAndAddBounty(bytes calldata _cidraw, uint _size, address _user, uint _reward) public {
        require(DAOMemberNFT.balanceOf(msg.sender) > 0, "Not a Guardian!");
        require(cidVoteSet[_cidraw]>2, "Not enough Guardians!");
        WellCoin.mintAndSend(_user, _reward);
        addCID(_cidraw,_size);
    }

    /// @dev Requires atleast 2 votes for approval of data set
    function approveOrRejectCID(bytes memory _cidraw, bool _vote) public {
        require(DAOMemberNFT.balanceOf(msg.sender) > 0, "Not a Guardian!");
        if(_vote){
            cidVoteSet[_cidraw] += 1;
        }
    }


}
