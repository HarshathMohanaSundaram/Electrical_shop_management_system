import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import React from 'react'

import axios from "axios";



const List = () => {
  const [data,setData] = useState([])

  const loadSales  = useCallback(async()=>{
      const response = await axios.get("http://localhost:5000/last5Sales")
      for(let i=0;i<response.data.length;i++){
        response.data[i].date = response.data[i].date.split("T1")[0];
      }
      setData(response.data);
    },[setData])

  useEffect(()=>{
    loadSales();
  },[loadSales])
  
  return (
    <TableContainer component={Paper} className='table'>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Bill Id</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Balance</TableCell>
            <TableCell className="tableCell">Sales Type</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.bill_id}>
              <TableCell className="tableCell">
                {row.bill_id}
              </TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                    <img src="https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg"  alt="" className="image" />
                    {row.customerName}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.sales_amount}</TableCell>
              <TableCell className="tableCell">{row.balance}</TableCell>
              <TableCell className="tableCell"><span className={`type ${row.sales_type}`}>{row.sales_type}</span></TableCell>
              <TableCell className="tableCell"><span className={`status ${row.salesStatus}`}>{row.salesStatus}</span></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default List