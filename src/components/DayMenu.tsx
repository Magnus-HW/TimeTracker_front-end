import { formatISO, parse } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import React,{ useEffect,useContext, useState, useCallback } from "react"
import { useStateValue } from "../state/state"
import { IDaySample, IEvent, PickerStatus} from "../types"
import DisplayEvent from "./DisplyEvent";
import EventInput from "./EventInput";

import Switcher from "./Switcher";
import { CloseOutlined } from "@ant-design/icons";

const DayMenu = (
  {showMenu, setShowMenu} : 
  {showMenu : string, setShowMenu : React.Dispatch<React.SetStateAction<string>>}
  ) 
  : JSX.Element | null => {

  const [state, dispatch] = useStateValue()

  const daySample = state.daySample as IDaySample
  
  let eventsToRender : JSX.Element[] = []
  
  eventsToRender = state.dayEvents
    .map((event,i) => 
    <DisplayEvent key={i} event={event} 
          timeZone='Europe/Moscow' dateUTCoffSet={daySample.dateUTCoffSet}/>) 
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
  useEffect(() => {
    setShowEventInput(false)
  }, [state.daySample])
  return (
    <div className={showMenu}>
        <div className="DayMenuHeader">
        <div id="dayMenuHeader">
          <button className="Button Close" onClick={closeMenuHandler}><CloseOutlined /></button>
          <div id="menuDate">{dateStr.slice(4,16)}</div>
          <Switcher />
        </div>

        <div id="dayInfo">
          <div id="workTime">WorkTime: {workTime}</div>
          <div id="timeStatus">TimeLeft: {timeStatus}</div>
          </div>
        </div>
        <div id="eventFieldHeader">Events</div>
        <div className="EventsField">
          {eventsToRender}
        </div>
        {showEventInput == false ? <button id="addTimePoint" onClick={showInput}>Add Time Point</button> 
        : <EventInput showEventInput={showEventInput} showInput={showInput} />}
    </div>
  )
}


export default DayMenu