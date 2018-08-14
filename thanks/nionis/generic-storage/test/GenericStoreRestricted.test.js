/* global describe contract beforeEach it web3 assert artifacts */

const { objToBytes32 } = require("./helpers/converters");
const expectThrow = require("zeppelin-solidity/test/helpers/expectThrow").default;

const GenericStoreRestricted = artifacts.require("GenericStoreRestricted");

const all = [false, false, false, false, false, false, false, false, false];
const adminOnly = [true, false, false, true, false, false, true, false, false];
const keysOnly = [false, false, true, false, false, true, false, false, true];

contract("GenericStoreRestricted", accounts => {
  const [owner, user] = accounts;
  let store;

  describe("all", async () => {
    beforeEach(async () => {
      store = await GenericStoreRestricted.new(all);
    });

    it("create", async () => {
      const adminInputs = objToBytes32({
        name1: "john",
        age1: 18,
        teen1: 1,
      });
      const userInputs = objToBytes32({
        name2: "michael",
        age2: 9,
        teen2: 0,
      });

      await store.createMulti(adminInputs.keys, adminInputs.values);
      await store.createMulti(userInputs.keys, userInputs.values, { from: user });

      await Promise.all(adminInputs.keys.map(async (key, i) => {
        const value = adminInputs.values[i];
        const resValue = await store.read(key, 0);
        const length = await store.getItemLength(key);

        assert.equal(resValue, value);
        assert.isTrue(length.equals(1));

        return true;
      }));

      await Promise.all(userInputs.keys.map(async (key, i) => {
        const value = userInputs.values[i];
        const resValue = await store.read(key, 0);
        const length = await store.getItemLength(key);

        assert.equal(resValue, value);
        assert.isTrue(length.equals(1));

        return true;
      }));
    });

    it("update", async () => {
      const adminInputs = objToBytes32({
        name1: "john",
        age1: 18,
        teen1: 1,
      });
      const userInputs = objToBytes32({
        name2: "michael",
        age2: 9,
        teen2: 0,
      });

      await store.createMulti(adminInputs.keys, adminInputs.values);
      await store.createMulti(userInputs.keys, userInputs.values, { from: user });

      await store.updateMulti(adminInputs.keys, adminInputs.values);
      await store.updateMulti(userInputs.keys, userInputs.values, { from: user });

      await Promise.all(adminInputs.keys.map(async (key, i) => {
        const value = adminInputs.values[i];
        const resValue = await store.read(key, 0);
        const length = await store.getItemLength(key);

        assert.equal(resValue, value);
        assert.isTrue(length.equals(1));

        return true;
      }));

      await Promise.all(userInputs.keys.map(async (key, i) => {
        const value = userInputs.values[i];
        const resValue = await store.read(key, 0);
        const length = await store.getItemLength(key);

        assert.equal(resValue, value);
        assert.isTrue(length.equals(1));

        return true;
      }));
    });

    it("remove", async () => {
      const adminInputs = objToBytes32({
        name1: "john",
        age1: 18,
        teen1: 1,
      });
      const userInputs = objToBytes32({
        name2: "michael",
        age2: 9,
        teen2: 0,
      });

      await store.createMulti(adminInputs.keys, adminInputs.values);
      await store.createMulti(userInputs.keys, userInputs.values, { from: user });

      await store.removeMulti(adminInputs.keys);
      await store.removeMulti(userInputs.keys, { from: user });

      await Promise.all(adminInputs.keys.map(async key => {
        const length = await store.getItemLength(key);

        assert.isTrue(length.equals(0));

        return true;
      }));

      await Promise.all(userInputs.keys.map(async key => {
        const length = await store.getItemLength(key);

        assert.isTrue(length.equals(0));

        return true;
      }));
    });
  });

  describe("adminOnly", async () => {
    beforeEach(async () => {
      store = await GenericStoreRestricted.new(adminOnly);
    });

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

    it("create by user", async () => {
      const inputs = {
        name: "john",
        age: 18,
        teen: 1,
      };
      const { keys, values } = objToBytes32(inputs);

      await expectThrow(store.createMulti(keys, values, { from: user }));
    });

    it("update", async () => {
      const inputs = {
        name: "john",
        age: 18,
        teen: 1,
      };
      const { keys, values } = objToBytes32(inputs);

      await store.createMulti(keys, values);
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

    it("update by user", async () => {
      const inputs = {
        name: "john",
        age: 18,
        teen: 1,
      };
      const { keys, values } = objToBytes32(inputs);

      await store.createMulti(keys, values);
      await expectThrow(store.updateMulti(keys, values, { from: user }));
    });

    it("remove", async () => {
      const inputs = objToBytes32({
        name1: "john",
        age1: 18,
        teen1: 1,
      });

      await store.createMulti(inputs.keys, inputs.values);

      await store.removeMulti(inputs.keys);

      await Promise.all(inputs.keys.map(async key => {
        const length = await store.getItemLength(key);

        assert.isTrue(length.equals(0));

        return true;
      }));
    });

    it("remove by user", async () => {
      const inputs = objToBytes32({
        name1: "john",
        age1: 18,
        teen1: 1,
      });

      await store.createMulti(inputs.keys, inputs.values);

      await expectThrow(store.removeMulti(inputs.keys, { from: user }));
    });
  });

  describe("create: admin, update/remove: keys", async () => {
    beforeEach(async () => {
      store = await GenericStoreRestricted.new(keysOnly);
    });

    it("create", async () => {
      const adminInputs = objToBytes32({
        name1: "john",
        age1: 18,
        teen1: 1,
      });
      const userInputs = objToBytes32({
        name2: "michael",
        age2: 9,
        teen2: 0,
      });

      await store.createMulti(adminInputs.keys, adminInputs.values);
      await store.createMulti(userInputs.keys, userInputs.values, { from: user });

      await Promise.all(adminInputs.keys.map(async (key, i) => {
        const value = adminInputs.values[i];
        const resValue = await store.read(key, 0);
        const length = await store.getItemLength(key);
        const hasRole = await store.hasRole(owner, web3.toAscii(key));

        assert.equal(resValue, value);
        assert.isTrue(length.equals(1));
        assert.isTrue(hasRole);

        return true;
      }));

      await Promise.all(userInputs.keys.map(async (key, i) => {
        const value = userInputs.values[i];
        const resValue = await store.read(key, 0);
        const length = await store.getItemLength(key);
        const hasRole = await store.hasRole(user, web3.toAscii(key));

        assert.equal(resValue, value);
        assert.isTrue(length.equals(1));
        assert.isTrue(hasRole);

        return true;
      }));
    });

    it("update", async () => {
      const inputs1 = objToBytes32({
        name: "john",
        age: 18,
        teen: 1,
      });
      const inputs2 = objToBytes32({
        name: "michael",
        age: 9,
        teen: 0,
      });

      await store.createMulti(inputs1.keys, inputs1.values);

      await store.updateMulti(inputs2.keys, inputs2.values);
      await expectThrow(store.updateMulti(inputs2.keys, inputs2.values, { from: user }));

      await Promise.all(inputs2.keys.map(async (key, i) => {
        const value = inputs2.values[i];
        const resValue = await store.read(key, 0);
        const length = await store.getItemLength(key);
        const hasRole = await store.hasRole(owner, web3.toAscii(key));

        assert.equal(resValue, value);
        assert.isTrue(length.equals(1));
        assert.isTrue(hasRole);

        return true;
      }));
    });

    it("remove", async () => {
      const adminInputs = objToBytes32({
        name1: "john",
        age1: 18,
        teen1: 1,
      });
      const userInputs = objToBytes32({
        name2: "michael",
        age2: 9,
        teen2: 0,
      });

      await store.createMulti(adminInputs.keys, adminInputs.values);
      await store.createMulti(userInputs.keys, userInputs.values, { from: user });

      await store.removeMulti(adminInputs.keys);
      await store.removeMulti(userInputs.keys, { from: user });

      await Promise.all(adminInputs.keys.map(async key => {
        const length = await store.getItemLength(key);

        assert.isTrue(length.equals(0));

        return true;
      }));

      await Promise.all(userInputs.keys.map(async key => {
        const length = await store.getItemLength(key);

        assert.isTrue(length.equals(0));

        return true;
      }));
    });
  });
});
