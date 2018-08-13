# generic-storage

Simple generic storage for solidity contracts, supporting write restriction using RBAC.

Aims to be a simple key -> value storage method, everything is in bytes32.

For converting variables from bytes32 you can use [solidity-utils](https://github.com/nionis/solidity-utils)

`npm install generic-storage`

---

Using generic storage might fit well for dapps where accesing the variables within EVM is not required, in that case, using generic storage and doing off chain conversion to the correct variable type should be good enough.

There have been alot of ideas going around on an Eternal Storage contract, here is my work on that [eternal-storage](https://github.com/nionis/eternal-storage)
