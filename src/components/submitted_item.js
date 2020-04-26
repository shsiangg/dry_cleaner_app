import React , { useState } from 'react';
import CompletedItem from './completed_item'

import './dashboard.css'


export default function SubmittedItem(props) {
  const [completed, setCompleted] = useState(false)

  const handleCompleted = () => {
    setCompleted(true)
  }

  if (completed) {
    return (
      <CompletedItem />
    )
  }
  return (
    <div>
      Submitted
      <p>{props.name}</p>
      <p>{props.number}</p>
      <button onClick={() => handleCompleted()}>Complete Order</button>
    </div>
  )
}