import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const [account, setAccount] = useState([]);
  const [status, setStatus] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [search, setSearch] = useState("");

  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAccountDetail();
    fetchCartList();
  }, []);

  const fetchAccountDetail = () => {
    axios.get("/accountDetail").then(function (response) {
      setAccount([response.data.data]);
      setStatus(response.data.status);
      console.log(response.data);
    });
  };

  const fetchCartList = () => {
    axios.get("/admin/cart").then(function (response) {
      setCartList(response.data.data);
      setCount(response.data.count);
      setTotal(response.data.total);
      console.log(response.data.data);
      console.log("test");
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/product?search=${encodeURIComponent(search)}`);
  };

  const accountInfo = (status) => {
    switch (status) {
      case "success":
        return (
          <>
            {account.map((detail, key) => {
              return (
                <div className="dropdown account-dropdown" key={key}>
                  <button
                    className="header-action-btn"
                    data-bs-toggle="dropdown"
                  >
                    <i className="bi bi-person"></i>
                    <span className="action-text d-none d-md-inline-block">
                      {detail.name}
                    </span>
                  </button>
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <h6>
                        Welcome to <span className="sitename">Safaness</span>
                      </h6>
                      <p className="mb-0">Access account &amp; manage orders</p>
                    </div>
                    <div className="dropdown-body">
                      <Link
                        to={"/profile"}
                        className="dropdown-item d-flex align-items-center"
                      >
                        <i className="bi bi-person-circle me-2"></i>
                        <span>My Profile</span>
                      </Link>
                      <Link
                        to={"/profile"}
                        className="dropdown-item d-flex align-items-center"
                      >
                        <i className="bi bi-bag-check me-2"></i>
                        <span>My Orders</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </>
        );

      case "unauthenticated":
        return (
          <>
            <div className="dropdown account-dropdown">
              <button className="header-action-btn" data-bs-toggle="dropdown">
                <i className="bi bi-person"></i>
                <span className="action-text d-none d-md-inline-block">
                  Account
                </span>
              </button>
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <h6>
                    Welcome to <span className="sitename">Safaness</span>
                  </h6>
                  <p className="mb-0">Access account &amp; manage orders</p>
                </div>
                <div className="dropdown-body">
                  <Link
                    to={"/profile"}
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-person-circle me-2"></i>
                    <span>My Profile</span>
                  </Link>
                  <Link
                    to={"/profile"}
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-bag-check me-2"></i>
                    <span>My Orders</span>
                  </Link>
                </div>
                <div className="dropdown-footer">
                  <Link to={"/login"} className="btn btn-primary w-100 mb-2">
                    Sign In
                  </Link>
                  <Link
                    to={"/register"}
                    className="btn btn-outline-primary w-100"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <>
      {/* Main Header */}
      <div className="main-header">
        <div className="container-fluid container-xl">
          <div className="d-flex py-3 align-items-center justify-content-between">
            {/* <!-- Logo --> */}
            <Link to={"/"} className="logo d-flex align-items-center">
              {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
              <img src={"http://192.168.1.100:8000/images/logoSmk.png"} alt="" />
              <h1 className="sitename">
                Safa<span>Ness</span>
              </h1>
            </Link>

            {/* <!-- Search --> */}
            <form className="search-form desktop-search-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search for products..."
                />
                <button className="btn search-btn" type="submit">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </form>

            {/* <!-- Actions --> */}
            <div className="header-actions d-flex align-items-center justify-content-end">
              {/* <!-- Mobile Search Toggle --> */}
              <button
                className="header-action-btn mobile-search-toggle d-xl-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobileSearch"
                aria-expanded="false"
                aria-controls="mobileSearch"
              >
                <i className="bi bi-search"></i>
              </button>

              {/* <!-- Account --> */}
              {accountInfo(status)}

              {/* <!-- Wishlist --> */}

              {/* <!-- Cart --> */}
              <div className="dropdown cart-dropdown">
                <button className="header-action-btn" data-bs-toggle="dropdown">
                  <i className="bi bi-cart3"></i>
                  <span className="action-text d-none d-md-inline-block">
                    Cart
                  </span>
                  <span className="badge">{count}</span>
                </button>
                <div className="dropdown-menu cart-dropdown-menu">
                  <div className="dropdown-header">
                    <h6>Shopping Cart ({count})</h6>
                  </div>
                  <div className="dropdown-body">
                    <div className="cart-items">
                      {/* <!-- Cart Item 1 --> */}
                      {cartList.map((product, key) => {
                        return (
                          <div className="cart-item" key={key}>
                            <div className="cart-item-image">
                              <img
                                src={
                                  "http://192.168.1.32:8000/images/" +
                                  product.image
                                }
                                alt="Product"
                                className="img-fluid"
                              />
                            </div>
                            <div className="cart-item-content">
                              <h6 className="cart-item-title">
                                {product.product}
                              </h6>
                              <div className="cart-item-meta">
                                {product.qty} × Rp.
                                {Number(product.price).toLocaleString()}
                              </div>
                            </div>
                            <button className="cart-item-remove">
                              <i className="bi bi-x"></i>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="dropdown-footer">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span className="cart-total-price">
                        Rp.{Number(total).toLocaleString()}
                      </span>
                    </div>
                    <div className="cart-actions">
                      <Link to={"/cart"} className="btn btn-outline-primary">
                        View Cart
                      </Link>
                      <Link to={"/checkout"} className="btn btn-primary">
                        Checkout
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Mobile Navigation Toggle --> */}
              <i className="mobile-nav-toggle d-xl-none bi bi-list me-0"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
