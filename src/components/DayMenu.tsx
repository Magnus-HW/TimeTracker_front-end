import { formatISO, parse } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import React,{ useEffect,useContext, useState, useCallback } from "react"
import { useStateValue } from "../state/state"
import { IDaySample, IEvent, PickerStatus} from "../types"
import DisplayEvent from "./DisplyEvent";
import EventInput from "./EventInput";

import toDate from 'date-fns/toDate'

import Switcher from "./Switcher";

const DayMenu = (
  {showMenu, setShowMenu} : 
  {showMenu : string, setShowMenu : React.Dispatch<React.SetStateAction<string>>}
  ) 
  : JSX.Element | null => {

  const [state, dispatch] = useStateValue()

  const daySample = state.daySample as IDaySample
  
  let eventsToRender : JSX.Element[] = []
  
  eventsToRender = state.dayEvents
    .map((event,i) => <div><DisplayEvent key={i} event={event} timeZone='Europe/Moscow' dateUTCoffSet={daySample.dateUTCoffSet}/> </div>) 
  //console.log(eventsToRender);
  
  const dateStr = new Date(daySample.date).toUTCString()

  const workTime = new Date(daySample.workTime).toUTCString().slice(16,22)
  const timeStatus = new Date(daySample.timeStatus).toUTCString().slice(16,22)
  //parse(utcToZonedTime(daySample.timeStatus, 'Europe/Moscow'))
  const closeMenuHandler = (event: React.MouseEvent<HTMLElement>) :void => {
    setShowMenu('DayMenuContainer display-none')
  }


  // const [workDay, setWorkDay] = useState(daySample.workDay)
  //   useEffect(()=> {
  //     setWorkDay(daySample.workDay)
  // },[daySample])

  const [showEventInput, setShowEventInput] = useState(false)
  const showInput = () : void => {
    setShowEventInput(showEventInput == false ? true : false)
  }

  return (
    <div className={showMenu}>
        <div className="DayMenuHeader">
          <div>Date: {dateStr.slice(4,16)}</div>
          <Switcher />
          <div>WorkTime: {workTime}</div>
          <div>TimeStatus: {timeStatus}</div>
          <button onClick={closeMenuHandler}>X</button>
        </div>
        <div className="EventsField">
          Events:
          {eventsToRender}
        </div>
        {showEventInput == false ? <button onClick={showInput}>AddEvent</button> : null}
        <EventInput showEventInput={showEventInput} showInput={showInput} />
    </div>
  )
}


export default DayMenu