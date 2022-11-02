// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

error Raffle__NotEnoughETHEntered();

contract Raffle is VRFConsumerBaseV2 {
  uint256 private immutable i_entranceFee;
  address payable[] private s_players;

  // Events
  event RaffleEnter(address indexed player);

  constructor(address vrfCoordinatorV2, uint256 entrabceFee)
    VRFConsumerBaseV2(vrfCoordinatorV2)
  {
    i_entranceFee = entrabceFee;
  }

  function requestRandomWinner() external {}

  function fulfillRandomWords(uint256 requestId, uint256[] memory randomWords)
    internal
    override
  {}

  function getEntranceFee() public view returns (uint256) {
    return i_entranceFee;
  }

  function enterRaffle() public payable {
    if (msg.value < i_entranceFee) {
      revert Raffle__NotEnoughETHEntered();
    }
    s_players.push(payable(msg.sender));
    emit RaffleEnter(msg.sender);
  }

  function getPlayer(uint256 index) public view returns (address) {
    return s_players[index];
  }

  // function pickRandomWinner() {}
}
