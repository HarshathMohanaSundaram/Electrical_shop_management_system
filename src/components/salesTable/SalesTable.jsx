import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { salesColumn } from '../../datatablesource'
import './salesTable.scss'

const SalesTable = () => {
  const[data,setData] = useState([])
  const loadData = (useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/get/salesDetails");
    for(let i=0;i<response.data.length;i++){
      response.data[i].date = response.data[i].date.split("T1")[0]; 
    }
    setData(response.data)
  },[setData]))  
  useEffect(()=>{
    loadData()
  },[loadData])   
  
  const actionColums = [
    {field : 'action' , headerName: 'Action', width: 500, renderCell:(params) =>{
        return(
            <div className="cellAction">
                <div className="viewButton">View</div>
                <div className="editButton">Edit</div>
                <div className="returnButton">Return</div>
            </div> 
        )
    }}
  ]

  return (
    <div>
        <div className="datatableTitle">
            Sales Details
        </div>
        <div className="datatable">
            <DataGrid
                rows={data}
                columns={salesColumn.concat(actionColums)}
                getRowId={(row)=>row.bill_id}
            />
        </div>
    </div>
  )
}

export default SalesTable