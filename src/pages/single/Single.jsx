import './single.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import List from '../../components/table/Table'
import { useLocation } from "react-router-dom"
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'


const Single = () => {
    
    const location = useLocation();
    const {id} = useParams ();
    const path = location.state?.path;
    console.log("Id: "+ id+ " Path: "+path)
    const [data,setdata] = useState({})
    const [chart, setChart] = useState();

    const loadData = useCallback(async () =>{
        if(path ==='Customer'){
            const response = await axios.get(`http://localhost:5000/customer/${id}`);
            setdata(response.data[0])
            const salesresponse = await axios.get(`http://localhost:5000/sales/details/${id}`)
            setChart(salesresponse.data);
        }
        else if(path==='Supplier'){
            const response = await axios.get(`http://localhost:5000/supplier/${id}`);
            setdata(response.data[0])
            const purchaseResponse = await axios.get(`http://localhost:5000/purchase/details/${id}`)
            setChart(purchaseResponse.data);
        }
        else if(path === 'Product'){
            const response = await axios.get(`http://localhost:5000/product/${id}`);
            setdata(response.data[0])
        }
    },[path,setdata,id])

    useEffect(()=>{
        loadData();
    },[loadData])
    console.log(data);
    console.log(chart);

    return ( 
        <div className='single'>
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img 
                                src={(path === "Product")?"https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png":"https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" }
                                alt="" 
                                className="itemImg" 
                            />
                            <div className="details">
                                <h1 className="itemTitle">{data.name}</h1>
                                {(path !== "Product")
                                    &&
                                    <>
                                        <div className="detailItem">
                                            <span className="itemKey">Mobile:</span>
                                            <span className="itemValue">{data.mobile}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Address:</span>
                                            <span className="itemValue">{data.address}</span>
                                        </div>
                                    </>
                                }
                                {(path==="Product")
                                    &&
                                    <>
                                        <div className="detailItem">
                                            <span className="itemKey">Category:</span>
                                            <span className="itemValue">{data.cat_name}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Supplier:</span>
                                            <span className="itemValue">{data.supplierName}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Stock:</span>
                                            <span className="itemValue">{data.stock}</span>
                                        </div>
                                        <div className="detailItem">
                                            <span className="itemKey">Minimum Stock:</span>
                                            <span className="itemValue">{data.minStock}</span>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect = { 2 / 1} title="User Buying (Last 6 Months)" data={chart}/>
                    </div>
                </div>
                <div className="bottom">
                <h1 className="title">Last Transactions</h1>
                    <List />
                </div>
            </div>
        </div>
     );
}
 
export default Single;
