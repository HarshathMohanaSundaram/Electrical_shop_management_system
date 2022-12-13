import './login.scss'
import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'


const Login = () => {
    const navigate = useNavigate();
    const [data,setData] = useState({
        username:"",
        password:""
      })
      
      const {username,password} = data;
      
      const changeHandler = e => {
        setData({...data,[e.target.name]:[e.target.value]});
      }
      
      const submitHandler = e => {
        e.preventDefault();
        console.log(data);
        console.log(username[0]);
        console.log(password[0])
        if(username[0] === "admin" && password[0] === "Admin@123"){
            localStorage.setItem("user","admin");
            navigate("/");
        }
      }
        return (
          <div className='container'>
            <center>
            <form onSubmit={submitHandler}>
            <input type="text" name="username" value={username} onChange={changeHandler}/><br/>
            <input type="password" name="password" value={password} onChange={changeHandler}/><br/>
            <input type="submit" name="submit"/>
            </form>
            </center>
          </div>
      
        );
}
 
export default Login;