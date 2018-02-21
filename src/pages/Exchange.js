import React, { Component } from 'react';
import { Table } from 'reactstrap';
//contract
//import contract_address from '../utils/getContractAddress'
import contract from '../utils/getContract'
import getWeb3 from '../utils/getWeb3'
//formatting
import Background from '../img/background.jpg';
//components
import Box from '../components/Box'
import TitleRow from '../components/TitleRow'
import TxRow from '../components/TxRow'
//data
import data from '../data/data.json';

export default class Deposit extends Component {

    constructor(props) {
      super(props)

      this.state = {
        contract: null,
        web3: null,
      }
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
         })
         .catch(() => {
           console.log('Error finding contract instance.')
         })
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
    }

    getTransactions(txs) {
      return txs.txs.map(function(tx, index) {
        return <TxRow txRowNum={tx.txRowNum} txAddress={tx.txAddress} txAmount={tx.txAmount} txType={tx.txType} txTimestamp={tx.txTimestamp} key={index}/>
      })
    }

    render(){

        var styles = {
          background: {
            backgroundImage: "url(" + Background + ")",
            flex: 1,
            paddingBottom: 50,
          },
          table: {
            borderColor: 'transparent',
            borderRadius: 0,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          text: {
            fontSize: 15,
            fontFamily: 'sans-serif',
            textAlign: 'center'

          },
        }

        return (
          <main>
            <div style={styles.background}>
              <TitleRow escrowAmount={10000} numPayouts={30} />
              <Box />
            </div>
            <div style={{backgroundColor: 'white'}}>
              <Table striped style={styles.table} bordered={false}>
                <thead>
                  <tr style={styles.text}>
                    <th style={styles.text}>Tx #</th>
                    <th>Address</th>
                    <th>Amount</th>
                    <th>Tx Type</th>
                    <th>Timestamp</th>
                  </tr>
                </thead>
                <tbody>
                  {this.getTransactions(data)}
                </tbody>
              </Table>
            </div>
          </main>
        );
    }
}
