import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import "./supplierReturn.scss"
import { DataGrid, GridToolbar } from '@mui/x-data-grid'

export const returnColumns=[
  { field: 'date', headerName: 'Date', width: 150 },
  {  field: 'beforePay', 
      headerName: 'Balance',
      width: 130,  
  },
  { 
      field : 'amountGiven',
      headerName:'Amount Given',
      width: 130,
  },
  {
      field: 'afterPay',
      headerName: 'Remaining',
      width:130
  },
]

const SupplierReturn = () => {
  const {supplierId} = useParams()
  const [data,setData]= useState([]);
  const loadData = (useCallback(async()=>{
    const response = await axios.get(`http://localhost:5000/get/supplierBalance/${supplierId}`)
    console.log(response);
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