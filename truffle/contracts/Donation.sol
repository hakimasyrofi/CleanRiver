// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Donation {
    uint256 public totalDonation;
    uint256 public donationCount;
    address payable public owner;

    receive() external payable {
    }

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    mapping (uint256 => TransactionDetail) public transactionHistory;

    struct TransactionDetail {
        address addr;
        uint256 amount;
        uint256 timestamp;
    }

    function sendDonation() public payable {
        require(msg.value > 0, "Mush greater than zero");
        owner.transfer(msg.value);
        transactionHistory[donationCount] = TransactionDetail(msg.sender, msg.value, block.timestamp);
        totalDonation += msg.value;
        donationCount++;
    }

    function setAddrFundraiser(address payable _addr) public onlyOwner {
        owner = _addr;
    }
}