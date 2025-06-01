import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AuthUser() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await axios.post('/buyer/login', {
          username: username,
          password: password
      })
      .then(function(response){
          console.log(response.data.status);
          let status = response.data.status;
          let token = response.data.token;
          if (status == "success"){
            localStorage.setItem("token", token);
            navigate("/");
          }
      })
    } catch (error) {
        if (error.code === 'ECONNABORTED') {
            console.log('error wak');
            
        } else {
            console.log('ada error tapi bukan error yang itu', error.message);
            
        }
    }

    // axios.post('/buyer/login', {
    //     username: username,
    //     password: password
    // })
    // .then(function(response){
    //     console.log(response.status);

    // })
  };

  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Username</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter Username"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            value={username}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            value={password}
          />
        </div>
        <div className="form-group form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSave}>
          Submit
        </button>
      </form>
    </>
  );
}
