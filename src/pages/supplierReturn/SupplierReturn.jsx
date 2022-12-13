import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import "./supplierReturn.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid'
import { returnColumns } from '../../datatablesource'


const SupplierReturn = () => {
  const {state} = useLocation();
  const {name} = state;
  const {supplierId} = useParams()
  const [data,setData]= useState([]);
  const loadData = (useCallback(async()=>{
    const response = await axios.get(`http://localhost:5000/get/supplierBalance/${supplierId}`)
    console.log(response);
    for(let i=0;i<response.data.length;i++){
      response.data[i].date = response.data[i].date.split("T1")[0]; 
    }
    setData(response.data)
  },[setData,supplierId]))

  useEffect(()=>{
    loadData();
  },[loadData])

  return (
    <div className='supplierReturn'>
      <Sidebar />
      <div className="supplierReturnContainer">
        <Navbar />
        <div className="title">
          {name} balance
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

export default SupplierReturn