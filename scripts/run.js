const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const bytecode = '7f6020601c600435806002809206601457048082575b809102600101015b8152f360005260206000f3'; // your contract bytecode

const contract = new web3.eth.Contract([]);
const deploy = contract.deploy({
    data: bytecode
});

deploy.send({
    from: '0xf966D51787Fe3966ef4e6Cd407C7FF669fD03Fa3',
    gas: 1500000,
    gasPrice: '3000000000'
})
.then((newContractInstance) => {
    console.log(newContractInstance.options.address)
});