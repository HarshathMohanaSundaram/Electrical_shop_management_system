const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Harshath",
    database:"electric_shop",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(5000, ()=>{
    console.log("Server is running on port 5000")
})

app.get("/customer/get",(req,res) =>{
    const sqlGet = "SELECT * from tbl_customer";
    db.query(sqlGet,(err,result) => {
        res.send(result)
    })
})

app.post("/customer/add", (req,res)=>{
    const {name, mobile, address} = req.body;
    const sqlInsert = "INSERT INTO tbl_customer(customerName, customerMobile, customerAddress) VALUES(?,?,?)";
    db.query(sqlInsert,[name,mobile,address],(error,result)=>{
        if(error)
            console.log(error);
        else
            console.log(result)
    })
})

app.delete("/remove/customer/:id",(req,res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM tbl_customer WHERE customer_id=?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error)
            console.log(error);
    })
})

app.get("/supplier/get",(req,res)=>{
    const sqlGet = "SELECT * FROM tbl_supplier";
    db.query(sqlGet,(err,result)=>{
        res.send(result)
    })
})

app.post("/supplier/add",(req,res)=>{
    const {name, mobile, address} = req.body;
    const balance = 0;
    const sqlInsert = "INSERT INTO tbl_supplier(supplierName, supplierMobile, supplierAddress, balance) VALUES(?,?,?,?)";
    db.query(sqlInsert,[name,mobile,address,balance],(error,result)=>{
        if(error)
            console.log(error);
        else
            console.log(result)
    })
})

app.delete("/remove/supplier/:id",(req,res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM tbl_supplier WHERE supplier_id=?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error)
            console.log(error);
    })
})

app.get("/category/get",(req, res) =>{
    const sqlGet = "SELECT * FROM tbl_category";
    db.query(sqlGet,(err,result)=>{
        res.send(result)
    })
})

app.get("/product/get",(req,res) =>{
    const sqlGet = "SELECT * FROM tbl_product";
    db.query(sqlGet,(err, result)=>{
        res.send(result)
    })
})

app.post("/product/add",(req,res) =>{
    const{productName, price, minStock, categoryId, supplierId} = req.body;
    const stock =0;
    const salesPrice = parseFloat(price)+(parseFloat(price)*(20/100))
    const sqlInsert = "INSERT INTO tbl_product(cat_id, supplier_id, productName, stock, price, salesPrice, minStock) VALUES(?,?,?,?,?,?,?)";
    db.query(sqlInsert,[parseInt(categoryId), parseInt(supplierId), productName, stock, parseFloat(price), salesPrice, parseInt(minStock)],(error,result)=>{
        if(error)
            console.log(error)
        else
            console.log(result)
    })
})

app.delete("/remove/product/:id",(req,res) =>{
    const {id} = req.params;
    const sqlRemove = "DELETE FROM tbl_product WHERE product_id=?";
    db.query(sqlRemove,id,(error,result)=>{
        if(error)
            console.log(error);
    })
})

app.post("/purchase/add",(req,res) =>{
    console.log("Purchase Products");
    const{list, stotal, supplierId, today, balance} = req.body;
    const sqlInsert = "INSERT INTO tbl_supplier_purchase(supplier_id,date,total) VALUES (?,CURDATE(),?)";
    db.query(sqlInsert,[supplierId,stotal],(error,result)=>{
        if(error){
            console.log(error);
        }
        else{
            const purchaseId = result.insertId;
            for(let i=0;i<list.length;i++){
                const sqlPurchase = "INSERT INTO tbl_supplier_purchase_details(purchase_id, product_id, quantity, price, tax, amount) VALUES (?,?,?,?,?,?)";
                db.query(sqlPurchase,[purchaseId,list[i].id,list[i].qty,list[i].price, list[i].tax, list[i].amount],(err, result)=>{
                    if(err)
                        console.log(err)
                })
                const salesPrice = parseFloat(list[i].amount)+(parseFloat(list[i].amount)*(20/100));
                const sqlUpdate = "UPDATE tbl_product SET price = ?, salesPrice = ?, stock = ? WHERE product_id = ?";
                let stock = parseInt(list[i].totalStock)+parseInt(list[i].qty)
                db.query(sqlUpdate,[parseFloat(list[i].amount), parseFloat(salesPrice), parseInt(stock),list[i].id])
            }
            const updateBalance = parseFloat(stotal)+parseFloat(balance)
            const balanceUpdate = "UPDATE  tbl_supplier SET balance = ? WHERE supplier_id = ?";
            db.query(balanceUpdate,[parseFloat(updateBalance),supplierId],(err,result)=>{
                if(err)
                    console.log(err);
            })
        }
    })
})

