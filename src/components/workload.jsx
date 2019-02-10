import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import Dropdown from './dropdown';
import { hideLoader, saveWorkload, showLoader } from '../redux/actions';
import { Storage } from '../services/storage';

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

        const cachedWorkload = Storage.loadWorkload();

        this.state = {
            shiftDuration: cachedWorkload ? cachedWorkload.shiftDuration : 3,
            shiftStartDate: cachedWorkload ? new Date(cachedWorkload.shiftStartDate) : null,
            validationErrors: {
                shiftDurationError: false,
                shiftStartDateError: false
            }
        };
    };

    componentDidMount() {
        const cachedWorkload = Storage.loadWorkload();

        if (cachedWorkload) {
            const workload = {
                shiftDuration: cachedWorkload.shiftDuration,
                shiftStartDate: new Date(cachedWorkload.shiftStartDate)
            };

            this.props.saveWorkload(workload);
        }
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
            const workload = {
                shiftDuration: this.state.shiftDuration,
                shiftStartDate: this.state.shiftStartDate
            };

            this.props.saveWorkload(workload);
            Storage.saveWorkload(workload);
        }

        this.props.hideLoader();
    };

    render() {
        return (
            <div className="workload-container">
                <div className="workload-container-header">
                    <h2>{this.props.dictionary.workloadSetupHeader}</h2>
                </div>

                <div className="workload-container-body">
                    <div className="data-container">
                        <p>{this.props.dictionary.selectFirstDay}</p>

                        <hr />

                        <DayPicker onDayClick={this.handleDayClick}
                                   months={this.props.dictionary.months}
                                   weekdaysLong={this.props.dictionary.weekdaysLong}
                                   weekdaysShort={this.props.dictionary.weekdaysShort}
                                   firstDayOfWeek={1}
                                   selectedDays={this.state.shiftStartDate}
                                   modifiersStyles={modifiersStyles}
                        />
                    </div>

                    <div className="data-container">
                        <p>{this.props.dictionary.selectDuration}</p>

                        <hr />

                        <Dropdown list={duration}
                                  selectedItem={this.state.shiftDuration}
                                  handleItemSelect={this.handleItemChange}
                        />
                    </div>

                    <div className="data-container">
                        <p>{this.props.dictionary.summary}</p>

                        <hr />

                        <p style={{textAlign: "left", marginBottom: "10px"}}>
                            <span className="white-space-after">{this.props.dictionary.firstDay}:</span>

                            <span className={this.state.validationErrors.shiftStartDateError ? "invalid" : "valid"}>
                                {this.state.shiftStartDate ? this.state.shiftStartDate.toLocaleDateString() : this.props.dictionary.notSelected}
                            </span>
                        </p>

                        <p style={{textAlign: "left", marginBottom: "10px"}}>
                            <span className="white-space-after">{this.props.dictionary.duration}:</span>

                            <span className={this.state.validationErrors.shiftDurationError ? "invalid" : "valid"}>
                                {this.state.shiftDuration}
                            </span>
                        </p>

                        <button onClick={this.handleSubmit}>{this.props.dictionary.submit}</button>
                    </div>
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        dictionary: {
            duration: state.dictionary.data['Duration'],
            firstDay: state.dictionary.data['FirstDay'],
            months: state.dictionary.data['Months'],
            notSelected: state.dictionary.data['NotSelected'],
            selectDuration: state.dictionary.data['SelectDuration'],
            selectFirstDay: state.dictionary.data['SelectFirstDay'],
            submit: state.dictionary.data['Submit'],
            summary: state.dictionary.data['Summary'],
            weekdaysLong: state.dictionary.data['WeekdaysLong'],
            weekdaysShort: state.dictionary.data['WeekdaysShort'],
            workloadSetupHeader: state.dictionary.data['WorkloadSetupHeader']
        }
    };
};

const mapDispatchToProps = {
    hideLoader,
    saveWorkload,
    showLoader
};

export default connect(mapStateToProps, mapDispatchToProps)(Workload);
