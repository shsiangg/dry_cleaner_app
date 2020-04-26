import React , { useState, useEffect } from 'react';
import CompletedItem from './completed_item'

import './dashboard.css'


export default function SubmittedItem({name, number, uid, handleComplete}) {
  const [seconds, setSeconds] = useState(0)
  const [timer, setTimer] = useState(new Date(1000 * 0).toISOString().substr(11, 8))

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds(seconds + 1)
      let new_timer = new Date(1000 * seconds).toISOString().substr(11, 8)
      setTimer(new_timer)
    }, 1000);
    return () => {
      clearInterval(id);
    };
  });
  return (
    <div>
      Processing
      <p>{name} {number}</p>
      <div>
      {timer}
      </div>
      <button onClick={(e) => {handleComplete(e, name, number, timer, uid)}}>asdf</button>
    </div>
  )
}