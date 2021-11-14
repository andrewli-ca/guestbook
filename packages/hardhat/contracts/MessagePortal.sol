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

  constructor() payable {}

  function send(string memory _message) public {
    messages.push(Message(msg.sender, _message, block.timestamp));

    uint256 prizeAmount = 0.0001 ether;

    require(
      prizeAmount <= address(this).balance,
      'Withdrawl amount greater than contract balance.'
    );

    // Send ether
    (bool success, ) = (msg.sender).call{value: prizeAmount}('');
    require(success, 'Failed to withdrawl money from contract.');

    emit NewMessage(msg.sender, block.timestamp, _message);
  }

  function getAllMessages() public view returns (Message[] memory) {
    return messages;
  }
}
