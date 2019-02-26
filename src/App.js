import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import Calendar from './components/calendar';
import { Header } from './components/header';
import { Loader } from './components/loader';
import Workload from './components/workload';
import { hideLoader, setDictionary, showLoader } from './redux/actions';
import { Storage } from './services/storage';

const appVersion = '1.4.2';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            initialized: false
        };
    };

    componentDidMount() {
        const savedAppVersion = Storage.loadAppVersion();

        if (savedAppVersion && savedAppVersion !== appVersion) {
            Storage.clearStorage();
        }

        Storage.saveAppVersion(appVersion);

        this.initializeDictionary();

        this.setState({ initialized: true }, () => {
            this.props.hideLoader();
        });
    };

    initializeDictionary() {
        const language = Storage.loadLanguage() || navigator.language.slice(0, 2);

        if (language === 'UA' || language === 'uk') {
            this.props.setDictionary('UA');
        } else {
            this.props.setDictionary('EN');
        }
    };

    render() {
        return (
            <div className={`wrapper ${this.props.loaderState ? "loading" : "ready"}`}>
                <Loader showLoader={this.props.loaderState} />

                {this.state.initialized ? (
                    <Fragment>
                        <Header />

                        <Workload />

                        <Calendar />
                    </Fragment>
                ) : null}
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
