import React , { useState, useEffect } from 'react';
import SubmittedItem from './submitted_item'
import './dashboard.css'

export default function DashboardItem(props) {
  const [name, setName] = useState()
  const [number, setNumber] = useState()


  return (
    <div className={`dashboard-item ${props.uid}`} >
      <form onSubmit={(e) => props.handleSubmit(e, props.uid)}>
        <input required  name="name" placeholder="Customer Name" value={name} onChange={(e) => setName(e.target.value)} ></input>
        <input required pattern="\d{10}"  name="number" placeholder="Phone Number" value={number} onChange={(e) => setNumber(e.target.value)} ></input>
        <input type="submit" value="Submit" ></input>
      </form>
    </div>
  )

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