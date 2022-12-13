import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';



const userState = {
    name:"",
    mobile:"",
    address:""
}

const productState = {
    productName:"",
    price:"",
    minStock:""
}

const New = ({inputs, title, type, supplier, category}) => {
    const navigator = useNavigate(); 
    //const cat = ["Electrical", "PVC","Wood","Steel","PowerTool"];
    //const supp =["Lakshmi Agency","Orange Agency","Swastik","Vikno Electricals","Marutham Electricals"];
    const[state, setState] = useState((type==="product")?productState:userState)
    const{name,mobile,address} = state;
    const {productName, price, minStock} = state;
    const[categoryId, setCategoryId] = useState(0);
    const[supplierId, setSupplierId] = useState(0);
    const handleSubmit = event=>{
        event.preventDefault();
        if(type === 'customer'){
            axios.post("http://localhost:5000/customer/add",{
                name,
                mobile,
                address
            }).then(()=>{
                setState({name:"",mobile:"",address:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Customer Added Successfully", {position:toast.POSITION.TOP_CENTER});
        }
        else if(type === 'supplier'){
            axios.post("http://localhost:5000/supplier/add",{
                name,
                mobile,
                address
            }).then(()=>{
                setState({name:"",mobile:"",address:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Supplier Added Successfully", {position:toast.POSITION.TOP_CENTER});
        }
        else if(type==='product'){
            axios.post("http://localhost:5000/product/add",{
                categoryId,
                supplierId,
                productName,
                price,
                minStock
            }).then(()=>{
                setState({productName:"",price:"",minStock:""})
            }).catch((err)=>toast.error(err.response.data));
            toast.success("Product Added Successfully", {position:toast.POSITION.TOP_CENTER})
        }
        navigator("/")
    }

    const handleInputChange = (e) =>{
        const {name, value} = e.target;
        setState({...state,[name] :value})
    }

    return (  
        <div className='new'>
            <Sidebar />
            <div className="newContainer">
                <Navbar />
                <div className="top">
                    <h1>Add new {title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        {type!=="product"&&<img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" alt="Customer" />}
                        {type==="product" &&<img src="https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png" alt=""/>}
                    </div>
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            {type==="product" &&<>
                                <div className="formInput">
                                 <label>Category</label>
                                    <select required onChange={(e)=>{setCategoryId(parseInt(e.target.value))}}>
                                    <option value="">--Choose Category --</option>
                                    {category.map((option, index) => (
                                        <option key={index} value={option.cat_id}>
                                            {option.cat_name}
                                        </option>
                                        ))}
                                    </select>
                                    </div>
                                    <div className="formInput">
                                 <label>Supplier</label>
                                    <select required onChange={(e)=>{setSupplierId(parseInt(e.target.value))}}>
                                    <option value="">--Choose a supplier --</option>    
                                    {supplier.map((option, index) => (
                                        <option key={index} value={option.supplier_id}>
                                            {option.supplierName}
                                        </option>
                                        ))}
                                    </select>
                                    </div>
                                </>
                            }  
                            {
                                inputs.map((input) =>(
                                    <div className="formInput" key={input.id}>
                                        <label>{title} {input.label}</label>
                                        <input required type={input.type} name={input.name} value={state[input.name]||''} placeholder={input.placeholder} onChange={handleInputChange}/>
                                    </div>
                                ))
                            }   
                            <button type='submit'>Add new {type}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default New;