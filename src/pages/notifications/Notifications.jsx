import React from 'react'
import './notifications.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom'


const Notifications = () => {
  const location = useLocation();
  const product = location.state?.product;

  console.log(product)
  return (
    <div className='notifications'>
        <Sidebar />
        <div className="notificationsContainer">
            <Navbar />
            <div className="top">
              <h1>Products Which are in minimum stock</h1>
            </div>

            {product.length!==0&&<div className="bottom">
              {product.map((pro)=>{
                return(
                  <div className='card' key={pro.product_id}>
                    <p><span>Product Name:</span> {pro.productName}</p>
                    <p><span>Supplier: </span>{pro.supplierName}</p>
                    <p><span>Stock Available:</span> {pro.stock}</p>
                  </div>
                )
              })}
            </div>}
        </div>
    </div>
  )
}

export default Notifications