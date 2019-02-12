import React, { Component } from 'react';
import { connect } from 'react-redux';

import Calendar from './components/calendar';
import { Header } from './components/header';
import { Loader } from './components/loader';
import Workload from './components/workload';
import { hideLoader, showLoader } from './redux/actions';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false
        };
    };

    componentDidMount() {
        this.setState({ initialized: true }, () => {
            this.props.hideLoader();
        });
    };

    render() {
        return (
            <div className={`wrapper ${this.props.loaderState ? "loading" : "ready"}`}>
                <Loader showLoader={this.props.loaderState} />

                <Header />

                <Workload />

                <Calendar />
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        loaderState: state.loader.show
    };
};

const mapDispatchToProps = {
    hideLoader,
    showLoader
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
