import { Switch } from "antd"
import React,{ useState, useEffect } from "react"
import { editDay } from "../state/reducer"
import { useStateValue } from "../state/state"
import { IDaySample } from "../types"
import dayControllers from "../controllers/datesInfo"

//Swticher to change dayStatus (work/free)
const Switcher = () => {
    const [state, dispatch] = useStateValue()
  
    const daySample = state.daySample as IDaySample
    const [workDay, setWorkDay] = useState(daySample.workDay)

    useEffect(()=> {
      setWorkDay(daySample.workDay)
    },[daySample])
  
    const handleDayStatusChange = (checked: boolean, event: Event) => {
      console.log(checked);
      
      dayControllers.editDay({...daySample, workDay: checked})
        .then(res =>{
          console.log(res);
          dispatch(editDay(res))
          const newCheck = workDay ? false : true;
          setWorkDay(newCheck)
        })
    }
    return (
      <Switch checkedChildren="work" unCheckedChildren="free" checked={workDay} onClick={handleDayStatusChange}/>
    )
}

export default Switcher
