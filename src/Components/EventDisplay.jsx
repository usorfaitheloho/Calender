import { format } from 'date-fns';

const EventDisplay = (props) => {
  const { state, setState } = props;

  const handleEditEvent = (event) => {
    setState(prevState => ({
      ...prevState,
      selectedDate: new Date(event.date),
      eventTime: {
        hours: event.time.split('-')[0],
        minutes: event.time.split('-')[1],
      },
      eventText: event.text,
      editingEvent: event,
      showEventPopup: true
    }));
  };

  const handleDeleteEvent = (eventId) => {
    const updatedEvents = state.events?.filter((event) => event.id !== eventId);

    setState(prevState => ({
      ...prevState,
      events: updatedEvents
    }));
  };

  return (
    <div>
      {state.events?.length === 0 ? (
        <div className="see-availability" >
          See your availability here
        </div>
      ) : (
        state.events?.map((event, index) => (
          <div className="event" key={index}>
            <div className="event-date-wrapper">
              <div className="event-date">{format(new Date(event.date), 'd MMM yyyy')}</div>
              <div className="event-time">{event.time}</div>
            </div>
            <div className="event-text">{event.text}</div>
            <div className="event-buttons">
              <i className="bx bxs-edit-alt" onClick={() => handleEditEvent(event)}></i>
              <i className="bx bxs-message-alt-x" onClick={() => handleDeleteEvent(event.id)}></i>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default EventDisplay;