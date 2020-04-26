import React, {useState} from 'react';
import './dashboard.css'
import DashboardItem from './dashboard_item';
import SubmittedItem from './submitted_item'
import CompletedItem from './completed_item';

export default function Dashboard(props) {
  const [items, setItems] = useState([{id: 0}])
  const [itemCount, setItemCount] = useState(1)


  const addItem = () => {
    setItemCount(itemCount + 1)
    setItems([...items, {state: 'empty', id: itemCount}])
  }



  return (
    <div className="dashboard">
      {items.map((item) => {
        return <DashboardItem key={item.id} uid={item.id} />
      })}
        
      <div className="dashboard-item add-order" type="button" onClick={() => addItem()}>
      Add Order
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