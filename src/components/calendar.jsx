import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';

import { Enums } from '../services/enums';

const modifiersStyles = {
    outside: {
        backgroundColor: 'transparent',
        backgroundImage: 'none'
    },
    today: {
        color: '#b2ebf9'
    },
    workingDays: {
        backgroundColor: '#8c54a1',
        backgroundImage: 'linear-gradient(to top, #8c54a1 0%, #aea1ea 100%)',
        color: '#ffffff'
    },
    dayShifts: {
        backgroundColor: '#fab876',
        backgroundImage: 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        color: '#ffffff'
    },
    nightShifts: {
        backgroundColor: '#234683',
        backgroundImage: 'linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)',
        color: '#ffffff'
    }
};

class Calendar extends PureComponent {
    calculateWorkingDays = () => {
        let result = {};
        const daysOffDuration = this.props.daysOffDuration;
        const duration = this.props.duration;
        const startDate = this.props.startDate;
        const shiftsAlternation = this.props.shiftsAlternation;

        if (daysOffDuration && startDate && duration) {
            const startDayNumberInYear = this.getDayNumberOfYear(startDate);
            const targetYear = startDate.getFullYear();
            const daysOfYear = this.getDaysOfYear(targetYear);

            let futureDates = [];
            let pastDates = [];
            let mappedFutureDates = [];
            let mappedPastDates = [];

            for (let k = startDayNumberInYear; k <= daysOfYear; k++) {
                futureDates.push(k);
            }

            for (let m = 1; m < startDayNumberInYear; m++) {
                pastDates.push(m);
            }

            for (let i = 0, j = 0; i < futureDates.length; i++) {
                if (j < duration) {
                    mappedFutureDates.push(futureDates[i]);
                } else if (j === (duration + daysOffDuration - 1)) {
                    j = -1;
                }

                j++;
            }

            for (let a = pastDates.length - 1, b = 0; a >= 0; a--) {
                if (b === (duration + daysOffDuration)) {
                    b = 0;
                } else if (b >= daysOffDuration) {
                    mappedPastDates.push(pastDates[a]);
                }

                b++;
            }

            if (shiftsAlternation === Enums.ShiftsAlternation.StartWithDay || shiftsAlternation === Enums.ShiftsAlternation.StartWithNight) {
                let mappedFutureDayShifts = [];
                let mappedFutureNightShifts = [];
                let mappedPastDayShifts = [];
                let mappedPastNightShifts = [];
                let dayShifts = [];
                let nightShifts = [];

                for (let c = 0, d = 0; c < mappedFutureDates.length; c++) {
                    if (d < duration) {
                        if (shiftsAlternation === Enums.ShiftsAlternation.StartWithDay) {
                            mappedFutureDayShifts.push(mappedFutureDates[c]);
                        } else {
                            mappedFutureNightShifts.push(mappedFutureDates[c]);
                        }
                    } else {
                        if (shiftsAlternation === Enums.ShiftsAlternation.StartWithDay) {
                            mappedFutureNightShifts.push(mappedFutureDates[c]);
                        } else {
                            mappedFutureDayShifts.push(mappedFutureDates[c]);
                        }

                        if (d === (duration * 2 - 1)) {
                            d = -1;
                        }
                    }

                    d++;
                }

                for (let g = 0, h = 0; g < mappedPastDates.length; g++) {
                    if (h < duration) {
                        if (shiftsAlternation === Enums.ShiftsAlternation.StartWithDay) {
                            mappedPastNightShifts.push(mappedPastDates[g]);
                        } else {
                            mappedPastDayShifts.push(mappedPastDates[g]);
                        }
                    } else {
                        if (shiftsAlternation === Enums.ShiftsAlternation.StartWithDay) {
                            mappedPastDayShifts.push(mappedPastDates[g]);
                        } else {
                            mappedPastNightShifts.push(mappedPastDates[g]);
                        }

                        if (h === (duration * 2 - 1)) {
                            h = -1;
                        }
                    }

                    h++;
                }

                for (let p = 0; p < mappedPastDayShifts.length; p++) {
                    dayShifts.push(this.getDateFromDay(targetYear, mappedPastDayShifts[p]));
                }

                for (let r = 0; r < mappedPastNightShifts.length; r++) {
                    nightShifts.push(this.getDateFromDay(targetYear, mappedPastNightShifts[r]));
                }

                for (let e = 0; e < mappedFutureDayShifts.length; e++) {
                    dayShifts.push(this.getDateFromDay(targetYear, mappedFutureDayShifts[e]));
                }

                for (let f = 0; f < mappedFutureNightShifts.length; f++) {
                    nightShifts.push(this.getDateFromDay(targetYear, mappedFutureNightShifts[f]));
                }

                result = { dayShifts: dayShifts, nightShifts: nightShifts };
            } else {
                let workingDays = [];

                for (let x = 0; x < mappedPastDates.length; x++) {
                    workingDays.push(this.getDateFromDay(targetYear, mappedPastDates[x]));
                }

                for (let y = 0; y < mappedFutureDates.length; y++) {
                    workingDays.push(this.getDateFromDay(targetYear, mappedFutureDates[y]));
                }

                result = { workingDays: workingDays };
            }
        }

        return result;
    };

    getDayNumberOfYear = (date) => {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = (date - start) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
        const oneDay = 1000 * 60 * 60 * 24;

        return Math.floor(diff / oneDay);
    };

    getDaysOfYear = (year) => {
        const leapYear = year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);

        return leapYear ? 366 : 365;
    };

    getDateFromDay = (year, day) => {
        const date = new Date(year, 0);

        return new Date(date.setDate(day));
    };

    render() {
        const currentYear = new Date().getFullYear();
        const currentCalendarYear = new Date(currentYear, 0);

        return (
            <div className="calendar-container">
                <div className="calendar">
                    <DayPicker
                        numberOfMonths={12}
                        month={this.props.startDate ? new Date(this.props.startDate.getFullYear(), 0) : currentCalendarYear}
                        canChangeMonth={false}
                        firstDayOfWeek={1}
                        locale={this.props.dictionary.code.toLowerCase()}
                        months={this.props.dictionary.months}
                        weekdaysLong={this.props.dictionary.weekdaysLong}
                        weekdaysShort={this.props.dictionary.weekdaysShort}
                        modifiers={this.calculateWorkingDays()}
                        modifiersStyles={modifiersStyles}
                    />
                </div>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        dictionary: {
            code: state.dictionary.data['Code'],
            months: state.dictionary.data['Months'],
            weekdaysLong: state.dictionary.data['WeekdaysLong'],
            weekdaysShort: state.dictionary.data['WeekdaysShort']
        },
        daysOffDuration: state.workload.data.daysOffDuration,
        duration: state.workload.data.shiftDuration,
        startDate: state.workload.data.shiftStartDate,
        shiftsAlternation: state.workload.data.shiftsAlternation
    };
};

export default connect(mapStateToProps, null)(Calendar);
