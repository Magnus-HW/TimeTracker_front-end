import express = require('express');
import { Day } from '../models/day';
import { IDay } from '../type';

const daysRouter = express.Router();

//all gays
daysRouter.get('/', (_req, res)  => {
    const getDays = async ()  => {
        const days = await Day.find({});
        //console.log(days);

        res.json(days);
    };

    getDays().catch((error:unknown) => {
        if(error instanceof Error) {
            res.status(400).send(error.message);
        } else {
            res.status(500).send('Unknown Error');
        }
    });
});


//field day in range. Take first and last day of monthfield to show
daysRouter.post('/monthField/', (_req, res) => {
    const firstDay = _req.body.firstDay as number;
    const lastDay = _req.body.lastDay as number;
    
    const findDatesInRange = async () => {
        const datesInRange = await Day.find({date : {$gte: firstDay, $lte: lastDay}});
        //console.log(datesInRange);
        
        res.json(datesInRange);
    };
    findDatesInRange().catch ((err:unknown) => {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('Unknown Error');
        } 
    });
});

//addd day
daysRouter.post('/', (_req, res) => {
    const body = _req.body as IDay;

    const addDay = async () => {
        const day = new Day({
            date: body.date,
            dateUTCoffSet: body.dateUTCoffSet,
            workDay: body.workDay,
            workTime: body.workTime,
            timeStatus: body.timeStatus,
            events: body.events
        });
        const addedDay = await day.save();
        res.json(addedDay);
    };

    addDay().catch ((err:unknown) => {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('Unknown Error');
        }
    });
});

daysRouter.delete('/:id', (_req, res) => {
    const id = _req.params.id;

    const deleteDay = async () => {
        const deletedDay = await Day.findByIdAndDelete(id);
        res.json(deletedDay);
    };
 
    deleteDay().catch ((err:unknown) => {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('Unknown Error');
        }
    });
});

daysRouter.put('/', (_req, res) => {
    const body = _req.body as IDay;
    console.log('body', body);
    
    const editDay = async () => {
        const editedDay = await Day.findByIdAndUpdate(body._id, {workDay: body.workDay}, {new: true});

        console.log(editedDay);
        
        res.json(editedDay);
    };
    editDay().catch ((err:unknown) => {
        if(err instanceof Error) {
            res.status(400).send(err.message);
        } else {
            res.status(500).send('Unknown Error');
        }
    });
});

export default daysRouter;