import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Login = () => {
    const [credentials, setCredentials] = useState({email:"", password: ""});
    let history = useHistory();
    
    const handleSubmit =async (e)=>{
        e.preventDefault();
        
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
           
            headers: {
              "Content-Type": "application/json"

            },
           
            body: JSON.stringify({email: credentials.email,password: credentials.password})
          });
          const json = await response.json();
          console.log(json)
          if(json.success)
          {
            //redirect
            //Save the auth token and redirect
            // console.log(json)
            localStorage.setItem('token',json.authToken);
            console.log(localStorage.getItem('token'))
            history.push("/");
          }
          else
          {
            alert("Invalid Credentitals");
          }
    }

    const onChange = (e)=>{
        setCredentials({...credentials,[e.target.name]: e.target.value})
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label for="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp"/>
                    
            </div>
            <div className="mb-3">
                <label for="password" className="form-label">Password</label>
                <input type="password" className="form-password" name="password" onChange={onChange} id="password" value={credentials.password}/>
            </div>
           
            <button type="submit" className="btn btn-primary" >Submit</button>
        </form>
    )
}

export default Login