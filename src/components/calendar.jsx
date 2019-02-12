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
        duration: state.workload.data.shiftDuration,
        startDate: state.workload.data.shiftStartDate
    };
};

export default connect(mapStateToProps, null)(Calendar);
