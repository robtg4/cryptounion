import React, { Component } from 'react';
//get instance and web3 stuff
import contract from '../utils/getContract'
import getWeb3 from '../utils/getWeb3'

export default class TitleRow extends Component {

    constructor(props) {
      super(props);

      this.state = {
        contract: null,
        web3: null,
        balance: 0,
        purchase_requests: 0,
        deposit_price: 0
      };
    }

    componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.
      getWeb3.then(results => {
        this.setState({
          web3: results.web3
        })

        contract.then(result => {
           this.setState({
             contract: result
           })
           this.getBalance()
         })
         .catch(() => {
           console.log('Error finding contract instance.')
         })
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
    }

    getPurchaseRequests() {
      console.log("Getting purchase request total...")
      //define important variables outside first
      var escrowInstance
      this.state.web3.eth.getAccounts((error, accounts) => {
        //accesss instantiation of contract to access functions
        this.state.contract.deployed().then((instance) => {
          escrowInstance = instance
          //get balance call
          var that = this
          escrowInstance.getPurchaseRequests.call(accounts[0]).then(function(result) {
            var val = result.c[0]
            console.log(val)
            that.setState({ purchase_requests: val })
          }).catch(function(e) {
            console.log(e);
          });
        })
      });
    }

    getPrice() {
      fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USDd')
    		.then(response => response.json())
    		.then(data => {
            var total = this.state.balance*data[0].price_usd
            this.setState({ deposit_price: total.toFixed(2) })
    		}).catch(err => console.log(err))
    }

    getBalance() {
      console.log("Getting new balance...")
      //define important variables outside first
      var escrowInstance
      this.state.web3.eth.getAccounts((error, accounts) => {
        //accesss instantiation of contract to access functions
        this.state.contract.deployed().then((instance) => {
          escrowInstance = instance
          //get balance call
          var that = this
          escrowInstance.getBalance.call(accounts[0]).then(function(result) {
            var val = that.state.web3.fromWei(result,'ether').toString()
            console.log(val)
            that.setState({ balance: val })
            that.getPrice()
          }).catch(function(e) {
            console.log(e);
          });
        })
      });
    }

    render(){

        //styles
        var styles = {
          margin: {
            paddingTop: 40,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            color: 'white',
            fontSize: 20,
            fontFamily: 'sans-serif'
          },
          moneyText: {
            color: '#ddffa2'
          }
        }

        return (
          <div style={styles.margin}>
            <h4 style={styles.text}>Total in escrow: <span style={styles.moneyText}>${this.state.deposit_price} USD</span> | # of Purchase Requests: <span style={styles.moneyText}>{this.state.purchase_requests}</span></h4>
          </div>
        );
    }
}
