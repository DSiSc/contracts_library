/* eslint-disable import/no-extraneous-dependencies */
require("babel-register")({ ignore: /node_modules\/(?!zeppelin-solidity)/ });
require("babel-polyfill");

module.exports = {
  networks: {
    develop: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "*",
    },
  },
};
