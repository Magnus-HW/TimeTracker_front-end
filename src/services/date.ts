//showMonth - current date in ms
export const getMonthFieldRange = (showMonth: number) : {
    firstDay: number;
    lastDay: number;
} => {

    const dayMs = 24 * 3600 * 1000;
    const monthToDisplay = new Date(showMonth);
    
    const currentMonth = monthToDisplay.getMonth();
    const dayOfWeek = monthToDisplay.getDay();
    let daysBeforCurMonth = 0;
    if(dayOfWeek === 0 ) {
      daysBeforCurMonth = 6;
    } else {
      daysBeforCurMonth = dayOfWeek - 1;
    }

    const nextMonth = new Date(new Date(monthToDisplay).setMonth(currentMonth+1));
    const lastDayOfCurrentMonth = new Date(nextMonth.setDate(nextMonth.getDate()-1));

    const beforePlusCurrent = daysBeforCurMonth+lastDayOfCurrentMonth.getDate();

    // date from which to start showing; amount of days in the field
    const monthFieldDay = Math.floor((monthToDisplay.getTime() - (dayMs * daysBeforCurMonth))/100000)*100000;
    const amountOfMonthFieldDays = (beforePlusCurrent) % 7 === 0 
        ? beforePlusCurrent : beforePlusCurrent + 6 - (beforePlusCurrent % 7);
    //const UTC = 3*3600*1000;

    const LastMonthFieldDays = amountOfMonthFieldDays * dayMs + monthFieldDay;
    return {firstDay : monthFieldDay, lastDay: LastMonthFieldDays};
};
