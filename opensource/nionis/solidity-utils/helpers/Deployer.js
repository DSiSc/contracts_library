/*
  wrapper around truffle deploy to save addresses and retrieve them
*/

const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const path = require("path");

const Deployer = ({ truffleDeployer, network, web3 }) => {
  const addressesPath = path.join("build", `addresses-${network}.json`);
  const adapter = new FileSync(addressesPath);
  const db = low(adapter);
  db.defaults({}).write();

  const getAddresses = () => db.getState();

  const deploy = ({ contract, name }, ...args) =>
    truffleDeployer.deploy(contract, ...args).then(async () => {
      const deployed = contract.at(contract.address);

      const contractName = name || deployed.constructor.contractName;
      db.set(contractName, deployed.address).write();

      return deployed;
    });

  const deployTx = txFn => {
    let interval = null;

    return new Promise((resolve, reject) => {
      txFn()
        .then(response => {
          const { tx } = response;
          let { receipt } = response;

          if (!tx) return reject(Error("no tx found"));
          if (receipt && receipt.status !== "0x01")
            return reject(Error("tx failed"));

          interval = setInterval(async () => {
            receipt = await web3.eth.getTransactionReceipt(tx);
            if (!receipt) return;

            clearInterval(interval);
            if (receipt.status !== "0x01") return reject(Error("tx failed"));

            return resolve(receipt);
          }, 5e3);
        })
        .catch(reject);
    });
  };

  return {
    deploy,
    deployTx,
    getAddresses
  };
};

module.exports = Deployer;
