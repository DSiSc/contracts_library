const web3Utils = require("web3-utils");

const uint256ToBytes32 = n => web3Utils.leftPad(web3Utils.numberToHex(n), 64, "0");

const utf8ToBytes32 = str => web3Utils.rightPad(web3Utils.utf8ToHex(str), 64, "0");

const objToBytes32 = obj => {
  const entries = Object.entries(obj);
  const bytes32 = entries.reduce(
    (all, [key, val]) => {
      all.keys.push(utf8ToBytes32(key));

      if (typeof val === "number") {
        all.values.push(uint256ToBytes32(val));
      } else {
        all.values.push(utf8ToBytes32(val));
      }

      return all;
    },
    { keys: [], values: [] },
  );

  return bytes32;
};

const bytes32ToAddr = str => `0x${str.slice(26, 66)}`;

module.exports = {
  uint256ToBytes32,
  utf8ToBytes32,
  objToBytes32,
  bytes32ToAddr,
};
