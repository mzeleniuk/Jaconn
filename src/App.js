import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Header } from './components/header';
import { Loader } from './components/loader';
import Workload from './components/workload';
import { hideLoader, setDictionary, showLoader } from './redux/actions';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false
        };
    };

    componentDidMount() {
        let languageCode = '';
        const browserLanguage = navigator.language.slice(0, 2);

        if (browserLanguage === 'uk') {
            languageCode = 'UA';
        } else {
            languageCode = 'EN';
        }

        this.props.setDictionary(languageCode);

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
    setDictionary,
    showLoader
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
