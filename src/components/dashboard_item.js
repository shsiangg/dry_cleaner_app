import React , { useState, useEffect, useRef } from 'react';
import SubmittedItem from './submitted_item'
import './dashboard.css'

export default function DashboardItem(props) {
  const [input, setInput] = useState({})
  const [itemState, setItemState] = useState('empty')
  const [name, setName] = useState()
  const [number, setNumber] = useState()
  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [timer, setTimer] = useState(new Date(1000 * 0).toISOString().substr(11, 8))
  const [seconds, setSeconds] = useState(0)

  const handleInputChange = (e) => setInput({
    ...input,
    [e.currentTarget.name]: e.currentTarget.value
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setName(e.target.name.value)
    setNumber(e.target.number.value)
    setItemState('submit')
    setStartTime(new Date().toLocaleString())
    
  }

  const handleComplete = (e, elapsed_time) => {
    e.preventDefault()
    setItemState('complete')
    setEndTime(new Date().toLocaleString())
  }

  const handleCancel = (e) => {
    e.preventDefault()
    setItemState('canceled')
  }
  
  useInterval(() => {
    setSeconds(seconds + 1);
    setTimer( new Date(1000 * seconds).toISOString().substr(11, 8))
  }, itemState === 'complete' ? null : (itemState === 'submit' ? 1000 : null) );



  let content = () => {
    switch (itemState) {
      case 'empty':
        return (
          <>
        <h2>{props.uid}</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input required  name="name" placeholder="Customer Name" onChange={handleInputChange} ></input>
          <input required pattern="\d{10}"  name="number" placeholder="Phone Number" onChange={handleInputChange} ></input>
          <input type="submit" value="Submit" ></input>
        </form>
        <button name="cancel" onClick={(e) => handleCancel(e, props.uid)}>Cancel</button>      
      </>
        )
      case 'submit':
       return ( 
       <div>
          Processing
          <p>{name} {number}</p>
          <p>Started at: {startTime}</p>
          <h3>Elapsed time: {timer}</h3>
          <h2>{props.uid}</h2>
          <button onClick={(e) => {handleComplete(e)}}>Complete Order</button>      
      </div>
       )
       case 'canceled':
         return (<div>
           canceled
         </div>)
      default:
        return (
        <>
          <h2>completed</h2>
          <p>{name} {number}</p>
          <p>Start time: {startTime}</p>
          <p>End time: {endTime}</p>
          <p>Time Elapsed: {seconds}</p>
          <h2>{props.uid}</h2>
        </>
        )
    }

  }


  return (
    <div className={`dashboard-item ${props.uid}`} >
     {content()}
    </div>

  )

}

function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
/* dashboard item = [{id: 0 }, {id:1}, ...]
  responsibilities of dashboard: create and delete items

  responsibilities of dashboard item: handle state of item

dashboard item state: input -> processing -> completed


 <h2>{props.uid}</h2>
      <form onSubmit={(e) => props.handleSubmit(e, props.uid)}>
        <input required  name="name" placeholder="Customer Name" onChange={handleInputChange} ></input>
        <input required pattern="\d{10}"  name="number" placeholder="Phone Number" onChange={handleInputChange} ></input>
        <input type="submit" value="Submit" ></input>
      </form>
      <button name="cancel" onClick={(e) => props.handleCancel(e, props.uid)}>Cancel</button>

*/