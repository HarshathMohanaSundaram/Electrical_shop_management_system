import { DataGrid, GridToolbar} from '@mui/x-data-grid'
import React from 'react'
import { salesColumn } from '../../datatablesource'
import './salesReport.scss'
import { useEffect } from 'react'


const SalesReport = ({data, setData}) => {
  const actionColumn = [
    {field : 'action' , headerName: 'Action', width: 250, disableExport: true,renderCell:(params) =>{
      return(
            <div className="viewButton">View</div>
      )
    }}
  ]

  useEffect(()=>{
    for(let i=0;i<data.length;i++){
      data[i].date = data[i].date.split("T1")[0];
    }
    setData(data)
  },[data,setData])

  return (
    <div className='purchaseReport'>
        <h1>Sales Report</h1>
        <div className="reportTable">
          <DataGrid 
            rows={data}
            columns={salesColumn.concat(actionColumn)}
            getRowId={(row)=>row.bill_id}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
    </div>
  )
}

export default SalesReport