import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './returnProduct.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"


const ReturnProduct = () => {
  const navigate = useNavigate();
   const {state} = useLocation();
   const {sales} = state
   console.log(sales) 
  const {bill_id} = useParams();  
  const[data, setData] = useState([])

  const loadData =useCallback(async()=>{
    const response = await axios.get(`http://localhost:5000/return/details/${bill_id}`)
    for(let i=0;i<response.data.length;i++){
        response.data[i].returnQty = 0;
        response.data[i].returnPrice = 0;
    }
    setData(response.data);
  },[setData,bill_id])

  useEffect(()=>{
    loadData();
  },[loadData])

  let handleQuantity = (i,e) =>{
    if(parseInt(e.target.value)<0){
      return;
    }
    else if(parseInt(e.target.value)>data[i].quantity){
        toast.error("Purchased products is only of qty: "+data[i].quantity);
    }
    else{
        let newFormValues = [...data];
        newFormValues[i][e.target.name] = parseInt(e.target.value);
        newFormValues[i].returnPrice = parseFloat(parseInt(newFormValues[i].returnQty) * parseFloat(newFormValues[i].price)).toFixed(2); 
        setData(newFormValues);
    }
}

function subtotal(items) {
  return items.map(({ returnPrice }) => parseFloat(returnPrice)).reduce((sum, i) => sum + i, 0);
}

  let returnAmount = subtotal(data).toFixed(2);
  let remainBalance = (sales.sales_amount - returnAmount).toFixed(2);
  console.log(data);

  const handleSubmit= (e)=>{
    e.preventDefault();  
    console.log(data);
    remainBalance = remainBalance.toString()==="NaN" ? sales.sales_amount: remainBalance
    returnAmount = returnAmount.toString()==="NaN"?0:returnAmount
    console.log(remainBalance.toString()==="NaN" ? sales.sales_amount: remainBalance);
    console.log("Balance")
    console.log(parseInt(remainBalance.toString()==="NaN" ? sales.sales_amount: remainBalance) - sales.amountGiven);
    if(sales.balance !== 0){
      if((sales.balance - parseInt(returnAmount))<0){
        toast.success("Credit Closed and Amount Need To be Given is: "+Math.abs(sales.balance-parseInt(returnAmount)))
      }
      else if((sales.balance-parseInt(returnAmount)) === 0){
        toast.success("Credit is Closed");
      }
      else{
        toast.success("Credit Balance is: "+(sales.balance - parseInt(returnAmount)))
      }
    }
    else{
      let amountNeedToGiven = Math.abs(parseInt(remainBalance.toString()==="NaN" ? sales.sales_amount: remainBalance) - sales.amountGiven);
      if((amountNeedToGiven)>0){
        toast.success("Amount Need To be Given is"+Math.abs(amountNeedToGiven))
      }
    } 
    axios.post("http://localhost:5000/return/products",{
      bill_id,
      data,
      returnAmount,
      remainBalance,
      sales
    }).then(()=>{
    })
    .catch((err)=>{
      toast.error(err.response.data)
    })
    navigate("/sales")
  }

  return (
    <div className='returnProduct'>
        <Sidebar />
        <div className="returnProductContainer">
            <Navbar />
            <div className="returnTitle">
                Return Product
            </div>
            <div className="salesForm">
              <div className="formInput">
                <label>Customer: </label>
                <input type="text" name="Customer" value={sales.customerName} readOnly/> 
              </div>
              <div className="form">
                <form onSubmit={handleSubmit}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell><h2>Product</h2></TableCell>
                        <TableCell><h2>Qty.</h2></TableCell>
                        <TableCell><h2>Price</h2></TableCell>
                        <TableCell><h2>Amount</h2></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {data.map((element,index) => (
                        <TableRow key={index}>
                          <TableCell><input type="text" name="productName" value={element.productName || ""} readOnly /></TableCell>
                          <TableCell><input type="number" name="returnQty" value={element.returnQty || ""} onChange={e => handleQuantity(index, e)} /></TableCell>
                          <TableCell><input type="text" name="price" value={element.price || ""}  readOnly/></TableCell>
                          <TableCell><input type="text" name="returnPrice" value={element.returnPrice|| ""}  readOnly/></TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={4} />
                        <TableCell colSpan={3}><h2>Return Amount</h2></TableCell>
                        <TableCell>{(returnAmount.toString() === "NaN")?0:returnAmount}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}><h2>Total</h2></TableCell>
                        <TableCell><input type="number" value={sales.sales_amount||""} readOnly/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}><h2>Amount Given</h2></TableCell>
                        <TableCell><input type="number" name="amountGiven" id="given" value={sales.amountGiven||""} readOnly/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}><h2>Balance</h2></TableCell>
                        <TableCell>{remainBalance.toString()=== "NaN" ? sales.sales_amount: remainBalance}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="button-section">
                    <button className="button submit" type="submit">Submit</button>
                </div>
            </form>
        </div>          
    </div>
        </div>
    </div>
  )
}

export default ReturnProduct