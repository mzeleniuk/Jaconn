import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import DayPicker from 'react-day-picker';

const modifiersStyles = {
    today: {
        color: '#b2ebf9'
    },
    selected: {
        backgroundColor: '#8c54a1'
    }
};

class Calendar extends PureComponent {
    calculateWorkingDays = () => {
        const result = [];
        const daysOffDuration = this.props.daysOffDuration;
        const duration = this.props.duration;
        const startDate = this.props.startDate;

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

            for (let c = 0; c < mappedPastDates.length; c++) {
                result.push(this.getDateFromDay(targetYear, mappedPastDates[c]));
            }

            for (let d = 0; d < mappedFutureDates.length; d++) {
                result.push(this.getDateFromDay(targetYear, mappedFutureDates[d]));
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
                        fixedWeeks={true}
                        locale={this.props.dictionary.code.toLowerCase()}
                        months={this.props.dictionary.months}
                        weekdaysLong={this.props.dictionary.weekdaysLong}
                        weekdaysShort={this.props.dictionary.weekdaysShort}
                        selectedDays={this.calculateWorkingDays()}
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
        startDate: state.workload.data.shiftStartDate
    };
};

export default connect(mapStateToProps, null)(Calendar);
