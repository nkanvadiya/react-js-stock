import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import _ from 'lodash';
import TimeAgo from 'react-timeago'

class tickerRow extends React.Component {

  getTickerValueColor(historyfilter, ticker ) {
    let lastVal = historyfilter[0];
    if( lastVal !== undefined ){
      if(ticker.value < lastVal.value){
        return 'bg-danger text-white';
      }else if(ticker.value > lastVal.value){
        return 'bg-success text-white';
      }else{
        return 'bg-light text-dark';
      }
    }else{
      return 'bg-light text-dark';
    }
  }

  getGraphData(historyfilter) {
    return historyfilter.map(function (o) { return o.value; });
  }

  getUpdatedAt( historyfilter, ticker ) {
    let key =  _.findLastKey(historyfilter, function(o) { return o.time < ticker.time; });
    if( key !== undefined ){
      return historyfilter[ key ].time;
    }else{
      return null;
    }
  }

  render() {
    const { ticker, history } = this.props;
    let historyfilter = _.chain(history).flatten().filter({ name: ticker.name }).value();

    return (
      <tr >
        <td>{ ticker.name.toUpperCase() }</td>
        <td className={ this.getTickerValueColor( historyfilter, ticker ) } >{ ticker.value.toFixed(2) }</td>
        <td>{ this.getUpdatedAt( historyfilter, ticker ) != null ? <TimeAgo date={ this.getUpdatedAt( historyfilter, ticker ) } /> : "-" }</td>
        <td> 


<Sparklines data={ this.getGraphData(historyfilter) }>
    <SparklinesLine />
    <SparklinesReferenceLine type="avg" />
</Sparklines>
        </td>
      </tr>
    );
  }
}

export default tickerRow;