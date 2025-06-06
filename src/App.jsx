import React from 'react'

// import './App.css'
// import Navbar from './layout/Navbar'
// import Navigation from './layout/Navigation'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import AuthUser from './components/AuthUser'
import Cart from './components/Cart'
import Login from './components/auth/Login'
import CheckoutConfirmation from './components/CheckoutConfirmation'
import Profile from './components/Profile'
import ProductFiltered from './components/ProductFiltered'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList/>}></Route>
        <Route path="/product" element={<ProductFiltered/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/detail/:id" element={<ProductDetail/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/checkout" element={<CheckoutConfirmation/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
