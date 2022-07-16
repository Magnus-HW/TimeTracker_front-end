export interface DayInter {
    _id: string,
    date: number,
    dateUTCoffSet: number,
    workDay: boolean,
    workTime: number,
    timeStatus: number,
    openedEvent: boolean,
    events: string[]
}

export interface IDayElement {
    _id: string,
    date: number,
    dateUTCoffSet: number,
    workDay: boolean,
    workTime: number,
    timeSatus: number,
    events: IEvent[]
  }

export interface IEvent {
    _id: string,
    in: number,
    out: number,
    dateId: string
}

//State
export interface IDaysContextData {
    datesInRange: DayInter[],
    dayEvents: IEvent[],
    daySample: IDaySample
}

export interface IDaySample {
    _id: string,
    date: number,
    dateUTCoffSet: number,
    workDay: boolean,
    workTime: number,
    timeStatus: number
    events?: string[]
}

export interface EditEventRes  {
    editedEvent: IEvent,
    newTimeStatus: number
}

export interface DeletedEventRes {
    deleted: IEvent,
    newTimeStatus: number
}
export type PickerStatus = "" | "warning" | "error" | undefined 
export type IEventInput = Omit<IEvent, "_id">