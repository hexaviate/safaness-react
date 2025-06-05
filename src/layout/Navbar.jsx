import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      {/* Main Header */}
      <div className="main-header">
        <div className="container-fluid container-xl">
          <div className="d-flex py-3 align-items-center justify-content-between">
            {/* <!-- Logo --> */}
            <a href="index.html" className="logo d-flex align-items-center">
              {/* <!-- Uncomment the line below if you also wish to use an image logo --> */}
              <img src={"http://192.168.1.32:8000/images/logoSmk.png"} alt="" />
              <h1 className="sitename">
                Safa<span>Ness</span>
              </h1>
            </a>

            {/* <!-- Search --> */}
            <form className="search-form desktop-search-form">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
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
                    <a
                      href="register.html"
                      className="btn btn-outline-primary w-100"
                    >
                      Register
                    </a>
                  </div>
                </div>
              </div>

              {/* <!-- Wishlist --> */}

              {/* <!-- Cart --> */}
              <div className="dropdown cart-dropdown">
                <button className="header-action-btn" data-bs-toggle="dropdown">
                  <i className="bi bi-cart3"></i>
                  <span className="action-text d-none d-md-inline-block">
                    Cart
                  </span>
                  <span className="badge">3</span>
                </button>
                <div className="dropdown-menu cart-dropdown-menu">
                  <div className="dropdown-header">
                    <h6>Shopping Cart (3)</h6>
                  </div>
                  <div className="dropdown-body">
                    <div className="cart-items">
                      {/* <!-- Cart Item 1 --> */}
                      <div className="cart-item">
                        <div className="cart-item-image">
                          <img
                            src="assets/img/product/product-1.webp"
                            alt="Product"
                            className="img-fluid"
                          />
                        </div>
                        <div className="cart-item-content">
                          <h6 className="cart-item-title">
                            Wireless Headphones
                          </h6>
                          <div className="cart-item-meta">1 × $89.99</div>
                        </div>
                        <button className="cart-item-remove">
                          <i className="bi bi-x"></i>
                        </button>
                      </div>

                      {/* <!-- Cart Item 2 --> */}
                      <div className="cart-item">
                        <div className="cart-item-image">
                          <img
                            src="assets/img/product/product-2.webp"
                            alt="Product"
                            className="img-fluid"
                          />
                        </div>
                        <div className="cart-item-content">
                          <h6 className="cart-item-title">Smart Watch</h6>
                          <div className="cart-item-meta">1 × $129.99</div>
                        </div>
                        <button className="cart-item-remove">
                          <i className="bi bi-x"></i>
                        </button>
                      </div>

                      {/* <!-- Cart Item 3 --> */}
                      <div className="cart-item">
                        <div className="cart-item-image">
                          <img
                            src="assets/img/product/product-3.webp"
                            alt="Product"
                            className="img-fluid"
                          />
                        </div>
                        <div className="cart-item-content">
                          <h6 className="cart-item-title">Bluetooth Speaker</h6>
                          <div className="cart-item-meta">1 × $59.99</div>
                        </div>
                        <button className="cart-item-remove">
                          <i className="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-footer">
                    <div className="cart-total">
                      <span>Total:</span>
                      <span className="cart-total-price">$279.97</span>
                    </div>
                    <div className="cart-actions">
                      <a href="cart.html" className="btn btn-outline-primary">
                        View Cart
                      </a>
                      <a href="checkout.html" className="btn btn-primary">
                        Checkout
                      </a>
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
};

export default Navbar;
