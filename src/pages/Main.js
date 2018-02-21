import React, { Component } from 'react';
//import routing components to switch pages
import { BrowserRouter as Router, Route } from "react-router-dom";
//pages
import Exchange from "./Exchange"

export default class Main extends Component {

    render(){
        return (
          <Router>
            <Route
              exact path='/'
              render={(routeProps) => (
                <Exchange />
              )}
            />
          </Router>
        );
    }
}
