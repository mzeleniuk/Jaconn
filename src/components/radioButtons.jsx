import React, { PureComponent } from 'react';

class RadioButtons extends PureComponent {
    handleChange = event => {
        this.props.handleChange(event.currentTarget.value);
    };

    handleSelect = item => {
        this.props.handleChange(item.Value);
    };

    getSelectedValue = () => {
        return this.props.selectedItem ? this.props.selectedItem.Value : null;
    };

    render() {
        return (
            <div className="radio-buttons-container">
                {this.props.items.map(item => {
                    return (
                        <div className="radio-button-item" key={item.Value} onClick={() => this.handleSelect(item)}>
                            <input type="radio" name={item.Name} value={item.Value} onChange={this.handleChange}
                                   checked={this.getSelectedValue() === item.Value} />
                            <label>{item.Name}</label>
                        </div>
                    );
                })}
            </div>
        );
    };
}

export default RadioButtons;
