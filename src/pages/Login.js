import React, { useState } from "react";
import '../styles/form.css'
import { Link ,useNavigate} from "react-router-dom";
import axios from "axios";
import Alert from 'react-bootstrap/Alert';


const Login = () => {
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });

  const [error, seterror] = useState({});
  const [msg, setmsg] = useState('')
  const navigate = useNavigate()

  const checkForm = () => {
    let validate = true;
    const { email, password } = formdata;
    let formerrors = {};

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email)) {
      formerrors.email = "Enter a valid email address";
      validate = false;
    }
    if (!password.trim()) {
      formerrors.password = "Password is required";
      validate = false;
    }
    seterror(formerrors);
    return validate;
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (checkForm()) {
      // alert("Valid form");
      // console.log(formdata);

      axios.post('http://localhost:8000/login/',formdata)
      .then((response)=>{
            console.log('Data sent to server',response.data);
            localStorage.setItem('userdata',JSON.stringify(response.data))
            navigate('/dashboard',{state : {data : response.data}})
      }).catch((err)=>{
        console.log(err,'Not registered , Do registration first');
        setmsg('Not registered , Do registration first')
      })
    
    
    }
  };

  return (
    <form onSubmit={submitForm} className="form">
      <h1>Login</h1>
      <div className="formdata">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={formdata.email}
          placeholder="Enter email"
          name="email"
          onChange={(e) => setformdata({ ...formdata, email: e.target.value })}
        />
        {error.email && <div className="error">{error.email}</div>}
      </div>
      <div className="formdata">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={formdata.password}
          placeholder="Enter password"
          name="password"
          onChange={(e) =>
            setformdata({ ...formdata, password: e.target.value })
          }
        />
        {error.password && <div className="error">{error.password}</div>}
      </div>
      <button type="submit" className="button">Login</button>
      {msg ?  <Alert variant={'danger'}>
          {msg}
          
        </Alert> :  <></>}
     
      <Link to="/signup" className="create-account">Create Account</Link>
    </form>
  );
};

export default Login;
