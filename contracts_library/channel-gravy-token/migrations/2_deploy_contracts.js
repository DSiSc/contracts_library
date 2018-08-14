var maheshmurthyEthereumVotingDappVoting = artifacts.require("./maheshmurthy/ethereum_voting_dapp/Voting.sol");
var maheshmurthyEthereumVotingDappECRecovery = artifacts.require("./maheshmurthy/ethereum_voting_dapp/ECRecovery.sol");

var willitscaleLearningSolidityTutorial28SolidityAddressBook = artifacts.require("./willitscale/learning-solidity/tutorial-28/solidity/AddressBook.sol");

var willitscaleLearningSolidityTutorial21ConvertLib = artifacts.require("./willitscale/learning-solidity/tutorial-21/ConvertLib.sol");
var willitscaleLearningSolidityTutorial21MetaCoin = artifacts.require("./willitscale/learning-solidity/tutorial-21/MetaCoin.sol");

var willitscaleLearningSolidityTutorial22SafeMath = artifacts.require("./willitscale/learning-solidity/tutorial-22/SafeMath.sol");
var willitscaleLearningSolidityTutorial22MyToken = artifacts.require("./willitscale/learning-solidity/tutorial-22/MyToken.sol");
var willitscaleLearningSolidityTutorial22Addresses = artifacts.require("./willitscale/learning-solidity/tutorial-22/Addresses.sol");
var willitscaleLearningSolidityTutorial22Crowdsale = artifacts.require("./willitscale/learning-solidity/tutorial-22/Crowdsale2.sol");

var willitscaleLearningSolidityTutorial25MultiSigWallet = artifacts.require("./willitscale/learning-solidity/tutorial-25/MultiSigWallet.sol");

var willitscaleLearningSolidityTutorial26MultiSigWallet = artifacts.require("./willitscale/learning-solidity/tutorial-26/MultiSigWallet.sol");


var willitscaleLearningSolidityTutorial09MyToken = artifacts.require("./willitscale/learning-solidity/tutorial-09/MyToken.sol");
var willitscaleLearningSolidityTutorial10MyFirstToken = artifacts.require("./willitscale/learning-solidity/tutorial-10/MyFirstToken.sol");
var willitscaleLearningSolidityTutorial02myfirstcontract = artifacts.require("./willitscale/learning-solidity/tutorial-02/MyFirstContract.sol");
var willitscaleLearningSolidityTutorial07TestStrings = artifacts.require("./willitscale/learning-solidity/tutorial-07/TestStrings.sol");
var willitscaleLearningSolidityTutorial07Strings = artifacts.require("./willitscale/learning-solidity/tutorial-07/Strings.sol");
var willitscaleLearningSolidityTutorial01myfirstcontract = artifacts.require("./willitscale/learning-solidity/tutorial-01/MyFirstContract.sol");
var willitscaleLearningSolidityTutorial19NestedArrays = artifacts.require("./willitscale/learning-solidity/tutorial-19/NestedArrays.sol");
var willitscaleLearningSolidityTutorial13Assembly = artifacts.require("./willitscale/learning-solidity/tutorial-13/Assembly.sol");
var willitscaleLearningSolidityTutorial15ExternalContract = artifacts.require("./willitscale/learning-solidity/tutorial-15/ExternalContract.sol");
var willitscaleLearningSolidityTutorial04testLibrary = artifacts.require("./willitscale/learning-solidity/tutorial-04/TestLibrary.sol");
var willitscaleLearningSolidityTutorial04library = artifacts.require("./willitscale/learning-solidity/tutorial-04/IntExtended.sol");
var willitscaleLearningSolidityTutorial08Debugging = artifacts.require("./willitscale/learning-solidity/tutorial-08/Debugging.sol");
var willitscaleLearningSolidityTutorial05transaction = artifacts.require("./willitscale/learning-solidity/tutorial-05/Transaction.sol");
var willitscaleLearningSolidityTutorial18Casino = artifacts.require("./willitscale/learning-solidity/tutorial-18/Casino.sol");
var willitscaleLearningSolidityTutorial18Random = artifacts.require("./willitscale/learning-solidity/tutorial-18/Random.sol");
var willitscaleLearningSolidityTutorial11MyFirstToken = artifacts.require("./willitscale/learning-solidity/tutorial-11/MyFirstToken.sol");
var willitscaleLearningSolidityTutorial12Assembly = artifacts.require("./willitscale/learning-solidity/tutorial-12/Assembly.sol");
var willitscaleLearningSolidityTutorial20Assignments = artifacts.require("./willitscale/learning-solidity/tutorial-20/Assignments.sol");
var willitscaleLearningSolidityTutorial23StateModifiers = artifacts.require("./willitscale/learning-solidity/tutorial-23/StateModifiers.sol");
var willitscaleLearningSolidityTutorial14EtherTransferFrom = artifacts.require("./willitscale/learning-solidity/tutorial-14/EtherTransferFrom.sol");
var willitscaleLearningSolidityTutorial14EtherTransferTo = artifacts.require("./willitscale/learning-solidity/tutorial-14/EtherTransferTo.sol");
var willitscaleLearningSolidityTutorial03myfirstcontract = artifacts.require("./willitscale/learning-solidity/tutorial-03/MyFirstContract.sol");
var willitscaleLearningSolidityTutorial17Alphabet = artifacts.require("./willitscale/learning-solidity/tutorial-17/Alphabet.sol");
var willitscaleLearningSolidityTutorial16TimeBased = artifacts.require("./willitscale/learning-solidity/tutorial-16/TimeBased.sol");
var willitscaleLearningSolidityTutorial16AlarmTrigger = artifacts.require("./willitscale/learning-solidity/tutorial-16/AlarmTrigger.sol");
var willitscaleLearningSolidityTutorial06DataTypes = artifacts.require("./willitscale/learning-solidity/tutorial-06/DataTypes.sol");
var willitscaleLearningSolidityTutorial24MultiSigWallet = artifacts.require("./willitscale/learning-solidity/tutorial-24/MultiSigWallet.sol");

