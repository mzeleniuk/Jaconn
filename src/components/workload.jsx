import React, { Component } from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';

import Dropdown from './dropdown';
import { saveWorkload } from '../redux/actions';
import { Storage } from '../services/storage';

const modifiersStyles = {
    today: {
        color: '#b2ebf9'
    },
    selected: {
        backgroundColor: '#8c54a1',
        backgroundImage: 'linear-gradient(to top, #8c54a1 0%, #aea1ea 100%)',
        color: '#ffffff'
    }
};

const duration = [1, 2, 3, 4, 5, 6];

class Workload extends Component {
    constructor(props) {
        super(props);

        const cachedWorkload = Storage.loadWorkload();

        this.state = {
            daysOffDuration: cachedWorkload ? cachedWorkload.daysOffDuration : 3,
            shiftDuration: cachedWorkload ? cachedWorkload.shiftDuration : 3,
            shiftStartDate: cachedWorkload ? new Date(cachedWorkload.shiftStartDate) : null,
            validationErrors: {
                daysOffDurationError: false,
                shiftDurationError: false,
                shiftStartDateError: false
            }
        };
    };

    componentDidMount() {
        const cachedWorkload = Storage.loadWorkload();

        if (cachedWorkload) {
            const workload = {
                daysOffDuration: cachedWorkload.daysOffDuration,
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

    handleDaysOffDurationChange = item => {
        this.setState({
            daysOffDuration: item,
            validationErrors: { ...this.state.validationErrors, daysOffDurationError: !item }
        });
    };

    handleSubmit = () => {
        if (!this.state.daysOffDuration || !this.state.shiftDuration || !this.state.shiftStartDate) {
            this.setState({
                validationErrors: {
                    ...this.state.validationErrors,
                    daysOffDurationError: !this.state.daysOffDuration,
                    shiftDurationError: !this.state.shiftDuration,
                    shiftStartDateError: !this.state.shiftStartDate
                }
            });
        } else {
            const workload = {
                daysOffDuration: this.state.daysOffDuration,
                shiftDuration: this.state.shiftDuration,
                shiftStartDate: this.state.shiftStartDate
            };

            this.props.saveWorkload(workload);

            document.querySelector('.calendar-container').scrollIntoView({ block: 'start', behavior: 'smooth' });

            Storage.saveWorkload(workload);
        }
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
                                   showOutsideDays={true}
                                   locale={this.props.dictionary.code.toLowerCase()}
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
                        <p>{this.props.dictionary.selectDaysOffDuration}</p>

                        <hr />

                        <Dropdown list={duration}
                                  selectedItem={this.state.daysOffDuration}
                                  handleItemSelect={this.handleDaysOffDurationChange}
                        />
                    </div>

                    <div className="data-container">
                        <p>{this.props.dictionary.summary}</p>

                        <hr />

                        <p style={{textAlign: "left", marginBottom: "10px"}}>
                            <span className="white-space-after">{this.props.dictionary.firstDay}</span>

                            <span className={this.state.validationErrors.shiftStartDateError ? "invalid" : "valid"}>
                                {this.state.shiftStartDate ? this.state.shiftStartDate.toLocaleDateString() : this.props.dictionary.notSelected}
                            </span>
                        </p>

                        <p style={{textAlign: "left", marginBottom: "10px"}}>
                            <span className="white-space-after">{this.props.dictionary.duration}</span>

                            <span className={this.state.validationErrors.shiftDurationError ? "invalid" : "valid"}>
                                {this.state.shiftDuration}
                            </span>
                        </p>

                        <p style={{textAlign: "left", marginBottom: "10px"}}>
                            <span className="white-space-after">{this.props.dictionary.daysOffDuration}</span>

                            <span className={this.state.validationErrors.daysOffDurationError ? "invalid" : "valid"}>
                                {this.state.daysOffDuration}
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
            code: state.dictionary.data['Code'],
            daysOffDuration: state.dictionary.data['DaysOffDuration'],
            duration: state.dictionary.data['Duration'],
            firstDay: state.dictionary.data['FirstDay'],
            months: state.dictionary.data['Months'],
            notSelected: state.dictionary.data['NotSelected'],
            selectDaysOffDuration: state.dictionary.data['SelectDaysOffDuration'],
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
    saveWorkload
};

export default connect(mapStateToProps, mapDispatchToProps)(Workload);
