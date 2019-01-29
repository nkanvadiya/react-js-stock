import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import tickerRow from './components/tickerRow';

class App extends React.Component {

        constructor(props) {
            super(props);
        }

        componentWillMount() {
             this.props.dispatch(fetchTicker());
        }
        
        render() {
                return (
                        <section>
                        { 
                                this.props.ticker.toJS().map( function( ticker ){
                                        <tickerRow key={ uniqid() } ticker={ ticker } />
                                }, this )
                        }
                        </section>
                );
        }
}

const mapStateToProps = (state) => {        
        return {
                ticker: state.getIn(["tickerReducers", "ticker" ]),
                history: state.getIn(["tickerReducers", "history" ]),
        };
        
};

export default connect(
        mapStateToProps,
        null
)(App);