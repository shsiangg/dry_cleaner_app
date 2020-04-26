import React, {useState} from 'react';
import './dashboard.css'
import DashboardItem from './dashboard_item';
import SubmittedItem from './submitted_item'
import CompletedItem from './completed_item';

export default function Dashboard(props) {
  const [items, setItems] = useState([{state: 'empty', id: 0}])
  const [itemCount, setItemCount] = useState(1)

  const handleSubmit = (e, child_key) => {
    e.preventDefault();
    let cards = [...items]
    cards[child_key] = {state: 'submit', id: child_key}
    setItems(cards)
    console.log('after adding submit')
    console.log(items)
  }

  const handleComplete = (e, child_key) => {
    e.preventDefault();
    console.log('completed')
  }
  
  const addItem = () => {
    setItemCount(itemCount + 1)
    setItems([...items, {state: 'empty', id: itemCount}])
  }
  return (
    <div className="dashboard">
      {items.map((item) => {
        console.log("inside map, item state: " + item.state)
        if (item.state === 'empty') {
          return <DashboardItem handleSubmit={handleSubmit} key={item.id} uid={item.id}/>
        } else {
          return <SubmittedItem handleSubmit={handleSubmit} key={item.id}/>
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