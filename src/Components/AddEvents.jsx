
const AddEvents = (props) => {
  const { state, setState } = props;


  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      eventTime: { ...prevState.eventTime, [name]: value }
    }));
  };

  const handleEventSubmit = () => {
    const newEvent = {
      id: state?.editingEvent ? state?.editingEvent?.id : Date.now(),
      date: state?.selectedDate,
      time: `${state?.eventTime?.hours}-${state?.eventTime?.minutes}`,
      text: state?.eventText,
    };

    let updatedEvents = [...state?.events];

    if (state.editingEvent) {
      updatedEvents = updatedEvents?.map((event) =>
        event.id === state?.editingEvent.id ? newEvent : event,
      );
    } else {
      updatedEvents?.push(newEvent);
    }

    updatedEvents?.sort((a, b) => new Date(a.date) - new Date(b.date));

    setState(prevState => ({
      ...prevState,
      events: updatedEvents,
      eventTime: { hours: '', minutes: '' },
      eventText: '',
      showEventPopup: false,
      editingEvent: null
    }))

  };


  return (
    <>
    {state.showEventPopup && (
      <div className="event-popup">
        <div className="time-input">
          <div className="event-popup-time">Time</div>
          <input
            type="number"
            name="hours"
            min={0}
            max={24}
            className="hours"
            value={state.eventTime.hours}
            onChange={handleTimeChange}
          />
          <input
            type="number"
            name="minutes"
            min={0}
            max={60}
            className="minutes"
            value={state.eventTime.minutes}
            onChange={handleTimeChange}
          />
        </div>
        <textarea
          placeholder="Enter Event Text (Maximum 60 Characters)"
          value={state.eventText}
          onChange={(e) => {
            if (e.target.value.length <= 60) {
              setState(prevState => ({
                ...prevState,
                eventText: e.target.value
              }));
            }
          }}
        ></textarea>
        <button className="event-popup-btn" onClick={handleEventSubmit}>
          {state.editingEvent ? 'Update Event' : 'Add Event'}
        </button>
        <button className="close-event-popup" onClick={() => setState(prevState => ({
            ...prevState,
            showEventPopup: false,
          }))   
        }>
          <i className="bx bx-x"></i>
        </button>
      </div>
    )}
  </>
  );
}

export default AddEvents;