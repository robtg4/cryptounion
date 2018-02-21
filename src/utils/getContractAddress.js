//web3js connection
import getWeb3 from '../utils/getWeb3'
//smart contract json from compile build
import EscrowContract from '../../build/contracts/Escrow.json'

let contract_address = new Promise(function(resolve, reject) {

  getWeb3.then(results => {
    //set web3
    var web3 = results.web3
    // Instantiate contract once web3 provided.
    const contract = require('truffle-contract')
    //input to contract function is json schema from smart contract
    const simpleEscrow = contract(EscrowContract)
    //make sure contract and web3js api are using the same provider
    //this is where it is intialized
    simpleEscrow.setProvider(web3.currentProvider)

    // Get accounts.
    web3.eth.getAccounts((error, accounts) => {
        //take the deployed smart contract instance  and then use the functions of
        //that smart contract - returns a promise so can't be saved as a state
        simpleEscrow.deployed().then((instance) => {
          console.log(instance.address)
          resolve(instance.address)
        })
    })

  })
  .catch(() => {
    console.log('Error finding web3.')
    return null
  })

})

export default contract_address
