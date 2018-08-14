pragma solidity ^0.4.23;


library FromBytes32 {
  
  function toUint256 (bytes32 v) internal pure returns (uint256) {
    return uint256(v);
  }
  
  function toInt256 (bytes32 v) internal pure returns (int256) {
    return int256(v);
  }
  
  function toBool (bytes32 v) internal pure returns (bool) {
    uint256 _v = uint256(v);
    
    if (_v == 0) {
      return false;
    } else {
      return true;
    }
  }
  
  function toString (bytes32 v) internal pure returns (string) {
    bytes memory bytesString = new bytes(32);
    uint charCount = 0;
    
    for (uint j = 0; j < 32; j++) {
      byte char = byte(bytes32(uint(v) * 2 ** (8 * j)));
      if (char != 0) {
        bytesString[charCount] = char;
        charCount++;
      }
    }
    
    bytes memory bytesStringTrimmed = new bytes(charCount);
    for (j = 0; j < charCount; j++) {
      bytesStringTrimmed[j] = bytesString[j];
    }
    
    return string(bytesStringTrimmed);
  }
  
  function toAddress (bytes32 v) internal pure returns (address) {
    return address(v);
  }

}