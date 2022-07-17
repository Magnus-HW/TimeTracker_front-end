import axios from "axios";
import { DayInter, DeletedEventRes, EditEventRes, IDaySample, IEvent, IEventInput} from "../types";
const baseUrl = 'http://localhost:3001/api'

const getMonthField = async (range : {firstDay: number, lastDay: number}) : Promise<DayInter[]> => {
    const request = await axios.post(`${baseUrl}/days/monthField/`,  range)
    //console.log(request.data);
    return request.data
}

const getDayEvents = async (dateId: string) : Promise<IEvent[]> => {
    const request = await axios.post(`${baseUrl}/events/menu`, {dateId: dateId})
    //console.log('get menu',request, '\n', dateId);
    return request.data
};

const addDay = async (daySample : IDaySample) : Promise<DayInter>=> {
    const request = await axios.post(`${baseUrl}/days`, daySample)
    console.log(request.data);
    return request.data
}

const editDay = async (daySample : IDaySample) : Promise<DayInter> => {
    const request = await axios.put(`${baseUrl}/days`, daySample)
    return request.data
}
const addEvent = async(dayEvent: IEventInput) : Promise<IEvent> => {
    const request = await axios.post(`${baseUrl}/events`, dayEvent);
    return request.data
}

const editEvent = async(dayEvent: IEvent) : Promise<EditEventRes> => {
    const request = await axios.put(`${baseUrl}/events/${dayEvent._id}`, dayEvent);
    console.log('edit event', request.data);
    
    return request.data
}

const deleteEvent = async (id: string) : Promise<DeletedEventRes> => {
    const request = await axios.delete(`${baseUrl}/events/${id}`)
    console.log(request.data);
    
    return request.data
}
export default {
    getMonthField: getMonthField,
    getDayEvents: getDayEvents,
    addDay: addDay,
    addEvent: addEvent,
    editEvent: editEvent,
    deleteEvent: deleteEvent,
    editDay: editDay
}