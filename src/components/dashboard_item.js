import React , { useState, useEffect, useRef } from 'react';
import './dashboard.css'

export default function DashboardItem(props) {
  const [input, setInput] = useState({})
  const [itemState, setItemState] = useState('empty')
  const [lastName, setLastName] = useState()
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
    setLastName(e.target.lastName.value)
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
    setEndTime(new Date().toLocaleString())

  }
  
  useInterval(() => {
    setSeconds(seconds + 1);
    setTimer( new Date(1000 * seconds).toISOString().substr(11, 8))
  }, itemState === 'complete' ? null : (itemState === 'submit' ? 1000 : null) );


  const handleKeyUp = (e) => {
    if (e.target.value.length === e.target.maxLength) {
      let num2 = document.querySelector("input[name='number2']")
      let num3 = document.querySelector("input[name='number3']")
      e.target.name === 'number1' ? num2.focus() : num3.focus()
    }
    
  }

  let content = () => {
    switch (itemState) {
      case 'empty':
        return (
          <div className={`dashboard-item empty ${props.uid}`} >
        <form className="item-content" onSubmit={(e) => handleSubmit(e)}>
          <label><i style={{fontSize: "0.8rem"}}>Order #: {props.uid} </i></label>
          <label>Last Name</label>
          <input required  type='text' name="lastName" placeholder="Johnson" onChange={handleInputChange} ></input>
          <label>Phone Number</label>
          <div>
          <input required type='tel' size="3" minLength="3" maxLength="3" pattern="\d{3}" name="number1" placeholder="123" 
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}></input>
          <input required type='tel' size="3" minLength="3" maxLength="3" pattern="\d{3}" name="number2" placeholder="456" 
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}></input>
          <input required type='tel' size="4 " minLength="4" maxLength="4" pattern="\d{4}" name="number3" placeholder="7890" 
          onChange={handleInputChange}></input>
          </div>
          <input type="submit" value="Submit" ></input>
        </form>
      </div>
        )
      case 'submit':
       return ( 
        <div className={`dashboard-item submitted ${props.uid}`} >
        <div className="item-content" >
        <i style={{fontSize: "0.8rem"}}>
          Order #: {props.uid}
          <button name="cancel" onClick={(e) => handleCancel(e, props.uid)}>Cancel Order</button>
         </i>
          <h1 className="last-name">{lastName}</h1>
          <i style={{textAlign: 'center'}}> {number}</i><br></br>
          <p style={{fontSize: "0.7rem"}}>Started at: {startTime}</p>
          <p style={{fontSize: "1.3rem", margin: "0 0"}}>Elapsed time: {timer}</p>
          <button name="complete" onClick={(e) => {handleComplete(e)}}>Complete Order</button>      
      </div>
      </div>
       )
       case 'canceled':
         return (
          <div className={`dashboard-item canceled ${props.uid}`} >
        <div className="item-content" >
          <i style={{fontSize: "0.8rem"}}>Order #: {props.uid} </i>
          <div style={{fontSize: "3rem"}}><b>Canceled</b></div>
          <div style={{fontSize: "1.2rem"}}> 
            <b >{lastName}</b>
            <i style={{float: 'right'}}> {number}</i>
          </div>
          <p style={{fontSize: "0.8rem"}}>
          <div>Started at: <span style={{float: 'right'}}>{startTime}</span></div>
          <div>Ended at: <span style={{float: 'right'}}>{endTime}</span></div>
          </p>
          <p style={{margin: "0 0"}}>Time Elapsed: <span style={{float: 'right'}}>{timer}</span></p>
        </div>
        </div>
         )
      default:
        return (
          <div className={`dashboard-item completed ${props.uid}`} >
          <div className="item-content" >
          <i style={{fontSize: "0.8rem"}}>Order #: {props.uid} </i>
          <div style={{fontSize: "3rem", fontWeight:"lighter"}}><i>Completed!</i></div>
          <div style={{fontSize: "1.2rem"}}> 
            <b >{lastName}</b>
            <i style={{float: 'right'}}> {number}</i>
          </div>
          <p style={{fontSize: "0.8rem"}}>
          <div>Started at: <span style={{float: 'right'}}>{startTime}</span></div>
          <div>Ended at: <span style={{float: 'right'}}>{endTime}</span></div>
          </p>
          <p style={{margin: "0 0"}}>Time Elapsed: <span style={{float: 'right'}}>{timer}</span></p>
        </div>
        </div>
        )
    }

  }


  return (
    <>
     {content()}
    </>
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