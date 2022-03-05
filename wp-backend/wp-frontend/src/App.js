import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DateTimePicker from 'react-datetime-picker';
import './App.css'
import M from 'materialize-css'


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const App = () => {
  const [reminderMsg, setRinderMsg] = useState("")
  const [remindAt, setReminAt] = useState()
  const [reminderList, setReminderList] = useState([])
  const notify = () => toast("Wow so easy!");


  useEffect(() => {
    axios.get("/getAllRemindre").then(res => setReminderList(res.data))
  }, [])

  const addReminder = () => {
    axios.post("/addRemindre", { reminderMsg, remindAt })
    .then(res => res.data)

    // console.log(res)
    setRinderMsg("")
    setReminAt()
  }



const deteleReminder = (id) => {
  axios.post("/deleteRemindre", { id })
    .then(res => setReminderList(res.data))
}



return (
  <div className='App'>
    {console.log(reminderList)}
    <div className='homepage'>
      {/* <ToastContainer /> */}
      {/* <button onClick={notify}>Notify!</button> */}
      <form className='homepage_header'>
        <h1>Remainder me</h1>
        {/* <input required /> */}
        <input type='text' placeholder='Reminder notes here...'
          value={reminderMsg}
          onChange={(e) => setRinderMsg(e.target.value)}


      
        />
        <DateTimePicker

          value={remindAt}
          onChange={setReminAt}
          minDate={new Date()}
          minutePlaceholder='mm'
          hourPlaceholder='hh'
          dayPlaceholder='DD'
          monthPlaceholder='MM'
          yearPlaceholder='YYYY'

        />
        <button className='button' onClick={addReminder}>Add Reminder</button>
      </form>


      <div className='homepage_body'>
        {/* {
            reminderList.map(reminder=>(
              <div className='reminder_card'>
              <h2>{reminder.reminderMsg}</h2>
              <h3>Remind Me At:</h3>
              <p>{String(new Date(reminder.remindAt.toLocaleString(undefined,{timezone:"Asia/Kolkata"})))}</p>
              <div className='button' onClick={deteleReminder}>Delete </div>
            </div>
      
            ))
          } */}

        {
          reminderList.map(reminder => (
            <div className='reminder_card' key={reminder._id}>

              <h2>{reminder.reminderMsg}</h2>
              <h3>Remind Me At:</h3>
              <p>{String(new Date(reminder.remindAt.toLocaleString(undefined, { timezone: "Asia/Kolkata" })))}</p>
              <div className='button' onClick={() => deteleReminder(reminder._id)}>Delete </div>

            </div>

          ))

        }
        {/* <form>
            <input required/>
            <button type='submit'>submit</button>
          </form> */}




      </div>

    </div>

  </div>
)
}

export default App