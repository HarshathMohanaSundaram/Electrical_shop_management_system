import "./report.scss"
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import SalesReport from "../../components/salesReport/SalesReport";
import PurchaseReport from "../../components/purchaseReport/PurchaseReport";
import { toast } from "react-toastify";
import axios from "axios";
import React from 'react'


const Report = () => {
    const [from,setFrom] = useState("");
    const [to,setTo] = useState("");
    const [tab, setTab] = useState(0);
    const[data,setData] = useState([]);

    const handleSubmit = (e) =>{
        e.preventDefault();
        const date = new Date();
        const today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+String(date.getDate());
        console.log(today);
        if(from>today)
            toast.error("From Date Should not be greater than today");
        else if(from>to)
            toast.error("From date should not be greater than to date");
        else{
            if(tab === 0){
                axios.get(`http://localhost:5000/sales/report/${from}/${to}`).then((response)=>{
                    console.log(response.data)
                    setData(response.data)
                }).catch((err)=>{
                    toast.error(err.body.data)
                })
            }
            else if(tab===1){
                axios.get(`http://localhost:5000/purchase/report/${from}/${to}`).then((response)=>{
                    console.log(response.data)
                    setData(response.data)
                }).catch((err)=>{
                    toast.error(err.body.data)
                })
            }
        }
    }
    const handleTab = (event, newValue) =>{
        setFrom("")
        setTo("")
        setData([])
        setTab(newValue)
    }

  return (
    <div className='report'>
        <Sidebar />
        <div className="reportContainer">
            <Navbar />
            <Tabs
                value={tab} 
                onChange={handleTab} 
                className="tabs"
                textColor="secondary"
                indicatorColor="secondary"
            >
                <Tab label="Sales" />
                <Tab label="Purchase" />
            </Tabs>
            <form className="form" onSubmit={handleSubmit}>
                <div className="formInput">
                    <label htmlFor="from">From:</label>
                        <input type="date" name="from" id="from" value={from||""} onChange={(e)=>{setFrom(e.target.value)}}/>
                    <label htmlFor="to">To:</label>
                        <input type="date" name="to" id="to" value={to||""} onChange={(e)=>{setTo(e.target.value)}} />
                </div>
                <button type="submit" className="btn">submit</button>
            </form>
            {
                tab === 0 &&
                <SalesReport 
                    data = {data}
                    setData={setData}
                />
            }
            {
                tab === 1 &&
                <PurchaseReport  
                    data={data}
                    setData={setData} 
                />
            }
        </div>
    </div>
  )
}

export default Report