import React, { ChildContextProvider, createContext, useContext, useReducer } from "react";
import { DayInter, IEvent, IDaysContextData, IDaySample } from "../types";
import { Action, reducer } from "./reducer";

const dayMenuSampleDefVal : IDaySample = {
    _id: "none",
    date: 1,
    dateUTCoffSet: 1,
    workDay: true,
    workTime: 0,
    timeStatus: 1,
    events: []
}

export const daysContextDefValue : IDaysContextData = {
    datesInRange: [],
    dayEvents: [],
    daySample: dayMenuSampleDefVal
}

type StateProviderProps = {
    children: React.ReactElement,
    reducer: React.Reducer<IDaysContextData, Action>
}

export const StateContext = 
    createContext<[IDaysContextData, React.Dispatch<Action>]>(
        [daysContextDefValue, () : IDaysContextData => daysContextDefValue]
    );

//imported by index.tsx
//he useReducer hook used to create the state and the dispatch function, 
//and pass them on to the context provider
export const StateProvider : React.FC<StateProviderProps> = ({children, reducer}) : React.ReactElement => {
    const [state, dispatch] = useReducer(reducer, daysContextDefValue)
    return(
        <StateContext.Provider value={[state, dispatch]}>
            {children}
        </StateContext.Provider>
    );
}

//for use in components
export const useStateValue = () : [IDaysContextData, React.Dispatch<Action>] => useContext(StateContext);