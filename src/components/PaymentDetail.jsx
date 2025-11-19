/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import Footer from "../layout/Footer";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";

export default function PaymentDetail() {
  const [id] = useState(useParams().id);
  const [transaksi, setTransaksi] = useState([]);
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
    });
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
                <li><a href="/">Home</a></li>
                <li className="current">Detail Transaksi</li>
              </ol>
            </nav>
            <h1>Detail Transaksi</h1>
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
                              ? dayjs(transaksiItem.created_at).format("MMMM D, YYYY")
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
                            <li><span>Subtotal</span><span>Rp {Number(transaksiItem?.subtotal || 0).toLocaleString('id-ID')}</span></li>
                            <li><span>Service Fee</span><span>Rp {Number(transaksiItem?.biaya_layanan || 0).toLocaleString('id-ID')}</span></li>
                            <li><span>Shipping Cost</span><span>Rp {Number(transaksiItem?.ongkir || 0).toLocaleString('id-ID')}</span></li>
                            <li className="total"><span>Total Payment</span><span>Rp {Number(transaksiItem?.total || 0).toLocaleString('id-ID')}</span></li>
                          </ul>
                        </div>

                        {/* Delivery info */}
                        {courier ? (
                          <div className="delivery-info">
                            <h5>Shipping Information</h5>
                            <p className="delivery-estimate">
                              <i className="bi bi-truck"></i>
                              <span>{courier.name} - {courier.service}</span>
                            </p>
                            <p className="shipping-method">
                              <i className="bi bi-clock"></i>
                              <span>Estimated: {courier.etd} days</span>
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
                        <p>We've received your order and will begin processing it right away.
                          We'll send you updates via email as your order progresses.</p>
                      </div>

                      <div className="details-card">
                        <div className="card-header" data-toggle="collapse">
                          <h3>
                            <i className="bi bi-geo-alt"></i>
                            Shipping Details
                          </h3>
                          <i className="bi bi-chevron-down toggle-icon"></i>
                        </div>

                        <div className="card-body">
                          <div className="row g-4">
                            <div className="col-md-6">
                              <div className="detail-group">
                                <label>Ship To</label>
                                <address>
                                  Michael Thompson<br />
                                  789 Oakwood Lane<br />
                                  Seattle, WA 98101<br />
                                  United States
                                </address>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="detail-group">
                                <label>Contact</label>
                                <div className="contact-info">
                                  <p><i className="bi bi-envelope"></i> michael.t@example.com</p>
                                  <p><i className="bi bi-telephone"></i> (206) 555-1234</p>
                                </div>
                              </div>
                            </div>

                          </div>
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
                          {(transaksiItem?.transaction_details || []).map((product, key1) => (
                            <div className="item" key={key1}>
                              <div className="item-image">
                                <img
                                  src={"http://127.0.0.1:8000/images/" + product.product.image}
                                  alt={product.product.product}
                                  className="img-fluid"
                                  loading="lazy"
                                />
                              </div>

                              <div className="item-details">
                                <h4>{product.product.product}</h4>
                                <div className="item-meta">
                                  <span>Weight: {product.product.product_weight}g</span>
                                </div>
                                <div className="item-price">
                                  <span className="quantity">{product.product.qty} × </span>
                                  <span className="price"> Rp {Number(product.product.price).toLocaleString('id-ID')}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="action-area">
                        <div className="row g-3">
                          <div className="col-md-6">
                            <a href="/" className="btn btn-back">
                              <i className="bi bi-arrow-left"></i>
                              Kembali ke Beranda
                            </a>
                          </div>
                          <div className="col-md-6">
                            <a href="/history" className="btn btn-account">
                              <span>Lihat Riwayat Belanja</span>
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
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}