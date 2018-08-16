/* global describe contract beforeEach it artifacts */
const Dummy = artifacts.require("Dummy");

const items = {
  uint256: {
    input: "0x0000000000000000000000000000000000000000000000000000000000000539",
    result: 1337,
    fn: "fromBytes32toUint256"
  },
  int256: {
    input: "0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffac7",
    result: -1337,
    fn: "fromBytes32toInt256"
  },
  bool: {
    input: "0x0000000000000000000000000000000000000000000000000000000000000001",
    result: true,
    fn: "fromBytes32toBool"
  },
  string: {
    input: "0x68656c6c6f000000000000000000000000000000000000000000000000000000",
    result: "hello",
    fn: "fromBytes32toString"
  },
  address: {
    input: "0x000000000000000000000000ca35b7d915458ef540ade6068dfe2f44e8fa733c",
    result: "0xca35b7d915458ef540ade6068dfe2f44e8fa733c",
    fn: "fromBytes32toAddress"
  }
};

contract("FromBytes32", () => {
  let dummy;

  beforeEach(async () => {
    dummy = await Dummy.new();
  });

  it("bytes32 to uint256", async () => {
    const item = items.uint256;

    const result = await dummy.fromBytes32toUint256(item.input);
    assert.equal(result, item.result);
  });

  it("bytes32 to int256", async () => {
    const item = items.int256;

    const result = await dummy.fromBytes32toInt256(item.input);
    assert.equal(result, item.result);
  });

  it("bytes32 to bool", async () => {
    const item = items.bool;

    const result = await dummy.fromBytes32toBool(item.input);
    assert.equal(result, item.result);
  });

  it("bytes32 to string", async () => {
    const item = items.string;

    const result = await dummy.fromBytes32toString(item.input);
    assert.equal(result, item.result);
  });

  it("bytes32 to address", async () => {
    const item = items.address;

    const result = await dummy.fromBytes32toAddress(item.input);
    assert.equal(result, item.result);
  });
});
