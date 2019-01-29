import React from 'react'

class tickerRow extends React.Component {

   render() {    
    return (
      <tr >
        <td>{ this.props.ticker }</td>
        <td></td>
        <td></td>
      </tr>
    );
  }
}

export default tickerRow;