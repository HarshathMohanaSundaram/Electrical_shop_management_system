import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import Chart from '../../components/chart/Chart'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import List from '../../components/table/Table'
import Widget from '../../widget/Widget'
import './home.scss'
import axios from 'axios'
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined"
import InventoryRoundedIcon from '@mui/icons-material/InventoryRounded';
import PortraitIcon from '@mui/icons-material/Portrait';
import { useNavigate } from 'react-router-dom'

const Home = () => {
 const navigate = useNavigate()
  const [data,setData] = useState([])
  const [salesData, setSalesData] = useState([])
  const [purchaseData, setPurchaseData] = useState([])

  const loadLastSalesData =(useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/last5Sales")
    for(let i=0;i<response.data.length;i++){
      response.data[i].date = response.data[i].date.split("T1")[0];
    }
    setData(response.data);
  },[setData]))

  const loadPurchaseData = ( useCallback(async () =>{
    const response = await axios.get("http://localhost:5000/purchase/details");
    for(let i = 0;i<response.data.length;i++){
      response.data[i].Total = parseFloat(response.data[i].Total).toFixed(2);
    }
    setPurchaseData(response.data);
  },[setPurchaseData]))

  const loadSalesData =( useCallback( async () =>{
    const response = await axios.get("http://localhost:5000/sales/details");
    for(let i = 0;i<response.data.length;i++){
      response.data[i].Total = parseFloat(response.data[i].Total).toFixed(2);
    }
    setSalesData(response.data);
  },[setSalesData]))

  useEffect(()=>{
    const user = localStorage.getItem("user")
    console.log(user);
    if(user === null)
      navigate("/login")
  })


  useEffect(()=>{
    loadSalesData();
  },[loadSalesData])

  useEffect(()=>{
    loadPurchaseData();
  },[loadPurchaseData])

  useEffect(()=>{
    loadLastSalesData();
  },[loadLastSalesData])

  return (
    <div className='home'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget 
              title='CUSTOMER' 
              tableName="tbl_customer" 
              icon ={<PersonOutlinedIcon className="icon" style={{color:"crimson"}}/>} 
              link = "See all customers"
            />
            <Widget
              title='PRODUCT'
              tableName="tbl_product"
              icon ={<InventoryRoundedIcon className="icon" style={{color:"goldenrod", size: "large"}} />}
              link = "See all products"
            />
            <Widget 
              title='SUPPLIER'
              tableName="tbl_supplier"
              icon={<PortraitIcon className="icon" style={{color:"green"}}  />}
              link = "See all supplier"
            />
          </div>
          <div className="charts">
            <Chart aspect={2/1} title="Last 6 Month Purchase" data={purchaseData}/>
            <Chart aspect={2/1} title="Last 6 Month Sales" data={salesData}/>
          </div>
          <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <List data={data} />
          </div>
        </div>
    </div>
  )
}

export default Home