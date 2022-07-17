import express = require('express');
import { IDay, IEvent} from '../type';
import { Event } from '../models/event';
import { Day } from '../models/day';
import countTimeStatus from '../services/timeStatus';
const eventsRouter = express.Router();

eventsRouter.post('/', (_req, res) => {
    
    const body = _req.body as IEvent;
    console.log(body);
    
    const addEvent = async () => {
        const date = await Day.findById(body.dateId) as IDay;
        
        const event = new Event({
            in: body.in,
            out: body.out,
            dateId: body.dateId
        });
        const addedEvent = await event.save();
        date.events = date.events.concat(addedEvent._id);
        //console.log(date.events);
        await Day.findByIdAndUpdate(date._id, {events: date.events});       
        res.json(addedEvent);
    };

    addEvent().catch((err:unknown) => {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('Unknown Error');
        }
    });
});

//get events of a day
eventsRouter.post('/menu', (_req, res) => {
    const body = _req.body.dateId as string;
    
    const getDateEvents = async () => {
        const dateEvents = await Event.find({dateId: body});
        //console.log(body, dateEvents);

        res.json(dateEvents);
    };

    getDateEvents().catch((err:unknown) => {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('Unknown Error');
        }
    });
});
//delete? ^, the same got below
eventsRouter.get('/:id', (_req, res) => {
    const id = _req.params.id;
    const getEvent = async () => {
        const event = await Event.findById(id);
        res.json(event);
    };
    //console.log(id);
    
    getEvent().catch((err:unknown) => {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('Unknown Error');
        }
    });
});

eventsRouter.delete('/:id', (_req, res) => {
    const id = _req.params.id;

    const deleteEvent = async () => {
        const deleted = await Event.findByIdAndDelete(id);

        const dateId = deleted?.dateId;
        const day = await Day.findById(dateId) as IDay;
        //console.log(day);
        
        day.events = day.events.filter(eventId => eventId.toString() !== id);
        //console.log(day.events);
        const allDayEvents = await Event.find({dateId: dateId});
        const newTimeStatus = countTimeStatus(allDayEvents, day.workTime);
        console.log(newTimeStatus);
        
        await Day.findByIdAndUpdate(dateId, {events: day.events, timeStatus: newTimeStatus});
        //console.log({deleted, newTimeStatus});
        res.json({deleted, newTimeStatus});
    };


    deleteEvent().catch((err:unknown) => {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('Unknown Error');
        }
    });
});

eventsRouter.put('/:id', (_req, res) => {
    const id = _req.params.id;

    const body = _req.body as IEvent;
    const event = new Event({
        _id: body._id,
        in: body.in,
        out: body.out,
        dateId: body.dateId
    });
    const editEvent = async () => {
        const editedEvent = await Event.findOneAndUpdate({_id: id}, event, {new: true});

        const allDayEvents = await Event.find({dateId: body.dateId});
        const date = await Day.findById(body.dateId) as IDay;
        let newTimeStatus = date.timeStatus;
        if(event.out !==-1) {
            newTimeStatus = countTimeStatus(allDayEvents, date.workTime);
            await Day.findByIdAndUpdate(body.dateId, {timeStatus: newTimeStatus});
        }
        
        //console.log({editedEvent, newTimeStatus});
        
        res.json({editedEvent, newTimeStatus});
    };
    editEvent().catch((err:unknown) => {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('Unknown Error');
        }
    });
});
export default eventsRouter; 