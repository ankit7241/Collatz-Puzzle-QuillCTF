solc = require("solc");

// file system - read and write files to your computer
fs = require("fs");

// web3 interface
Web3 = require("web3");

// setup a http provider
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// reading the file contents of the smart  contract

fileContent = fs.readFileSync("./contracts/CollatzPuzzle.sol").toString();
console.log(fileContent);

// create an input structure for my solidity compiler
var input = {
  language: "Solidity",
  sources: {
    "./contracts/CollatzPuzzle.sol": {
      content: fileContent,
    },
  },

  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log("Output: ", output);

ABI = output.contracts["./contracts/CollatzPuzzle.sol"]["CollatzPuzzle"].abi;
bytecode = output.contracts["./contracts/CollatzPuzzle.sol"]["CollatzPuzzle"].evm.bytecode.object;
console.log("Bytecode: ", bytecode);
console.log("ABI: ", ABI);

contract = new web3.eth.Contract(ABI);
let defaultAccount;
web3.eth.getAccounts().then((accounts) => {
  console.log("Accounts:", accounts); //it will show all the ganache accounts

  defaultAccount = accounts[0];
  console.log("Default Account:", defaultAccount);  //to deploy the contract from default Account
  contract
    .deploy({ data: bytecode })
    .send({ from: defaultAccount, gas: 470000 })
    .on("receipt", (receipt) => { //event,transactions,contract address will be returned by blockchain
      console.log("Contract Address:", receipt.contractAddress);
    })
    .then((demoContract) => {
      demoContract.methods.callMe("0x6893E50DaD706124E8396CD0384De3707BD318bd").call((err, data) => {
        console.log("Value:", data);
      });
    });
  
});
