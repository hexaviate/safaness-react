/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function CheckoutConfirmation() {
  const [id, setId] = useState();
  const [infolist, setInfoList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [courier, setCourier] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [addresses, setAddresses] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [currentStep, setCurrentStep] = useState(1);
  const [paymentProof, setPaymentProof] = useState(null);
  const [paymentProofPreview, setPaymentProofPreview] = useState(null);
  const [isPaymentProofUploaded, setIsPaymentProofUploaded] = useState(false);
  const navigate = useNavigate();

  // Bank Transfer Data
  const bankData = {
    bank_name: "Bank BCA",
    account_number: "1234567890",
    account_holder: "PT TOKO ONLINE",
  };

  // QR Code Data
  const qrCodeUrl = "http://127.0.0.1:8000/images/qris-sample.png"; // Ganti dengan URL QR code Anda

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    fetchCartList();
    fetchAddresses();
    fetchInfoList();
  }, []);

  useEffect(() => {
    if (courier) {
      fetchInfoList();
    }
  }, [courier]);

  const fetchInfoList = () => {
    axios
      .post("/infoCart2", {
        courier: courier,
      })
      .then((response) => {
        setInfoList([response.data.data]);
      });
  };

  const fetchCartList = () => {
    axios.get("/admin/cart").then(function (response) {
      setCartList(response.data.data);
    });
  };

  const fetchAddresses = () => {
    // API untuk fetch alamat user
    axios
      .get("/adress")
      .then(function (response) {
        setAddresses(response.data.data);
      })
      .catch((err) => {
        // Dummy data jika API belum ada
        setAddresses([
          {
            id: 1,
            label: "Rumah",
            address: "Jl. Contoh No. 123, Jakarta",
            zipcode: "12345",
          },
          {
            id: 2,
            label: "Kantor",
            address: "Jl. Bisnis No. 456, Jakarta",
            zipcode: "54321",
          },
        ]);
      });
  };

  const handleAddressChange = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

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
    // formData.append("transaction_id", "TRANSACTION_ID"); // Ganti dengan transaction ID yang sesuai

    axios
      .post(`/uploadPayment/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(function (res) {
        setIsPaymentProofUploaded(true);
        alert("Payment proof uploaded successfully!");
        navigate("/profile");
      })
      .catch((err) => {
        alert("Failed to upload payment proof");
      });
  };

  const handleNextStep = (nextStep) => {
    setCurrentStep(nextStep);
    updateStepIndicator(nextStep);
  };

  const handlePrevStep = (prevStep) => {
    setCurrentStep(prevStep);
    updateStepIndicator(prevStep);
  };

  const updateStepIndicator = (step) => {
    // Update visual step indicator
  };

  const handlePlaceOrder = () => {
    axios
      .post("/admin/transaction", {
        courier: courier,
        adress_id: selectedAddress,
        payment_method: paymentMethod,
      })
      .then(function (res) {
        // Langsung ke step upload bukti pembayaran
        console.log(res.data.transaction.id);
        setId(res.data.transaction.id);
        setCurrentStep(5);
      });
  };

  const downloadQRCode = () => {
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qris-payment.png";
    link.click();
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
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li className="current">Checkout</li>
              </ol>
            </nav>
            <h1>Checkout</h1>
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

                {/* Step 1: Customer Information (Read Only) */}
                {currentStep === 1 && (
                  <div className="checkout-form active">
                    <div className="form-header">
                      <h3>Customer Information</h3>
                      <p>Your contact details</p>
                    </div>
                    <form className="checkout-form-element">
                      {infolist.map((info, key) => (
                        <div key={key}>
                          <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name"
                              value={info.name || ""}
                              readOnly
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="email">Email Address</label>
                            <input
                              type="email"
                              className="form-control"
                              id="email"
                              value={info.email || ""}
                              readOnly
                            />
                          </div>
                          <div className="form-group mt-3">
                            <label htmlFor="phone">Phone Number</label>
                            <input
                              type="tel"
                              className="form-control"
                              id="phone"
                              value={info.phone || ""}
                              readOnly
                            />
                          </div>
                        </div>
                      ))}
                      <div className="text-end mt-4">
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleNextStep(2)}
                        >
                          Continue to Shipping
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Step 2: Shipping Address */}
                {currentStep === 2 && (
                  <div className="checkout-form active">
                    <div className="form-header">
                      <h3>Shipping Address</h3>
                      <p>Select your delivery address</p>
                    </div>
                    <form className="checkout-form-element">
                      <div className="form-group">
                        <label htmlFor="address-select">Select Address</label>
                        <select
                          className="form-select"
                          id="address-select"
                          value={selectedAddress}
                          onChange={handleAddressChange}
                          required
                        >
                          <option value="">-- Pilih Alamat --</option>
                          {addresses.map((addr) => (
                            <option key={addr.id} value={addr.id}>
                              {addr.adress_name} - {addr.adress}
                            </option>
                          ))}
                        </select>
                      </div>

                      {selectedAddress && (
                        <div className="mt-3 p-3 border rounded">
                          <h5>Selected Address:</h5>
                          {addresses.find((a) => a.id == selectedAddress) && (
                            <>
                              <p className="mb-1">
                                {
                                  addresses.find((a) => a.id == selectedAddress)
                                    .adress
                                }
                              </p>
                              <p className="mb-0">
                                Zipcode:{" "}
                                {
                                  addresses.find((a) => a.id == selectedAddress)
                                    .zipcode
                                }
                              </p>
                              <p className="mb-0">Indonesia</p>
                            </>
                          )}
                        </div>
                      )}

                      <div className="form-group mt-3">
                        <label htmlFor="courier-select">Select Courier</label>
                        <select
                          className="form-select"
                          id="courier-select"
                          value={courier}
                          onChange={(e) => setCourier(e.target.value)}
                          required
                        >
                          <option value="">-- Pilih Kurir --</option>
                          <option value="jne">JNE</option>
                          <option value="jnt">J&T</option>
                          <option value="tiki">TIKI</option>
                        </select>
                      </div>

                      <div className="d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handlePrevStep(1)}
                        >
                          Back to Information
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleNextStep(3)}
                          disabled={!selectedAddress || !courier}
                        >
                          Continue to Payment
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Step 3: Payment Method */}
                {currentStep === 3 && (
                  <div className="checkout-form active">
                    <div className="form-header">
                      <h3>Payment Method</h3>
                      <p>Choose how you'd like to pay</p>
                    </div>
                    <form className="checkout-form-element">
                      <div className="payment-methods">
                        {/* Bank Transfer */}
                        <div
                          className={`payment-method ${
                            paymentMethod === "bank_transfer" ? "active" : ""
                          }`}
                        >
                          <div className="payment-method-header">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="payment-method"
                                id="bank-transfer"
                                checked={paymentMethod === "bank_transfer"}
                                onChange={() =>
                                  handlePaymentMethodChange("bank_transfer")
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="bank-transfer"
                              >
                                Bank Transfer
                              </label>
                            </div>
                          </div>
                          {paymentMethod === "bank_transfer" && (
                            <div className="payment-method-body mt-3 p-3 border rounded">
                              <h5>Transfer Details:</h5>
                              <p className="mb-1">
                                <strong>Bank:</strong> {bankData.bank_name}
                              </p>
                              <p className="mb-1">
                                <strong>Account Number:</strong>{" "}
                                {bankData.account_number}
                              </p>
                              <p className="mb-0">
                                <strong>Account Holder:</strong>{" "}
                                {bankData.account_holder}
                              </p>
                              <div className="alert alert-info mt-3 mb-0">
                                <small>
                                  Please transfer the exact amount and upload
                                  the payment proof in the next step.
                                </small>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* QRIS */}
                        <div
                          className={`payment-method mt-3 ${
                            paymentMethod === "qris" ? "active" : ""
                          }`}
                        >
                          <div className="payment-method-header">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="payment-method"
                                id="qris"
                                checked={paymentMethod === "qris"}
                                onChange={() =>
                                  handlePaymentMethodChange("qris")
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="qris"
                              >
                                QRIS
                              </label>
                            </div>
                          </div>
                          {paymentMethod === "qris" && (
                            <div className="payment-method-body mt-3 p-3 border rounded text-center">
                              <h5>Scan QR Code:</h5>
                              <img
                                src={qrCodeUrl}
                                alt="QRIS Code"
                                className="img-fluid mb-3"
                                style={{ maxWidth: "300px" }}
                              />
                              <br />
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={downloadQRCode}
                              >
                                <i className="bi bi-download me-2"></i>Download
                                QR Code
                              </button>
                              <div className="alert alert-info mt-3 mb-0">
                                <small>
                                  Scan this QR code with your e-wallet app and
                                  upload the payment proof in the next step.
                                </small>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handlePrevStep(2)}
                        >
                          Back to Shipping
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={() => handleNextStep(4)}
                        >
                          Review Order
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Step 4: Order Review */}
                {currentStep === 4 && (
                  <div className="checkout-form active">
                    <div className="form-header">
                      <h3>Review Your Order</h3>
                      <p>
                        Please review your information before placing your order
                      </p>
                    </div>
                    <form className="checkout-form-element">
                      {infolist.map((info, key) => (
                        <div className="review-sections" key={key}>
                          <div className="review-section">
                            <div className="review-section-header">
                              <h4>Contact Information</h4>
                            </div>
                            <div className="review-section-content">
                              <p className="review-name">{info.name}</p>
                              <p className="review-email">{info.email}</p>
                              <p className="review-phone">+62 {info.phone}</p>
                            </div>
                          </div>

                          <div className="review-section mt-3">
                            <div className="review-section-header">
                              <h4>Shipping Address</h4>
                              <button
                                type="button"
                                className="btn-edit"
                                onClick={() => handlePrevStep(2)}
                              >
                                Edit
                              </button>
                            </div>
                            <div className="review-section-content">
                              {selectedAddress &&
                                addresses.find(
                                  (a) => a.id == selectedAddress
                                ) && (
                                  <>
                                    <p>
                                      {
                                        addresses.find(
                                          (a) => a.id == selectedAddress
                                        ).address
                                      }
                                    </p>
                                    <p>
                                      {
                                        addresses.find(
                                          (a) => a.id == selectedAddress
                                        ).zipcode
                                      }
                                    </p>
                                    <p>Indonesia</p>
                                    <p>
                                      <strong>Courier:</strong>{" "}
                                      {courier.toUpperCase()}
                                    </p>
                                  </>
                                )}
                            </div>
                          </div>

                          <div className="review-section mt-3">
                            <div className="review-section-header">
                              <h4>Payment Method</h4>
                              <button
                                type="button"
                                className="btn-edit"
                                onClick={() => handlePrevStep(3)}
                              >
                                Edit
                              </button>
                            </div>
                            <div className="review-section-content">
                              {paymentMethod === "bank_transfer" && (
                                <>
                                  <p>
                                    <i className="bi bi-bank me-2"></i>Bank
                                    Transfer
                                  </p>
                                  <p className="mb-0">
                                    <small>
                                      {bankData.bank_name} -{" "}
                                      {bankData.account_number}
                                    </small>
                                  </p>
                                </>
                              )}
                              {paymentMethod === "qris" && (
                                <p>
                                  <i className="bi bi-qr-code me-2"></i>QRIS
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="form-check mt-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="terms"
                          name="terms"
                          required
                        />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to the Terms and Conditions and Privacy Policy
                        </label>
                      </div>

                      <div className="d-flex justify-content-between mt-4">
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={() => handlePrevStep(3)}
                        >
                          Back to Payment
                        </button>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={handlePlaceOrder}
                        >
                          Place Order
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Step 5: Upload Payment Proof */}
                {currentStep === 5 && (
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
                              <p className="mb-2">
                                <i className="bi bi-bank me-2"></i>
                                <strong>Bank Transfer</strong>
                              </p>
                              <hr />
                              <p className="mb-1">
                                <strong>Bank:</strong> {bankData.bank_name}
                              </p>
                              <p className="mb-1">
                                <strong>Account Number:</strong>{" "}
                                {bankData.account_number}
                              </p>
                              <p className="mb-0">
                                <strong>Account Holder:</strong>{" "}
                                {bankData.account_holder}
                              </p>
                            </div>
                          )}
                          {paymentMethod === "qris" && (
                            <div className="p-3 border rounded bg-light text-center">
                              <p className="mb-2">
                                <i className="bi bi-qr-code me-2"></i>
                                <strong>QRIS</strong>
                              </p>
                              <hr />
                              <img
                                src={qrCodeUrl}
                                alt="QRIS Code"
                                className="img-fluid mb-2"
                                style={{ maxWidth: "200px" }}
                              />
                              <br />
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={downloadQRCode}
                              >
                                <i className="bi bi-download me-2"></i>Download
                                QR Code
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="alert alert-warning">
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        Please complete your payment and upload the proof to
                        process your order.
                      </div>

                      {!isPaymentProofUploaded ? (
                        <>
                          <div className="form-group">
                            <label htmlFor="payment-proof">
                              Upload Payment Proof
                            </label>
                            <input
                              type="file"
                              className="form-control"
                              id="payment-proof"
                              accept="image/*"
                              onChange={handlePaymentProofUpload}
                            />
                            <small className="text-muted">
                              Accepted formats: JPG, PNG, PDF (Max 5MB)
                            </small>
                          </div>

                          {paymentProofPreview && (
                            <div className="mt-3 text-center">
                              <img
                                src={paymentProofPreview}
                                alt="Payment Proof Preview"
                                className="img-fluid border rounded"
                                style={{ maxHeight: "400px" }}
                              />
                            </div>
                          )}

                          <div className="text-end mt-4">
                            <button
                              type="button"
                              className="btn btn-success"
                              onClick={handleSubmitPaymentProof}
                              disabled={!paymentProof}
                            >
                              Submit Payment Proof
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="alert alert-success">
                          <i className="bi bi-check-circle me-2"></i>
                          Payment proof uploaded successfully! Your order is
                          being processed.
                        </div>
                      )}
                    </form>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              <div className="col-lg-4">
                <div
                  className="order-summary aos-init aos-animate"
                  data-aos-delay="200"
                >
                  <div className="order-summary-header">
                    <h3>Order Summary</h3>
                  </div>

                  <div className="order-summary-content">
                    <div className="order-items">
                      {cartList.map((cart, key) => (
                        <div className="order-item" key={key}>
                          <div className="order-item-image">
                            <img
                              src={"http://127.0.0.1:8000/images/" + cart.image}
                              alt="Product"
                              className="img-fluid"
                              loading="lazy"
                            />
                          </div>
                          <div className="order-item-details">
                            <h4>{cart.product}</h4>
                            <div className="order-item-price">
                              <span className="quantity">{cart.qty} ×</span>
                              <span className="price">
                                Rp.{Number(cart.price).toLocaleString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}

                      {infolist.map((info, key) => (
                        <div className="order-totals" key={key}>
                          <div className="order-subtotal d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>
                              Rp.{Number(info.subtotal).toLocaleString()}
                            </span>
                          </div>
                          <div className="order-shipping d-flex justify-content-between">
                            <span>Ongkir</span>
                            <span>
                              Rp.{Number(info.ongkir).toLocaleString()}
                            </span>
                          </div>
                          <div className="order-shipping d-flex justify-content-between">
                            <span>Biaya Layanan</span>
                            <span>
                              Rp.{Number(info.biaya_layanan).toLocaleString()}
                            </span>
                          </div>
                          <div className="order-total d-flex justify-content-between">
                            <span>Total</span>
                            <span>
                              Rp.{Number(info.total).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      ))}

                      <div className="secure-checkout mt-4">
                        <div className="secure-checkout-header">
                          <i className="bi bi-shield-lock"></i>
                          <span>Secure Checkout</span>
                        </div>
                        <div className="payment-icons mt-2">
                          <i className="bi bi-credit-card-2-front"></i>
                          <i className="bi bi-qr-code"></i>
                        </div>
                      </div>
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
