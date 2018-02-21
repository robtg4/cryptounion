import React, { Component } from 'react';
//routing
//import { Link } from "react-router-dom";
//import react navbar components
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';


export default class Header extends Component {

    constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
      this.state = {
        isOpen: false
      };
    }

    toggle() {
      this.setState({
        isOpen: !this.state.isOpen
      });
    }

    render(){

        return (
          <div>
            <Navbar color="faded" light expand="md">
              <NavbarBrand href="/">crypto union</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <NavLink href="/">Exchange</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/withdraw">Withdraw</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/authorize">Authorize</NavLink>
                  </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          </div>
        );
    }
}
