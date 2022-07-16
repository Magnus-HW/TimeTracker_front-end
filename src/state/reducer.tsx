import { stat } from "fs/promises"
import datesInfo from "../controllers/datesInfo"
import { DayInter, IDaySample, IDaysContextData, IEvent } from "../types"

export type Action = 
    {
        type: "FETCH_MONTH_FIELD",
        payload: DayInter[]
    } | 
    {
        type: "SET_DAY_SAMPLE",
        payload: IDaySample
    } |
    {
        type: "FETCH_DAY_EVENTS",
        payload: IEvent[]
    } | {
        type: "EDIT_DAY",
        payload: DayInter
    } | {
        type: "ADD_EVENT",
        payload: IEvent
    } | {
        type: "EDIT_EVENT",
        payload: IEvent
    } | {
        type: "DELETE_EVENT",
        payload: IEvent
    } | {
        type: "ADD_DAY",
        payload: DayInter
    } | {
        type: 'SET_TIME_STATUS',
        payload: {dateId : string, timeStatus : number}
    }


export const reducer = (state: IDaysContextData, action: Action) : IDaysContextData  => {
    switch (action.type) {
        case "FETCH_MONTH_FIELD":
            return {
                ...state,
                datesInRange: [...action.payload]
            }
        case "SET_DAY_SAMPLE":
            return {
                ...state,
                daySample: action.payload
            }
        case "ADD_DAY":
            return {
                ...state, 
                datesInRange: state.datesInRange.concat(action.payload)
            }
        case "EDIT_DAY":
            return {
                ...state,
                datesInRange: [...state.datesInRange.map(day => day._id == action.payload._id 
                    ? action.payload
                    : day)
                ]
            }
        case "FETCH_DAY_EVENTS":
        return {
            ...state,
            dayEvents: [...action.payload]
        }
        case "ADD_EVENT":
            return{
                ...state,
                datesInRange: [...state.datesInRange.map(day => day._id == action.payload.dateId 
                    ? {...day, events: day.events.concat(action.payload._id)} 
                    : day)
                ],
                dayEvents: state.dayEvents.concat(action.payload)
            }
        case "EDIT_EVENT":
            return {
                ...state,
                dayEvents: [...state.dayEvents.map(e => e._id == action.payload._id ? action.payload : e)]
            }
        case "DELETE_EVENT":
            return {
                ...state,
                datesInRange: [...state.datesInRange.map(day => day._id == action.payload.dateId
                    ? {...day, events: day.events.filter(event => event !== action.payload._id)}
                    : day)
                ],
                dayEvents: [ ...state.dayEvents.filter(event => event._id !== action.payload._id)]
            }
        case "SET_TIME_STATUS": {
            return {
                ...state,
                datesInRange: [...state.datesInRange.map(day => day._id == action.payload.dateId
                    ? {...day, timeStatus: action.payload.timeStatus}
                    : day)],
                daySample: {...state.daySample, timeStatus: action.payload.timeStatus}
            }
        }
        default:
            return state
    }
}

export const setMonthField = (fetchedDatesInfo : DayInter[]) : Action => {
    return {
        type: "FETCH_MONTH_FIELD",
        payload: fetchedDatesInfo
    }
}

export const setDaySample = (DaySample: IDaySample ) : Action => {
    return {
        type: "SET_DAY_SAMPLE",
        payload: DaySample
    }
}
export const setAddDay = (day : DayInter) : Action => {
    return {
        type: "ADD_DAY",
        payload: day
    }
}
export const setDayEvents = (fetchedDayEvents: IEvent[]) : Action => {
    return { 
        type: "FETCH_DAY_EVENTS",
        payload: fetchedDayEvents
    }
}
export const setAddNewEvent = (newEvent : IEvent) : Action => {
    return {
        type: "ADD_EVENT",
        payload: newEvent
    }
}
export const setEditedEvent = (dayEvent: IEvent) : Action => {
    return {
        type: "EDIT_EVENT",
        payload: dayEvent
    }
}

export const setDeleteEvent = (eventToDelete: IEvent) : Action => {
    return {
        type: "DELETE_EVENT",
        payload: eventToDelete
    }
}

export const setTimeStatus = (dateId : string, timeStatus : number) : Action => {
    return {
        type: "SET_TIME_STATUS",
        payload: {dateId, timeStatus}
    }
}

export const editDay = (editedDay : DayInter) : Action => {
    return {
        type: "EDIT_DAY",
        payload: editedDay
    }
}
//{dateId : string, timeStatus : number}