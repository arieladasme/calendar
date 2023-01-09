import { useDispatch, useSelector } from 'react-redux'
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpdateEvent } from '../store'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)

  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async calendarEvent => {
    // TODO: llegar al backend

    if (calendarEvent._id) {
      // update
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      // create
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }))
    }
  }

  const startDeletingEvent = async () => {
    //TODO: llegar al backend
    dispatch(onDeleteEvent())
  }

  return {
    //* propiedades
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* metodos
    setActiveEvent,
    startSavingEvent,
    startDeletingEvent,
  }
}
