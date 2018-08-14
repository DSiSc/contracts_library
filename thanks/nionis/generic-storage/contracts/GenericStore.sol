pragma solidity ^0.4.19;

import "./GenericStoreInterface.sol";


contract GenericStore is GenericStoreInterface {
  // key => values
  // values is an array, this is mostly needed to handle large strings
  mapping (bytes32 => bytes32[]) internal items;

  // creates item, makes sure not to overwrite already existing key
  function _createSingle(bytes32 key, bytes32 value) internal returns (bool) {
    require(items[key].length <= 0);

    return _updateSingle(key, value);
  }

  // creates items, makes sure not to overwrite already existing keys
  function _createMulti(bytes32[] keys, bytes32[] values) internal returns (bool) {
    if (keys.length != values.length) return false;

    for (uint256 i = 0; i < keys.length; i++) {
      _createSingle(keys[i], values[i]);
    }

    return true;
  }

  // updates item
  function _updateSingle(bytes32 key, bytes32 value) internal returns (bool) {
    // remove old data
    _removeSingle(key);

    // update with new data
    items[key].push(value);
    
    return true;
  }

  // updates items
  function _updateMulti(bytes32[] keys, bytes32[] values) internal returns (bool) {
    if (keys.length != values.length) return false;

    // update with new data
    for (uint256 i = 0; i < keys.length; i++) {
      _updateSingle(keys[i], values[i]);
    }
    
    return true;
  }

  // removes item
  function _removeSingle(bytes32 key) internal returns (bool) {
    delete items[key];
    
    return true;
  }

  // removes items
  function _removeMulti(bytes32[] keys) internal returns (bool) {
    for (uint256 i = 0; i < keys.length; i++) {
      _removeSingle(keys[i]);
    }
    
    return true;
  }

  // get item values
  function getItem(bytes32 key) internal view returns (bytes32[]) {
    return items[key];
  }

  // interface
  function createSingle(bytes32 key, bytes32 value) external returns (bool) {
    return _createSingle(key, value);
  }

  function createMulti(bytes32[] keys, bytes32[] values) external returns (bool) {
    return _createMulti(keys, values);
  }

  function updateSingle(bytes32 key, bytes32 value) external returns (bool) {
    return _updateSingle(key, value);
  }

  function updateMulti(bytes32[] keys, bytes32[] values) external returns (bool) {
    return _updateMulti(keys, values);
  }

  function removeSingle(bytes32 key) external returns (bool) {
    return _removeSingle(key);
  }

  function removeMulti(bytes32[] keys) external returns (bool) {
    return _removeMulti(keys);
  }

  // length of an item
  function getItemLength(bytes32 key) external view returns (uint256) {
    return items[key].length;
  }

  // read item at index
  function read(bytes32 key, uint256 index) external view returns (bytes32) {
    return items[key][index];
  }
}