import React from 'react';
import { addDays, format, startOfWeek, addWeeks} from 'date-fns';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const Calender = (props) => {
 const { state, setState } = props;
 const currentDate = new Date();
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const handlePrevWeeks = () => {
    setState(prevState => ({
      ...prevState,
      currentWeekOffset: prevState.currentWeekOffset - 7
    }));
  };

  const handleNextWeeks = () => {
    setState(prevState => ({
      ...prevState,
      currentWeekOffset: prevState.currentWeekOffset + 7
    }));
  };

  const handleDayClick = (day) => {
    const clickedDate = new Date(day);
    const today = new Date();

    if (clickedDate >= today || isSameDay(clickedDate, today)) {
      setState(prevState => ({
        ...prevState,
        selectedDate: clickedDate,
        showEventPopup: true,
        eventTime: { hours: '', minutes: '' },
        eventText: '',
        editingEvent: null
      }));
    }
  };

  const startOfCurrentWeek = startOfWeek(addWeeks(currentDate, state.currentWeekOffset), { weekStartsOn: 0 });
  const weeks = [];
  for (let i = 0; i < 7; i++) {
    const weekStart = addWeeks(startOfCurrentWeek, i);
    const weekEnd = addDays(weekStart, 6);
    weeks.push({ weekStart, weekEnd });
  }

  return (
    <div className="calendar">
        <h1 className="heading">MY AVAILABILITY FOR THE NEXT 7 WEEKS</h1>
        <div className="navigate-weeks">
          <button className="navigate-button" onClick={handlePrevWeeks}><ArrowBackIosNewIcon/></button>
          <button className="navigate-button" onClick={handleNextWeeks}><ArrowForwardIosIcon/></button>
        </div>
       
        <div className="weeks">
          <div className="weekdays-container">
            <div className="weekdays">
            {daysOfWeek.map((day) => (
              <span key={day}>{day}</span>
            ))}
            </div>
           
          </div>
          {weeks.map((week, index) => (
            <div key={index} className="week">
              <div className="week-period">
                {format(week.weekStart, 'd')} - {format(week.weekEnd, 'd MMM')}
              </div>
              <div className="days">
                {Array.from({ length: 7 }).map((_, dayIndex) => {
                  const day = addDays(week.weekStart, dayIndex);
                  return (
                    <span
                      key={day}
                      className={
                        isSameDay(day, currentDate)
                          ? 'current-day'
                          : ''
                      }
                      onClick={() => handleDayClick(day)}
                    >
                      {format(day, 'd')}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
  )
}

export default Calender
