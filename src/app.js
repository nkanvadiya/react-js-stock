import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css";
import { connect } from "react-redux";

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
                        </section>
                );
        }
}

const mapStateToProps = (state) => {        
        return {
                ticker: state.getIn(["tickerReducers", "ticker" ])                
        };
        
};

export default connect(
        mapStateToProps,
        null
)(App);