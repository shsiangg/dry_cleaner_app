import React , { useState } from 'react';
import SubmittedItem from './submitted_item'
import './dashboard.css'

export default function DashboardItem(props) {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    console.log("submitted")
    setSubmitted(true)
  }


  if (submitted) {
    return (
      <SubmittedItem />
    )
  } else {
      return (
        <div className="dashboard-item">
          <form>
            <input type="text" name="name" placeholder="Customer Name"></input>
            <input type="tel" name="number" placeholder="Phone Number"></input>
            <input type="submit" value="Submit" onClick={() => handleSubmit()}></input>
          </form>
        </div>
      )
  }
  
}

/*
  dashboard item first asks for name an dphone Number

  after fields are submitted, item will change look of input, create "submitted at" field, and a 
start processing button

  when the start processing button is pressed, a "In progress..." status field will appear and a 
"time elapsed" will appear to count the time since button pressed, and a 
complete order button will appear

  when the complete order button is pressed, the order will say completed and how long it took 
to complete
*/