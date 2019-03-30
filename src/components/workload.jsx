import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';

import Dropdown from './dropdown';
import RadioButtons from './radioButtons';
import { saveWorkload } from '../redux/actions';
import { Enums } from '../services/enums';
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
            shiftsAlternation: cachedWorkload ? cachedWorkload.shiftsAlternation : Enums.ShiftsAlternation.None,
            validationErrors: {
                daysOffDurationError: false,
                shiftDurationError: false,
                shiftStartDateError: false,
                shiftsAlternationError: false
            }
        };

        this.handleDayClick = this.handleDayClick.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
        this.handleDaysOffDurationChange = this.handleDaysOffDurationChange.bind(this);
        this.handleShiftsAlternationChange = this.handleShiftsAlternationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        const cachedWorkload = Storage.loadWorkload();

        if (cachedWorkload) {
            const workload = {
                daysOffDuration: cachedWorkload.daysOffDuration,
                shiftDuration: cachedWorkload.shiftDuration,
                shiftStartDate: new Date(cachedWorkload.shiftStartDate),
                shiftsAlternation: cachedWorkload.shiftsAlternation
            };

            this.props.saveWorkload(workload);
        }
    };

    handleDayClick(day) {
        this.setState({
            shiftStartDate: day,
            validationErrors: { ...this.state.validationErrors, shiftStartDateError: !day }
        });
    };

    handleItemChange(item) {
        this.setState({
            shiftDuration: item,
            validationErrors: { ...this.state.validationErrors, shiftDurationError: !item }
        });
    };

    handleDaysOffDurationChange(item) {
        this.setState({
            daysOffDuration: item,
            validationErrors: { ...this.state.validationErrors, daysOffDurationError: !item }
        });
    };

    handleShiftsAlternationChange(item) {
        this.setState({
            shiftsAlternation: item,
            validationErrors: { ...this.state.validationErrors, shiftsAlternationError: !item }
        });
    };

    disableSubmit() {
        let daysOffDuration = false;
        let shiftDuration = false;
        let shiftStartDate = false;
        let shiftsAlternation = false;

        try {
            daysOffDuration = this.state.daysOffDuration && (this.state.daysOffDuration === this.props.daysOffDuration);
            shiftDuration = this.state.shiftDuration && (this.state.shiftDuration === this.props.shiftDuration);
            shiftStartDate = this.state.shiftStartDate && this.props.shiftStartDate && (this.state.shiftStartDate.toDateString() === this.props.shiftStartDate.toDateString());
            shiftsAlternation = this.state.shiftsAlternation && (this.state.shiftsAlternation === this.props.shiftsAlternation);
        } catch (e) {
            console.error(e);
        }

        return daysOffDuration && shiftDuration && shiftStartDate && shiftsAlternation;
    };

    handleSubmit() {
        if (!this.state.daysOffDuration || !this.state.shiftDuration || !this.state.shiftStartDate || !this.state.shiftsAlternation) {
            this.setState({
                validationErrors: {
                    ...this.state.validationErrors,
                    daysOffDurationError: !this.state.daysOffDuration,
                    shiftDurationError: !this.state.shiftDuration,
                    shiftStartDateError: !this.state.shiftStartDate,
                    shiftsAlternationError: !this.state.shiftsAlternation
                }
            });
        } else {
            const workload = {
                daysOffDuration: this.state.daysOffDuration,
                shiftDuration: this.state.shiftDuration,
                shiftStartDate: this.state.shiftStartDate,
                shiftsAlternation: this.state.shiftsAlternation
            };

            this.props.saveWorkload(workload);

            document.querySelector('.calendar-container').scrollIntoView({ block: 'start', behavior: 'smooth' });

            Storage.saveWorkload(workload);
        }
    };

    render() {
        const shiftsAlternationOptions = [
            { Name: this.props.dictionary.shiftsAlternationOptionOne, Value: Enums.ShiftsAlternation.None },
            { Name: this.props.dictionary.shiftsAlternationOptionTwo, Value: Enums.ShiftsAlternation.StartWithDay },
            { Name: this.props.dictionary.shiftsAlternationOptionThree, Value: Enums.ShiftsAlternation.StartWithNight }
        ];
        const selectedShiftsAlternation = shiftsAlternationOptions.find(item => item.Value === this.state.shiftsAlternation);

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
                        <p>{this.props.dictionary.selectShiftsAlternation}</p>

                        <hr />

                        <RadioButtons items={shiftsAlternationOptions}
                                      selectedItem={selectedShiftsAlternation}
                                      handleChange={this.handleShiftsAlternationChange}
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

                        <p style={{textAlign: "left", marginBottom: "10px"}}>
                            <span className="white-space-after">{this.props.dictionary.shiftsAlternation}</span>

                            <span className={this.state.validationErrors.shiftsAlternationError ? "invalid" : "valid"}>
                                {selectedShiftsAlternation ? selectedShiftsAlternation.Name.toLowerCase() : this.props.dictionary.notSelected}
                            </span>
                        </p>

                        {this.state.shiftsAlternation === Enums.ShiftsAlternation.StartWithDay || this.state.shiftsAlternation === Enums.ShiftsAlternation.StartWithNight ? (
                            <Fragment>
                                <div className="working-days-marker">
                                    <span>{this.props.dictionary.workingDaysMarkerExample}</span>
                                    <div className="day-marker" />
                                </div>

                                <div className="working-days-marker">
                                    <span>{this.props.dictionary.workingNightsMarkerExample}</span>
                                    <div className="night-marker" />
                                </div>
                            </Fragment>
                        ) : null}

                        <button onClick={this.handleSubmit} disabled={this.disableSubmit()}>
                            {this.props.dictionary.submit}
                        </button>
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
            selectShiftsAlternation: state.dictionary.data['SelectShiftsAlternation'],
            shiftsAlternation: state.dictionary.data['ShiftsAlternation'],
            shiftsAlternationOptionOne: state.dictionary.data['ShiftsAlternationOptionOne'],
            shiftsAlternationOptionTwo: state.dictionary.data['ShiftsAlternationOptionTwo'],
            shiftsAlternationOptionThree: state.dictionary.data['ShiftsAlternationOptionThree'],
            submit: state.dictionary.data['Submit'],
            summary: state.dictionary.data['Summary'],
            weekdaysLong: state.dictionary.data['WeekdaysLong'],
            weekdaysShort: state.dictionary.data['WeekdaysShort'],
            workingDaysMarkerExample: state.dictionary.data['WorkingDaysMarkerExample'],
            workingNightsMarkerExample: state.dictionary.data['WorkingNightsMarkerExample'],
            workloadSetupHeader: state.dictionary.data['WorkloadSetupHeader']
        },
        daysOffDuration: state.workload.data.daysOffDuration,
        shiftDuration: state.workload.data.shiftDuration,
        shiftStartDate: state.workload.data.shiftStartDate,
        shiftsAlternation: state.workload.data.shiftsAlternation
    };
};

const mapDispatchToProps = {
    saveWorkload
};

export default connect(mapStateToProps, mapDispatchToProps)(Workload);
