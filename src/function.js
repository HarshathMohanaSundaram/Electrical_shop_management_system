import axios from "axios";

export const loadStock = async (setCounter) =>{
    const response = await axios.get("http://localhost:5000/notification/count");
    console.log(response.data);
    let product = [];
    for(let i=0;i<response.data.length;i++){
      if(response.data[i].stock <= response.data[i].minStock){
        product.push(response.data[i]);
      }
    }
    setCounter(product);
  }