app.post("/sales/add",(req,res)=>{
    const {customerId, total, balance, formValues, amountGiven} = req.body
    const salesType = (balance>0)?"Credit":"Cash";
    const status = (salesType=="Credit")?"Pending":"Closed";
    const sqlInsert = "INSERT INTO tbl_sales(customer_id, date, sales_amount, amountGiven, sales_type, balance, salesStatus) VALUES (?,CURDATE(),?,?,?,?,?)";
    db.query(sqlInsert,[customerId,total,salesType,amountGiven,balance,status],(err,result)=>{
        if(err)
            console.log(err)
        const bill_id = result.insertId;
        for(let i=0;i<formValues.length;i++){
            const qty = parseInt(formValues[i].qty)
            const sqlSales = "INSERT INTO tbl_sales_product(bill_id,product_id,quantity,price)VALUES(?,?,?,?)";
            db.query(sqlSales,[bill_id,formValues[i].product_id,qty,parseFloat(formValues[i].price)],(err,result)=>{
                if(err)
                    console.log(err);
            })
            const stock = formValues[i].stock - qty;
            const sqlUpdate = "UPDATE tbl_product SET stock = ? WHERE product_id = ?"
            db.query(sqlUpdate,[stock,formValues[i].product_id],(err,result)=>{
                if(err)
                    console.log(err)
            })
        }
        res.send([{invoiceId:bill_id}])
    })
})

app.get("/sales/report/:from/:to",(req,res)=>{
    const{from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = 'SELECT tbl_sales.bill_id, tbl_customer.customerName, tbl_sales.date, tbl_sales.sales_amount, tbl_sales.sales_type, tbl_sales.balance FROM tbl_sales INNER JOIN tbl_customer ON tbl_sales.customer_id = tbl_customer.customer_id WHERE tbl_sales.date BETWEEN ? AND ?';
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
            console.log(err);
        res.send(result)
    })
})

app.get("/purchase/report/:from/:to",(req,res)=>{
    const {from,to} = req.params;
    console.log(from+" "+to);
    const sqlGet = "SELECT electric_shop.tbl_supplier_purchase.purchase_id, electric_shop.tbl_supplier.supplierName,electric_shop.tbl_supplier_purchase.date,electric_shop.tbl_supplier_purchase.total FROM electric_shop.tbl_supplier_purchase INNER JOIN electric_shop.tbl_supplier ON electric_shop.tbl_supplier_purchase.supplier_id = electric_shop.tbl_supplier.supplier_id WHERE electric_shop.tbl_supplier_purchase.date BETWEEN ? AND ?";
    db.query(sqlGet,[from,to],(err,result)=>{
        if(err)
            console.log(err);
        res.send(result)
    })
})

app.get("/notification/count",(req,res)=>{
    const sqlGet = "SELECT tbl_product.productName, tbl_product.stock, tbl_product.minStock,tbl_supplier.supplierName FROM tbl_product INNER JOIN tbl_supplier ON tbl_product.supplier_id = tbl_supplier.supplier_id";
    db.query(sqlGet,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result);
    })
})

app.get("/sales/details",(req, res) =>{
    const sqlGet = "SELECT DATE_FORMAT(date,'%M') AS name,SUM(sales_amount) AS Total FROM tbl_sales WHERE date >= date_sub(now(), interval 6 month) GROUP BY DATE_FORMAT(date,'%M')";
    db.query(sqlGet,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result);
    })
})

app.get("/purchase/details",(req,res) =>{
    const sqlGet = "SELECT DATE_FORMAT(date,'%M') AS name,SUM(total) AS Total FROM tbl_supplier_purchase WHERE date >= date_sub(now(), interval 6 month) GROUP BY DATE_FORMAT(date,'%M')";
    db.query(sqlGet,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result);
    })
})

