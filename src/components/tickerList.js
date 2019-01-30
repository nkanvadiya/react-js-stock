import * as React from "react";
import TickerRow from "./tickerRow";
import PropTypes from 'prop-types';

export default class tickerList extends React.Component {
    render() {
        const { ticker, history } = this.props;        

        return (
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Value</th>
                        <th>Updated At</th>
                        <th>History</th>
                    </tr>
                </thead>
                <tbody>
                {
                    ticker.toJS().map( function( t ){
                        return(
                            <TickerRow key={ t.name } ticker={t} history={ history.toJS() } />
                        )
                    }, this )
                }
                </tbody>          
            </table>
        );
    }
}
