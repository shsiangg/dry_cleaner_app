import React, {useState} from 'react';
import './dashboard.css'
import DashboardItem from './dashboard_item';

export default function Dashboard(props) {
  const [items, setItems] = useState([])



  const addItem = () => {
    console.log('adding item')
    setItems([...items, {item: true}])
  }
  console.log(items)
  return (
    <div className="dashboard">
      {items.map(() =>  <DashboardItem />)}    
      <div className="dashboard-item add-order" type="button" onClick={() => addItem()}>
      </div>
    </div>
  )
}