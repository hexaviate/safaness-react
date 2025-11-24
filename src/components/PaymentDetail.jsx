/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import Footer from "../layout/Footer";
import axios from "axios";
import dayjs from "dayjs";
import "./Timeline.css";
import { useNavigate, useParams } from "react-router-dom";
import { ssrImportKey } from "vite/module-runner";

export default function PaymentDetail() {
  const [id] = useState(useParams().id);
  const [transaksi, setTransaksi] = useState([]);
  const [proof, setProof] = useState(null);
  const [awb, setAwb] = useState([]);
  const [summary, setSummary] = useState([]);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // --- LOGIKA DATA ANDA YANG SUDAH BEKERJA ---
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    fetchDetailList();
  }, []);

  const fetchDetailList = () => {
    axios.get(`/detailTransactionInfo/${id}`).then((response) => {
      console.log(response.data.data);
      setTransaksi([response.data.data[0]]);
      fetchAwbList();
    });
  };

  const fetchAwbList = () => {
    axios.get(`/checkWaybill/${id}`).then((response) => {
      console.log(response.data.data.data.manifest);
      setStatus([response.data.data.data.delivery_status.status]);
      setSummary([response.data.data.data.summary]);
      setAwb([response.data.data.data.manifest]);
    });
  };

  const trackingData = [
    {
      date: "20 Nov 2025",
      time: "09:00",
      status: "Package received at warehouse",
    },
    {
      date: "21 Nov 2025",
      time: "14:30",
      status: "Package shipped from warehouse",
    },
    {
      date: "22 Nov 2025",
      time: "10:15",
      status: "Package arrived at sorting center",
    },
    { date: "23 Nov 2025", time: "08:45", status: "Out for delivery" },
    { date: "23 Nov 2025", time: "12:00", status: "Delivered to recipient" },
  ];

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("proof", proof);

    try {
      const response = await axios.post(`/uploadPayment/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload Success:", response.data);
    } catch (error) {
      console.log("Upload Error:", error);
    }
  };

  return (
    <>
      <header id="header" className="header position-relative">
        <Navbar />
      </header>

      <main className="main">
        {/* Page Title */}
        <div className="page-title light-background">
          <div className="container">
            <nav className="breadcrumbs">
              <ol>
                <li>
                  <a href="/">Home</a>
                </li>
                <li className="current">Transaction Detail</li>
              </ol>
            </nav>
            <h1>Transaction Detail</h1>
          </div>
        </div>

        {/* Order Confirmation Section */}
        <section id="order-confirmation" className="order-confirmation section">
          <div className="container">
            {transaksi.map((transaksiItem, key) => {
              const courier = transaksiItem?.courier_info?.[0]; // Ambil kurir pertama jika ada

              return (
                <div className="order-confirmation-3" key={key}>
                  <div className="row g-0">
                    {/* Left sidebar with order summary */}
                    <div className="col-lg-4 sidebar">
                      <div className="sidebar-content">
                        {/* Order number and date */}
                        <div className="order-id">
                          <h4>Order #{id}</h4>
                          <div className="order-date">
                            {transaksiItem?.created_at
                              ? dayjs(transaksiItem.created_at).format(
                                  "MMMM D, YYYY"
                                )
                              : "Unknown Date"}
                          </div>
                        </div>

                        {/* Order progress stepper */}
                        <div className="order-progress">
                          <div className="stepper-container">
                            <div className="stepper-item completed">
                              <div className="stepper-icon">1</div>
                              <div className="stepper-text">Created</div>
                            </div>
                            <div className="stepper-item current">
                              <div className="stepper-icon">2</div>
                              <div className="stepper-text">Processing</div>
                            </div>
                            <div className="stepper-item">
                              <div className="stepper-icon">3</div>
                              <div className="stepper-text">Shipped</div>
                            </div>
                            <div className="stepper-item">
                              <div className="stepper-icon">4</div>
                              <div className="stepper-text">Completed</div>
                            </div>
                          </div>
                        </div>

                        {/* Price summary */}
                        <div className="price-summary">
                          <h5>Order Summary</h5>
                          <ul className="summary-list">
                            <li>
                              <span>Subtotal</span>
                              <span>
                                Rp{" "}
                                {Number(
                                  transaksiItem?.subtotal || 0
                                ).toLocaleString("id-ID")}
                              </span>
                            </li>
                            <li>
                              <span>Service Fee</span>
                              <span>
                                Rp{" "}
                                {Number(
                                  transaksiItem?.biaya_layanan || 0
                                ).toLocaleString("id-ID")}
                              </span>
                            </li>
                            <li>
                              <span>Shipping Cost</span>
                              <span>
                                Rp{" "}
                                {Number(
                                  transaksiItem?.ongkir || 0
                                ).toLocaleString("id-ID")}
                              </span>
                            </li>
                            <li className="total">
                              <span>Total Payment</span>
                              <span>
                                Rp{" "}
                                {Number(
                                  transaksiItem?.total || 0
                                ).toLocaleString("id-ID")}
                              </span>
                            </li>
                          </ul>
                        </div>

                        {/* Delivery info */}
                        {courier ? (
                          <div className="delivery-info">
                            <h5>Shipping Information</h5>
                            <p className="delivery-estimate">
                              <i className="bi bi-truck"></i>
                              <span>
                                {courier.name} - {courier.service}
                              </span>
                            </p>
                            <p className="shipping-method">
                              <i className="bi bi-clock"></i>
                              <span>Estimated: {courier.etd} </span>
                            </p>
                            <p className="shipping-method">
                              <i className="bi bi-clock"></i>
                              <span>Status: {status} </span>
                            </p>
                          </div>
                        ) : (
                          <div className="delivery-info">
                            <h5>Shipping Information</h5>
                            <p>Courier information not available.</p>
                          </div>
                        )}

                        {/* Customer service */}
                        <div className="customer-service">
                          <h5>Need Help?</h5>
                          <a href="#" className="help-link">
                            <i className="bi bi-chat-dots"></i>
                            <span>Contact Support</span>
                          </a>
                          <a href="#" className="help-link">
                            <i className="bi bi-question-circle"></i>
                            <span>FAQ</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Main content area */}
                    <div className="col-lg-8 main-content">
                      {/* Thank you message */}

                      <div className="thank-you-message">
                        <h1>Thanks for your order!</h1>
                        <p>
                          We've received your order and will begin processing it
                          right away. We'll send you updates via Whatsapp as
                          your order progresses.
                        </p>
                      </div>

                      <div className="details-card">
                        <div className="card-header" data-toggle="collapse">
                          <h3>
                            <i className="bi bi-geo-alt"></i>
                            Shipping Details
                          </h3>
                          <i className="bi bi-chevron-down toggle-icon"></i>
                        </div>
                        {summary.map((summary, key) => {
                          return (
                            <div className="card-body" key={key}>
                              <div className="row g-4">
                                <div className="col-md-6">
                                  <div className="detail-group">
                                    <label>Shipper</label>
                                    <address>
                                      {summary.shipper_name}
                                      <br />
                                      {summary.origin}
                                      <br />
                                      Indonesia
                                    </address>
                                  </div>
                                </div>

                                <div className="col-md-6">
                                  <div className="detail-group">
                                    <label>Ship To</label>
                                    <address>
                                      {summary.receiver_name}
                                      <br />
                                      {summary.destination}
                                      <br />
                                      Indonesia
                                    </address>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className="details-card">
                        <div className="card-header">
                          <h3>
                            <i className="bi bi-truck"></i> Package Tracking
                          </h3>
                        </div>

                        <div
                          className="card-body"
                          style={{ maxHeight: "300px", overflowY: "auto" }}
                        >
                          <ul className="timeline">
                            {awb.map((item, index) => {
                              return (
                                <li key={index} className="timeline-item">
                                  <div className="timeline-dot"></div>
                                  {index !== awb.length - 1 && (
                                    <div className="timeline-line"></div>
                                  )}
                                  <div className="timeline-content">
                                    <small>{item.manifest_date}</small>
                                    <p>{item.manifest_description}</p>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>

                      {/* Order items */}
                      <div className="details-card">
                        <div className="card-header">
                          <h3>
                            <i className="bi bi-bag-check"></i>
                            Product Details
                          </h3>
                          <i className="bi bi-chevron-down toggle-icon"></i>
                        </div>

                        <div className="card-body">
                          {(transaksiItem?.transaction_details || []).map(
                            (product, key1) => (
                              <div className="item" key={key1}>
                                <div className="item-image">
                                  <img
                                    src={
                                      "http://127.0.0.1:8000/images/" +
                                      product.product.image
                                    }
                                    alt={product.product.product}
                                    className="img-fluid"
                                    loading="lazy"
                                  />
                                </div>

                                <div className="item-details">
                                  <h4>{product.product.product}</h4>
                                  <div className="item-meta">
                                    <span>
                                      Weight: {product.product.product_weight}g
                                    </span>
                                  </div>
                                  <div className="item-price">
                                    <span className="quantity">
                                      {product.product.qty} ×{" "}
                                    </span>
                                    <span className="price">
                                      {" "}
                                      Rp{" "}
                                      {Number(
                                        product.product.price
                                      ).toLocaleString("id-ID")}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="action-area">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <a href="/" className="btn btn-back">
                              <i className="bi bi-arrow-left"></i>
                              Back to Home
                            </a>
                          </div>
                          <div className="col-md-6">
                            <a href="/history" className="btn btn-account">
                              <span>View Order History</span>
                              <i className="bi bi-arrow-right"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProof(e.target.files[0])}
            />
            <button onClick={handleSubmit}>Upload Foto</button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
