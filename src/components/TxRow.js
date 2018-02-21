import React, { Component } from 'react';
//components
import { Table } from 'reactstrap';

export default class TxRow extends Component {

    render(){

        //styles
        var styles = {
          text: {
            fontSize: 15,
            fontFamily: 'sans-serif',
            textAlign: 'center'
          },
        }

        return (
            <tr style={styles.text}>
              <th scope="row">{this.props.txRowNum}</th>
              <td>{this.props.txAddress}</td>
              <td>{this.props.txAmount}</td>
              <td>{this.props.txType}</td>
              <td>{this.props.txTimestamp}</td>
            </tr>
        );
    }
}
