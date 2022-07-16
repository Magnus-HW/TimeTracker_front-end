import { utcToZonedTime } from "date-fns-tz"
import React,{ useState } from "react"
import { setEditedEvent, setDeleteEvent, setTimeStatus } from "../state/reducer"
import { useStateValue } from "../state/state"
import { IEvent, IDaySample, PickerStatus } from "../types"
import dayControllers from '../controllers/datesInfo';
import TimePicker from "./TimePicker/TimePicker"

const DisplayEvent = ({event, timeZone, dateUTCoffSet}: {event:IEvent, timeZone: string, dateUTCoffSet: number}) => {
  
    const [state, dispatch] = useStateValue()
    const daySample = state.daySample as IDaySample
    const dayEvents = state.dayEvents as IEvent[]
    const [inPickerStatus, setInPickerStatus] = useState<PickerStatus>('')
    const [outPickerStatus, setOutPickerStatus] = useState<PickerStatus>('')
    //time saved in db as UTC=0
    //below there is a transision to timeZone name
    //timeZone must be saved in user doc in db
    //for now its just passed as prop "timeZone: string"
    const inStr = event.in !== -1 ? utcToZonedTime(event.in, 'Europe/Moscow') : null
    const outStr = event.out !== -1 ? utcToZonedTime(event.out, 'Europe/Moscow') : null
    
  
    const handleInputSub = (value: Date | null, timeString: string) : void => {     
      let num = timeString.match(/\d\d/g)
      if(num == null){
        return;
      }
      const time = num.map((i: string ) => Number(i))
      const timeMS : number = (time[0] * 60 + time[1]) * 60 * 1000 + daySample.dateUTCoffSet
  
      //user cant input new IN entry bigger than a last OUT event
      const indOfevent = dayEvents.indexOf(event)
      if(indOfevent > 0) {
        const prevEvent = dayEvents[indOfevent-1]
        if(timeMS < prevEvent.out) {
          setInPickerStatus('error')
          return;
        }
      }
      if(inPickerStatus == 'error') setInPickerStatus('')
  
      const eventToEddit = {
        ...event, in: timeMS
      }
      dayControllers.editEvent(eventToEddit)
        .then(res => {
          dispatch(setEditedEvent(res.editedEvent))
          dispatch(setTimeStatus(res.editedEvent.dateId, res.newTimeStatus))
        })
    }
    
    
    const handleOutputSub = (value: Date | null, timeString: string) : void => {
      let num = timeString.match(/\d\d/g)
      if(num == null){
        return;
      }
      const time = num.map((i: string ) => Number(i))
      const timeMS : number = (time[0] * 60 + time[1]) * 60 * 1000 + daySample.dateUTCoffSet
  
      //user cant input new OUT entry bigger than IN entry in same event
      if(timeMS <= event.in) {
        setOutPickerStatus('error')
        return;
      }
      if(outPickerStatus == 'error') setOutPickerStatus('')
  
      const eventToEddit = {
        ...event, out: timeMS
      }
      dayControllers.editEvent(eventToEddit)
        .then(res => {
        dispatch(setEditedEvent(res.editedEvent))
        dispatch(setTimeStatus(res.editedEvent.dateId, res.newTimeStatus))
      })
    }
  
    const handleDeleteEvent = (e : React.MouseEvent<HTMLElement>) : void => {
      e.preventDefault()
      dayControllers.deleteEvent(event._id)
        .then(res => {           
          dispatch(setDeleteEvent(res.deleted))
          dispatch(setTimeStatus(res.deleted.dateId, res.newTimeStatus))
        })
    }
  
    return(
      <div className="event">
        {inStr == null ? null :<TimePicker value={inStr} format="HH:mm" onChange={handleInputSub}
                                status={inPickerStatus}/>}
        {outStr == null ? null :<TimePicker value={outStr} format="HH:mm" onChange={handleOutputSub}
                                status={outPickerStatus}/>}
        <button onClick={handleDeleteEvent}>Delete Event</button>
      </div>
    )
  }
  export default DisplayEvent