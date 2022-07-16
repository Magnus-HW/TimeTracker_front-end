//Interfaces
export interface IEvent {
    _id: string,
    in: number,
    out: number,
    dateId: string
}
export interface IDay {
    _id: string,
    date: number,
    dateUTCoffSet: number,
    workDay: boolean,
    workTime: number,
    timeStatus: number,
    events: string[]
}

export interface IMonthFieldRange {
    firstDay: number,
    lastDay: number
}

export type INewDay = Omit<IDay," _id">;
export type INewEvent =  Omit<IEvent, "_id">;