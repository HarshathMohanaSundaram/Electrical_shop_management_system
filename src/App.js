import Home from "./pages/home/Home";
import {  BrowserRouter,  Routes,  Route} from "react-router-dom";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import Single from "./pages/single/Single";
import { productInputs, userInputs } from "./formSource";
import './style/dark.scss'
import { useContext, useEffect, useState,useCallback } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import Sales from "./pages/sales/Sales";
import Invoice from "./pages/invoice/Invoice";
import SupplierProduct from "./pages/suppliierProducts/SupplierProduct";
import SupplierPurchase from "./pages/supplierPurchase/SupplierPurchase";
import Notifications from "./pages/notifications/Notifications";
import { ToastContainer } from "react-toastify";
import { customerColumns, productColumns, supplierColumns } from "./datatablesource";
import axios from "axios";
import Report from "./pages/report/Report";
import React from 'react'



function App() {

  const {darkMode} = useContext(DarkModeContext)
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [suppliers, setSuppliers] = useState([])
  const [categories, setCategories] = useState([])

  const loadCustomer = useCallback(async () =>{
    const response = await axios.get("http://localhost:5000/customer/get");
    setCustomers(response.data);
  },[setCustomers])

  const loadSupplier = useCallback(async () =>{
    const response = await axios.get("http://localhost:5000/supplier/get");
    setSuppliers(response.data);
  },[setSuppliers])


  const loadCategory = useCallback(async () =>{
    const response = await axios.get("http://localhost:5000/category/get");
    setCategories(response.data)
  },[setCategories])

  const loadProduct = useCallback(async () =>{
    const response = await axios.get("http://localhost:5000/product/get");
    setProducts(response.data)
  },[setProducts])

  useEffect(()=>{
    loadCustomer();
  },[loadCustomer])

  useEffect(()=>{
    loadProduct();
  },[loadProduct])

  useEffect(()=>{
    loadSupplier();
  },[loadSupplier])

  useEffect(()=>{
    loadCategory();
  },[loadCategory])

  return (
    <div className={darkMode?"app dark":"app"}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home/>} />
            <Route path="login" element={<Login/>}/>
            <Route path="customers">
              <Route index element={<List page={"Customer"} row={customers} column={customerColumns} loadData={loadCustomer}/>} />
              <Route path="view/:id" element={<Single/>}/>
              <Route path="new" element={<New inputs={userInputs} type = "customer" title="Customer"/>}/>
            </Route>
            <Route path='sales'>
              <Route index element = {<Sales customer={customers} categories={categories} products={products} />} />
              <Route path="invoice" element={<Invoice/>}/>
            </Route> 
            <Route path="product">
              <Route index element={<List page={"Product"} row={products} column={productColumns}/>} />
              <Route path='view/:id' element={<Single/>}/>
              <Route path="new" element={<New inputs={productInputs} type="product" title="Product" category={categories} supplier={suppliers}/>}/>
            </Route>
            <Route path="supplier">
              <Route index element={<List page={"Supplier"} row={suppliers} column={supplierColumns} loadData={loadSupplier}/>} />
              <Route path='view/:id' element={<Single/>}/>
              <Route path='product/:supplierId' element={<SupplierProduct products = {products} supplier={suppliers} loadData={loadProduct}/>}/>
              <Route path='purchase/:supplierId' element = {<SupplierPurchase />} />
              <Route path="new" element={<New inputs={userInputs} type="supplier" title="Supplier"/>}/>
            </Route>
            <Route path = "report" element={<Report />} />
            <Route path = "notification" element={<Notifications />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
