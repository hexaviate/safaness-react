import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import axios from "axios";

export default function CheckoutConfirmation() {


  return(
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

      <div class="container"  data-aos-delay="100">

        <div class="row">
          <div class="col-lg-8">
            {/* <!-- Checkout Steps --> */}

            {/* <!-- Checkout Forms Container --> */}
            <div class="checkout-forms"  data-aos-delay="150">
              
              {/* <!-- Step 4: Order Review --> */}
              <div class="checkout-form-active" data-form="1">
                <div class="form-header">
                  <h3>Review Your Order</h3>
                  <p>Please review your information before placing your order</p>
                </div>
                <form class="checkout-form-element">
                  <div class="review-sections">
                    <div class="review-section">
                      <div class="review-section-header">
                        <h4>Contact Information</h4>
                        <button type="button" class="btn-edit" data-edit="1">Edit</button>
                      </div>
                      <div class="review-section-content">
                        <p class="review-name">John Doe</p>
                        <p class="review-email">johndoe@example.com</p>
                        <p class="review-phone">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div class="review-section mt-3">
                      <div class="review-section-header">
                        <h4>Shipping Address</h4>
                        <button type="button" class="btn-edit" data-edit="2">Edit</button>
                      </div>
                      <div class="review-section-content">
                        <p>123 Main Street, Apt 4B</p>
                        <p>New York, NY 10001</p>
                        <p>United States</p>
                      </div>
                    </div>

                    <div class="review-section mt-3">
                      <div class="review-section-header">
                        <h4>Kurir</h4>
                        <button type="button" class="btn-edit" data-edit="3">Edit</button>
                      </div>
                      <div class="review-section-content">
                        <p><i class="bi bi-credit-card-2-front me-2"></i> JNT (COD)</p>
                      </div>
                    </div>
                  </div>

                  <div class="success-message d-none">Your order has been placed successfully! Thank you for your purchase.</div>
                  <div class="d-flex justify-content-between mt-4">
                    <button type="button" class="btn btn-outline-secondary prev-step" data-prev="3">Back to Cart</button>
                    <button type="submit" class="btn btn-success place-order-btn">Place Order</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div class="col-lg-4">
            {/* <!-- Order Summary --> */}
            <div class="order-summary"  data-aos-delay="200">
              <div class="order-summary-header">
                <h3>Order Summary</h3>
                <button type="button" class="btn-toggle-summary d-lg-none">
                  <i class="bi bi-chevron-down"></i>
                </button>
              </div>

              <div class="order-summary-content">
                <div class="order-items">
                  <div class="order-item">
                    <div class="order-item-image">
                      <img src="assets/img/product/product-1.webp" alt="Product" class="img-fluid"/>
                    </div>
                    <div class="order-item-details">
                      <h4>Lorem Ipsum Dolor</h4>
                      <p class="order-item-variant">Color: Black | Size: M</p>
                      <div class="order-item-price">
                        <span class="quantity">1 ×</span>
                        <span class="price">$89.99</span>
                      </div>
                    </div>
                  </div>

                <div class="order-totals">
                  <div class="order-subtotal d-flex justify-content-between">
                    <span>Subtotal</span>
                    <span>$209.97</span>
                  </div>
                  <div class="order-shipping d-flex justify-content-between">
                    <span>Shipping</span>
                    <span>$9.99</span>
                  </div>
                  <div class="order-tax d-flex justify-content-between">
                    <span>Tax</span>
                    <span>$21.00</span>
                  </div>
                  <div class="order-total d-flex justify-content-between">
                    <span>Total</span>
                    <span>$240.96</span>
                  </div>
                </div>

                <div class="promo-code mt-3">
                  <div class="input-group">
                    <input type="text" class="form-control" placeholder="Promo Code" aria-label="Promo Code"/>
                    <button class="btn btn-outline-primary" type="button">Apply</button>
                  </div>
                </div>

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
  )
}
