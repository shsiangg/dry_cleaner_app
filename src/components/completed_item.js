import React , { useState } from 'react';
import './dashboard.css'


export default function CompletedItem({name, number, time}) {
  return (
    <div>
      Completed
      <p>{name} {number} {time}</p>
    </div>
  )
}