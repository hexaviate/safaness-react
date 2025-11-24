"use Client";
import React, { useState, useEffect } from "react";
import Navbar from "../layout/Navbar";
import Navigation from "../layout/Navigation";
import Footer from "../layout/Footer";
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

export default function ProductFiltered() {
  const [productList, setProductList] = useState([]);
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const searchTerm = queryParams.get("search") || "";
  const [filteredProduct, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState("*");

  useEffect(() => {
    fetchProductList();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [productList, searchTerm, activeFilter]);

  const fetchProductList = () => {
    axios.get("/admin/product").then(function (response) {
      setProductList(response.data.data);
      console.log("Products:", response.data.data);
    });
  };

  const fetchCategories = () => {
    console.log("Fetching categories...");
    axios.get("/admin/category")
      .then(function (response) {
        console.log("Categories response:", response.data);
        console.log("Categories data:", response.data.data);
        setCategories(response.data.data);
      })
      .catch(function (error) {
        console.error("Error fetching categories:", error);
      });
  };

  const applyFilters = () => {
    console.log("=== Apply Filters ===");
    console.log("productList:", productList);
    console.log("activeFilter:", activeFilter);
    console.log("searchTerm:", searchTerm);

    let filtered = productList;

    if (activeFilter !== "*") {
      console.log("Filtering by category:", activeFilter);
      filtered = filtered.filter(
        (product) => {
          console.log(`Comparing: ${product.category} === ${activeFilter}`);  // ✅ tambah (
          return product.category.trim() === activeFilter.trim();  // ✅ tambah .trim()
        }
      );
      console.log("After category filter:", filtered);
    }

    if (searchTerm) {
      console.log("Filtering by search:", searchTerm);
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log("After search filter:", filtered);
    }

    console.log("Final filtered:", filtered);
    setFilteredProducts(filtered);
  };

  const handleFilter = (category) => {
    console.log("=== Handle Filter Clicked ===");
    console.log("Category object:", category);

    if (category === "*") {
      console.log("Setting to ALL");
      setActiveFilter("*");
    } else {
      console.log("Setting to category name:", category.name);
      setActiveFilter(category.name.trim());
    }
  };

  return (
    <>
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <header id="header" className="header position-relative">
          <Navbar />
        </header>

        <main className="main">
          <section id="product-list" className="product-list section">
            <div className="container isotope-layout">
              <div className="row">
                <div className="col-12">
                  <div className="product-filters isotope-filters mb-5 d-flex justify-content-center">
                    <ul className="d-flex flex-wrap gap-2 list-unstyled">
                      <li
                        className={activeFilter === "*" ? "filter-active" : ""}
                        onClick={() => handleFilter("*")}
                        style={{ cursor: "pointer" }}
                      >
                        All
                      </li>
                      {categories.map((category) => (
                        <li
                          key={category.id}
                          className={
                            activeFilter === category.name ? "filter-active" : ""
                          }
                          onClick={() => handleFilter(category)}
                          style={{ cursor: "pointer" }}
                        >
                          {category.name}
                        </li>
                      ))}
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

                {filteredProduct.length > 0 ? (
                  filteredProduct.map((product, key) => {
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
                              // src={
                              //   "http://192.168.0.100:8000/images/" + firstImage
                              // }
                              // src={
                              //   "http://192.168.1.32:8000/images/" + firstImage
                              // }
                              src={"http://127.0.0.1:8000/images/" + firstImage}
                              alt={product.name}
                              className="img-fluid main-img"
                            />
                            <img
                              // src={
                              //   "http://192.168.1.32:8000/images/" + secondImage
                              // }
                              src={"http://127.0.0.1:8000/images/" + secondImage}
                              // src={
                              //   "http://192.168.0.100:8000/images/" + secondImage
                              // }
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
                                <Link
                                  to={`/detail/${product.id}`}
                                  className="action-btn"
                                >
                                  <i className="bi bi-eye"></i>
                                </Link>

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
                  })
                ) : (
                  <div className="col-12 text-center py-5">
                    <p>No products found in this category</p>
                  </div>
                )}

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
        <Footer />
      </ErrorBoundary>
    </>
  );
}
