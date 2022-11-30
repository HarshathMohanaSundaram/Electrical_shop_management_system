import './sidebar.scss'
import React from 'react'
import { Dashboard } from '@mui/icons-material'
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import StoreIcon from '@mui/icons-material/Store';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {Link} from "react-router-dom" 
import { DarkModeContext } from '../../context/darkModeContext';
import { useContext, useState, useEffect, useCallback } from 'react';
import { loadStock } from '../../function';

const Sidebar = () => {
    const {dispatch} = useContext(DarkModeContext)

    const [counter, setCounter] = useState([]);


    const getStock = useCallback(()=>{
        loadStock(setCounter)
    },[setCounter])
    
    useEffect (()=>{
        getStock();
    },[getStock])

  return (
    <div className='sidebar'>
        <div className="top">
            <Link to = "/" style={{textDecoration:'none'}}>
                <span className="logo">Sundaram Steel</span>
            </Link>
        </div>
        <hr />
        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <Link to = "/" style={{textDecoration:'none'}}>
                    <li>
                        <Dashboard className='icon'/>
                        <span>
                            Dashboard
                        </span>
                    </li>
                </Link>
                <p className="title">LIST</p>
                <Link to = "/customers" style={{textDecoration:'none'}}>
                    <li>
                        <GroupOutlinedIcon  className='icon'/>
                        <span>
                            Customer
                        </span>
                    </li>
                </Link>
                <Link to="/product" style={{textDecoration:'none'}}>
                    <li>
                        <StoreIcon className='icon'/>
                        <span>
                            Products
                        </span>
                    </li>
                </Link>
                <Link to="/supplier" style={{textDecoration:'none'}}>
                    <li>
                        <InventoryOutlinedIcon className='icon'/>
                        <span>
                            Supplier
                        </span>
                    </li>
                </Link>
                <Link to="/sales" style={{textDecoration:'none'}}>
                    <li>
                        <ReceiptIcon className='icon'/>
                        <span>
                            Sales
                        </span>
                    </li>
                </Link>
                <Link to="/credit" style={{textDecoration:'none'}}>
                <li>
                    <CreditCardIcon className='icon'/>
                    <span>
                        Credit
                    </span>
                </li>
                </Link>
                <p className="title">USEFUL</p>
                <Link to = "/report" style={{textDecoration:'none'}}>
                    <li>
                        <AssessmentRoundedIcon className='icon'/>
                        <span>
                            Stats
                        </span>
                    </li>
                </Link>
                <Link to="/notification" state={{product:counter}} style={{textDecoration:'none'}}>
                    <li>
                        <NotificationsRoundedIcon className='icon'/>
                        <span>
                            Notification
                        </span>
                        {counter.length!==0 && <span className='counter'>{counter.length}</span>}
                    </li>
                </Link>
                <p className="title">SERVICE</p>
                <li>
                    <SettingsRoundedIcon className='icon'/>
                    <span>
                        Settings
                    </span>
                </li>
                <p className="title">USER</p>
                <li>
                    <AccountCircleOutlinedIcon className='icon'/>
                    <span>
                        Profile
                    </span>
                </li>
                <li>
                    <LogoutOutlinedIcon className='icon'/>
                    <span>
                        Logout
                    </span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption" onClick={() => dispatch({type:"LIGHT"})}></div>
            <div className="colorOption" onClick={() => dispatch({type:"DARK"})}></div>
        </div>
    </div>
  )
}

export default Sidebar;