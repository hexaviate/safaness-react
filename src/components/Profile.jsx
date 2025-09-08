import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import axios from "axios";
import dayjs from "dayjs";

export default function Profile() {
  const [info, setInfoList] = useState([]);
    const [account, setAccount] = useState([]);
  

  useEffect(() => {
    fetchInfoList();
    fetchAccountDetail();

  }, []);

  const fetchInfoList = () => {
    axios.get("/transactionInfo").then((response) => {
      setInfoList(response.data.data);
      console.log([response.data.data]);
    });
  };

    const fetchAccountDetail = () => {
    axios.get("/accountDetail").then(function (response) {
      setAccount([response.data.data]);
      console.log(response.data);
    });
  };

  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <div class="order-status in-progress">
            <span class="status-dot"></span>
            <span>In Progress</span>
          </div>
        );
      case "success":
        return (
          <div class="order-status delivered">
            <span class="status-dot"></span>
            <span>Delivered</span>
          </div>
        );
      case "failed":
        return (
          <div class="order-status canceled">
            <span class="status-dot"></span>
            <span>Canceled</span>
          </div>
        );
    }
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
                  <a href="index.html">Home</a>
                </li>
                <li class="current">Account</li>
              </ol>
            </nav>
            <h1>Account</h1>
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
                  <div class="profile-info">
                    <h4>Sarah Anderson</h4>
                    <div class="profile-bonus">
                      <i class="bi bi-gift"></i>
                      <span>100 bonuses available</span>
                    </div>
                  </div>
                </div>

                <div class="profile-nav">
                  <ul class="nav flex-column" id="profileTabs" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active"
                        id="orders-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#orders"
                        type="button"
                        role="tab"
                        aria-controls="orders"
                        aria-selected="true"
                      >
                        <i class="bi bi-box-seam"></i>
                        <span>Orders</span>
                        <span class="badge">1</span>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="personal-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#personal"
                        type="button"
                        role="tab"
                        aria-controls="personal"
                        aria-selected="false"
                      >
                        <i class="bi bi-person"></i>
                        <span>Personal info</span>
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link"
                        id="addresses-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#addresses"
                        type="button"
                        role="tab"
                        aria-controls="addresses"
                        aria-selected="false"
                      >
                        <i class="bi bi-geo-alt"></i>
                        <span>Addresses</span>
                      </button>
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
                <div class="tab-content" id="profileTabsContent">
                  {/* <!-- Orders Tab --> */}
                  <div
                    class="tab-pane fade show active"
                    id="orders"
                    role="tabpanel"
                    aria-labelledby="orders-tab"
                  >
                    <div class="tab-header">
                      <h2>Orders</h2>
                      <div class="tab-filters">
                        <div class="row">
                          <div class="col-md-6 mb-3 mb-md-0">
                            <div class="dropdown">
                              <button
                                class="btn dropdown-toggle"
                                type="button"
                                id="statusFilter"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <span>Select status</span>
                                <i class="bi bi-chevron-down"></i>
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="statusFilter"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    All statuses
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    In progress
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Delivered
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Canceled
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div class="col-md-6">
                            <div class="dropdown">
                              <button
                                class="btn dropdown-toggle"
                                type="button"
                                id="timeFilter"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <span>For all time</span>
                                <i class="bi bi-chevron-down"></i>
                              </button>
                              <ul
                                class="dropdown-menu"
                                aria-labelledby="timeFilter"
                              >
                                <li>
                                  <a class="dropdown-item" href="#">
                                    For all time
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Last 30 days
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Last 6 months
                                  </a>
                                </li>
                                <li>
                                  <a class="dropdown-item" href="#">
                                    Last year
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="orders-table">
                      <div class="table-header">
                        <div class="row">
                          <div class="col-md-3">
                            <div class="sort-header">Order #</div>
                          </div>
                          <div class="col-md-3">
                            <div class="sort-header">
                              Order date
                              <i class="bi bi-arrow-down-up"></i>
                            </div>
                          </div>
                          <div class="col-md-3">
                            <div class="sort-header">Status</div>
                          </div>
                          <div class="col-md-3">
                            <div class="sort-header">
                              Total
                              <i class="bi bi-arrow-down-up"></i>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="order-items">
                        {/* <!-- Order Item 1 --> */}
                        {info.map((transaction, key) => {
                          const date = dayjs(transaction.orderedAt).format(
                            "DD MMMM YYYY - HH:mm"
                          );

                          return (
                            <div class="order-item" key={key}>
                              <div class="row align-items-center">
                                <div class="col-md-3">
                                  <div class="order-id">#{transaction.id}</div>
                                </div>
                                <div class="col-md-3">
                                  <div class="order-date">{date}</div>
                                </div>
                                <div class="col-md-3">
                                  {statusBadge(transaction.status)}
                                </div>
                                <div class="col-md-3">
                                  <div class="order-total">
                                    Rp.
                                    {Number(transaction.total).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              <div class="order-products">
                                <div class="product-thumbnails">
                                  <img
                                    src="assets/img/product/product-1.webp"
                                    alt="Product"
                                    class="product-thumb"
                                    loading="lazy"
                                  />
                                  <img
                                    src="assets/img/product/product-2.webp"
                                    alt="Product"
                                    class="product-thumb"
                                    loading="lazy"
                                  />
                                  <img
                                    src="assets/img/product/product-3.webp"
                                    alt="Product"
                                    class="product-thumb"
                                    loading="lazy"
                                  />
                                </div>
                                <button
                                  type="button"
                                  class="order-details-link"
                                  data-bs-toggle="collapse"
                                  data-bs-target={
                                    "#orderDetails" + transaction.id
                                  }
                                  aria-expanded="false"
                                  aria-controls={`orderDetails${transaction.id}`}
                                >
                                  <i class="bi bi-chevron-down"></i>
                                </button>
                              </div>
                              <div
                                class="collapse order-details"
                                id={`orderDetails${transaction.id}`}
                              >
                                <div class="order-details-content">
                                  <div class="order-details-header">
                                    <h5>Order Details</h5>
                                    <div class="order-info">
                                      <div class="info-item">
                                        <span class="info-label">
                                          Order Date:
                                        </span>
                                        <span class="info-value">{date}</span>
                                      </div>
                                      <div class="info-item">
                                        <span class="info-label">
                                          Payment Method:
                                        </span>
                                        <span class="info-value">
                                          Cash On Delivery
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                  {transaction.transaction_details.map(
                                    (detail, i) => {
                                      return (
                                        <div class="order-items-list" key={i}>
                                          <div class="order-item-detail">
                                            <div class="item-image">
                                              <img
                                                src="assets/img/product/product-1.webp"
                                                alt="Product"
                                                loading="lazy"
                                              />
                                            </div>
                                            <div class="item-info">
                                              <h6>{detail.product.product}</h6>
                                              <div class="item-meta">
                                                <span class="item-sku">
                                                  PID:{detail.product.id}
                                                </span>
                                                <span class="item-qty">
                                                  Qty: {detail.product.qty}
                                                </span>
                                              </div>
                                            </div>
                                            <div class="item-price">
                                              Rp.
                                              {Number(
                                                detail.product.price
                                              ).toLocaleString()}
                                            </div>
                                          </div>
                                        </div>
                                      );
                                    }
                                  )}
                                  <div class="order-summary">
                                    <div class="summary-row">
                                      <span>Subtotal:</span>
                                      <span>
                                        Rp.
                                        {Number(
                                          transaction.subtotal
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                    <div class="summary-row">
                                      <span>Ongkir:</span>
                                      <span>
                                        Rp.
                                        {Number(
                                          transaction.ongkir
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                    <div class="summary-row total">
                                      <span>Total:</span>
                                      <span>
                                        Rp.
                                        {Number(
                                          transaction.total
                                        ).toLocaleString()}
                                      </span>
                                    </div>
                                  </div>
                                  <div class="shipping-info">
                                    {account.map((acc, e)=>{
                                      return(
                                    <div class="shipping-address" key={e}>
                                      <h6>Shipping Address</h6>
                                      <p>
                                        {acc.address}
                                      </p>
                                    </div>
                                      )
                                    })}
                                    <div class="shipping-method">
                                      <h6>Shipping Method</h6>
                                      <p>
                                        Express Delivery (2-3 business days)
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {/* <!-- End Order Item --> */}
                      </div>

                      <div class="pagination-container">
                        <nav aria-label="Orders pagination">
                          <ul class="pagination">
                            <li class="page-item active">
                              <a class="page-link" href="#">
                                1
                              </a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">
                                2
                              </a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">
                                3
                              </a>
                            </li>
                            <li class="page-item">
                              <a class="page-link" href="#">
                                4
                              </a>
                            </li>
                          </ul>
                        </nav>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Personal Info Tab --> */}
                  <div
                    class="tab-pane fade"
                    id="personal"
                    role="tabpanel"
                    aria-labelledby="personal-tab"
                  >
                    <div class="tab-header">
                      <h2>Personal Information</h2>
                    </div>
                    <div class="personal-info-form" data-aos-delay="100">
                      <form class="php-email-form">
                        <div class="row">
                          <div class="col-md-6 mb-3">
                            <label for="firstName" class="form-label">
                              First Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="firstName"
                              name="firstName"
                              value="Lorem"
                              required=""
                            />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label for="lastName" class="form-label">
                              Last Name
                            </label>
                            <input
                              type="text"
                              class="form-control"
                              id="lastName"
                              name="lastName"
                              value="Ipsum"
                              required=""
                            />
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-md-6 mb-3">
                            <label for="email" class="form-label">
                              Email
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="email"
                              name="email"
                              value="lorem@example.com"
                              required=""
                            />
                          </div>
                          <div class="col-md-6 mb-3">
                            <label for="phone" class="form-label">
                              Phone
                            </label>
                            <input
                              type="tel"
                              class="form-control"
                              id="phone"
                              name="phone"
                              value="+1 (555) 123-4567"
                            />
                          </div>
                        </div>
                        <div class="mb-3">
                          <label for="birthdate" class="form-label">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            class="form-control"
                            id="birthdate"
                            name="birthdate"
                            value="1990-01-01"
                          />
                        </div>
                        <div class="mb-3">
                          <label class="form-label d-block">Gender</label>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gender"
                              id="genderMale"
                              value="male"
                              checked=""
                            />
                            <label class="form-check-label" for="genderMale">
                              Male
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gender"
                              id="genderFemale"
                              value="female"
                            />
                            <label class="form-check-label" for="genderFemale">
                              Female
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="gender"
                              id="genderOther"
                              value="other"
                            />
                            <label class="form-check-label" for="genderOther">
                              Other
                            </label>
                          </div>
                        </div>
                        <div class="loading">Loading</div>
                        <div class="error-message"></div>
                        <div class="sent-message">
                          Your information has been updated. Thank you!
                        </div>
                        <div class="text-end">
                          <button type="submit" class="btn btn-save">
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  {/* <!-- Addresses Tab --> */}
                  <div
                    class="tab-pane fade"
                    id="addresses"
                    role="tabpanel"
                    aria-labelledby="addresses-tab"
                  >
                    <div class="tab-header">
                      <h2>My Addresses</h2>
                      <button class="btn btn-add-address" type="button">
                        <i class="bi bi-plus-lg"></i> Add new address
                      </button>
                    </div>
                    <div class="addresses-list">
                      <div class="row">
                        {/* <!-- Address Item 1 --> */}
                        <div class="col-lg-6 mb-4" data-aos-delay="100">
                          <div class="address-item">
                            <div class="address-header">
                              <h5>Home Address</h5>
                              <div class="address-actions">
                                <button class="btn-edit-address" type="button">
                                  <i class="bi bi-pencil"></i>
                                </button>
                                <button
                                  class="btn-delete-address"
                                  type="button"
                                >
                                  <i class="bi bi-trash"></i>
                                </button>
                              </div>
                            </div>
                            <div class="address-content">
                              <p>
                                123 Main Street
                                <br />
                                Apt 4B
                                <br />
                                New York, NY 10001
                                <br />
                                United States
                              </p>
                            </div>
                            <div class="default-badge">Default</div>
                          </div>
                        </div>
                        {/* <!-- End Address Item --> */}
                      </div>
                    </div>
                  </div>
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
