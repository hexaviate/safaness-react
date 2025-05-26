import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";


export default function ProductDetail() {
    const [id] = useState(useParams().id);
  const [product, setProductDetail] = useState([]);

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = () => {
    axios
      .get(`/admin/product/${id}`)
      .then(function (response) {
        setProductDetail([response.data.data[0]]);
        console.log(response.data.data[0]);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <header id="header" className="header position-relative">
        <Navbar />
        <Navigation />
      </header>

      <main className="main">
        <section id="product-details" className="product-details section" >
        {product.map((detail, key)=>{
            return (
          <div className="container" data-aos="fade-up" data-aos-delay="100" key={key}>
            <div className="row g-5">
              {/* <!-- Product Images Column --> */}
              <div
                className="col-lg-6 mb-5 mb-lg-0"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="product-gallery">
                  {/* <!-- Vertical Thumbnails --> */}
                  <div className="thumbnails-vertical">
                    <div className="thumbnails-container">
                      <div
                        className="thumbnail-item active"
                        data-image="assets/img/product/product-details-1.webp"
                      >
                        <img
                          src="assets/img/product/product-details-1.webp"
                          alt="Product Thumbnail"
                          className="img-fluid"
                        />
                      </div>
                      <div
                        className="thumbnail-item"
                        data-image="assets/img/product/product-details-2.webp"
                      >
                        <img
                          src="assets/img/product/product-details-2.webp"
                          alt="Product Thumbnail"
                          className="img-fluid"
                        />
                      </div>
                      <div
                        className="thumbnail-item"
                        data-image="assets/img/product/product-details-3.webp"
                      >
                        <img
                          src="assets/img/product/product-details-3.webp"
                          alt="Product Thumbnail"
                          className="img-fluid"
                        />
                      </div>
                      <div
                        className="thumbnail-item"
                        data-image="assets/img/product/product-details-4.webp"
                      >
                        <img
                          src="assets/img/product/product-details-4.webp"
                          alt="Product Thumbnail"
                          className="img-fluid"
                        />
                      </div>
                      <div
                        className="thumbnail-item"
                        data-image="assets/img/product/product-details-5.webp"
                      >
                        <img
                          src="assets/img/product/product-details-5.webp"
                          alt="Product Thumbnail"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>

                  {/* <!-- Main Image --> */}
                  <div className="main-image-wrapper">
                    <div className="image-zoom-container">
                      <a
                        href="assets/img/product/product-details-1.webp"
                        className="glightbox"
                        data-gallery="product-gallery"
                      >
                        <img
                          src="assets/img/product/product-details-1.webp"
                          alt="Product Image"
                          className="img-fluid main-image drift-zoom"
                          id="main-product-image"
                          data-zoom="assets/img/product/product-details-1.webp"
                        />
                        <div className="zoom-overlay">
                          <i className="bi bi-zoom-in"></i>
                        </div>
                      </a>
                    </div>
                    <div className="image-nav">
                      <button className="image-nav-btn prev-image">
                        <i className="bi bi-chevron-left"></i>
                      </button>
                      <button className="image-nav-btn next-image">
                        <i className="bi bi-chevron-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Product Info Column --> */}
              <div className="col-lg-6" data-aos="fade-left" data-aos-delay="200">
                <div className="product-info-wrapper" id="product-info-sticky">
                  {/* <!-- Product Meta --> */}
                  <div className="product-meta">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="product-category">{detail.sub_category}</span>
                      <div className="product-share">
                        <button className="share-btn" aria-label="Share product">
                          <i className="bi bi-share"></i>
                        </button>
                        <div className="share-dropdown">
                          <a href="#" aria-label="Share on Facebook">
                            <i className="bi bi-facebook"></i>
                          </a>
                          <a href="#" aria-label="Share on Twitter">
                            <i className="bi bi-twitter-x"></i>
                          </a>
                          <a href="#" aria-label="Share on Pinterest">
                            <i className="bi bi-pinterest"></i>
                          </a>
                          <a href="#" aria-label="Share via Email">
                            <i className="bi bi-envelope"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Product Price --> */}
                  <div className="product-price-container">
                    <div className="price-wrapper">
                      <span className="current-price">$249.99</span>
                      <span className="original-price">$299.99</span>
                    </div>
                    <span className="discount-badge">Save 17%</span>
                    <div className="stock-info">
                      <i className="bi bi-check-circle-fill"></i>
                      <span>In Stock</span>
                      <span className="stock-count">(24 items left)</span>
                    </div>
                  </div>

                  {/* <!-- Product Description --> */}
                  <div className="product-short-description">
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vestibulum at lacus congue, suscipit elit nec, tincidunt
                      orci. Phasellus egestas nisi vitae lectus imperdiet
                      venenatis.
                    </p>
                  </div>

                  {/* <!-- Product Options --> */}
                  <div className="product-options">
                    {/* <!-- Color Options --> */}
                    

                    {/* <!-- Quantity Selector --> */}
                    <div className="option-group">
                      <h6 className="option-title">Quantity</h6>
                      <div className="quantity-selector">
                        <button className="quantity-btn decrease">
                          <i className="bi bi-dash"></i>
                        </button>
                        <input
                          type="number"
                          className="quantity-input"
                        />
                        <button className="quantity-btn increase">
                          <i className="bi bi-plus"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Action Buttons --> */}
                  <div className="product-actions">
                    <button className="btn btn-primary add-to-cart-btn">
                      <i className="bi bi-cart-plus"></i> Add to Cart
                    </button>
                    <button className="btn btn-outline-primary buy-now-btn">
                      <i className="bi bi-lightning-fill"></i> Buy Now
                    </button>
                    <button
                      className="btn btn-outline-secondary wishlist-btn"
                      aria-label="Add to wishlist"
                    >
                      <i className="bi bi-heart"></i>
                    </button>
                  </div>

                  {/* <!-- Delivery Options --> */}
                  <div className="delivery-options">
                    <div className="delivery-option">
                      <i className="bi bi-truck"></i>
                      <div>
                        <h6>Free Shipping</h6>
                        <p>On orders over $50</p>
                      </div>
                    </div>
                    <div className="delivery-option">
                      <i className="bi bi-arrow-repeat"></i>
                      <div>
                        <h6>30-Day Returns</h6>
                        <p>Hassle-free returns</p>
                      </div>
                    </div>
                    <div className="delivery-option">
                      <i className="bi bi-shield-check"></i>
                      <div>
                        <h6>2-Year Warranty</h6>
                        <p>Full coverage</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Sticky Add to Cart Bar (appears on scroll) --> */}
            <div className="sticky-add-to-cart">
              <div className="container">
                <div className="sticky-content">
                  <div className="product-preview">
                    <img
                      src="assets/img/product/product-details-1.webp"
                      alt="Product"
                      className="product-thumbnail"
                    />
                    <div className="product-info">
                      <h5 className="product-title">
                        Lorem Ipsum Wireless Headphones
                      </h5>
                      <div className="product-price">$249.99</div>
                    </div>
                  </div>
                  <div className="sticky-actions">
                    <div className="quantity-selector">
                      <button className="quantity-btn decrease">
                        <i className="bi bi-dash"></i>
                      </button>
                      <input
                        type="number"
                        className="quantity-input"
                      />
                      <button className="quantity-btn increase">
                        <i className="bi bi-plus"></i>
                      </button>
                    </div>
                    <button className="btn btn-primary add-to-cart-btn">
                      <i className="bi bi-cart-plus"></i> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* <!-- Product Details Accordion --> */}
            <div className="row mt-5" data-aos="fade-up">
              <div className="col-12">
                <div className="product-details-accordion">
                  {/* <!-- Description Accordion --> */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#description"
                        aria-expanded="true"
                        aria-controls="description"
                      >
                        {/* Product Description */}
                      </button>
                    </h2>
                    <div
                      id="description"
                      className="accordion-collapse collapse show"
                    >
                      <div className="accordion-body">
                        <div className="product-description">
                          <h4>Product Overview</h4>
                          <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Vestibulum at lacus congue, suscipit elit nec,
                            tincidunt orci. Phasellus egestas nisi vitae lectus
                            imperdiet venenatis. Suspendisse vulputate quam
                            diam, et consectetur augue condimentum in. Aenean
                            dapibus urna eget nisi pharetra, in iaculis nulla
                            blandit. Praesent at consectetur sem, sed
                            sollicitudin nibh. Ut interdum risus ac nulla
                            placerat aliquet.
                          </p>

                          <div className="row mt-4">
                            <div className="col-md-6">
                              <h4>Key Features</h4>
                              <ul className="feature-list">
                                <li>
                                  <i className="bi bi-check-circle"></i> Lorem ipsum
                                  dolor sit amet, consectetur adipiscing elit
                                </li>
                                <li>
                                  <i className="bi bi-check-circle"></i> Vestibulum
                                  at lacus congue, suscipit elit nec, tincidunt
                                  orci
                                </li>
                                <li>
                                  <i className="bi bi-check-circle"></i> Phasellus
                                  egestas nisi vitae lectus imperdiet venenatis
                                </li>
                                <li>
                                  <i className="bi bi-check-circle"></i> Suspendisse
                                  vulputate quam diam, et consectetur augue
                                </li>
                                <li>
                                  <i className="bi bi-check-circle"></i> Aenean
                                  dapibus urna eget nisi pharetra, in iaculis
                                  nulla
                                </li>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h4>What's in the Box</h4>
                              <ul className="feature-list">
                                <li>
                                  <i className="bi bi-box"></i> Lorem Ipsum Wireless
                                  Headphones
                                </li>
                                <li>
                                  <i className="bi bi-box"></i> Carrying Case
                                </li>
                                <li>
                                  <i className="bi bi-box"></i> USB-C Charging Cable
                                </li>
                                <li>
                                  <i className="bi bi-box"></i> 3.5mm Audio Cable
                                </li>
                                <li>
                                  <i className="bi bi-box"></i> User Manual
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Specifications Accordion --> */}
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#specifications"
                        aria-expanded="false"
                        aria-controls="specifications"
                      >
                        Technical Specifications
                      </button>
                    </h2>
                    <div
                      id="specifications"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        <div className="product-specifications">
                          <div className="row">
                            <div className="col-md-6">
                              <div className="specs-group">
                                <h4>Technical Specifications</h4>
                                <div className="specs-table">
                                  <div className="specs-row">
                                    <div className="specs-label">Connectivity</div>
                                    <div className="specs-value">
                                      Bluetooth 5.0, 3.5mm jack
                                    </div>
                                  </div>
                                  <div className="specs-row">
                                    <div className="specs-label">Battery Life</div>
                                    <div className="specs-value">
                                      Up to 30 hours
                                    </div>
                                  </div>
                                  <div className="specs-row">
                                    <div className="specs-label">Charging Time</div>
                                    <div className="specs-value">3 hours</div>
                                  </div>
                                  <div className="specs-row">
                                    <div className="specs-label">Driver Size</div>
                                    <div className="specs-value">40mm</div>
                                  </div>
                                  <div className="specs-row">
                                    <div className="specs-label">
                                      Frequency Response
                                    </div>
                                    <div className="specs-value">20Hz - 20kHz</div>
                                  </div>
                                  <div className="specs-row">
                                    <div className="specs-label">Impedance</div>
                                    <div className="specs-value">32 Ohm</div>
                                  </div>
                                  <div className="specs-row">
                                    <div className="specs-label">Weight</div>
                                    <div className="specs-value">250g</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="specs-group">
                                <h4>Features</h4>
                                <div className="specs-table">
                                  <div className="specs-row">
                                    <div className="specs-label">
                                      Noise Cancellation
                                    </div>
                                    <div className="specs-value">
                                      Active Noise Cancellation (ANC)
                                    </div>
                                  </div>
                                  <div className="specs-row">
                                    <div className="specs-label">Controls</div>
                                    <div className="specs-value">
                                      Touch controls, Voice assistant
                                    </div>
                                  </div>
                                  <div className="specs-row">
                                    <div className="specs-label">Microphone</div>
                                    <div className="specs-value">
                                      Dual beamforming microphones
                                    </div>
                                  </div>
                                  <div className="specs-row">
                                    <div className="specs-label">
                                      Water Resistance
                                    </div>
                                    <div className="specs-value">
                                      IPX4 (splash resistant)
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* <!-- Reviews Accordion --> */}
                  <div className="accordion-item" id="reviews">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#reviewsContent"
                        aria-expanded="false"
                        aria-controls="reviewsContent"
                      >
                        Customer Reviews (42)
                      </button>
                    </h2>
                    <div
                      id="reviewsContent"
                      className="accordion-collapse collapse"
                    >
                      <div className="accordion-body">
                        <div className="product-reviews">
                          <div className="reviews-summary">
                            <div className="row">
                              <div className="col-lg-4">
                                <div className="overall-rating">
                                  <div className="rating-number">4.5</div>
                                  <div className="rating-stars">
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-fill"></i>
                                    <i className="bi bi-star-half"></i>
                                  </div>
                                  <div className="rating-count">
                                    Based on 42 reviews
                                  </div>
                                </div>
                              </div>

                              <div className="col-lg-8">
                                <div className="rating-breakdown">
                                  <div className="rating-bar">
                                    <div className="rating-label">5 stars</div>
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{width: "65%"}}
                                        aria-valuenow="65"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      ></div>
                                    </div>
                                    <div className="rating-count">27</div>
                                  </div>
                                  <div className="rating-bar">
                                    <div className="rating-label">4 stars</div>
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{width: "25%"}}
                                        aria-valuenow="25"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      ></div>
                                    </div>
                                    <div className="rating-count">10</div>
                                  </div>
                                  <div className="rating-bar">
                                    <div className="rating-label">3 stars</div>
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{width: "8%"}}
                                        aria-valuenow="8"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      ></div>
                                    </div>
                                    <div className="rating-count">3</div>
                                  </div>
                                  <div className="rating-bar">
                                    <div className="rating-label">2 stars</div>
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{width: "2%"}}
                                        aria-valuenow="2"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      ></div>
                                    </div>
                                    <div className="rating-count">1</div>
                                  </div>
                                  <div className="rating-bar">
                                    <div className="rating-label">1 star</div>
                                    <div className="progress">
                                      <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{width: "2%"}}
                                        aria-valuenow="2"
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                      ></div>
                                    </div>
                                    <div className="rating-count">1</div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="reviews-list">
                            {/* <!-- Review Item --> */}
                            <div className="review-item">
                              <div className="review-header">
                                <div className="reviewer-info">
                                  <img
                                    src="assets/img/person/person-m-1.webp"
                                    alt="Reviewer"
                                    className="reviewer-avatar"
                                  />
                                  <div>
                                    <h5 className="reviewer-name">John Doe</h5>
                                    <div className="review-date">03/15/2024</div>
                                  </div>
                                </div>
                                <div className="review-rating">
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                </div>
                              </div>
                              <h5 className="review-title">
                                Exceptional sound quality and comfort
                              </h5>
                              <div className="review-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Vestibulum at lacus congue,
                                  suscipit elit nec, tincidunt orci. Phasellus
                                  egestas nisi vitae lectus imperdiet venenatis.
                                  Suspendisse vulputate quam diam, et
                                  consectetur augue condimentum in.
                                </p>
                              </div>
                            </div>
                            {/* <!-- End Review Item --> */}

                            {/* <!-- Review Item --> */}
                            <div className="review-item">
                              <div className="review-header">
                                <div className="reviewer-info">
                                  <img
                                    src="assets/img/person/person-f-2.webp"
                                    alt="Reviewer"
                                    className="reviewer-avatar"
                                  />
                                  <div>
                                    <h5 className="reviewer-name">Jane Smith</h5>
                                    <div className="review-date">02/28/2024</div>
                                  </div>
                                </div>
                                <div className="review-rating">
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star"></i>
                                </div>
                              </div>
                              <h5 className="review-title">
                                Great headphones, battery could be better
                              </h5>
                              <div className="review-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Vestibulum at lacus congue,
                                  suscipit elit nec, tincidunt orci. Phasellus
                                  egestas nisi vitae lectus imperdiet venenatis.
                                </p>
                              </div>
                            </div>
                            {/* <!-- End Review Item --> */}

                            {/* <!-- Review Item --> */}
                            <div className="review-item">
                              <div className="review-header">
                                <div className="reviewer-info">
                                  <img
                                    src="assets/img/person/person-m-3.webp"
                                    alt="Reviewer"
                                    className="reviewer-avatar"
                                  />
                                  <div>
                                    <h5 className="reviewer-name">
                                      Michael Johnson
                                    </h5>
                                    <div className="review-date">02/15/2024</div>
                                  </div>
                                </div>
                                <div className="review-rating">
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-fill"></i>
                                  <i className="bi bi-star-half"></i>
                                </div>
                              </div>
                              <h5 className="review-title">
                                Impressive noise cancellation
                              </h5>
                              <div className="review-content">
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Vestibulum at lacus congue,
                                  suscipit elit nec, tincidunt orci. Phasellus
                                  egestas nisi vitae lectus imperdiet venenatis.
                                  Suspendisse vulputate quam diam.
                                </p>
                              </div>
                            </div>
                            {/* <!-- End Review Item --> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
            )
        })}
        </section>
      </main>
      </ErrorBoundary>
    </>
  );
}
