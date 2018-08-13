var channelGravyTokenMigrations = artifacts.require("./jacquesd/channel-gravy-token/Migrations.sol");
var maheshmurthyEthereumVotingDappMigrations = artifacts.require("./maheshmurthy/ethereum_voting_dapp/Migrations.sol");
var willitscaleLearningSolidityTutorial28SolidityMigrations = artifacts.require("./willitscale/learning-solidity/tutorial-28/solidity/Migrations.sol");
var willitscaleLearningSolidityTutorial21Migrations = artifacts.require("./willitscale/learning-solidity/tutorial-21/Migrations.sol");
var willitscaleLearningSolidityTutorial22Migrations = artifacts.require("./willitscale/learning-solidity/tutorial-22/Migrations.sol");
var willitscaleLearningSolidityTutorial25Migrations = artifacts.require("./willitscale/learning-solidity/tutorial-25/Migrations.sol");
var willitscaleLearningSolidityTutorial26Migrations = artifacts.require("./willitscale/learning-solidity/tutorial-26/Migrations.sol");

module.exports = function(deployer) {
  deployer.deploy(channelGravyTokenMigrations);
  deployer.deploy(maheshmurthyEthereumVotingDappMigrations);
  deployer.deploy(willitscaleLearningSolidityTutorial28SolidityMigrations);
  deployer.deploy(willitscaleLearningSolidityTutorial21Migrations);
  deployer.deploy(willitscaleLearningSolidityTutorial22Migrations);
  deployer.deploy(willitscaleLearningSolidityTutorial25Migrations);
  deployer.deploy(willitscaleLearningSolidityTutorial26Migrations);
};
