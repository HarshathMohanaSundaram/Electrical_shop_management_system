import React from "react";
import { useState } from "react"
import Sidebar from "../../components/sidebar/Sidebar"
import "./sales.scss"
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import SalesForm from "../../components/salesForm/SalesForm";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import SalesTable from "../../components/salesTable/SalesTable";



const Sales = ({customer, categories, products}) => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState([])
    const [customerName, setName] = useState([])
    const [product, setProduct] = useState([])
    const [tab, setTab] = useState(0);
    const [amountGiven , setAmount] = useState(0)
    const [balance, setBalance] = useState(0)
    let handleChange = (e) => {
        if(e.target.value==="")
            return
        if(e.target.value.split(",")[0]<1){
            toast.error("Product is out of stock");
        }
        else{
            let newFormValues = [...formValues];
            if(newFormValues.length!==0){
                for(let i=0;i<newFormValues.length;i++){
                    if(newFormValues[i].product.includes(e.target.value.split(",")[0])){
                        newFormValues[i].qty = parseInt(newFormValues[i].qty)+1
                        newFormValues[i].totalPrice =parseFloat( parseInt(newFormValues[i].qty)*parseFloat(newFormValues[i].price)).toFixed(2)
                        setFormValues(newFormValues)
                        return;
                    }
                }
            }
            const tp = 1*parseFloat(e.target.value.split(",")[1])
            setFormValues([...formValues, { product: e.target.value.split(",")[0], product_id:parseInt(e.target.value.split(",")[3]), qty: 1,price:parseFloat(e.target.value.split(",")[1]),totalPrice:parseFloat(tp), stock:parseInt(e.target.value.split(",")[2])}])
        }
    }

    let handleBalance = (e) =>{
        if(e.target.value === "")
            setAmount(0)
        let amount = parseFloat(e.target.value)
        let balance = parseInt(total - amount)
        if(balance < 0){
            balance = 0
        }
        setAmount(amount)
        setBalance(balance)
    }

    let handleCategory = (e) =>{
        setProduct(products.filter((pro) => {
            return pro.cat_id === parseInt(e.target.value)
        }))
    }

    let handleQuantity = (i,e) =>{
        if(parseInt(e.target.value)>=formValues[i].stock){
            toast.error("Out of stock product only "+formValues[i].stock+" is in stock");
        }
        else{
            let newFormValues = [...formValues];
            if(e.target.value === '0'){
                newFormValues.splice(i, 1);
                setFormValues(newFormValues)
                return;
            }
            newFormValues[i][e.target.name] = parseInt(e.target.value);
            newFormValues[i].totalPrice = parseFloat(parseInt(newFormValues[i].qty) * parseFloat(newFormValues[i].price)).toFixed(2); 
            setFormValues(newFormValues);
        }
    }
    
    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
    }
    
    let handleSubmit = (event) => {
        event.preventDefault();
        const date = new Date();
        const today = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        if(customerName === ""){
            toast.error("Please Select Customer to Bill",{position: toast.POSITION.TOP_CENTER})
        }
        if(formValues.length ===0){
            toast.error("Please Select Product to Bill",{position: toast.POSITION.TOP_CENTER})
        }
        else{
            const customerId = customerName[0].CustomerId;
            console.log("Customer Id: "+customerId);
            console.log("Date: "+today);
            console.log("SalesAmount: "+total);
            console.log("Sales Type: ");
            (balance>0)?console.log("Credit"):console.log("Cash")
            console.log("Balance: "+balance);
            console.log("Products:");
            console.log(formValues);
            axios.post("http://localhost:5000/sales/add",{
                customerId,
                total,
                balance,
                formValues,
                amountGiven
            }).then((results)=>{
                navigate('/sales/invoice',{state: {Customer:{customerName}, product:{formValues}, total:{total}, date:{today}, invoice:results.data[0].invoiceId}})
            })
            .catch((err)=>{
                toast.error(err.response.data);
            })
        }
    }

    const handleTab = (event, newValue) =>{
        setTab(newValue)
    }
    function subtotal(items) {
        return items.map(({ totalPrice }) => parseFloat(totalPrice)).reduce((sum, i) => sum + i, 0);
      }
    
    const total = subtotal(formValues).toFixed(2)

  return (
    <div className='sales'>
        <Sidebar />
        <div className="salesContainer">
            <Navbar />
            <Tabs 
              value={tab} 
              onChange={handleTab} 
              className="tabs"
              textColor="secondary"
              indicatorColor="secondary"
            >
                <Tab label="Sales" />
                <Tab label="Return" />
            </Tabs>
            {
                tab === 0 && 
                <SalesForm 
                    setName = {setName} 
                    product={product} 
                    customer={customer} 
                    category={categories} 
                    handleChange={handleChange}
                    handleCategory = {handleCategory}
                    handleQuantity = {handleQuantity}
                    handleSubmit = {handleSubmit}
                    handleBalance = {handleBalance}
                    removeFormFields = {removeFormFields} 
                    formValues = {formValues}
                    total = {total}
                    amountGiven = {amountGiven}
                    setAmount = {setAmount}
                    balance = {balance}
                    setBalance = {setBalance}
                />   
            }
            {
                tab === 1 && 
                <SalesTable />
            }
        </div>
    </div>
  )
}
export default Sales