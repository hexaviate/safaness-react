import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import Footer from "../layout/Footer";
import { useParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { useNavigate } from "react-router-dom";

export default function ProductDetail() {
  const [id] = useState(useParams().id);
  const [product, setProductDetail] = useState([]);
  const [qty, setQty] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetail();
  }, []);

  const fetchProductDetail = () => {
    axios
      .get(`/admin/product/${id}`)
      .then(function (response) {
        setProductDetail([response.data.data[0]]);
        console.log(response.data.data[0].image[0].image);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleSave = () => {
    axios
      .post("/admin/cart", {
        product_id: id,
        qty: qty,
      })
      .then(() => {
        setQty("");
        navigate("/cart");
      });
  };

  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <header id="header" className="header position-relative">
          <Navbar />
        </header>

        <main className="main">
          <section id="" className="product-details section">
            {product.map((detail, key) => {
              return (
                <div className="container" key={key}>
                  <div className="row g-5">
                    {/* <!-- Product Images Column --> */}
                    <div
                      className="col-lg-6 mb-5 mb-lg-0"
                      // data-aos="fade-right"
                      // data-aos-delay="200"
                    >
                      <div className="product-gallery">
                        {/* <!-- Vertical Thumbnails --> */}
                        <div className="thumbnails-vertical">
                          <div className="thumbnails-container">
                            {detail.image.map((data) => {
                              return (
                                <div
                                  className="thumbnail-item"
                                  data-image={
                                    // "http://192.168.1.100:8000/images/" +
                                    // data.image
                                    "http://127.0.0.1:8000/images/" + data.image
                                  }
                                >
                                  <img
                                    //   src={
                                    // "http://192.168.0.100:8000/images/" +
                                    //     data.image
                                    //   }
                                    // src={
                                    //   "http://192.168.110.24:8000/images/" +
                                    //   detail.image[0].image
                                    // }
                                    // src={
                                    //   "http://192.168.1.32:8000/images/" +
                                    //   detail.image[0].image
                                    // }
                                    src={
                                      "http://127.0.0.1:8000/images/" +
                                      detail.image[0].image
                                    }
                                    alt="Product Thumbnail"
                                    className="img-fluid"
                                  />
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* <!-- Main Image --> */}
                        <div className="main-image-wrapper">
                          <div className="image-zoom-container">
                            <a
                              // href={
                              //   "http://192.168.0.100:8000/images/" +
                              //   detail.image[0].image
                              // }
                              href={
                                "http://127.0.0.1:8000/images/" +
                                detail.image[0].image
                              }
                              className="glightbox"
                              data-gallery="product-gallery"
                            >
                              <img
                                // src={
                                //   "http://192.168.0.100:8000/images/" +
                                //   detail.image[0].image
                                // }
                                // src={
                                //   "http://192.168.110.24:8000/images/" +
                                //   detail.image[0].image
                                // }
                                // src={
                                //   "http://192.168.1.32:8000/images/" +
                                //   detail.image[0].image
                                // }
                                src={
                                  "http://127.0.0.1:8000/images/" +
                                  detail.image[0].image
                                }
                                alt="Product Image"
                                className="img-fluid main-image drift-zoom"
                                id="main-product-image"
                                data-zoom={
                                  "http://192.168.0.100:8000/images/" +
                                  detail.image[0].image
                                }
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
                    <div className="col-lg-6" data-aos-delay="200">
                      <div
                        className="product-info-wrapper"
                        id="product-info-sticky"
                      >
                        {/* <!-- Product Meta --> */}
                        <div className="product-meta">
                          <div className="d-flex justify-content-between align-items-center mb-3">
                            <span className="product-category">
                              {detail.sub_category}
                            </span>
                            <div className="product-share">
                              <button
                                className="share-btn"
                                aria-label="Share product"
                              >
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

                          <h1 className="product-title">{detail.name}</h1>
                        </div>

                        {/* <!-- Product Price --> */}
                        <div className="product-price-container">
                          <div className="price-wrapper">
                            <span className="current-price">
                              Rp.{Number(detail.price).toLocaleString()}
                            </span>
                          </div>
                          <div className="stock-info">
                            <i className="bi bi-check-circle-fill"></i>
                            <span>In Stock</span>
                            <span className="stock-count">
                              ({detail.stock} items left)
                            </span>
                          </div>
                        </div>

                        {/* <!-- Product Description --> */}
                        <div className="product-short-description">
                          <p>{detail.description}</p>
                        </div>

                        {/* <!-- Product Options --> */}
                        <div className="product-options">
                          {/* <!-- Color Options --> */}
                          <div className="option-group">
                            <div className="option-header">
                              <h6 className="option-title">Weight</h6>
                              <span className="selected-option">
                                {detail.weight}gr
                              </span>
                            </div>
                          </div>
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
                                onChange={(e) => setQty(e.target.value)}
                                value={qty}
                                placeholder="1"
                              />
                              <button className="quantity-btn increase">
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* <!-- Action Buttons --> */}
                        <div className="product-actions">
                          <button
                            className="btn btn-primary add-to-cart-btn"
                            onClick={handleSave}
                          >
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
                            <input type="number" className="quantity-input" />
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
                  <div className="row mt-5">
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
                                <p>{detail.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* <!-- Specifications Accordion --> */}

                        {/* <!-- Reviews Accordion --> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </main>
        <Footer />
      </ErrorBoundary>
    </>
  );
}
