import React, {useState} from 'react';
import './dashboard.css'
import DashboardItem from './dashboard_item';
import SubmittedItem from './submitted_item'
import CompletedItem from './completed_item';

export default function Dashboard(props) {
  const [items, setItems] = useState([{state: 'empty', id: 0, name: '', number: ''}])
  const [itemCount, setItemCount] = useState(1)

  const handleSubmit = (e, child_key) => {
    e.preventDefault();
    let name = e.target.name.value
    let number = e.target.number.value
    let cards = [...items]
    cards[child_key] = {state: 'submit', id: child_key, name: name, number: number}
    setItems(cards)
  }

  const handleComplete = (e, name, number, time, child_key) => {
    e.preventDefault();
    let cards = [...items]
    cards[child_key] = {state: 'complete', id: child_key, name: name, number: number, time: time}
    setItems(cards)  }
  
  const addItem = () => {
    setItemCount(itemCount + 1)
    setItems([...items, {state: 'empty', id: itemCount}])
  }
  return (
    <div className="dashboard">
      {items.map((item) => {
        if (item.state === 'empty') {
          return <DashboardItem handleSubmit={handleSubmit} key={item.id} uid={item.id}/>
        } else if (item.state === 'submit') {
          return <SubmittedItem handleComplete={handleComplete} key={item.id} uid={item.id} 
                    name={item.name} number={item.number}/>
        } else {
          return <CompletedItem key={item.id} name={item.name} number={item.number} time={item.time}/>
        }
      })} 
      <div className="dashboard-item add-order" type="button" onClick={() => addItem()}>
      </div>
    </div>
  )
}
/*
else if (item === 'submit') {
          return <SubmittedItem handleComplete={handleComplete}  key={key}/>
        } else {
          return <CompletedItem />
        }
        */