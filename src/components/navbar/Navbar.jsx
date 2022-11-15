import './navbar.scss'
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import FullScreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import ListOutlinedIcon from '@mui/icons-material/ListOutlined'
import { DarkModeContext } from '../../context/darkModeContext'
import { useContext, useState, useEffect, useCallback } from 'react'
import { loadStock } from '../../function'
import { Link } from 'react-router-dom'
import React from 'react'


 

const Navbar = () => {
  const {dispatch} = useContext(DarkModeContext)

  const [counter, setCounter] = useState([]);

  const getStock = useCallback(()=>{
    loadStock(setCounter)
  },[setCounter])

  useEffect (()=>{
    getStock();
  },[getStock])


 

  return (
    <div className='navbar'>
      <div className="wrapper">
        <div className="search">
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className='icon'/>
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon className='icon' onClick={() => dispatch({type:"TOGGLE"})}/>
          </div>
          <div className="item">
            <FullScreenExitOutlinedIcon className='icon'/>
          </div>
          <div className="item">
            <Link to="/notification" state={{product:counter}}>
              <NotificationsNoneOutlinedIcon className='icon'/>
              {counter.length!==0 && <div className="counter">{counter.length}</div>}
            </Link>
          </div>
          <div className="item">
            <ListOutlinedIcon className='icon'/>
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar