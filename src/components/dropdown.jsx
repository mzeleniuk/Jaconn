import React, { Component } from 'react';

class Dropdown extends Component {
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
        event.preventDefault();

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
        this.props.handleItemSelect(item);
    };

    render() {
        return (
            <div className={`dropdown-container ${this.state.menuClass}`}>
                <div className="dropdown-placeholder-container" onClick={this.showDropdownMenu}>
                    <p className="dropdown-placeholder">
                        {this.props.selectedItem}
                    </p>
                </div>

                {this.state.menuOpen ? (
                    <div className="dropdown-list">
                        {this.props.list.map(item => {
                            return (
                                <div className="dropdown-list-item" key={item} onClick={() => this.handleSelect(item)}>
                                    <span className={`${this.props.selectedItem === item ? "selected" : "item"}`}>
                                        {item}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : null}
            </div>
        );
    };
}

export default Dropdown;
