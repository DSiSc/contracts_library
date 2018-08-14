pragma solidity ^0.4.19;

import "./GenericStore.sol";
import "./GenericStoreInterface.sol";
import "zeppelin-solidity/contracts/ownership/rbac/RBAC.sol";
import "solidity-utils/contracts/FromBytes32.sol";


// restricts writes to GenericStore
contract GenericStoreRestricted is GenericStoreInterface, GenericStore, RBAC {
  using FromBytes32 for bytes32;

  string private constant ROLE_EDITOR = "editor";

  // methods in which user can interact with store
  enum Methods {
    create,
    update,
    remove
  }

  // rules that need to be checked
  struct Rules {
    bool roleAdmin;
    bool roleEditor;
    bool roleKey;
  }

  // method => Rules
  mapping(uint256 => Rules) private rules;

  function GenericStoreRestricted (bool[] _rules) public {
    // update rules
    rules[uint256(Methods.create)] = Rules(_rules[0], _rules[1], _rules[2]);
    rules[uint256(Methods.update)] = Rules(_rules[3], _rules[4], _rules[5]);
    rules[uint256(Methods.remove)] = Rules(_rules[6], _rules[7], _rules[8]);
  }

  // modifiers
  modifier firewallSingle(uint256 method, bytes32 key) {
    bytes32[] memory keys = new bytes32[](1);
    keys[0] = key;

    require(firewallCheck(msg.sender, method, keys));
    _;
  }

  modifier firewallMulti(uint256 method, bytes32[] keys) {
    require(firewallCheck(msg.sender, method, keys));
    _;
  }

  // validates sender & keys
  function firewallCheck(address sender, uint256 method, bytes32[] keys) private returns (bool) {
    bool roleAdmin = rules[method].roleAdmin;
    bool roleEditor = rules[method].roleEditor;
    bool roleKey = rules[method].roleKey;

    // no rules activated, allow
    if (!roleAdmin && !roleEditor && !roleKey) {
      return true;
    }

    if (roleAdmin && hasRole(sender, ROLE_ADMIN)) {
      return true;
    }

    if (roleEditor && hasRole(sender, ROLE_EDITOR)) {
      return true;
    }

    if (roleKey) {
      if (method == 0) { // if its creating, add roles and allow creation
        for (uint256 i = 0; i < keys.length; i++) {
          string memory key = keys[i].toString();

          // if role doesnt exist, add role
          if (!hasRole(sender, key)) addRole(sender, key);
        }
      } else { // else check roles
        for (uint256 j = 0; j < keys.length; j++) {
          // if sender doesnt have the role, exit
          if (!hasRole(sender, keys[j].toString())) {
            return false;
          }
        }
      }

      return true;
    }

    // default to disallowing
    return false;
  }

  // interface
  function createSingle(bytes32 key, bytes32 value) external firewallSingle(uint256(Methods.create), key) returns (bool) {
    return super._createSingle(key, value);
  }

  function createMulti(bytes32[] keys, bytes32[] values) external firewallMulti(uint256(Methods.create), keys) returns (bool) {
    return super._createMulti(keys, values);
  }
  
  function updateSingle(bytes32 key, bytes32 value) external firewallSingle(uint256(Methods.update), key) returns (bool) {
    return super._updateSingle(key, value);
  }

  function updateMulti(bytes32[] keys, bytes32[] values) external firewallMulti(uint256(Methods.update), keys) returns (bool) {
    return super._updateMulti(keys, values);
  }
  
  function removeSingle(bytes32 key) external firewallSingle(uint256(Methods.remove), key) returns (bool) {
    return super._removeSingle(key);
  }

  function removeMulti(bytes32[] keys) external firewallMulti(uint256(Methods.remove), keys) returns (bool) {
    return super._removeMulti(keys);
  }
}