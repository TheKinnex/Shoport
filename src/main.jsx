import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './views/Home'
import NavBar from './components/NavBar'
import IndividualProduct from './views/IndividualProduct'
import Footer from './components/Footer'
import NoFound from './views/NoFound'
import Login from './views/Login'
import Register from './views/Register'
import Catalogue from './views/Catalogue'
import ShoppingCart from './views/ShoppingCart'
import { createRoot } from 'react-dom/client'

createRoot(document.getElementById('root')).render(
        <BrowserRouter>
                <NavBar />
                <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/Product/:assinProduct' element={<IndividualProduct />} />
                        <Route path='*' element={<NoFound />} />
                        <Route path='/Login' element={<Login />} />
                        <Route path='/Register' element={<Register />} />
                        <Route path='/Products/' element={<Catalogue />} />
                        <Route path='/Products/:category' element={<Catalogue />} />
                        <Route path='/ShoppingCart' element={<ShoppingCart />} />
                </Routes>
                <Footer />
        </BrowserRouter>
)
