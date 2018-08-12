/* global describe contract beforeEach it artifacts */
const Dummy = artifacts.require("Dummy");

const items = {
  bytes32: {
    input: "hello world",
    result: "0x68656c6c6f20776f726c64000000000000000000000000000000000000000000"
  }
};

contract("FromString", () => {
  let dummy;

  beforeEach(async () => {
    dummy = await Dummy.new();
  });

  it("string to bytes32", async () => {
    const item = items.bytes32;

    const result = await dummy.fromStringtoBytes32(item.input);
    assert.equal(result, item.result);
  });
});
