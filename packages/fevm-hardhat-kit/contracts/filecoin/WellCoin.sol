// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

contract WellCoin {
        mapping (address => uint) balances;
        IERC721 public DAOMemberNFT;
        address public dao;
        event Transfer(address indexed _from, address indexed _to, uint256 _value);

        constructor(address _DAOMemberNFT) {
                balances[tx.origin] = 10000;
                DAOMemberNFT = IERC721(_DAOMemberNFT);
        }

        function sendCoin(address receiver, uint amount) public returns(bool sufficient) {
                if (balances[msg.sender] < amount) return false;
                balances[msg.sender] -= amount;
                balances[receiver] += amount;
                emit Transfer(msg.sender, receiver, amount);
                return true;
        }

        function mintAndSend(address receiver, uint amount) public returns(bool sufficient) {
                require(msg.sender == dao, "Not a Guardian!");

                balances[receiver] += amount;
                emit Transfer(msg.sender, receiver, amount);
                return true;
        }

        function setDAO(address _dao) {
                require(DAOMemberNFT.balanceOf(msg.sender) > 0, "Not a Guardian!");
                dao = _dao;
        }

        function getBalanceInEth(address addr) public view returns(uint){
                return getBalance(addr) * 2;
        }

        function getBalance(address addr) public view returns(uint) {
                return balances[addr];
        }
}