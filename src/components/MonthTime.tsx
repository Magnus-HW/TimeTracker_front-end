import React from "react";
import { pickMonthEvents } from "../services/time";
import { DayInter, IDaysContextData } from "../types";
import Day from "./Day";

const MonthOwedTime = ({state, monthToDisplay} : {state: IDaysContextData, monthToDisplay: Date}) => {
    let monthOweTime = pickMonthEvents(state, monthToDisplay)
    //console.log(monthOweTime);
    const displayTime = (monthOweTime)/ (60 * 1000)
    let message = `Shortfall: ${displayTime}`
    if(displayTime < 0) {
        message = `Surplus ${displayTime*-1}`
    }
    return (
        <div id="MonthOwedTime">
            <div>{message} min</div>
        </div>
    )
}



export default MonthOwedTime