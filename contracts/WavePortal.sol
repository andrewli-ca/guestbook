// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract WavePortal {
    // State variable. This is stored permanently in contract storage.
    address[] public users;
    mapping(address => uint256) public totalWaves;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    function wave() public {
        if (totalWaves[msg.sender] == 0) {
            users.push(msg.sender);
        }

        totalWaves[msg.sender] += 1;

        // The wallet address of the person who called the function.
        console.log("%s has waved!", msg.sender);
    }

    function getTotalWaves(address user) public view returns (uint256) {
        console.log("We have %d total waves from %s", totalWaves[user], user);
        return totalWaves[user];
    }
}
