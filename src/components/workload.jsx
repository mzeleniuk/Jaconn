import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Dropdown from './dropdown';
import { hideLoader, saveWorkload, showLoader } from '../redux/actions';

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
            shiftStartDate: null,
            validationErrors: {
                shiftDurationError: false,
                shiftStartDateError: false
            }
        };
    };

    handleDayClick = day => {
        this.setState({
            shiftStartDate: day,
            validationErrors: { ...this.state.validationErrors, shiftStartDateError: !day }
        });
    };

    handleItemChange = item => {
        this.setState({
            shiftDuration: item,
            validationErrors: { ...this.state.validationErrors, shiftDurationError: !item }
        });
    };

    handleSubmit = () => {
        this.props.showLoader();

        if (!this.state.shiftDuration || !this.state.shiftStartDate) {
            this.setState({
                validationErrors: {
                    ...this.state.validationErrors,
                    shiftDurationError: !this.state.shiftDuration,
                    shiftStartDateError: !this.state.shiftStartDate
                }
            });
        } else {
            this.props.saveWorkload({
                shiftDuration: this.state.shiftDuration,
                shiftStartDate: this.state.shiftStartDate
            });
        }

        this.props.hideLoader();
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
                    </div>

                    <div className="data-container">
                        <p>Select shift's duration (days)</p>

                        <hr />

                        <Dropdown list={duration}
                                  selectedItem={this.state.shiftDuration}
                                  handleItemSelect={this.handleItemChange}
                        />
                    </div>

                    <div className="data-container">
                        <p>Summary</p>

                        <hr />

                        <p style={{textAlign: "left", marginBottom: "10px"}}>
                            <span className="white-space-after">Shift's first day:</span>

                            <span className={this.state.validationErrors.shiftStartDateError ? "invalid" : "valid"}>
                                {this.state.shiftStartDate ? this.state.shiftStartDate.toLocaleDateString() : "not selected"}
                            </span>
                        </p>

                        <p style={{textAlign: "left", marginBottom: "10px"}}>
                            <span className="white-space-after">Shift's duration:</span>

                            <span className={this.state.validationErrors.shiftDurationError ? "invalid" : "valid"}>
                                {this.state.shiftDuration}
                            </span>
                        </p>

                        <button onClick={this.handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        );
    };
}

const mapDispatchToProps = {
    hideLoader,
    saveWorkload,
    showLoader
};

export default connect(null, mapDispatchToProps)(Workload);
