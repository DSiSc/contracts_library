/* global describe contract beforeEach it artifacts */
const Dummy = artifacts.require("Dummy");

const items = {
  strings: {
    inputs: [
      "0x68656c6c6f20776f726c64000000000000000000000000000000000000000000",
      "0x6279650000000000000000000000000000000000000000000000000000000000"
    ],
    result: "hello worldbye"
  }
};

contract("FromBytes32Arr", () => {
  let dummy;

  beforeEach(async () => {
    dummy = await Dummy.new();
  });

  it("bytes32 array to strings", async () => {
    const item = items.strings;

    const result = await dummy.fromBytes32ArrtoString(item.inputs);
    assert.equal(result, item.result);
  });
});
