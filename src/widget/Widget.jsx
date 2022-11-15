import axios from "axios";
import { useCallback } from "react";
import { useState, useEffect } from "react";
import "./widget.scss"
import React from 'react'


const Widget = ({ title,tableName,icon,link}) => {
  //temporary
  const [count, setCount] = useState(0);

  const loadCount = useCallback(async () => {
    const response = await axios.get(`http://localhost:5000/count/${tableName}`);
    setCount(response.data.count);

  }, [setCount, tableName]);

  useEffect(()=>{
    loadCount();
  },[loadCount])


  return (
    <div className="widget">
        <div className="left">
          <span className="title">
            {title}
          </span>
          <span className="counter">
            {count}
          </span>
          <span className="link">
            {link}
          </span>
        </div>
        {/* <div className="right"> 
          {icon}
        </div> */}
        {icon}
    </div>
  )
}

export default Widget