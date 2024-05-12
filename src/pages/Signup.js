import React,{useState} from 'react'
import { Link ,useNavigate} from 'react-router-dom';
import axios from 'axios'

const Signup = () => {

    const [formdata, setformdata] = useState({
        fullname: "",
        email: "",
        password: "",
      });
    
      const [error, seterror] = useState({});
    
      const checkForm = () => {
        let validate = true;
        const { fullname,email, password } = formdata;
        let formerrors = {};
        
        if (!fullname.trim()) {
            formerrors.fullname = "Full Name is required";
            validate = false;
          }

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

      const navigate = useNavigate()
    
      const submitForm = (e) => {
        e.preventDefault();
    
        if (checkForm()) {
          // alert("Valid form");
          // console.log(formdata);

          axios.post('http://localhost:8000/signup/',formdata)
          .then((response)=>{
                console.log('Data sent to server',response.data);
                navigate('/success',{state : {data : response.data}})
          }).catch((err)=>{
            console.log(err);
          })
        
        }
      };

  return (
    <form onSubmit={submitForm} className="form">
    <h1>Registration</h1>
    <div className="formdata">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          value={formdata.fullname}
          placeholder="Enter Full Name"
          name="name"
          onChange={(e) => setformdata({ ...formdata, fullname: e.target.value })}
        />
        {error.fullname && <div className="error">{error.fullname}</div>}
      </div>
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
    <button type="submit" className="button">Sign Up</button>
    <Link to="/" className="create-account">Already have an account? Login</Link>
  </form>
  )
}

export default Signup
