import './single.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import List from '../../components/table/Table'
import { useLocation } from "react-router-dom"
import React from 'react';
import { useParams } from 'react-router-dom';


const Single = () => {
    
    const location = useLocation();
    const {id} = useParams ();
    const path = location.state?.path;
    console.log("Id: "+ id+ " Path: "+path)

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
                                src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" 
                                alt="" 
                                className="itemImg" 
                            />
                            <div className="details">
                                <h1 className="itemTitle">Mohana Sundaram</h1>
                                <div className="detailItem">
                                    <span className="itemKey">Mobile:</span>
                                    <span className="itemValue">9976661163</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Address:</span>
                                    <span className="itemValue">Modakkurichi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect = { 3 / 1} title="User Buying (Last 6 Months)"/>
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
