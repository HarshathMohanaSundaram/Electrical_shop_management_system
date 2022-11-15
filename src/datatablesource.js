import React from 'react'

export const customerColumns = [
    { field: 'customer_id', headerName: 'ID', width: 70 },
    {  field: 'customerName', 
        headerName: 'Customer',
        width: 230, 
        renderCell:(params)=>{
            return(
                <div className='cellWithImg'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" alt="" className='cellImg' />
                    <span>{params.row.customerName}</span>
                </div>
            )
        } 
    },
    { 
        field : 'customerMobile',
        headerName:'Contact No',
        width: 130,
    },
    {
        field: 'customerAddress',
        headerName: 'City',
        width:180
    }
]



export const productColumns=[
    { field: 'product_id', headerName: 'ID', width: 70 },
    { 
        field: 'productName', 
        headerName:'NAME', 
        width:230,
        renderCell:(params)=>{
            return(
                <div className='cellWithImg'>
                    <img src="https://cdn0.iconfinder.com/data/icons/cosmo-layout/40/box-512.png" alt="" className='cellImg' />
                    <span>{params.row.productName}</span>
                </div>
            )
        } 
    },
    { field: 'stock', headerName:'QUANTITY', width:100},
    { field: 'salesPrice', headerName:'PRICE', width:100}
]


export const supplierColumns=[
    { field: 'supplier_id', headerName: 'ID', width: 70 },
    {  field: 'supplierName', 
        headerName: 'Supplier',
        width: 230, 
        renderCell:(params)=>{
            return(
                <div className='cellWithImg'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" alt="" className='cellImg' />
                    <span>{params.row.supplierName}</span>
                </div>
            )
        } 
    },
    { 
        field : 'supplierMobile',
        headerName:'Contact No',
        width: 130,
    },
    {
        field: 'supplierAddress',
        headerName: 'City',
        width:180
    },
    {
        field: 'balance',
        headerName: 'Balance',
        width:180,
        type:Number
    }
]


export const salesColumn = [
    {
        field: 'bill_id', 
        headerName: 'Invoice No', 
        width: 100,
    },
    {  field: 'customerName', 
        headerName: 'Customer',
        width: 230, 
        renderCell:(params)=>{
            return(
                <div className='cellWithImg'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" alt="" className='cellImg' />
                    <span>{params.row.customerName}</span>
                </div>
            )
        } 
    },
    {
        field: 'date',
        headerName: 'Date',
        width:150,
    },
    {
        field:'sales_amount',
        headerName:'Bill Amount',
        width:150,
        type:Number
    },
    {
        field:'sales_type',
        headerName:'Status',
        width:150,
    },
    {
        field: 'balance',
        headerName:'Balance',
        width:150,
        type:Number
    }
]

export const purchaseColumns=[
    { field: 'purchase_id', headerName: 'ID', width: 70},
    {  field: 'supplierName', 
        headerName: 'Supplier',
        width: 230, 
        renderCell:(params)=>{
            return(
                <div className='cellWithImg'>
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg" alt="" className='cellImg' />
                    <span>{params.row.supplierName}</span>
                </div>
            )
        } 
    },
    { 
        field : 'date',
        headerName:'Date',
        width: 130,
    },
    {
        field: 'total',
        headerName: 'Amount',
        width:180,
        type:Number
    },
]