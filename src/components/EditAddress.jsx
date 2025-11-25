/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function EditAddress() {
  const [account, setAccount] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    adress_name: "",
    adress: "",
    zipcode: ""
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    fetchAccountDetail();
    fetchAddressDetail();
  }, []);

  const fetchAccountDetail = () => {
    axios.get("/accountDetail").then(function (response) {
      setAccount([response.data.data]);
    });
  };

  const fetchAddressDetail = () => {
    axios.post(`/showAdress/${id}`).then((response) => {
      const data = response.data.data;
      setFormData({
        adress_name: data.adress_name,
        adress: data.adress,
        zipcode: data.zipcode
      });
    }).catch((error) => {
      console.error("Error fetching address:", error);
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`/adress/${id}`, formData)
      .then((response) => {
        console.log(response)
        alert("Address updated successfully!");
        navigate("/profile");
      })
      .catch((error) => {
        console.error("Error updating address:", error);
        alert("Failed to update address");
      });
  };

  return (
    <>
      <header id="header" className="header position-relative">
        <Navbar />
      </header>

      <main class="main">
        {/* <!-- Page Title --> */}
        <div class="page-title light-background">
          <div class="container">
            <nav class="breadcrumbs">
              <ol>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/profile">Account</Link>
                </li>
                <li class="current">Edit Address</li>
              </ol>
            </nav>
            <h1>Edit Address</h1>
          </div>
        </div>
        {/* <!-- End Page Title --> */}

        {/* <!-- Account Section --> */}
        <section id="account" class="account section">
          <div class="container" data-aos-delay="100">
            {/* <!-- Mobile Sidebar Toggle Button --> */}
            <div class="sidebar-toggle d-lg-none mb-3">
              <button
                class="btn btn-toggle"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#profileSidebar"
                aria-expanded="false"
                aria-controls="profileSidebar"
              >
                <i class="bi bi-list me-2"></i> Profile Menu
              </button>
            </div>

            <div class="row">
              {/* <!-- Profile Sidebar --> */}
              <div
                class="col-lg-3 profile-sidebar collapse d-lg-block"
                id="profileSidebar"
                data-aos-delay="200"
              >
                <div class="profile-header">
                  <div class="profile-avatar">
                    <span>S</span>
                  </div>
                  {account.map((acc, i) => {
                    return (
                      <div class="profile-info" key={i}>
                        <h4>{acc.name}</h4>
                      </div>
                    );
                  })}
                </div>

                <div class="profile-nav">
                  <ul class="nav flex-column" id="profileTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                      <Link to="/profile" class="nav-link">
                        <i class="bi bi-box-seam"></i>
                        <span>Orders</span>
                        <span class="badge">1</span>
                      </Link>
                    </li>
                    <li class="nav-item" role="presentation">
                      <Link to="/profile" class="nav-link">
                        <i class="bi bi-person"></i>
                        <span>Personal info</span>
                      </Link>
                    </li>
                    <li class="nav-item" role="presentation">
                      <Link to="/profile" class="nav-link active">
                        <i class="bi bi-geo-alt"></i>
                        <span>Addresses</span>
                      </Link>
                    </li>
                  </ul>

                  <h6 class="nav-section-title">Customer service</h6>
                  <ul class="nav flex-column">
                    <li class="nav-item">
                      <a href="#" class="nav-link logout">
                        <i class="bi bi-box-arrow-right"></i>
                        <span>Log out</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* <!-- Profile Content --> */}
              <div class="col-lg-9 profile-content" data-aos-delay="300">
                <div class="tab-header">
                  <h2>Edit Address</h2>
                </div>
                <div class="personal-info-form" data-aos-delay="100">
                  <form class="php-email-form" onSubmit={handleSubmit}>
                    <div class="row">
                      <div class="col-md-12 mb-3">
                        <label for="adress_name" class="form-label">
                          Address Name <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="adress_name"
                          name="adress_name"
                          value={formData.adress_name}
                          onChange={handleChange}
                          placeholder="e.g. Home, Office, etc."
                          required
                        />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-12 mb-3">
                        <label for="adress" class="form-label">
                          Full Address <span class="text-danger">*</span>
                        </label>
                        <textarea
                          class="form-control"
                          id="adress"
                          name="adress"
                          rows="4"
                          value={formData.adress}
                          onChange={handleChange}
                          placeholder="Enter your complete address"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <label for="zipcode" class="form-label">
                          Zip Code <span class="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          class="form-control"
                          id="zipcode"
                          name="zipcode"
                          value={formData.zipcode}
                          onChange={handleChange}
                          placeholder="e.g. 12345"
                          required
                        />
                      </div>
                    </div>
                    <div class="loading">Loading</div>
                    <div class="error-message"></div>
                    <div class="sent-message">
                      Your address has been updated successfully!
                    </div>
                    <div class="text-end">
                      <Link to="/profile" class="btn btn-secondary me-2">
                        Cancel
                      </Link>
                      <button type="submit" class="btn btn-save">
                        Update Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /Account Section --> */}
      </main>
    </>
  );
}
