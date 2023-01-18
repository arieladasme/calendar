import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
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
    try {
      if (calendarEvent.id) {
        // update
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
        dispatch(onUpdateEvent({ ...calendarEvent, user }))
        return
      }
      // create
      const { data } = await calendarApi.post('/events', calendarEvent)
      dispatch(onAddNewEvent({ ...calendarEvent, id: data.event.id, user }))
    } catch (error) {
      console.log(error)
      Swal.fire('Error al guardar', error.response.data.msg, 'error')
    }
  }

  const startDeletingEvent = async () => {
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`)
      dispatch(onDeleteEvent())
    } catch (error) {
      console.log(error)
      Swal.fire('Error al elimiar', error.response.data.msg, 'error').then(result => {
        if (result.isConfirmed) {
          dispatch(eventClearActiveEvent())
        }
      })
    }
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
