import React,{useState, useEffect}from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import "./supplierProduct.scss"
import { useParams } from 'react-router-dom'
import ProductTable from '../../components/productTable/ProductTable'

const SupplierProduct = ({products, supplier}) => {
  const [product, setProduct] = useState([]);
  const {supplierId} = useParams();
  const [supplierName, setSupplierName] = useState("");
  const [supplierBalance, setSupplierBlance] = useState(0);

  
  useEffect (()=>{
    setProduct(products.filter((pro)=>{
      return pro.supplier_id === parseInt(supplierId);
    }))
  },[supplierId, setProduct,products]);

  useEffect(()=>{
    const supplierDetails = supplier.find((obj) => {
      return obj.supplier_id === parseInt(supplierId)
    });
    setSupplierName(supplierDetails.supplierName)
    setSupplierBlance(supplierDetails.balance)
  },[supplierId,setSupplierName,supplier,setSupplierBlance]);

  console.log(product);
  console.log(supplierName);

  return (
    <div className='supplierPurchase'>
        <Sidebar />
        <div className="supplierPurchaseContainer">
        <Navbar />
        <ProductTable product={product} title={supplierName} id={supplierId} balance={supplierBalance}/>
        </div>
    </div>
  )
}

export default SupplierProduct