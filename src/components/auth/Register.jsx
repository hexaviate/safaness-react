import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../layout/Navbar";
import Navigation from "../../layout/Navigation";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zip_code, setZipcode] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSave = async () => {
    try {
      console.log({ username, password, phone, address, zip_code, email });
      await axios
        .post("/buyer/register", {
          username: username,
          password: password,
          phone: phone,
          address: address,
          zip_code: zip_code,
          email: email,
        })
        .then(function (response) {
          console.log(response.data);
          let status = response.data.status;
          let token = response.data.token;

          if (status == "success") {
            localStorage.setItem("token", token);
            navigate("/");
            window.location.reload();
          }
          console.log(status);
        });
    } catch (error) {
      if (error.code === "ECONNABORTED") {
        console.log("error wak");
      } else {
        console.log("ada error tapi bukan error yang itu", error.message);
        console.error(error);
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
      </header>

      <section id="register" className="register section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="registration-form-wrapper">
                <div className="section-header mb-4 text-center">
                  <h2>Create Your Account</h2>
                  <p>Sign up to start shopping and enjoy exclusive offers</p>
                </div>

                <form action="#" method="POST">
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <label htmlFor="firstName">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          required=""
                          minLength="2"
                          placeholder="John"
                          value={username}
                          onChange={(event) => {
                            setUsername(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label for="email">Email Address</label>
                      <input
                        type="email"
                        class="form-control"
                        name="email"
                        id="email"
                        required=""
                        placeholder="you@example.com"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                        }}
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <div className="form-group">
                        <label htmlFor="firstName">Phone Number</label>
                        <input
                          type="text"
                          className="form-control"
                          name="firstName"
                          id="firstName"
                          required=""
                          minLength="2"
                          placeholder="Masukkan Nomor Hape Anda"
                          value={phone}
                          onChange={(event) => {
                            setPhone(event.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="password">Password</label>
                    <div className="password-input">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="password"
                        required=""
                        minLength="8"
                        placeholder="At least 8 characters"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value);
                        }}
                      />
                      <i className="bi bi-eye toggle-password"></i>
                    </div>
                    <small className="password-requirements">
                      Must be at least 8 characters long and include uppercase,
                      lowercase, number, and special character
                    </small>
                  </div>

                  <div className="form-group mb-3">
                    <label htmlFor="email">Address</label>
                    <textarea
                      name=""
                      className="form-control"
                      id=""
                      onChange={(event) => {
                        setAddress(event.target.value);
                      }}
                      value={address}
                    ></textarea>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="confirmPassword">Zipcode</label>
                    <div className="password-input">
                      <input
                        onChange={(event) => {
                          setZipcode(event.target.value);
                        }}
                        value={zip_code}
                        type="text"
                        className="form-control"
                        name="confirmPassword"
                        id="confirmPassword"
                        placeholder="Masukkan Zipcode kota anda"
                      />
                    </div>
                  </div>

                  <div className="form-group mb-4"></div>

                  <div className="form-group mb-4"></div>
                  <div className="text-center mb-4">
                    <button
                      type="button"
                      onClick={handleSave}
                      className="btn btn-primary w-100"
                    >
                      Create Account
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="mb-0">
                      Already have an account?{" "}
                      <Link to={"/login"}>Sign in</Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- /Register Section --> */}
    </>
  );
}
