// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import 'hardhat/console.sol';

contract MessagePortal {
  struct Message {
    address visitor;
    string message;
    uint256 timesetamp;
  }

  Message[] messages;

  function send(string memory _message) public {
    messages.push(Message(msg.sender, _message, block.timestamp));
  }

  function getAllMessages() public view returns (Message[] memory) {
    return messages;
  }
}
