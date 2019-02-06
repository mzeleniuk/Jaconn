import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import Dropdown from './dropdown';

const modifiersStyles = {
    today: {
        color: '#b2ebf9'
    },
    selected: {
        backgroundColor: '#8c54a1'
    }
};

const duration = [1, 2, 3, 4, 5, 6];

class Workload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shiftDuration: 3,
            shiftStartDate: null
        };
    };

    handleDayClick = day => {
        this.setState({ shiftStartDate: day });
    };

    handleCountryChange = item => {
        this.setState({ shiftDuration: item });
    };

    render() {
        return (
            <div className="workload-container">
                <div className="workload-container-header">
                    <h2>Workload setup</h2>
                </div>

                <div className="workload-container-body">
                    <div className="data-container">
                        <p>Select shift's first day</p>

                        <hr />

                        <DayPicker onDayClick={this.handleDayClick}
                                   selectedDays={this.state.shiftStartDate}
                                   modifiersStyles={modifiersStyles}
                        />

                        {this.state.shiftStartDate ? (
                            <p>You clicked {this.state.shiftStartDate.toLocaleDateString()}</p>
                        ) : null}
                    </div>

                    <div className="data-container">
                        <p>Select shift's duration (days)</p>

                        <hr />

                        <Dropdown list={duration}
                                  selectedItem={this.state.shiftDuration}
                                  handleItemSelect={this.handleCountryChange}
                        />
                    </div>
                </div>
            </div>
        );
    };
}

export default Workload;
