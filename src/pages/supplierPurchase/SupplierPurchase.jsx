import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import './supplierPurchase.scss'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { toast } from 'react-toastify'
import axios from 'axios'

const SupplierPurchase = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const balance = location.state?.balance;
  console.log(balance+": "+typeof balance);

  const {supplierId} = useParams();
  const [list, setList] = useState([]);


  console.log("Supplier Id: "+supplierId);
  console.log("Products: "+product);
  for(let i=0;i<product.length;i++){
    console.log(product[i]);
  }

  let handleChange = (e,i) => {
    console.log(i);
    let newFormValues = [...list];
    newFormValues[i][e.target.name] =parseInt(e.target.value);
    newFormValues[i].amount = parseFloat(newFormValues[i].price+(parseFloat(newFormValues[i].tax/100)*newFormValues[i].price)).toFixed(2)
    newFormValues[i].total_amount =parseFloat(newFormValues[i].qty * newFormValues[i].amount).toFixed(2)
    setList(newFormValues);
  }

  function subtotal(items) {
    let sum = 0;
    for(let i =0 ;i<list.length;i++){
      sum+=parseFloat(list[i].total_amount)
    }
    return sum;
  }

  useEffect(()=>{
    let newItems = []
    for(let i=0;i<product.length;i++){
      newItems.push({id:product[i].product_id, name: product[i].productName, qty:0, price:0, tax:0, amount: 0, total_amount:0,totalStock:product[i].stock})
    }
    setList(newItems)
  },[setList, product])

  console.log("List: "+list);
  const stotal = parseFloat(subtotal(list)).toFixed(2)

  const handleSubmit = e =>{
    e.preventDefault();
    if(stotal === 0){
      toast.error("Please fill quantity and prices")
    }
    else{
      let f=0;
      for(let i=0;i<list.length;i++){
          if(list[i].qty === 0 || list[i].price === 0)
          {
            toast.error (`Please fill quantity and price for ${list[i].name}`)
            f=1;
          }
      }
      if(f===0)
      {
        const date = new Date();
        const today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        console.log('====================================');
        console.log("Submit");
        console.log(list);
        console.log(today);
        console.log("Supplier Id: "+supplierId);
        console.log("Sub total: "+stotal);
        for(let i=0;i<list.length;i++){
          console.log("Stock", list[i].totalStock)
        }
        console.log('====================================');
        axios.post("http://localhost:5000/purchase/add",{
          list,
          stotal,
          supplierId,
          today,
          balance
        }).then(()=>{})
        .catch((err)=>{
          toast.error(err.response.data);
        })
        toast.success("Product Purchased sucessfully", {position:toast.POSITION.TOP_CENTER})
        navigator("/supplier")
      }
    }
  }

  for(let i=0;i<list.length;i++){
    console.log(list[i]);
  }

  return (
    <div className="supplierPurchase">
        <Sidebar />
        <div className="supplierPurchaseContainer">
            <Navbar />
            <div className="top">
              <h1>Purchased Product</h1>
            </div>
            <div className="bottom">
              <form onSubmit={handleSubmit}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell><h2>Product</h2></TableCell>
                        <TableCell><h2>Qty.</h2></TableCell>
                        <TableCell><h2>Price</h2></TableCell>
                        <TableCell><h2>Tax</h2></TableCell>
                        <TableCell><h2>Amount</h2></TableCell>
                        <TableCell><h2>Total_Amount</h2></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {list.map((pro,index) => (
                        <TableRow key={pro.id}>
                          <TableCell><input type="text" name="name" id="name" value={pro.name} readOnly/></TableCell>
                          <TableCell><input required type="number" name="qty" id="qty" value={pro.qty.toString()} onChange={(e)=>{handleChange(e,index)}}/></TableCell>
                          <TableCell><input required type="number" name="price" id="price" value={pro.price.toString()} onChange={(e)=>{handleChange(e,index)}}/></TableCell>
                          <TableCell><input required type="number" name="tax" id="tax" value = {pro.tax.toString()}  onChange={(e)=>{handleChange(e,index)}}/></TableCell>
                          <TableCell><input required type="number" name="amount" id="amount" value={pro.amount.toString()}/></TableCell>
                          <TableCell><input required type="number" name="total_amount" id="total_amount" value={pro.total_amount.toString()}/></TableCell>

                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell />
                        <TableCell/>
                        <TableCell />
                        <TableCell colSpan={2}><h2>Total</h2></TableCell>
                        <TableCell>{stotal}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <button type='submit' className='btn'>Submit</button>
              </form>
            </div>
        </div>
    </div>
  )
}

export default SupplierPurchase

