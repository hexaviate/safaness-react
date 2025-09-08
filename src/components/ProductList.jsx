"use Client";
import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import axios from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { Link, useLocation } from "react-router-dom";
// class ErrorBoundary extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {hasError: false};
//     }

//     static getDerivedStateFromError(error){
//         return {hasError: true}
//     }

//     render() {
//     if (this.state.hasError) {
//       // You can render any custom fallback UI
//       return this.props.fallback;
//     }

//     return this.props.children;
//   }
// }

export default function ProductList() {
  const [productList, setProductList] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    fetchProductList();
  }, []);

  const fetchProductList = () => {
    axios.get("/admin/product").then(function (response) {
      setProductList(response.data.data);
      console.log(response.data.data);
    });
  };

  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <header id="header" className="header position-relative">
          <Navbar />
          {/* <Navigation /> */}
        </header>

        <main className="main">
          <section id="product-list" className="product-list section">
            <div
              className="container isotope-layout"
              // data-aos="fade-up"
              data-aos-delay="100"
              data-default-filter="*"
              data-layout="masonry"
              data-sort="original-order"
            >
              <div className="row">
                <div className="col-12">
                  <div
                    className="product-filters isotope-filters mb-5 d-flex justify-content-center"
                    //   data-aos="fade-up"
                  >
                    <ul className="d-flex flex-wrap gap-2 list-unstyled">
                      <li className="filter-active" data-filter="*">
                        All
                      </li>
                      <li data-filter=".filter-clothing">Clothing</li>
                      <li data-filter=".filter-accessories">Accessories</li>
                      <li data-filter=".filter-electronics">Electronics</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="row product-container isotope-container"
                //   data-aos="fade-up"
                data-aos-delay="200"
              >
                {/* <!-- Product Item 1 --> */}
                {productList.map((product, key) => {
                  const firstImage = product.image?.[0]?.image;
                  const secondImage = product.image?.[1]?.image;
                  console.log(firstImage);

                  return (
                    <div
                      className="col-md-6 col-lg-3 product-item isotope-item filter-clothing"
                      key={key}
                    >
                      <div className="product-card">
                        <div className="product-image">
                          <img
                            // src={
                            //   "http://192.168.110.24:8000/images/" + firstImage
                            // }
                            src={
                              "http://192.168.0.100:8000/images/" + firstImage
                            }
                            // src={
                            //   "http://192.168.1.32:8000/images/" + firstImage
                            // }
                            // src={
                            //   "http://127.0.0.1:8000/images/" + firstImage
                            // }
                            alt={product.name}
                            className="img-fluid main-img"
                          />
                          <img
                            // src={
                            //   "http://192.168.1.32:8000/images/" + secondImage
                            // }
                            // src={
                            //   "http://127.0.0.1:8000/images/" + secondImage
                            // }
                            src={
                              "http://192.168.0.100:8000/images/" + secondImage
                            }
                            // src={
                            //   "http://192.168.110.24:8000/images/" + secondImage
                            // }

                            alt={`${product.name} Hover`}
                            className="img-fluid hover-img"
                          />
                          <div className="product-overlay">
                            <Link
                              to={`/detail/${product.id}`}
                              className="btn-cart"
                            >
                              <i className="bi bi-cart-plus"></i> Add to Cart
                            </Link>
                            <div className="product-actions">
                              <a href="#" className="action-btn">
                                <i className="bi bi-heart"></i>
                              </a>
                              <a href="#" className="action-btn">
                                <i className="bi bi-eye"></i>
                              </a>
                              <a href="#" className="action-btn">
                                <i className="bi bi-arrow-left-right"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="product-info">
                          <h5 className="product-title">
                            <Link to={`/detail/${product.id}`}>
                              {product.name}
                            </Link>
                          </h5>
                          <div className="product-price">
                            <span className="current-price">
                              Rp.{Number(product.price).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {}

                {/* <!-- End Product Item --> */}
              </div>

              <div className="text-center mt-5" data-aos="fade-up">
                <a href="category.html" className="view-all-btn">
                  View All Products <i className="bi bi-arrow-right"></i>
                </a>
              </div>
            </div>
          </section>
        </main>
      </ErrorBoundary>
    </>
  );
}
