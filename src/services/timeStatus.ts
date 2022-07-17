import { IEvent } from "../type";

const countTimeStatus = (events : IEvent[], workTime: number) => {
    if(events.length == 0) return 0;
    const eventsTime = events.reduce((res, event) => {
        if (event.out !== -1) {
            return res+event.out-event.in;
        }
        return res;
    }, 0);

    return eventsTime == 0 ? 0 : workTime-eventsTime;
};

export default countTimeStatus;