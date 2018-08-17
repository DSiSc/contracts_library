# Smart Contract Merger Guide

Smart contract projects collected from various locations need to be merged into one truffle project.
The collected contract items are placed at https://github.com/DSiSc/contracts_library/tree/master/opensource;
The combined projects are placed at https://github.com/DSiSc/contracts_library/tree/master/authorized.
How to merge them? The following description will be made. The collected smart contract project may be a truffle project itself, or it may not be a truffle project, so it needs to be treated separately.

## Truffle project

The structure of a truffle project is as follows:
* contracts/:solidity contract file folder
* migrations/: solidity contract deployment script file folder
    * 1_initial_migration.js
    * 2_deploy_contracts.js
* test/: test script file folder
* truffle.js: project configuration file
* package.json: if the project depends on the nodejs module, there will be this file
So merging refers to merging these three folders, as well as the file truffle.js

_Tip_: **The collected truffle project may have other files and folders, but we only need contracts, so we ignore other files and folders.**

The following is an example of https://github.com/OpenZeppelin/openzeppelin-solidity, which explains how to merge:

### Combination the original project's _contracts/_  to the authorized _contracts/_

In order to facilitate the classification management, the repository address of the original project https is removed from the domain name part, and the path of the contract in the authorized project contracts folder is obtained.
Create the path in the authorized contracts folder.
Then copy everything under the original project contracts folder to that path.

* **Example**: The above example can get OpenZeppelin/openzeppelin-solidity, then we create the OpenZeppelin folder under authorized/contracts, and then create the openzeppelin-solidity folder under authorized/contracts/OpenZeppelin.
    Then copy everything under https://github.com/OpenZeppelin/openzeppelin-solidity/tree/master/contracts to https://github.com/DSiSc/contracts_library/tree/master/authorized/contracts/OpenZeppelin/openzeppelin-solidity.

    Execute `truffle compile --all` to see if there is an error. If it is wrong, solve it.
    Because the path changes, the error type is usually the import statement error, modify the import statement to make it point to the correct.

### Combination the original project's _migrations/_ to the authorized _migrations/_

There are two files under the migrations folder, called deployment files.
* 1_initial_migration.js
* 2_deploy_contracts.js

You need to merge the original project's 1_initial_migration.js into the authorized 1_initial_migration.js, merge the original project's 2_deploy_contracts.js into the new project's 2_deploy_contracts.js.

These two files are deference only in execute order. The structure and purpose of the files are the same, so the merge method is the same. Therefore, the unified description: use the `original file` to refer to the deployment file of the original project, and use the `merged file` to refer to the deployment file of the merged project.

Copy the original file `var contractName = artifacts.require("./xxx/yyy/contractName.sol"); ` statement, correct the required path and rename the variable name to the merge file. Rename the policy (recommended with a repository name prefix, such as `openZeppelinOpenzeppelinSolidityContractName`).

"Module.exports = function (deployer) {}" body approach the original file contents are copied to a method of deriving method thereof around the merged file (note that renamed variable names).

Execute `truffle migrate --rest` (premise, start Ganache, and configure the network of truffle.js) to see if it can be deployed correctly. If not, solve it.

### Combination the original project's _test/_ to the authorized _test/_

In order to facilitate the classification management, the repository address of the original project https is removed from the domain name part, and the path of the contract in the authorized project test folder is obtained.
Create the path in the authorized test folder.
Then copy everything under the original project test folder to the path.

* **Example:** The above example can get OpenZeppelin/openzeppelin-solidity, then we create the     OpenZeppelin folder under authorized/test, and then create the openzeppelin-solidity folder under  authorized/test/OpenZeppelin.
    Then copy everything under https://github.com/OpenZeppelin/openzeppelin-solidity/tree/master/test to https://github.com/DSiSc/contracts_library/tree/master/authorized/test/OpenZeppelin/openzeppelin-solidity.
    Run truffle test to see if there is an error. If it is wrong, solve it.
### Merge package.json

when execute `truffle compile`, `truffle migrate`, `truffle test`, if the nodejs module can't find the error, for example, the `hello` module can't find it, execute "npm install --save hello", the hello module will be installed, and it will be automatically Update the package.json file.

## Non-truffle project

Non-truffle projects only need to create the original repository name folder under authorized contracts, and then copy all the files under the original repository to this folder.
finally edit 2_deploy_contracts.js will need to deploy the sol deployment.
Which sol should be deployed, you can refer to the original repository documentation (such as readme.md, or code comments). If you can't find a description, deploy all the contract files (except for abstract contracts and interfaces).
