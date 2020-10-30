// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;

contract RandomNumber {
    uint private number;
    address public owner;

    constructor() {
        owner = msg.sender;
        number = random();
    }

    function random() private view returns (uint) {
        return uint(keccak256(abi.encodePacked(block.timestamp)));
    }

    function getNumber() public pure returns (uint) {
        return 1234567890;
    }
}
