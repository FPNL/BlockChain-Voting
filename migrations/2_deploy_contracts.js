const VoteCollection = artifacts.require("VoteCollection");
const VoteProvider = artifacts.require("VoteProvider");

module.exports = function(deployer) {
  deployer.deploy(VoteCollection);
  deployer.deploy(VoteProvider);
};
