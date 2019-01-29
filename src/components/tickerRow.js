import React from 'react';

class tickerRow extends React.Component {

  render() {
    const { ticker, history } = this.props;

    return (
      <tr >
        <td>{ ticker.name }</td>
        <td>{ ticker.value }</td>
        <td></td>
      </tr>
    );
  }
}

export default tickerRow;