import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setDictionary } from '../redux/actions';
import { Storage } from '../services/storage';

class Language extends Component {
    constructor(props) {
        super(props);

        this.state = {
            menuClass: 'closed',
            menuOpen: false
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    };

    showDropdownMenu(event) {
        event.stopPropagation();

        this.setState({ menuClass: 'opened', menuOpen: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    };

    hideDropdownMenu() {
        this.setState({ menuClass: 'closed' }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);

            setTimeout(() => {
                this.setState({ menuOpen: false });
            }, 250);
        });
    };

    handleSelect(item) {
        this.props.setDictionary(item);
        Storage.saveLanguage(item);
    };

    render() {
        const languages = ['EN', 'UA'];

        return (
            <div className={`language-menu-container ${this.state.menuClass}`}>
                <div className="language-menu-placeholder" onClick={this.showDropdownMenu}>
                    <p>{this.props.dictionary.code}</p>
                </div>

                {this.state.menuOpen ? (
                    <div className="language-menu-list">
                        {languages.map(item => {
                            return (
                                <div className="language-menu-list-item" key={item} onClick={this.handleSelect.bind(this, item)}>
                                    {item}
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        dictionary: {
            code: state.dictionary.data['Code']
        }
    };
};

const mapDispatchToProps = {
    setDictionary
};

export default connect(mapStateToProps, mapDispatchToProps)(Language);
