// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import 'hardhat/console.sol';

contract MessagePortal {
  event NewMessage(address indexed from, uint256 timestamp, string message);

  struct Message {
    address visitor;
    string message;
    uint256 timestamp;
  }

  Message[] messages;

  function send(string memory _message) public {
    messages.push(Message(msg.sender, _message, block.timestamp));
    emit NewMessage(msg.sender, block.timestamp, _message);
  }

  function getAllMessages() public view returns (Message[] memory) {
    return messages;
  }
}
