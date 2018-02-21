//web3js connection
import getWeb3 from '../utils/getWeb3'
//smart contract json from compile build
import EscrowContract from '../../build/contracts/Escrow.json'

let contract = new Promise(function(resolve, reject) {

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
    resolve(simpleEscrow)
    /*
    var simpleStorageInstance
    return simpleStorage.deployed().then((instance) => {
      simpleStorageInstance = instance
      //console.log(simpleStorageInstance)
      resolve(simpleStorageInstance)
    })
    */

  })
  .catch(() => {
    console.log('Error finding web3.')
    return null
  })

})

export default contract
