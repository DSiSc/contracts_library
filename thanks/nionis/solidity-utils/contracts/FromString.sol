/* solhint-disable no-inline-assembly*/
pragma solidity ^0.4.23;


library FromString {
  
  function toBytes32(string v) internal pure returns (bytes32 result) {
    bytes memory tempEmptyStringTest = bytes(v);
    
    if (tempEmptyStringTest.length == 0) {
      return 0x0;
    }

    assembly {
      result := mload(add(v, 32))
    }
  }
  
}