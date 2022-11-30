import React, { useCallback, useEffect, useState } from 'react'
import './credit.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { creditColumns } from '../../datatablesource'

const Credit = () => {
  const [data,setData] = useState([])
  const loadData = (useCallback(async()=>{
    const response = await axios.get("http://localhost:5000/credit/details")
    for(let i=0;i<response.data.length;i++){
      response.data[i].date = response.data[i].date.split("T1")[0]; 
    }
    setData(response.data)
  },[setData]))

  useEffect(()=>{
    loadData();
  },[loadData])


  const actionColums = [
    {field : 'action' , headerName: 'Action', width: 500, renderCell:(params) =>{
        return(
            <div className="cellAction">
                <div className="returnButton">Return</div>
            </div> 
        )
    }}
  ]

  console.log(data);
  return (
    <div className="credit">
        <Sidebar />
        <div className="creditContainer">
            <Navbar />
            <div className="creditTitle">
                Credit Details
            </div>
            <div className="datatable">
              <DataGrid 
                rows={data}
                columns={creditColumns.concat(actionColums)}
                getRowId={(row)=>row.bill_id}
              />
            </div>
        </div>
    </div>
  )
}

export default Credit