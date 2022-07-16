import mongoose from 'mongoose';

import { IDay } from '../type';


export const daySchema = new mongoose.Schema<IDay>({
    date: {
        type: Number,
        required: true
    },
    dateUTCoffSet: {
        type: Number,
        required: true
    },
    workDay: {
        type: Boolean,
        required: true
    },
    workTime: {
        type: Number
    },
    timeStatus: {
        type: Number
    },
    events: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Event'
        }
    ]
});

export const Day = mongoose.model('Day', daySchema);


// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const userSchema = new Schema({
//     name: String,
//     daysInfo : [daySchema]
// });