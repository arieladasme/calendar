import { useDispatch, useSelector } from 'react-redux'
import calendarApi from '../api/calendarApi'
import {
  onAddNewEvent,
  onDeleteEvent,
  onLoadEvents,
  onSetActiveEvent,
  onUpdateEvent,
} from '../store'
import { convertDateEvents } from './convertDateEvents'

export const useCalendarStore = () => {
  const dispatch = useDispatch()
  const { events, activeEvent } = useSelector(state => state.calendar)
  const { user } = useSelector(state => state.auth)

  const setActiveEvent = calendarEvent => {
    dispatch(onSetActiveEvent(calendarEvent))
  }

  const startSavingEvent = async calendarEvent => {
    // TODO: update event

    if (calendarEvent._id) {
      // update
      dispatch(onUpdateEvent({ ...calendarEvent }))
    } else {
      // create
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
    }
  }

  const startDeletingEvent = async () => {
    //TODO: llegar al backend
    dispatch(onDeleteEvent())
  }

  const startLoadingEvent = async () => {
    try {
      const { data } = await calendarApi.get('/events')
      const events = convertDateEvents(data.events)
      dispatch(onLoadEvents(events))
    } catch (error) {
      console.log(error)
    }
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
    startLoadingEvent,
  }
}
