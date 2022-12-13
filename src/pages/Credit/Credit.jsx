import React, { useCallback, useEffect, useState } from 'react'
import './credit.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { DataGrid } from '@mui/x-data-grid'
import { creditColumns } from '../../datatablesource'
import Popup from 'reactjs-popup';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'

const Credit = () => {
  const navigate = useNavigate();
  const [data,setData] = useState([])
  const [amountGiven, setAmountGiven] = useState(0)
  const [remaining, setRemaining] = useState(0)  
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

  const handleBalance = (e,balance,id)=>{
    setAmountGiven(parseFloat(e.target.value));
    console.log(balance);
    console.log(e.target.value);
    let remain = balance - parseFloat(e.target.value)
    setRemaining(parseFloat(remain).toFixed(2))
  }

  const handleBalanceSubmit =(e,balance,id) =>{
    e.preventDefault();
    if((balance - amountGiven) <=0)
      toast.success("Credit Closed Successfully")
    axios.post("http://localhost:5000/update/creditBalance",{
      id,balance,amountGiven,remaining
    }).then().catch((err)=>{toast.error(err.body.data)})
    navigate("/credit")
  }


  const actionColums = [
    {field : 'action' , headerName: 'Action', width: 500, renderCell:(params) =>{
        return(
            <div className="cellAction">
              { params.row.salesStatus === "Pending" && 
              <Popup  contentStyle={{ width: "40%" , height:"50%", borderRadius:"10px" }}
                  trigger={<button className="viewButton"> Return </button>}
                  modal
                  nested
                >
                  {close => (
                    <div className="modal">
                      <button className="close" onClick={close}>&times;</button>
                      <form  onSubmit={(e)=>{handleBalanceSubmit(e,params.row.balance,params.row.bill_id)}}>
                        <div className="title">Credit Balance</div>
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
              }
              <Link to = {`/creditReturn/${params.row.bill_id}`} state={{name:params.row.customerName}}>
              <div className="purchaseButton">
                    View Return Data
              </div>
              </Link>
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