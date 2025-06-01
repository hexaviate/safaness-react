import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layout/Navbar";
import Navigation from "../../layout/Navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      await axios
        .post("/buyer/login", {
          username: username,
          password: password,
        })
        .then(function (response) {
          console.log(response.data.status);
          let status = response.data.status;
          let token = response.data.token;
          if (status == "success") {
            localStorage.setItem("token", token);
            navigate("/");
          }
        });
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        console.log("error wak");
      } else {
        console.log("ada error tapi bukan error yang itu", error.message);
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
        <header id="header" className="header position-relative">
          <Navbar />
          <Navigation />
        </header>
    
      {/* <!-- Page Title --> */}
      <div className="page-title light-background position-relative">
        <div className="container">
          <nav className="breadcrumbs">
            <ol>
              <li>
                <a href="index.html">Home</a>
              </li>
              <li className="current">Login</li>
            </ol>
          </nav>
          <h1>Login</h1>
        </div>
      </div>
      {/* <!-- End Page Title --> */}

      {/* <!-- Login Section --> */}
      <section id="login" className="login section">
        <div className="container">
          <div className="row justify-content-center">
            <div
              className="col-lg-5 col-md-8"
            >
              <div className="login-form-wrapper">
                <div className="login-header text-center">
                  <h2>Login</h2>
                  <p>Welcome back! Please enter your details</p>
                </div>

                <form>
                  <div className="mb-4">
                    <label htmlFor="email" className="form-label">
                      username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      required=""
                      autoComplete="email"
                      onChange={(event) => {
                        setUsername(event.target.value);
                      }}
                      value={username}
                    />
                  </div>

                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <a href="#" className="forgot-link">
                        Forgot password?
                      </a>
                    </div>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      required=""
                      autoComplete="current-password"
                      onChange={(event) => {
                        setPassword(event.target.value);
                      }}
                      value={password}
                    />
                  </div>

                  <div className="d-grid gap-2 mb-4">
                    <button type="button" className="btn btn-primary"  onClick={handleSave}>
                      Sign in
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Login Section --> */}
    </>
  );
}
