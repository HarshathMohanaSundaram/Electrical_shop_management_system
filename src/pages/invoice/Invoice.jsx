import React,{useRef} from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import './invoice.scss'
import ReactToPrint from "react-to-print";

const Invoice = () => {
  const {state} = useLocation()
  const{Customer, product, total, date, invoice} = state;
  const phone = '9785457865'
  console.log(Customer);
  console.log(product);
  console.log(total);
  console.log(date);
  console.log('====================================');
  console.log(invoice);
  console.log('====================================');
  const componentRef = useRef()
  return (
    <div className='invoice'>
        <Sidebar />
        <div className='invoiceContainer'>
            <Navbar />
            <main className='m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl bg-white rounded shadow'>
            <>
              <ReactToPrint trigger={()=><button onClick={()=>{alert("Invoice")}} className="bg-blue-500 ml-5 text-white font-bold
                   py-2 px-8 rounded shadow border-2
                   border-blue-500 hover:bg-transparent
                   hover:text-blue-500 transistion-all duration-300">Print/Download</button>}
                    content={()=>componentRef.current} 
              />
              <>
                <div ref={componentRef} className="p-5">
                  <header className="flex flex-col items-center justify-center mb-5 xl:flex-row xl:justify-between">
                    <div>
                      <h1 className="font-bold uppercase
                          tracking-wide text-4xl mb-3">Invoice</h1>
                    </div>
                  </header>
                  <div className="flex justify-between">
                    <section className="flex flex-col items-start justify-start">
                      <h2 className="font-bold text-xl uppercase md:text-4xl mb-1">Sundaram Steel</h2>
                      <p>Modakkurichi</p>
                      <p>+91 9976661163</p>
                      <p className='p-1 bg-gray-100'><span className="font-bold">GST:</span>33BBPM16000A8Z</p>
                    </section>
                    <section className="mt-10 flex flex-col items-end justify-end">
                      <h2 className="text-2xl uppercase font-bold mb-1">{Customer.customerName[0].CustomerName}</h2>
                      {Customer.customerName[0].CustomerId !=='000'&&<p>+91 {phone}</p>}
                    </section>
                  </div>
                  <article className="mt-10 mb-14 flex items-end justify-end">
                    <ul>
                      <li className='p-1'><span className="font-bold">Invoice number:</span>{invoice}</li>
                      <li className='p-1 bg-gray-100'><span className="font-bold">Invoice date:</span>{date.today}</li>
                    </ul>
                  </article>
                  <center><p className='font-bold m-2'>Composition Scheme Dealer</p></center>
                  <table width="100%" className="mb-10">
                    <thead>
                      <tr className='bg-gray-100 p-1'>
                      <td className='font-bold'>#</td>
                        <td className='font-bold'>Product</td>
                        <td className='font-bold'>Quantity</td>
                        <td className='font-bold'>Price</td>
                        <td className='font-bold'>Amount</td>
                      </tr>
                    </thead>
                    <tbody>
                      {product.formValues.map((row,index) =>{
                      return(
                        <tr key={index}>
                          <td>{index+1}</td>
                          <td>{row.product}</td>
                          <td>{row.qty}</td>
                          <td>{row.price}</td>
                          <td>{row.totalPrice}</td>
                      </tr>
                      );
                    })}
                    </tbody>
                  </table>
                  <div>
                    <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">₹{total.total.toString()}</h2>
                  </div>
                  <footer className='footer border-t-2 border-gray-300 pt-5'>
                    <div className="flex justify-between">
                      <ul>
                        <li><span className="font-bold">Bank:</span>Canara Bank Modakkurichi</li>
                        <li><span className="font-bold">Account holder:</span> Sundaram Steel</li>
                        <li><span className="font-bold">Account number:</span> 145789542000652</li>
                        <li><span className="font-bold">IFSC code:</span>CBNA0001457</li>
                      </ul>
                      <div>
                          <p>For <span className='font-bold'>Sundaram Steel</span></p>
                          <p className='mt-10'>properterior</p>
                      </div>
                    </div>
                  </footer>
                </div>
              </>
            </>
            </main>
        </div>
    </div>
  )
}

export default Invoice