import { useState,useEffect } from 'react';
import AddEvents from './AddEvents';	
import EventDisplay from './EventDisplay';
import Calender from './Calender';

const CalendarApp = () => {

  const currentDate = new Date();

  let initialEvents;
  try {
    initialEvents = JSON.parse(localStorage.getItem('events')) || [];
  } catch (error) {
    initialEvents = [];
  }

  const [state, setState] = useState({
    selectedDate: currentDate,
    showEventPopup: false,
    events: initialEvents,
    eventTime: { hours: '', minutes: '' },
    eventText: '',
    editingEvent: null,
    currentWeekOffset: []
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(state.events));
  }, [state.events]);
 

  return (
    <div className="calendar-app">
       <Calender state={state}
                setState={setState}
        />
      <div className="events">
            <AddEvents state={state} 
                setState={setState} 
        />
        <EventDisplay state={state}
                setState={setState}
          />
      </div>
  
    </div>
  );
};

export default CalendarApp;