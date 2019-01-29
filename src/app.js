import * as React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/css/style.css";
import { connect } from "react-redux";

class App extends React.Component {

        constructor(props) {
            super(props);
        }

        componentWillMount() {
             this.props.dispatch(fetchUsers( 1 ));
        }
        
        render() {
                return (
                        <section>
                        </section>
                );
        }
}

export default connect(
        null,
        null
)(App);