import { IDaysContextData } from "../types";

export const pickMonthEvents = (state : IDaysContextData, monthToDisplay : Date) => {
    const nextMonth = new Date(new Date(monthToDisplay).setMonth(monthToDisplay.getMonth()+1)).getTime();

    const monthOweTime = state.datesInRange.reduce((sumTime, day) => {
            if(day.workDay == true && day.events.length !==0 && day.date < nextMonth && day.date > monthToDisplay.getTime()) {
                return sumTime + day.timeStatus
            }
            return sumTime
        }, 0
    )
    return monthOweTime
}