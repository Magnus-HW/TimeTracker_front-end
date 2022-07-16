import Day from "./Day"
import React,{ useEffect, useState } from "react"
import { useStateValue } from "../state/state"
import { setMonthField } from "../state/reducer"
import dayControllers from '../controllers/datesInfo';
import {getMonthFieldRange} from '../services/date'
import DayMenu from "./DayMenu";
import MonthOwedTime from "./MonthTime";

const Month = (): JSX.Element => {

  
  const dayMs = 24 * 3600 * 1000
  const currentDate = new Date().setUTCHours(0,0,0,0)
  //console.log(new Date(currentDate));

  // hook to save the month to show in the field, initial state is a month of current date
  const [monthToDisplay, setMonthToDislay] = useState(new Date(new Date(currentDate).setDate(1)))
  
  //STATE
  const [state, dispatch] = useStateValue()
  const [showMenu, setShowMenu] = useState<string>('DayMenuContainer display-block')


  //console.log('state', state);
  
  const range = getMonthFieldRange(monthToDisplay.getTime())

  useEffect(()=> {
    const fecthState = async () : Promise<void> => {
      const data = await dayControllers.getMonthField(range)
      //console.log(data);
      dispatch(setMonthField(data))
    };
    fecthState()
  }, []);
  
  
  const monthField : JSX.Element[] = []
  for(let i=range.firstDay; i<=range.lastDay; i+=dayMs){
    //console.log(monthFieldDay);
    monthField.push(<Day date={i} setShowMenu={setShowMenu}/>)
    
  }
  
  //handlers to switch months
  function handlePreviousClick () : void {
    const prevMonth = monthToDisplay.setMonth(monthToDisplay.getMonth()-1)
    setMonthToDislay(new Date(prevMonth))
    console.log(monthToDisplay);
  }
  
  function handleNextClick () : void {
    const prevMonth = monthToDisplay.setMonth(monthToDisplay.getMonth()+1)
    setMonthToDislay(new Date(prevMonth))
    console.log(monthToDisplay);
  }


  return (
    <div className="Month">
        <div className="DaysField">
            {monthField}
        </div>
        <div>{monthToDisplay.toLocaleDateString()}</div>
        <button onClick={handlePreviousClick}>&larr;</button>
        <button onClick={handleNextClick}>&#8594;</button>
        <DayMenu showMenu={showMenu} setShowMenu={setShowMenu} />
        <MonthOwedTime state={state} monthToDisplay={monthToDisplay}/>
    </div>
  )
}
export default Month
