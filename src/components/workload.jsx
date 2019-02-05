import React, { Component } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const modifiersStyles = {
    today: {
        color: '#b2ebf9'
    },
    selected: {
        backgroundColor: '#8c54a1'
    }
};

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

    render() {
        return (
            <div className="workload-container">
                <div className="workload-container-header">
                    <h2>Workload setup</h2>
                </div>

                <div className="workload-container-body">
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
            </div>
        );
    };
}

export default Workload;
