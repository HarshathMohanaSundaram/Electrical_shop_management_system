import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import {Link} from 'react-router-dom'
import loadingGif from '../../loading.gif'
import axios from "axios";
import { toast } from "react-toastify";
import React from 'react'


const Datatable = ({page, row, column, loadData}) => {
  const pathLink = (page==='Customer')?"/customers":(page==='Product')?"/product":"/supplier"
  
  const handleDelete = (id) =>{
    if(page==='Customer'){
      if(window.confirm("Are you sure you want to delete customer?")){
        axios.delete(`http://localhost:5000/remove/customer/${id}`);
        toast.success("Customer Deleted Successfully",{position:toast.POSITION.TOP_CENTER});
        setTimeout(() => loadData(), 500);
      }
    }
    else if(page==='Supplier'){
      if(window.confirm("Are you sure you want to delete supplier?")){
        axios.delete(`http://localhost:5000/remove/supplier/${id}`);
        toast.success("Supplier Deleted Successfully",{position:toast.POSITION.TOP_CENTER});
        setTimeout(() => loadData(), 500);
      }
    }
    else if(page==='Product'){
      if(window.confirm("Are you sure you want to delte product?")){
        axios.delete(`http://localhost:5000/remove/product/${id}`);
        toast.success("Product Deleted Successfully",{position:toast.POSITION.TOP_CENTER});
        setTimeout(()=>loadData(),500);
      }
    }
  }

  const actionColumn = [
    {field : 'action' , headerName: 'Action', width: 250, renderCell:(params) =>{
      return(
        <div className="cellAction">
         <Link to={`${pathLink}/view/${(page==='Customer')?params.row.customer_id:(page==='Supplier')?params.row.supplier_id:params.row.product_id}`} state={{path:page}} style={{textDecoration:'none'}}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete((page==='Customer')?params.row.customer_id:(page==='Supplier')?params.row.supplier_id:params.row.product_id)}>Delete</div>
          {(page==='Supplier') &&<Link to={`${pathLink}/product/${params.row.supplier_id}`} style={{textDecoration:'none'}}><div className="purchaseButton">Purchase</div></Link>}
        </div>
      )
    }}
  ]
  if(row === null)
    return(
      <img src={loadingGif} alt="Wait a Second" />
    )
  return (
    <div className="datatable">
        <DataGrid
        className="datagrid"
        rows={row}
        columns={column.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        getRowId={(row) =>  (page==='Customer')?row.customer_id:(page==='Supplier')?row.supplier_id:row.product_id}
      /> 
    </div>
  )
}

export default Datatable