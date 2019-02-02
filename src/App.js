import React, { Component } from 'react';
import { Header } from './components/header';
import { Loader } from './components/loader';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showLoader: true
        };
    };

    componentDidMount() {
        this.setState({
            showLoader: false
        });
    };

    render() {
        return (
            <div className={`wrapper ${this.state.showLoader ? "loading" : "ready"}`}>
                <Loader showLoader={this.state.showLoader} />

                <Header />
            </div>
        );
    };
}

export default App;
