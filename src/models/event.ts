import mongoose from "mongoose";

import { IEvent } from "../type";

export const eventSchema = new mongoose.Schema<IEvent>({
        in : {
            type: Number,
            required: true
        }, 
        out : {
            type: Number,
            required: true
        },
        dateId : {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Day'
        }
}); 

export const Event = mongoose.model('Event', eventSchema);