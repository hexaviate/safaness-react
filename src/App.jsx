import React from 'react'

// import './App.css'
// import Navbar from './layout/Navbar'
// import Navigation from './layout/Navigation'
import ProductList from './components/ProductList'
import ProductDetail from './components/ProductDetail'
import AuthUser from './components/AuthUser'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList/>}></Route>
        <Route path="/login" element={<AuthUser/>}></Route>
        <Route path="/detail/:id" element={<ProductDetail/>}></Route>
      </Routes>
    </Router>
  )
}

export default App
