import { DataGrid, GridToolbar} from '@mui/x-data-grid'
import React from 'react'
import { useEffect } from 'react'
import { purchaseColumns } from '../../datatablesource'
import './purchaseReport.scss'


const PurchaseReport = ({data, setData}) => {

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
        <h1>Purchase Report</h1>
        <div className="reportTable">
          <DataGrid 
            rows={data}
            columns={purchaseColumns.concat(actionColumn)}
            getRowId={(row)=>row.purchase_id}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
    </div>
  )
}

export default PurchaseReport