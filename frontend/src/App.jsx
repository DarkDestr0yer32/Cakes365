import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopUp from './components/LoginPopUp/LoginPopUp';
import FoodItemDetail from './pages/Cakepage/FoodItemDetail';
import Myorders from './pages/MyOrders/Myorders';


const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path="/product/:id" element={<FoodItemDetail />} />
          <Route path="/myorders" element={<Myorders />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
