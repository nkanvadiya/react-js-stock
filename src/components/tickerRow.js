import React from 'react';
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from 'react-sparklines';
import _ from 'lodash';
import TimeAgo from 'react-timeago';
import PropTypes from 'prop-types';
import { Tooltip } from 'reactstrap';
import { FaInfoCircle } from 'react-icons/fa';

class tickerRow extends React.Component {
  constructor(props) {
    super(props);

    this.toggleTooltip = this.toggleTooltip.bind(this);
        
    this.state = { 
      updatedat: this.props.ticker.time,
      tooltipOpen: false    
    };
  }

  toggleTooltip(){
    this.setState({
      tooltipOpen: !this.state.tooltipOpen
    });
  }

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

  componentDidMount() { 
    this.updatedatinterval = setInterval(() => {
          this.setState({ updatedat: this.state.updatedat });
      }, 1000); // every 1 seconds interval for time ago
  }

  componentWillReceiveProps(newProps) {         
      if( newProps.ticker.time !== this.state.updatedat ){        
        this.setState({ updatedat: newProps.ticker.time });  
      }    
  }

  getDiffNumber(historyfilter, ticker) {
    let openVal = historyfilter[0];
    if( openVal !== undefined ){
      if(ticker.value > openVal.value){
        return <small>{'+' + ( ticker.value - openVal.value ).toFixed(2) }</small>;
      }else if(ticker.value < openVal.value){
        return <small>{( ticker.value - openVal.value ).toFixed(2) }</small>;
      }
    }
    return null;
  }

  getDiffPercentage(historyfilter, ticker ) {
    let openVal = historyfilter[0];
    if( openVal !== undefined ){
      if(ticker.value > openVal.value){
        return <small>{'+' + ( - ( ( openVal.value - ticker.value ) / openVal.value ) * 100 ).toFixed(2) + "%" }</small>;
      }else if(ticker.value < openVal.value){
        return <small>{'-' + ( ( ( openVal.value - ticker.value ) / openVal.value)  * 100 ).toFixed(2) + "%" }</small>;
      }
    }
    return null;
  }

  getOpenStock( historyfilter ){
    let openVal = historyfilter[0];
    if( openVal !== undefined ){
      return openVal.value.toFixed(2);
    }
    return "-";
  }

  getHighStock( historyfilter ){
    return _.maxBy(historyfilter, 'value').value.toFixed(2);    
  }

  getLowStock( historyfilter ){
    return _.minBy(historyfilter, 'value').value.toFixed(2);    
  }

  getAvgStock( historyfilter ){
    return _.meanBy(historyfilter, 'value').toFixed(2);
  }

  render() {
    const { ticker, history } = this.props;
    const { updatedat } = this.state;
    let historyfilter = _.chain(history).flatten().filter({ name: ticker.name }).value();

    return (
      <tr >
        <td>{ ticker.name.toUpperCase() }</td>
        <td className={ this.getTickerValueColor( historyfilter, ticker ) + " value-container" } >
            <big>{ ticker.value.toFixed(2) }</big>
            { this.getDiffNumber(historyfilter, ticker) }
            { this.getDiffPercentage(historyfilter, ticker) }

            <span id={'tooltipid'+ticker.name} ><FaInfoCircle /></span>
            <Tooltip placement="right" isOpen={this.state.tooltipOpen} target={'tooltipid'+ticker.name} toggle={this.toggleTooltip}>
              Open : { this.getOpenStock(historyfilter) }<br/>
              High : { this.getHighStock(historyfilter) }<br/>
              Avg : { this.getAvgStock(historyfilter) }<br />
              Low : { this.getLowStock(historyfilter) }
            </Tooltip>        
        </td>
        <td>{ 
          //check if diifernce is greater than 1
          (( (new Date().getTime()) - (new Date( updatedat ).getTime()) ) / 1000 ) > 1 
          ? <TimeAgo date= { updatedat } /> 
          : "a moment ago" }</td>
        <td className={'graph-container'}>
          <Sparklines data={ this.getGraphData(historyfilter) }>
              <SparklinesLine />
              <SparklinesReferenceLine type="avg" />
          </Sparklines>
        </td>
      </tr>
    );
  }
}

tickerRow.propTypes = {
  ticker: PropTypes.object.isRequired,
  history: PropTypes.array
};

export default tickerRow;