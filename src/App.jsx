import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from './component/Pages/Home';
import Products from './component/Pages/Shop';
import Header from './component/Header';
import Footer from './component/Footer';
import NotFound from './component/Pages/NotFound';
import Contact from './component/Pages/Contact';
import About from './component/Pages/About';
import Cart from './component/Pages/Cart';
import ProductDetails from './component/Pages/ProductDetails';
import AddProduct from './component/Pages/AddProduct';
import Favorites from './component/Pages/Favorite';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/shop' element={<Products />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/favorite' element={<Favorites />} />
        <Route path='/shop/:id' element={<ProductDetails />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
