pragma solidity ^0.4.19;


contract GenericStoreInterface {
  
  function createSingle(bytes32 key, bytes32 value) external returns (bool);

  function createMulti(bytes32[] keys, bytes32[] values) external returns (bool);

  function updateSingle(bytes32 key, bytes32 value) external returns (bool);

  function updateMulti(bytes32[] keys, bytes32[] values) external returns (bool);

  function removeSingle(bytes32 key) external returns (bool);

  function removeMulti(bytes32[] keys) external returns (bool);

  function getItemLength(bytes32 key) external view returns (uint256);

  function read(bytes32 key, uint256 index) external view returns (bytes32);
  
}