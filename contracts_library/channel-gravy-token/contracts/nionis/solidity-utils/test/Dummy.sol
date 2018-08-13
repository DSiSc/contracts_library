pragma solidity ^0.4.23;

import "../FromBytes32.sol";
import "../FromBytes32Arr.sol";
import "../FromString.sol";


contract Dummy {
  function fromBytes32toUint256 (bytes32 v) external pure returns (uint256) {
    return FromBytes32.toUint256(v);
  }

  function fromBytes32toInt256 (bytes32 v) external pure returns (int256) {
    return FromBytes32.toInt256(v);
  }

  function fromBytes32toBool (bytes32 v) external pure returns (bool) {
    return FromBytes32.toBool(v);
  }

  function fromBytes32toString (bytes32 v) external pure returns (string) {
    return FromBytes32.toString(v);
  }

  function fromBytes32toAddress (bytes32 v) external pure returns (address) {
    return FromBytes32.toAddress(v);
  }

  function fromBytes32ArrtoString (bytes32[] v) external pure returns (string) {
    return FromBytes32Arr.toString(v);
  }

  function fromStringtoBytes32(string v) external pure returns (bytes32) {
    return FromString.toBytes32(v);
  }
}