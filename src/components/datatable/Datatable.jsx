import "./datatable.scss"
import { DataGrid } from '@mui/x-data-grid';
import {Link, useNavigate} from 'react-router-dom'
import loadingGif from '../../loading.gif'
import axios from "axios";
import { toast } from "react-toastify";
import React, { useEffect, useState } from 'react'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';


const Datatable = ({page, row, column, loadData}) => {
  const navigate = useNavigate();

  useEffect(()=>{
    loadData();
  },[loadData])

  const pathLink = (page==='Customer')?"/customers":(page==='Product')?"/product":"/supplier"
  const [amountGiven, setAmountGiven] = useState(0)
  const [remaining, setRemaining] = useState(0)  
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

  const handleBalance = (e,balance,id)=>{
    setAmountGiven(parseFloat(e.target.value));
    console.log(balance);
    console.log(e.target.value);
    let remain = balance - parseFloat(e.target.value)
    setRemaining(parseFloat(remain).toFixed(2))
  }

  const handleBalanceSubmit =(e,balance,id) =>{
    e.preventDefault();
    axios.post("http://localhost:5000/update/supplierBalance",{
      id,balance,amountGiven,remaining
    }).then().catch((err)=>{toast.error(err.body.data)})
    navigate('/')
  }

  const actionColumn = [
    {field : 'action' , headerName: 'Action', width: 500, renderCell:(params) =>{
      return(
        <div className="cellAction">
         <Link to={`${pathLink}/view/${(page==='Customer')?params.row.customer_id:(page==='Supplier')?params.row.supplier_id:params.row.product_id}`} state={{path:page}} style={{textDecoration:'none'}}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete((page==='Customer')?params.row.customer_id:(page==='Supplier')?params.row.supplier_id:params.row.product_id)}>Delete</div>
          {
            (page==='Supplier') 
              &&
              <>
                <Link to={`${pathLink}/product/${params.row.supplier_id}`} style={{textDecoration:'none'}}>
                    <div className="purchaseButton">
                      Purchase
                    </div>
                </Link>
                <Popup  contentStyle={{ width: "40%" , height:"50%", borderRadius:"10px" }}
                  trigger={<button className="viewButton"> Return </button>}
                  modal
                  nested
                >
                  {close => (
                    <div className="modal">
                      <button className="close" onClick={close}>&times;</button>
                      <form  onSubmit={(e)=>{handleBalanceSubmit(e,params.row.balance,params.row.supplier_id)}}>
                        <div className="title">Supplier Balance</div>
                        <div className="form-input">
                          <label>Balance</label>
                          <input type="number" name="balance" id="balance" value={params.row.balance} readOnly/>
                        </div>
                        <div className="form-input">
                          <label>Amount Given</label>
                          <input type="number" name="amountGiven" id="amountGiven" value={amountGiven} onChange={(e)=>handleBalance(e,params.row.balance)} required/>
                        </div>
                        <div className="form-input">
                            <label>Remaining</label>
                            <input type="number" name="remaining" id="remaining" value={remaining||0} readOnly/>
                        </div>
                        <button type="submit" className="successButton">Update</button>
                      </form>
                    </div>
                  )}
                </Popup>
                <Link to = {`${pathLink}/returnData/${params.row.supplier_id}`}>
                  <div className="purchaseButton">
                    View Return Data
                  </div>
                </Link>
              </>
          }
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