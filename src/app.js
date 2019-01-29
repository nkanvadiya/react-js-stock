import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css";
import { connect } from "react-redux";
import uniqid from 'uniqid';
import TickerList from './components/tickerList';
import { fetchTicker } from './redux/middleware/ticker';

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
                                <div className="container">
                                { this.props.ticker.count() === 0                                                   
                                  ? ""
                                  : <TickerList ticker ={this.props.ticker} history={this.props.history} /> 
                                }
                                </div>
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