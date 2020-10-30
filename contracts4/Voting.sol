pragma solidity ^0.4.18;

contract Voting {
    bytes32[] public candidateList;
    mapping(bytes32 => uint8) public voteReceived;

    constructor(bytes32[] candidateNames) public {
        candidateList = candidateNames;
    }

    function voteForCandidate(byte32 candidate) public {
        require(validCandidate(candidate));
        voteReceived[candidate] += 1;
    }

    function totalVoteFor(byte32 candidate) view public returns (uint8){
        require(validCandidate(candidate));
        return voteReceived[candidate];
    }

    function validCandidate(byte32 candidate) view public returns (bool){
        for(uint8 i = 0; i < candidateList.length; i++) {
            if(candidateList[i] == candidate)
                return true;
        }
        return false;
    }
}
