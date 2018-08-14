/* global describe contract beforeEach it assert artifacts */

const { objToBytes32 } = require("./helpers/converters");
const expectThrow = require("zeppelin-solidity/test/helpers/expectThrow").default;

const GenericStore = artifacts.require("GenericStore");

contract("GenericStore", accounts => {
  const [owner, user] = accounts;
  let store;

  beforeEach(async () => {
    store = await GenericStore.new();
  });

  describe("single", async () => {
    it("create", async () => {
      const inputs = {
        name: "john",
        age: 18,
        teen: 1,
      };
      const { keys, values } = objToBytes32(inputs);
      const key = keys[0];
      const value = values[0];

      await store.createSingle(key, value);

      const resValue = await store.read(key, 0);
      const length = await store.getItemLength(key);

      assert.equal(resValue, value);
      assert.isTrue(length.equals(1));
    });

    it("create duplicate", async () => {
      const inputs = {
        name: "john",
        age: 18,
        teen: 1,
      };
      const { keys, values } = objToBytes32(inputs);
      const key = keys[0];
      const value = values[0];

      await store.createSingle(key, value);
      await expectThrow(store.createSingle(key, value));
    });

    it("update", async () => {
      let bytes32 = objToBytes32({
        name: "john",
        age: 18,
        teen: 1,
      });
      let key = bytes32.keys[0];
      let value = bytes32.values[0];

      await store.createSingle(key, value);

      bytes32 = objToBytes32({
        name: "michael",
        age: 19,
        teen: 1,
      });
      key = bytes32.keys[0];
      value = bytes32.values[0];

      await store.updateSingle(key, value);

      const resValue = await store.read(key, 0);
      const length = await store.getItemLength(key);

      assert.equal(resValue, value);
      assert.isTrue(length.equals(1));
    });

    it("remove", async () => {
      const inputs = {
        name: "john",
        age: 18,
        teen: 1,
      };
      const { keys, values } = objToBytes32(inputs);
      const key = keys[0];
      const value = values[0];

      await store.createSingle(key, value);
      await store.removeSingle(key);

      const length = await store.getItemLength(key);

      assert.isTrue(length.equals(0));
    });
  });

  describe("multi", async () => {
    it("create", async () => {
      const inputs = {
        name: "john",
        age: 18,
        teen: 1,
      };
      const { keys, values } = objToBytes32(inputs);

      await store.createMulti(keys, values);

      await Promise.all(keys.map(async (key, i) => {
        const value = values[i];
        const resValue = await store.read(key, 0);
        const length = await store.getItemLength(key);

        assert.equal(resValue, value);
        assert.isTrue(length.equals(1));

        return true;
      }));
    });

    it("create duplicates", async () => {
      const inputs = {
        name: "john",
        age: 18,
        teen: 1,
      };
      const { keys, values } = objToBytes32(inputs);

      await store.createMulti(keys, values);
      await expectThrow(store.createMulti(keys, values));
    });

    it("update", async () => {
      // create
      const createInputs = objToBytes32({
        name: "john",
        age: 18,
        teen: 1,
      });
      await store.createMulti(createInputs.keys, createInputs.values);

      // update
      const inputs = {
        name: "michael",
        age: 19,
        teen: 1,
      };
      const { keys, values } = objToBytes32(inputs);

      await store.updateMulti(keys, values);

      await Promise.all(keys.map(async (key, i) => {
        const value = values[i];
        const resValue = await store.read(key, 0);
        const length = await store.getItemLength(key);

        assert.equal(resValue, value);
        assert.isTrue(length.equals(1));

        return true;
      }));
    });

    it("remove", async () => {
      // create
      const { keys, values } = objToBytes32({
        name: "john",
        age: 18,
        teen: 1,
      });
      await store.createMulti(keys, values);

      // remove
      await store.removeMulti(keys);

      await Promise.all(keys.map(async key => {
        const length = await store.getItemLength(key);

        assert.isTrue(length.equals(0));

        return true;
      }));
    });
  });
});
