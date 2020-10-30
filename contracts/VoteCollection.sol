// SPDX-License-Identifier: MIT
pragma solidity ^0.7.4;
pragma experimental ABIEncoderV2;

contract VoteCollection {
    string public privateKey;
    string[] public candidates;
    string[] public stronghold;
    address immutable public owner = msg.sender;
    address public voteProvider;
    bool public isSettingFinish;
    VoteTime public votingTime;

    struct VoteTime {
        uint startTime;
        uint expireTime;
    }

    modifier isOwner() {
        require(owner == msg.sender, "Who are you?");
        _;
    }

    modifier isEnableSetting() {
        require(!isSettingFinish, "Can't setting anymore.");
        _;
    }

    modifier isBeforeVoting() {
        require(block.timestamp < votingTime.startTime, "Voting is not yet.");
        _;
    }

    modifier isVotingTime() {
        require(
            votingTime.startTime <= block.timestamp && block.timestamp <= votingTime.expireTime,
            "Not voting Time!"
        );
        _;
    }

    modifier isFinishedVoting() {
        require(
            block.timestamp > votingTime.expireTime && keccak256(bytes(privateKey)) == keccak256(bytes("")),
            "Voting is end."
        );
        _;
    }

    // 正式投票;
    function voteTo(string calldata data) public isVotingTime returns (bytes memory) {
        bytes memory payload = abi.encodeWithSignature("recycleVote(address)", msg.sender);
        (bool success, bytes memory returnData) = voteProvider.delegatecall(payload);

        require(success);

        stronghold.push(data);
        return returnData;
    }

    //  初始化：設置投票時間;
    function setTime(uint _startTime, uint _expireTime) public isOwner isEnableSetting{
        votingTime.startTime = _startTime;
        votingTime.expireTime = _expireTime;
    }

    //  初始化：加入候選項目;
    function introduceCandidate(string calldata _introduce) public isOwner isBeforeVoting isEnableSetting{
        candidates.push(_introduce);
    }

    //  初始化：設置拿票箱地址
    function setVoteProvider(address _provider) public isOwner isBeforeVoting isEnableSetting{
        voteProvider = _provider;
    }

    //  停止一切初始化設定;
    function stopSetAnymore() public isOwner isBeforeVoting isEnableSetting{
        isSettingFinish = true;
    }

    //  設置私鑰;
    function setPrivateKey(string calldata _privateKey) public isOwner isFinishedVoting{
        privateKey = _privateKey;
    }

    //  取得投票項目;
    function getCandidates() public view returns(string[] memory) {
        return candidates;
    }

    // 取得選票結果;
    function getVoteResult() public view isFinishedVoting returns (string[] memory){
        return stronghold;
    }
}