var vcinlyTheNineBillionNamesOfGodnine = artifacts.require("./vcinly/TheNineBillionNamesOfGod/Nine.sol");

const sigUtil = require("eth-sig-util")

var alice_vote_hash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: "Vote for Alice"}])
var bob_vote_hash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: "Vote for Bob"}])
var carol_vote_hash = sigUtil.typedSignatureHash([{ type: 'string', name: 'Message', value: "Vote for Carol"}])

module.exports = function(deployer) {
  deployer.deploy(maheshmurthyEthereumVotingDappECRecovery);
  deployer.link(maheshmurthyEthereumVotingDappECRecovery, maheshmurthyEthereumVotingDappVoting);
  deployer.deploy(maheshmurthyEthereumVotingDappVoting, ['Alice', 'Bob', 'Carol'], [alice_vote_hash, bob_vote_hash, carol_vote_hash]);

  deployer.deploy(willitscaleLearningSolidityTutorial28SolidityAddressBook);
  deployer.deploy(willitscaleLearningSolidityTutorial21ConvertLib);
  deployer.link(willitscaleLearningSolidityTutorial21ConvertLib, willitscaleLearningSolidityTutorial21MetaCoin);
  deployer.deploy(willitscaleLearningSolidityTutorial21MetaCoin);

  deployer.deploy(willitscaleLearningSolidityTutorial22SafeMath);
  deployer.link(willitscaleLearningSolidityTutorial22SafeMath, willitscaleLearningSolidityTutorial22MyToken);
  deployer.deploy(willitscaleLearningSolidityTutorial22Addresses);
  deployer.link(willitscaleLearningSolidityTutorial22Addresses, willitscaleLearningSolidityTutorial22MyToken);
  deployer.deploy(willitscaleLearningSolidityTutorial22MyToken).then(function(){
    return deployer.deploy(
      willitscaleLearningSolidityTutorial22Crowdsale,
      willitscaleLearningSolidityTutorial22MyToken.address,
      web3.eth.blockNumber,
      web3.eth.blockNumber+1000,
      web3.toWei(1, 'ether'),
      1
    ).then(function(){});
  });

  deployer.deploy(willitscaleLearningSolidityTutorial25MultiSigWallet);

  deployer.deploy(willitscaleLearningSolidityTutorial26MultiSigWallet);

  deployer.deploy(willitscaleLearningSolidityTutorial09MyToken);
  deployer.deploy(willitscaleLearningSolidityTutorial10MyFirstToken);
  deployer.deploy(willitscaleLearningSolidityTutorial02myfirstcontract);
  deployer.deploy(willitscaleLearningSolidityTutorial07TestStrings);
  deployer.deploy(willitscaleLearningSolidityTutorial07Strings);
  deployer.deploy(willitscaleLearningSolidityTutorial01myfirstcontract);
  deployer.deploy(willitscaleLearningSolidityTutorial19NestedArrays);
  deployer.deploy(willitscaleLearningSolidityTutorial13Assembly);
  deployer.deploy(willitscaleLearningSolidityTutorial15ExternalContract);
  deployer.deploy(willitscaleLearningSolidityTutorial04library);
  deployer.link(willitscaleLearningSolidityTutorial04library, willitscaleLearningSolidityTutorial04testLibrary);
  deployer.deploy(willitscaleLearningSolidityTutorial04testLibrary);
  deployer.deploy(willitscaleLearningSolidityTutorial08Debugging);
  deployer.deploy(willitscaleLearningSolidityTutorial05transaction);
  deployer.deploy(willitscaleLearningSolidityTutorial18Casino);
  deployer.deploy(willitscaleLearningSolidityTutorial18Random);
  deployer.deploy(willitscaleLearningSolidityTutorial11MyFirstToken);
  deployer.deploy(willitscaleLearningSolidityTutorial12Assembly);
  deployer.deploy(willitscaleLearningSolidityTutorial20Assignments);
  deployer.deploy(willitscaleLearningSolidityTutorial23StateModifiers);
  deployer.deploy(willitscaleLearningSolidityTutorial14EtherTransferFrom);
  deployer.deploy(willitscaleLearningSolidityTutorial14EtherTransferTo);
  deployer.deploy(willitscaleLearningSolidityTutorial03myfirstcontract);
  deployer.deploy(willitscaleLearningSolidityTutorial17Alphabet);
  deployer.deploy(willitscaleLearningSolidityTutorial16TimeBased);
  deployer.deploy(willitscaleLearningSolidityTutorial16AlarmTrigger);
  deployer.deploy(willitscaleLearningSolidityTutorial06DataTypes);
  deployer.deploy(willitscaleLearningSolidityTutorial24MultiSigWallet);

  deployer.deploy(vcinlyTheNineBillionNamesOfGodnine);
};
