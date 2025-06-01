import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import axios from "axios";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const [infoList, setInfoList] = useState([]);

  useEffect(() => {
    fetchCartList();
    fetchInfoList();
  }, []);

  const fetchCartList = () => {
    axios.get("/admin/cart").then(function (response) {
      setCartList(response.data.data);
      console.log(response.data.data);
      console.log("test");
    });
  };

  const fetchInfoList = () => {
    axios.get("/infoCart").then((response) => {
      setInfoList([response.data.data]);
    });
  };

  const handleUpdate = () => [
    axios.put("/admin/cart")
  ]

  return (
    <>
      <header id="header" className="header position-relative">
        <Navbar />
        <Navigation />
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
                <li class="current">Cart</li>
              </ol>
            </nav>
            <h1>Cart</h1>
          </div>
        </div>
        {/* <!-- End Page Title --> */}

        {/* <!-- Cart Section --> */}
        <section id="cart" class="cart section">
          <div class="container" data-aos-delay="100">
            <div class="row">
              <div class="col-lg-12" data-aos-delay="200">
                <div class="cart-items">
                  <div class="cart-header d-none d-lg-block">
                    <div class="row align-items-center">
                      <div class="col-lg-5">
                        <h5>Product</h5>
                      </div>
                      <div class="col-lg-2 text-center">
                        <h5>Price</h5>
                      </div>
                      <div class="col-lg-2 text-center">
                        <h5>Quantity</h5>
                      </div>
                      <div class="col-lg-1 text-center">
                        <h5>Total Weight</h5>
                      </div>
                      <div class="col-lg-2 text-center">
                        <h5>Total Price</h5>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Cart Item 1 --> */}
                  {cartList.map((cart, key) => {
                    return (
                      <div class="cart-item" key={key}>
                        <div class="row align-items-center">
                          <div class="col-lg-5 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
                            <div class="product-info d-flex align-items-center">
                              <div class="product-image">
                                <img
                                  src="assets/img/product/product-1.webp"
                                  alt="Product"
                                  class="img-fluid"
                                  loading="lazy"
                                />
                              </div>
                              <div class="product-details">
                                <h6 class="product-title">{cart.product}</h6>
                                <button class="remove-item" type="button">
                                  <i class="bi bi-trash"></i> Remove
                                </button>
                              </div>
                            </div>
                          </div>
                          <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                            <div class="price-tag">
                              <span class="current-price">Rp.{cart.price}</span>
                            </div>
                          </div>
                          <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                            <div class="quantity-selector">
                              <button class="quantity-btn decrease">
                                <i class="bi bi-dash"></i>
                              </button>
                              <input
                                type="number"
                                class="quantity-input"
                                value={cart.qty}
                                min="1"
                                max="10"
                              />
                              <button class="quantity-btn increase">
                                <i class="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div class="col-lg-1 col-12 mt-3 mt-lg-0 text-center">
                            <div class="item-total">
                              <span>{cart.product_weight}gr</span>
                            </div>
                          </div>
                          <div class="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                            <div class="item-total">
                              <span>Rp.{cart.price_total}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* <!-- End Cart Item --> */}

                  <div class="cart-actions">
                    <div class="row">
                      <div class="col-lg-6 text-md-end">
                        <button class="btn btn-outline-heading me-2">
                          <i class="bi bi-arrow-clockwise"></i> Update Cart
                        </button>
                        <button class="btn btn-outline-remove">
                          <i class="bi bi-trash"></i> Clear Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="col-lg-12 mt-4 mt-lg-0"
                // data-aos="fade-up"
                data-aos-delay="300"
              >
                {infoList.map((info, key) => {
                  return (
                    <div class="cart-summary" key={key}>
                      <h4 class="summary-title">Order Summary</h4>

                      <div class="summary-item">
                        <span class="summary-label">Subtotal</span>
                        <span class="summary-value">Rp.{info.subtotal}</span>
                      </div>
                      <div class="summary-item">
                        <span class="summary-label">Ongkir</span>
                        <span class="summary-value">Rp.{info.ongkir}</span>
                      </div>

                      <div class="summary-total">
                        <span class="summary-label">Total</span>
                        <span class="summary-value">Rp.{info.total}</span>
                      </div>

                      <div class="checkout-button">
                        <a href="#" class="btn btn-accent w-100">
                          Proceed to Checkout <i class="bi bi-arrow-right"></i>
                        </a>
                      </div>

                      <div class="continue-shopping">
                        <a href="#" class="btn btn-link w-100">
                          <i class="bi bi-arrow-left"></i> Continue Shopping
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /Cart Section --> */}
      </main>
    </>
  );
}
