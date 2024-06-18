import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Routes, Route} from 'react-router-dom' 
import Home from './views/Home'
import Api from './views/Api'
import NavBar from './components/NavBar'
import IndividualProduct from './views/IndividualProduct'
import Footer from './components/Footer'
import NoFound from './views/NoFound'
import Login from './views/Login'
import Register from './views/Register'
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <NavBar/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Api' element={<Api/>}/>
        <Route path='/Product/:assinProduct' element={<IndividualProduct/>}/>
        <Route path='*' element={<NoFound/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Register' element={<Register/>}/>
    </Routes>
    <Footer/>
  </BrowserRouter>
)
