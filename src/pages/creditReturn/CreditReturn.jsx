import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { returnColumns } from '../../datatablesource'
import './creditReturn.scss'

const CreditReturn = () => {
    const {state} = useLocation();
    const {name} = state
    const {billId} = useParams()
    const [data,setData]= useState([]);
    const loadData = (useCallback(async()=>{
    const response = await axios.get(`http://localhost:5000/get/creditBalance/${billId}`)
        console.log(response);
        for(let i=0;i<response.data.length;i++){
            response.data[i].date = response.data[i].date.split("T1")[0]; 
          }
        setData(response.data)
    },[setData,billId]))
      
    useEffect(()=>{
        loadData();
    },[loadData])
  return (
    <div className='creditReturn'>
      <Sidebar />
      <div className="creditReturnContainer">
        <Navbar />
        <div className="title">
            {name} Credit Return Details
        </div>
        <div className="datatable">
          <DataGrid
            rows={data}
            columns = {returnColumns}
            components={{Toolbar:GridToolbar}}
            getRowId={(row) =>row.date}
          />
        </div>
      </div>
    </div>
  )
}

export default CreditReturn