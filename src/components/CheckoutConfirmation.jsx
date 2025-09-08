import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function CheckoutConfirmation() {
  const [infolist, setInfoList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInfoList();
    fetchCartList();
  }, []);

  const fetchInfoList = () => {
    axios.get("/infoCart").then((response) => {
      setInfoList([response.data.data]);
      console.log(response.data.data);
    });
  };

  const fetchCartList = () => {
    axios.get("/admin/cart").then(function (response) {
      setCartList(response.data.data);
      console.log(response.data.data);
      console.log("test");
    });
  };

  const handleSave = () => {
    axios.post("/admin/transaction")
    .then(function (res){
      console.log(res.data.data);
      navigate("/profile")
    })
  };

  // const date = dayjs(dateString).format("DD MMMM YYYY - HH:mm");

  return (
    <>
      <header id="header" className="header position-relative">
        <Navbar />
        <Navigation />
      </header>

      <main className="main">
        {/* <!-- Page Title --> */}
        <div class="page-title light-background">
          <div class="container">
            <nav class="breadcrumbs">
              <ol>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li class="current">Checkout</li>
              </ol>
            </nav>
            <h1>Checkout</h1>
          </div>
        </div>
        {/* <!-- End Page Title --> */}

        <section id="checkout" class="checkout section">
          <div class="container" data-aos-delay="100">
            <div class="row">
              <div class="col-lg-8">
                {/* <!-- Checkout Steps --> */}

                {/* <!-- Checkout Forms Container --> */}
                <div class="checkout-forms" data-aos-delay="150">
                  {/* <!-- Step 4: Order Review --> */}
                  <div class="checkout-form-active" data-form="1">
                    <div class="form-header">
                      <h3>Review Your Order</h3>
                      <p>
                        Please review your information before placing your order
                      </p>
                    </div>
                    <form class="checkout-form-element">
                      {infolist.map((info, key) => {
                        return (
                          <div class="review-sections" key={key}>
                            <div class="review-section">
                              <div class="review-section-header">
                                <h4>Contact Information</h4>
                                <button
                                  type="button"
                                  class="btn-edit"
                                  data-edit="1"
                                >
                                  Edit
                                </button>
                              </div>
                              <div class="review-section-content">
                                <p class="review-name">{info.name}</p>
                                <p class="review-email">{info.email}</p>
                                <p class="review-phone">+62 {info.phone}</p>
                              </div>
                            </div>

                            <div class="review-section mt-3">
                              <div class="review-section-header">
                                <h4>Shipping Address</h4>
                                <button
                                  type="button"
                                  class="btn-edit"
                                  data-edit="2"
                                >
                                  Edit
                                </button>
                              </div>
                              <div class="review-section-content">
                                <p>{info.address}</p>
                                <p>{info.zipcode}</p>
                                <p>Indonesia</p>
                              </div>
                            </div>

                            <div class="review-section mt-3">
                              <div class="review-section-header">
                                <h4>Kurir</h4>
                                <button
                                  type="button"
                                  class="btn-edit"
                                  data-edit="3"
                                >
                                  Edit
                                </button>
                              </div>
                              <div class="review-section-content">
                                <p>
                                  <i class="bi bi-credit-card-2-front me-2"></i>{" "}
                                  JNT (COD)
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      <div class="success-message d-none">
                        Your order has been placed successfully! Thank you for
                        your purchase.
                      </div>
                      <div class="d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          class="btn btn-outline-secondary prev-step"
                          data-prev="3"
                        >
                          Back to Cart
                        </button>
                        <button
                          type="button"
                          onClick={handleSave}
                          class="btn btn-success place-order-btn"
                        >
                          Place Order
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>

              <div class="col-lg-4">
                {/* <!-- Order Summary --> */}
                <div
                  class="order-summary aos-init aos-animate"
                  data-aos-delay="200"
                >
                  <div class="order-summary-header">
                    <h3>Order Summary</h3>
                    <button type="button" class="btn-toggle-summary d-lg-none">
                      <i class="bi bi-chevron-down"></i>
                    </button>
                  </div>

                  <div class="order-summary-content">
                    <div class="order-items">
                      {cartList.map((cart, key) => {
                        return (
                          <div class="order-item" key={key}>
                            <div class="order-item-image">
                              <img
                                src={
                                  "http://192.168.0.100:8000/images/" +
                                  cart.image
                                }
                                // src={
                                //   "http://192.168.1.32:8000/images/" +
                                //   cart.image
                                // }
                                alt="Product"
                                class="img-fluid"
                              />
                            </div>
                            <div class="order-item-details">
                              <h4>{cart.product}</h4>
                              <div class="order-item-price">
                                <span class="quantity">{cart.qty} ×</span>
                                <span class="price">
                                  Rp.{Number(cart.price).toLocaleString()}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {infolist.map((info, key) => {
                        return (
                          <div class="order-totals" key={key}>
                            <div class="order-subtotal d-flex justify-content-between">
                              <span>Subtotal</span>
                              <span>
                                Rp.{Number(info.subtotal).toLocaleString()}
                              </span>
                            </div>
                            <div class="order-shipping d-flex justify-content-between">
                              <span>Ongkir</span>
                              <span>
                                Rp.{Number(info.ongkir).toLocaleString()}
                              </span>
                            </div>
                            <div class="order-total d-flex justify-content-between">
                              <span>Total</span>
                              <span>
                                Rp.{Number(info.total).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        );
                      })}

                      <div class="secure-checkout mt-4">
                        <div class="secure-checkout-header">
                          <i class="bi bi-shield-lock"></i>
                          <span>Secure Checkout</span>
                        </div>
                        <div class="payment-icons mt-2">
                          <i class="bi bi-credit-card-2-front"></i>
                          <i class="bi bi-credit-card"></i>
                          <i class="bi bi-paypal"></i>
                          <i class="bi bi-apple"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- /Checkout Section --> */}
      </main>
    </>
  );
}
