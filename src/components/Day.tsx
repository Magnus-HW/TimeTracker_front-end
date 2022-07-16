import React, { useContext, useEffect, useState } from "react";
import { useStateValue } from "../state/state";
import { DayInter, IDayElement, IEvent } from "../types";
import dayControllers from "../controllers/datesInfo"
import { setDaySample, setDayEvents, setAddDay } from "../state/reducer";

//date - in ms w\o time
const Day = ({ date, setShowMenu }: { date: number, setShowMenu: React.Dispatch<React.SetStateAction<string>> }): JSX.Element => {
  const fullDate = new Date(date)
  const currentMOnth = fullDate.getUTCMonth()
  const currentDate = new Date().setUTCHours(0, 0, 0, 0)
  let className = "";
  // const isFullInfo = (info: IDayProps): info is IDayProps => {
  //   return (info as DayInter)._id !== undefined
  // }
  const [state, dispatch] = useStateValue()

  const [className1, setRer] = useState('')

  const dayInDb = state.datesInRange.find(day => {
    return day.date == date ? day : undefined;
  });

  let workDay = true
  let workTime = 9 * 60 * 60 * 1000
  if (dayInDb) {
    workDay = dayInDb.workDay
    //console.log(dayInDb.events.length);
    if(dayInDb.workDay) {
      className += ' work'
    } else {
      className += ' free'
    }
    if (dayInDb.events.length !== 0) {
      className += ' events'
    }
  } else {
    if (fullDate.getDay() === 6 || fullDate.getDay() === 0) {
      workDay = false;
      className += " free"
      workTime = 0
    } else {
      className += " work"
      if (fullDate.getDay() === 5) {
        workTime = 7 * 60 * 60 * 1000 + 45 * 60 * 1000
      }
    }
  }
  if (date == currentDate) {
    className += " currentDay"
  }
  
  useEffect(()=>{
    setRer(className)
  },[className])
  
  // const fullDate = new Date(date);

  // let className = ""

  // if(day.out !== 0) {
  //   const timeDiff = day.out - day.in
  //   className += day.dayStatus
  //   if(timeDiff >= 0) {
  //     className += ' more0'
  //   } else {
  //     if(timeDiff < 600000 ) {
  //       className += ' more10'
  //     } else {
  //       className += ' less10'
  //     }
  //   }

  // } else {
  //   if(dateDB.getUTCDay() === 6 || dateDB.getUTCDay() === 0) {
  //     className += "free"
  //   } else {
  //     className += "work"
  //   }
  // }

  // if(day.date == currentDate) {
  //   className += " currentDay"
  // }
  // const fetchEvents = async (dateId: string) : Promise<IEvent[]> => {
  //   const dayEvents = await dayControllers.getMenuEvents(dateId)
  //   return dayEvents
  // }

  function handleClick (event: React.MouseEvent): void {
    //event.preventDefault()
    if (dayInDb) {
      dispatch(setDaySample(dayInDb))
      dayControllers.getDayEvents(dayInDb._id)
        .then(res => dispatch(setDayEvents(res)))
    } else {
      const daySample = {
        _id: 'none',
        date: date,
        dateUTCoffSet: fullDate.getTimezoneOffset() * 60 * 1000,
        workDay: workDay,
        workTime: workTime,
        timeStatus: 0,
        openedEvent: false,
        events: []
      }
      dayControllers.addDay(daySample)
        .then(res => {
          dispatch(setDayEvents([]))
          dispatch(setDaySample(res))
          dispatch(setAddDay(res))
        })
    }
    setShowMenu("DayMenuContainer display-block")
  }
  //console.log('day');
  
  // className is a row woth space splited words 'work || freeDay' + 'day_status" + 'currentDay'
  //coloring in css by [attr~=value]
  return (
    <button className={className1} onClick={handleClick}>{fullDate.getUTCDate()}</button>
  )
}


export default Day