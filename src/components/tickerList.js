import * as React from "react";
import TickerRow from "./tickerRow";
import PropTypes from 'prop-types';

export default class tickerList extends React.Component {
    render() {
        const { ticker, history } = this.props;

        return (
            <table>
                <tbody>
                {
                    ticker.toJS().map( function( t ){
                        return(                            
                            <TickerRow key={ t.name } ticker={t} history={ history.toJS()} />
                        )
                    }, this )
                }
                </tbody>          
            </table>
        );
    }
}
