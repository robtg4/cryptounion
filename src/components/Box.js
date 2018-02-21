import React, { Component } from 'react';
//formating imports
import { Jumbotron, Button, TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import classnames from 'classnames';
//get instance and web3 stuff
import contract from '../utils/getContract'
import getWeb3 from '../utils/getWeb3'

export default class Box extends Component {

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        activeTab: '1',
        inputValue: 0,
        contract: null,
        web3: null,
        deposit_price: 0,
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
         })
         .catch(() => {
           console.log('Error finding contract instance.')
         })
      })
      .catch(() => {
        console.log('Error finding web3.')
      })
    }

    toggle(tab) {
      if (this.state.activeTab !== tab) {
        this.setState({
          activeTab: tab
        });
      }
    }

    updateInputValue(evt) {
      this.getPrice()
      this.setState({
        inputValue: evt.target.value
      });
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    getPrice() {
      fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/?convert=USDd')
    		.then(response => response.json())
    		.then(data => {
            var total = this.state.inputValue*data[0].price_usd
            this.setState({ deposit_price: total })
    		}).catch(err => console.log(err))
    }

    deposit() {
      //connecting to smart contract function to deposit money into escrow
      var escrowInstance
      var amount = this.state.inputValue
      console.log(amount)
      this.state.web3.eth.getAccounts((error, accounts) => {
        this.state.contract.deployed().then((instance) => {
          //important varibales defined
          escrowInstance = instance
          var that = this
          escrowInstance.deposit({from: accounts[0], value: that.state.web3.toWei(amount.toString(), 'ether')})
        })
      })
    }

    render(){

        //styles
        var styles = {
          margin: {
            paddingTop: 10,
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          },
          navItem: {
            flex: 0.5,
            borderColor: 'white',
          },
          bodyFormat: {
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 20,
          },
          halfBody: {
            flex: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
          }
        }

        return (
          <div style={styles.margin}>
            <Jumbotron className="container" style={styles.bodyFormat}>
              <Nav tabs>

                <NavItem style={styles.navItem} >
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '1' })}
                    onClick={() => { this.toggle('1'); }} >
                    Deposit
                  </NavLink>
                </NavItem>

                <NavItem style={styles.navItem} >
                  <NavLink
                    className={classnames({ active: this.state.activeTab === '2' })}
                    onClick={() => { this.toggle('2'); }} >
                    Purchase
                  </NavLink>
                </NavItem>

              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <Row className="container" style={styles.bodyFormat} >
                    <Col sm="6">
                      <div  style={styles.halfBody}>
                        <InputGroup>
                          <InputGroupAddon addonType="prepend">ETH</InputGroupAddon>
                          <Input placeholder="Amount" type="number" step="0.1" value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
                        </InputGroup>
                      </div>
                    </Col>
                    <Col sm="6">
                      <div style={styles.halfBody}>
                        <p style={{fontSize: 20, paddingTop: 8}}>${this.state.deposit_price.toFixed(2)} USD</p>
                      </div>
                    </Col>
                  </Row>
                  <Row className="container" style={styles.bodyFormat} >
                    <p className="lead">
                      <Button color="info" onClick={this.deposit.bind(this)}>Deposit to Escrow</Button>
                    </p>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col sm="12">
                      <div className="container" style={styles.bodyFormat}>
                        <p>The stored value is: {this.props.storageVal}</p>
                        <p className="lead">
                          <Button color="info">Learn More</Button>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </Jumbotron>
          </div>
        );
    }
}
