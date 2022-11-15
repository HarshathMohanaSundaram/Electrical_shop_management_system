import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import './salesForm.scss'

const SalesForm = ({
    setName,
    product,
    customer,
    handleCategory,
    handleChange,
    handleQuantity,
    handleSubmit,
    handleBalance,
    removeFormFields,
    category,
    formValues,
    amountGiven,
    total,
    balance,
}) => {
  return (
    <div className="salesForm">
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="formContainer">
                    <div className="formInput">
                        <label>Customer: </label>
                        <select onChange={event => {setName([{CustomerName:event.target.value.split(",")[0],CustomerId:parseInt(event.target.value.split(",")[1])}])}} required>
                            <option value="">--Choose Customer--</option>
                            {customer.map((option, index) => (
                                <option key={index} value={[option.customerName,option.customer_id]}>
                                    {option.customerName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="formInput">
                        <label>Category: </label>
                        <select onChange={handleCategory} required>
                            <option value="">--Choose Category--</option>
                            {category.map((option, index) => (
                                <option key={index} value={option.cat_id}>
                                    {option.cat_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="formInput">
                        <label>Product: </label>
                        <select onChange={handleChange} required>
                            <option value="">--Choose Product--</option>
                            {product.map((option, index) => (
                                <option key={index} value={[option.productName,option.salesPrice,option.stock,option.product_id]}>
                                    {option.productName}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                    <TableHead>
                      <TableRow>
                        <TableCell><h2>Product</h2></TableCell>
                        <TableCell><h2>Qty.</h2></TableCell>
                        <TableCell><h2>Price</h2></TableCell>
                        <TableCell><h2>Amount</h2></TableCell>
                        <TableCell><h2>Action</h2></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {formValues.map((element,index) => (
                        <TableRow key={index}>
                          <TableCell><input type="text" name="product" value={element.product || ""} readOnly /></TableCell>
                          <TableCell><input type="number" name="qty" value={element.qty.toString() || ""} onChange={e => handleQuantity(index, e)} /></TableCell>
                          <TableCell><input type="text" name="price" value={element.price.toString() || ""}  readOnly/></TableCell>
                          <TableCell><input type="text" name="price" value={element.totalPrice.toString() || ""}  readOnly/></TableCell>
                          <TableCell onClick={()=>removeFormFields(index)}><DeleteIcon className="icon" /></TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={3}><h2>Total</h2></TableCell>
                        <TableCell>{total.toString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}><h2>Amount Given</h2></TableCell>
                        <TableCell><input required type="number" name="given" id="given" value={amountGiven.toString()||""} onChange={handleBalance}/></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell colSpan={3}><h2>Balance</h2></TableCell>
                        <TableCell>{balance}</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
                <div className="button-section">
                    <button className="button submit" type="submit">Submit</button>
                </div>
            </form>
        </div>          
    </div>
  )
}

export default SalesForm