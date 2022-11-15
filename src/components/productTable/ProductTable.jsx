import "./productTable.scss"
import { DataGrid } from '@mui/x-data-grid';
import { useState } from "react";
import { Link } from "react-router-dom";
import React from 'react'


const ProductTable = ({product, id, title, balance}) => {

    const productColumns=[
        { field: 'product_id', headerName: 'ID', width: 70 },
        { field: 'productName', headerName:'NAME', width:130},
    ]  
    const [selectProduct, setSelectProduct] = useState([])
    console.log(selectProduct);
    console.log("Supplier Id: ",+id);
  return (
    <div className="producttable">
      <div className="producttableTitle">
       {title} Products
      </div>
        <DataGrid
        className="datagrid"
        rows={product}
        columns={productColumns}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row)=>row.product_id}
        onSelectionModelChange={(ids)=>{
            let selectedRow = [];
            const product_id = new Set(ids)
            for(let i=0;i<product.length;i++){
                if(product_id.has(product[i].product_id)){
                  selectedRow.push(product[i]);
                }
            }
            setSelectProduct(selectedRow)
          }}
      /> 
      {selectProduct.length!==0&&<Link to={`/supplier/purchase/${id}`} state={{product:selectProduct, balance:balance}} style={{textDecoration:'none'}}><div className="nextButton">Next</div></Link>}
    </div>
  )
}

export default ProductTable