app.get("/count/:name",(req,res)=>{
    const {name} = req.params;
    const sqlGet = `SELECT COUNT(*) AS count FROM ${name}`
    db.query(sqlGet,name,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result[0]);
    })
})

app.get("/last5Sales",(req,res) =>{
    const sqlGet = "(SELECT tbl_sales.bill_id,tbl_sales.date, tbl_sales.sales_amount, tbl_sales.sales_type, tbl_sales.balance, tbl_sales.salesStatus, tbl_customer.customerName  FROM electric_shop.tbl_sales INNER JOIN electric_shop.tbl_customer ON electric_shop.tbl_sales.customer_id = tbl_customer.customer_id ORDER BY bill_id DESC LIMIT 5) ORDER BY bill_id ASC"
    db.query(sqlGet,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result);
    })
})

app.get("/customer/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT customer_id as id, customerName as name, customerMobile as mobile, customerAddress as address from tbl_customer WHERE customer_id = ?"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    })
})

app.get("/product/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT productName as name, tbl_category.cat_name,tbl_supplier.supplierName, stock,minStock FROM tbl_product INNER JOIN tbl_category ON tbl_product.cat_id = tbl_product.cat_id INNER JOIN tbl_supplier ON tbl_product.supplier_id = tbl_supplier.supplier_id WHERE product_id = ? GROUP BY product_id"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    })
})
app.get("/supplier/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT supplier_id as id,supplierName as name,supplierMobile as mobile, supplierAddress as address from tbl_supplier WHERE supplier_id = ?"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    })
})

app.get("/sales/details/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT DATE_FORMAT(date,'%M') AS name,SUM(sales_amount) AS Total FROM tbl_sales WHERE date >= date_sub(now(), interval 6 month) AND customer_id=? GROUP BY DATE_FORMAT(date,'%M')"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    })
})

app.get("/purchase/details/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT DATE_FORMAT(date,'%M') AS name,SUM(total) AS Total FROM tbl_supplier_purchase WHERE date >= date_sub(now(), interval 6 month) AND supplier_id=? GROUP BY DATE_FORMAT(date,'%M')"
    db.query(sqlGet,id,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    })
})

app.get("/credit/details",(req,res)=>{
    const sqlGet = "SELECT tbl_sales.bill_id,tbl_customer.customerName, tbl_sales.date, tbl_sales.sales_amount, tbl_sales.sales_type, tbl_sales.balance, tbl_sales.salesStatus  FROM electric_shop.tbl_sales INNER JOIN electric_shop.tbl_customer ON electric_shop.tbl_sales.customer_id = tbl_customer.customer_id WHERE sales_type='Credit' AND salesStatus ='Pending'"
    db.query(sqlGet,(err,result)=>{
        if(err)
            console.log(err)
            res.send(result)
    })
})

app.post("/update/supplierBalance",(req,res)=>{
    const {id,balance,amountGiven,remaining} = req.body;
    const sqlPost = "INSERT INTO tbl_supplier_balance (supplier_id, date, beforePay, amountGiven, afterPay) VALUES (?,CURDATE(),?,?,?)";
    db.query(sqlPost,[id,balance,amountGiven,remaining],(err,result)=>{
        if(err)
            console.log(err)
        const sqlUpdate = "UPDATE tbl_supplier SET balance = ? where supplier_id = ?";
        db.query(sqlUpdate,[remaining,id],(err,result)=>{
            if(err)
                console.log(err)
        })
    })
})

app.get("/get/supplierBalance/:id",(req,res)=>{
    const {id} = req.params;
    const sqlGet = "SELECT * FROM tbl_supplier_balance WHERE supplier_id=?";
    db.query(sqlGet,id,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)

    })
})

app.get("/get/salesDetails",(req,res)=>{
    const sqlGet = "SELECT tbl_sales.bill_id, tbl_customer.customerName, tbl_sales.date,tbl_sales.sales_amount,tbl_sales.sales_type,tbl_sales.balance FROM tbl_sales INNER JOIN tbl_customer ON tbl_sales.customer_id = tbl_customer.customer_id"
    db.query(sqlGet,(err,result)=>{
        if(err)
            console.log(err)
        res.send(result)
    })
})
