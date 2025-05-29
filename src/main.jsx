import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios';
// import './index.css'
import App from './App.jsx'


const token = localStorage.getItem('token');
// axios.defaults.baseURL = "http://192.168.0.100:8000/api"; 
//kalo dirumah
axios.defaults.baseURL = "http://192.168.110.24:8000/api";
axios.defaults.headers.common = {"Authorization" : `Bearer ${token}`};
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
