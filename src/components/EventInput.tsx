import React from "react"
import TimePicker from "./TimePicker/TimePicker"
import { useState } from "react"
import { setAddNewEvent, setEditedEvent, setTimeStatus } from "../state/reducer"
import { useStateValue } from "../state/state"
import dayControllers from '../controllers/datesInfo'
import { IDaySample, IEvent, PickerStatus } from "../types"

const EventInput  = ({showEventInput, showInput} : {showEventInput: boolean, showInput : Function}) : JSX.Element => {
    //console.log(event, dateId);
    const [state, dispatch] = useStateValue()
    const daySample = state.daySample as IDaySample
    const dayEvents = state.dayEvents as IEvent[]
    //const [newEvent, setNewEvent] = useState(true)
    const [pickerStatus, setPickerStatus] = useState<PickerStatus>('')
    
    //newEvent affects dayEvent and eventSubTim
    let newEvent = true
    if(dayEvents.length !== 0) {
      if(dayEvents.at(-1)!.out == -1){
        newEvent = false
      }
    }
    const dayEvent = newEvent ? {_id: 'none',in : -1, out: -1, dateId: daySample._id} : dayEvents[dayEvents.length-1]  
    
    // console.log(inVal, outVal);
    // const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    //   setInVal(event.target.value)
    // }
    // const handleOutputChange = (event: React.ChangeEvent<HTMLInputElement>) : void => {
    //   setOutVal(event.target.value)
    // }
  
    const handleInputSub = (value: Date | null, timeString: string) : void => {     
      let num = timeString.match(/\d\d/g)
      if(num == null){
        return;
      }
      const time = num.map((i: string ) => Number(i))
      const timeMS : number = (time[0] * 60 + time[1]) * 60 * 1000 + daySample.dateUTCoffSet

      //IN time should be bigger that last OUT event
      if(dayEvents.length > 0) {
        const lastEvent = dayEvents.at(-1)
        if(timeMS < lastEvent!.out) {
          setPickerStatus('error')
          return;
        }
      }
      if(pickerStatus == 'error') setPickerStatus('')

      if(dayEvent._id == 'none') {
        const eventToAdd = {
          in: timeMS,
          out: dayEvent.out,
          dateId: dayEvent.dateId
        }
        dayControllers.addEvent(eventToAdd)
          .then(res => {            
            dispatch(setAddNewEvent(res))
            showInput()
            console.log(eventToAdd);
          })
      } else {
        const eventToEddit = {
          ...dayEvent, in: timeMS
        }
        dayControllers.editEvent(eventToEddit)
          .then(res => {
            dispatch(setEditedEvent(res.editedEvent))
            showInput()
            console.log(eventToEddit);
          })
      }
    }  

    const handleOutputSub = (value: Date | null, timeString: string) : void => {
      let num = timeString.match(/\d\d/g)
      if(num == null){
        return;
      }
      const time = num.map((i: string ) => Number(i))
      const timeMS : number = (time[0] * 60 + time[1]) * 60 * 1000 + daySample.dateUTCoffSet

      //OUT time should be bigger than IN time of current event
      if(timeMS <= dayEvent.in) {
        setPickerStatus('error')
        return;
      }
      if(pickerStatus == 'error') setPickerStatus('')
      
      const eventToEddit = {
        ...dayEvent, out: timeMS
      }
      dayControllers.editEvent(eventToEddit)
      .then(res => {
        console.log(res);
        
        dispatch(setEditedEvent(res.editedEvent))
        dispatch(setTimeStatus(res.editedEvent.dateId, res.newTimeStatus))
        showInput()
      })
    }
    //change submit function
    const eventSubTime = newEvent ?  handleInputSub : handleOutputSub
    
    //Intl.DateTimeFormat().resolvedOptions().timeZone
    // const timePickerOnChange = (time: any, timeString: any) => {
    //   //const date = parse(timeString, 'HH:mm', new Date())
    //   const num = timeString.match(/\d\d/g).map((i: string ) => Number(i))
    //   console.log(time.getTime(), timeString);
    // }
    const className = showEventInput ? 'NewEventPicker' : 'NewEventPicker display-none'
    return (
      <div className={className}>
        <TimePicker onChange={eventSubTime} format="HH:mm"
                    bordered={true}
                    value={null}
                    status={pickerStatus}/>
      </div>
    )
}

export default EventInput