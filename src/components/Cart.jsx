import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const [infoList, setInfoList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
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

  const handleUpdate = (id, newQty) => [
    axios
      .put(`/admin/cart/${id}`, { qty: newQty })
      .then(() => fetchCartList())
      .catch((err) => console.error("update Failed:", err)),
  ];

  const handleDelete = (id) => {
    axios
      .delete(`/admin/cart/${id}`)
      .then(() => fetchCartList())
      .catch((err) => console.error("deleted faielde", err));
  };

  return (
    <>
      <header id="header" className="header position-relative">
        <Navbar />
      </header>

      <main className="main">
        {/* <!-- Page Title --> */}
        <div className="page-title light-background">
          <div className="container">
            <nav className="breadcrumbs">
              <ol>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li className="current">Cart</li>
              </ol>
            </nav>
            <h1>Cart</h1>
          </div>
        </div>
        {/* <!-- End Page Title --> */}

        {/* <!-- Cart Section --> */}
        <section id="cart" className="cart section">
          <div className="container" data-aos-delay="100">
            <div className="row">
              <div className="col-lg-12" data-aos-delay="200">
                <div className="cart-items">
                  <div className="cart-header d-none d-lg-block">
                    <div className="row align-items-center">
                      <div className="col-lg-5">
                        <h5>Product</h5>
                      </div>
                      <div className="col-lg-2 text-center">
                        <h5>Price</h5>
                      </div>
                      <div className="col-lg-2 text-center">
                        <h5>Quantity</h5>
                      </div>
                      <div className="col-lg-1 text-center">
                        <h5>Total Weight</h5>
                      </div>
                      <div className="col-lg-2 text-center">
                        <h5>Total Price</h5>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Cart Item 1 --> */}
                  {cartList.map((cart, key) => {
                    return (
                      <div className="cart-item" key={key}>
                        <div className="row align-items-center">
                          <div className="col-lg-5 col-12 mt-3 mt-lg-0 mb-lg-0 mb-3">
                            <div className="product-info d-flex align-items-center">
                              <div className="product-image">
                                <img
                                  // src={
                                  //   "http://192.168.0.100:8000/images/" +
                                  //   cart.image
                                  // }
                                  src={
                                      "http://127.0.0.1:8000/images/" +
                                      detail.image[0].image
                                    }
                                  // src={
                                  //   "http://192.168.1.32:8000/images/" +
                                  //   cart.image
                                  // }
                                  alt="Product"
                                  className="img-fluid"
                                  loading="lazy"
                                />
                              </div>
                              <div className="product-details">
                                <h6 className="product-title">
                                  {cart.product}
                                </h6>
                                <button
                                  className="remove-item"
                                  type="button"
                                  onClick={() => handleDelete(cart.id)}
                                >
                                  <i className="bi bi-trash"></i> Remove
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                            <div className="price-tag">
                              <span className="current-price">
                                Rp.{Number(cart.price).toLocaleString()}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                            <div className="quantity-selector">
                              <button
                                className="quantity-btn decrease"
                                onClick={() => {
                                  const newQty = Math.max(
                                    1,
                                    parseInt(cart.qty) - 1
                                  );
                                  handleUpdate(cart.id, newQty);
                                }}
                              >
                                <i className="bi bi-dash"></i>
                              </button>
                              <input
                                type="number"
                                className="quantity-input"
                                value={cart.qty}
                                min="1"
                                max="10"
                                onChange={(e) => {
                                  const updatedCart = [cartList];
                                  updatedCart[key].qty = e.target.value;
                                  setCartList(updatedCart);
                                }}
                              />
                              <button
                                className="quantity-btn increase"
                                onClick={() => {
                                  const newQty = parseInt(cart.qty) + 1;
                                  handleUpdate(cart.id, newQty);
                                }}
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>
                          <div className="col-lg-1 col-12 mt-3 mt-lg-0 text-center">
                            <div className="item-total">
                              <span>{cart.product_weight}gr</span>
                            </div>
                          </div>
                          <div className="col-lg-2 col-12 mt-3 mt-lg-0 text-center">
                            <div className="item-total">
                              <span>
                                Rp.{Number(cart.price_total).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* <!-- End Cart Item --> */}

                  <div className="cart-actions">
                    <div className="row">
                      <div className="col-lg-6 text-md-end">
                        <button className="btn btn-outline-heading me-2">
                          <i className="bi bi-arrow-clockwise"></i> Update Cart
                        </button>
                        <button className="btn btn-outline-remove">
                          <i className="bi bi-trash"></i> Clear Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="col-lg-12 mt-4 mt-lg-0"
                // data-aos="fade-up"
                data-aos-delay="300"
              >
                {infoList.map((info, key) => {
                  return (
                    <div className="cart-summary" key={key}>
                      <h4 className="summary-title">Order Summary</h4>

                      <div className="summary-item">
                        <span className="summary-label">Subtotal</span>
                        <span className="summary-value">
                          Rp.{Number(info.subtotal).toLocaleString()}
                        </span>
                      </div>
                      <div className="summary-item">
                        <span className="summary-label">Ongkir</span>
                        <span className="summary-value">
                          Rp.{Number(info.ongkir).toLocaleString()}
                        </span>
                      </div>

                      <div className="summary-total">
                        <span className="summary-label">Total</span>
                        <span className="summary-value">
                          Rp.{Number(info.total).toLocaleString()}
                        </span>
                      </div>

                      <div className="checkout-button">
                        <Link to={"/checkout"} className="btn btn-accent w-100">
                          Proceed to Checkout{" "}
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>

                      <div className="continue-shopping">
                        <Link to={"/"} className="btn btn-link w-100">
                          <i className="bi bi-arrow-left"></i> Continue Shopping
                        </Link>
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
