import "./table.scss"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react'



const List = ({data}) => {
  
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