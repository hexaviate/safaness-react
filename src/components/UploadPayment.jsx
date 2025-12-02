/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function UploadPayment() {
  const { transactionId } = useParams();
  const [id, setId] = useState(transactionId);
  const [transactionData, setTransactionData] = useState(null);
  const [cartList, setCartList] = useState([]);
  const [infolist, setInfoList] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [courier, setCourier] = useState("");
  const [paymentProof, setPaymentProof] = useState(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState(null);
  const [isPaymentProofUploaded, setIsPaymentProofUploaded] = useState(false);
  const [currentStep] = useState(5); // Langsung set ke step 5
  const navigate = useNavigate();

  // Static Data
  const bankData = {
    bank_name: "Bank BCA",
    account_number: "1234567890",
    account_holder: "PT TOKO ONLINE",
  };
  const qrCodeUrl = "http://127.0.0.1:8000/images/qris-sample.png";

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    if (!transactionId) {
      // Jika tidak ada ID, arahkan kembali ke profil
      navigate("/profile");
      return;
    }

    // Fetch detail transaksi
    axios
      .get(`/detailTransactionInfo/${transactionId}`)
      .then((response) => {
        const data = response.data.data[0]; // API mengembalikan array, ambil elemen pertama
        setTransactionData(data);

        // Set state untuk UI
        setPaymentMethod(data.payment_method);
        setCourier(data.courier_info[0]?.name || "");

        // Format data untuk Order Summary
        setCartList(data.transaction_details.map(detail => ({
          ...detail.product,
          image: detail.product.image, // Asumsi image ada di dalam product
        })));

        setInfoList([{
          subtotal: data.subtotal,
          ongkir: data.ongkir,
          biaya_layanan: data.biaya_layanan,
          total: data.total,
        }]);

      })
      .catch((error) => {
        console.error("Gagal mengambil detail transaksi:", error);
        alert("Transaksi tidak ditemukan.");
        navigate("/profile");
      });
  }, [transactionId, navigate]);

  const handlePaymentProofUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file);
      setPaymentProofPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmitPaymentProof = () => {
    if (!paymentProof) {
      alert("Please upload payment proof");
      return;
    }

    const formData = new FormData();
    formData.append("proof", paymentProof);

    axios
      .post(`/uploadPayment/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (res) {
        setIsPaymentProofUploaded(true);
        alert("Payment proof uploaded successfully!");
        // navigate("/profile"); // Biarkan user melihat pesan sukses
      })
      .catch((err) => {
        console.error(err);
        alert("Failed to upload payment proof");
      });
  };

  // const downloadQRCode = () => {
  //   const link = document.createElement("a");
  //   link.href = qrCodeUrl;
  //   link.download = "qris-payment.png";
  //   link.click();
  // };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = "/images/qris-sample.png"; // path file di public frontend atau public laravel
    link.download = "qris-payment.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  return (
    <>
      <header id="header" className="header position-relative">
        <Navbar />
      </header>

      <main className="main">
        <div className="page-title light-background">
          <div className="container">
            <nav className="breadcrumbs">
              <ol>
                <li><a href="index.html">Home</a></li>
                <li className="current">Upload Payment Proof</li>
              </ol>
            </nav>
            <h1>Complete Payment</h1>
          </div>
        </div>

        <section id="checkout" className="checkout section">
          <div className="container" data-aos-delay="100">
            <div className="row">
              <div className="col-lg-8">
                {/* Checkout Steps */}
                <div className="checkout-steps mb-4">
                  <div className={`step ${currentStep >= 1 ? "active" : ""}`}>
                    <div className="step-number">1</div>
                    <div className="step-title">Information</div>
                  </div>
                  <div className="step-connector"></div>
                  <div className={`step ${currentStep >= 2 ? "active" : ""}`}>
                    <div className="step-number">2</div>
                    <div className="step-title">Shipping</div>
                  </div>
                  <div className="step-connector"></div>
                  <div className={`step ${currentStep >= 3 ? "active" : ""}`}>
                    <div className="step-number">3</div>
                    <div className="step-title">Payment</div>
                  </div>
                  <div className="step-connector"></div>
                  <div className={`step ${currentStep >= 4 ? "active" : ""}`}>
                    <div className="step-number">4</div>
                    <div className="step-title">Review</div>
                  </div>
                  <div className="step-connector"></div>
                  <div className={`step ${currentStep >= 5 ? "active" : ""}`}>
                    <div className="step-number">5</div>
                    <div className="step-title">Upload Proof</div>
                  </div>
                </div>

                {/* Step 5: Upload Payment Proof */}
                <div className="checkout-form active">
                  <div className="form-header">
                    <h3>Upload Payment Proof</h3>
                    <p>Please upload your payment confirmation</p>
                  </div>
                  <form className="checkout-form-element">
                    <div className="review-section mb-3">
                      <div className="review-section-header">
                        <h4>Payment Method</h4>
                      </div>
                      <div className="review-section-content">
                        {paymentMethod === "bank_transfer" && (
                          <div className="p-3 border rounded bg-light">
                            <p className="mb-2"><i className="bi bi-bank me-2"></i><strong>Bank Transfer</strong></p>
                            <hr />
                            <p className="mb-1"><strong>Bank:</strong> {bankData.bank_name}</p>
                            <p className="mb-1"><strong>Account Number:</strong> {bankData.account_number}</p>
                            <p className="mb-0"><strong>Account Holder:</strong> {bankData.account_holder}</p>
                          </div>
                        )}
                        {paymentMethod === "qris" && (
                          <div className="p-3 border rounded bg-light text-center">
                            <p className="mb-2"><i className="bi bi-qr-code me-2"></i><strong>QRIS</strong></p>
                            <hr />
                            <img src={qrCodeUrl} alt="QRIS Code" className="img-fluid mb-2" style={{ maxWidth: "200px" }} />
                            <br />
                            <button type="button" className="btn btn-outline-primary btn-sm" onClick={downloadQRCode}>
                              <i className="bi bi-download me-2"></i>Download QR Code
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="alert alert-warning">
                      <i className="bi bi-exclamation-triangle me-2"></i>
                      Please complete your payment and upload the proof to process your order.
                    </div>

                    {!isPaymentProofUploaded ? (
                      <>
                        <div className="form-group">
                          <label htmlFor="payment-proof">Upload Payment Proof</label>
                          <input type="file" className="form-control" id="payment-proof" accept="image/*" onChange={handlePaymentProofUpload} />
                          <small className="text-muted">Accepted formats: JPG, PNG, PDF (Max 5MB)</small>
                        </div>

                        {paymentProofPreview && (
                          <div className="mt-3 text-center">
                            <img src={paymentProofPreview} alt="Payment Proof Preview" className="img-fluid border rounded" style={{ maxHeight: "400px" }} />
                          </div>
                        )}

                        <div className="d-flex justify-content-between mt-4">
                          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate("/profile")}>
                            Back to Order History
                          </button>
                          <button type="button" className="btn btn-success" onClick={handleSubmitPaymentProof} disabled={!paymentProof}>
                            Submit Payment Proof
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="alert alert-success">
                          <i className="bi bi-check-circle me-2"></i>
                          Payment proof uploaded successfully! Your order is being processed.
                        </div>
                        <div className="text-end mt-4">
                          <button type="button" className="btn btn-primary" onClick={() => navigate("/profile")}>
                            View Order History
                          </button>
                        </div>
                      </>
                    )}
                  </form>
                </div>
              </div>

              {/* Order Summary */}
              <div className="col-lg-4">
                <div className="order-summary" data-aos-delay="200">
                  <div className="order-summary-header">
                    <h3>Order Summary</h3>
                  </div>
                  <div className="order-summary-content">
                    <div className="order-items">
                      {cartList.map((cart, key) => (
                        <div className="order-item" key={key}>
                          <div className="order-item-image">
                            <img src={`http://127.0.0.1:8000/images/${cart.image}`} alt="Product" className="img-fluid" />
                          </div>
                          <div className="order-item-details">
                            <h4>{cart.product}</h4>
                            <div className="order-item-price">
                              <span className="quantity">{cart.qty} ×</span>
                              <span className="price">Rp.{Number(cart.price).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {infolist.map((info, key) => (
                        <div className="order-totals" key={key}>
                          <div className="order-subtotal d-flex justify-content-between"><span>Subtotal</span><span>Rp.{Number(info.subtotal).toLocaleString()}</span></div>
                          <div className="order-shipping d-flex justify-content-between"><span>Ongkir ({courier.toUpperCase()})</span><span>Rp.{Number(info.ongkir).toLocaleString()}</span></div>
                          <div className="order-shipping d-flex justify-content-between"><span>Biaya Layanan</span><span>Rp.{Number(info.biaya_layanan).toLocaleString()}</span></div>
                          <div className="order-total d-flex justify-content-between"><span>Total</span><span>Rp.{Number(info.total).toLocaleString()}</span></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
