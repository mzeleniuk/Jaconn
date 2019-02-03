import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from './components/header';
import { Loader } from './components/loader';
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
