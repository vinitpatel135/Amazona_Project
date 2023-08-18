import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './Screens/Home';
import ProductScreen from './Screens/ProductScreen';
import RegisterUser from './Screens/RegisterUser';
import LoginScreen from './Screens/LoginScreen';
import { useState } from 'react';
import CartScreen from './Screens/CartScreen';
import ShppingScreen from './Screens/ShippingScreen';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';

function App() {

  const [cartItems, SetCartItmes] = useState([])
  const [token, SetToken] = useState()
  const [userInfo, SetUserInfo] = useState()
  const [Search, SetSearch] = useState("")

  return (
    <BrowserRouter>
      <Header cartItems={cartItems} SetCartItmes={SetCartItmes} Search={Search} SetSearch={SetSearch} />
      <main style={{minHeight:"85.2vh"}}>
      <Routes>
        <Route path="/" element={<Home Search={Search} /> } />
        <Route path="/product/:id" element={<ProductScreen SetCartItmes ={SetCartItmes} />} />
        <Route path="/register" element={<RegisterUser/>} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/cart" element={<CartScreen cartItems ={cartItems} SetCartItmes ={SetCartItmes} />} />
        <Route path="/shipping" element={<ShppingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen cartItems={cartItems} SetCartItmes={SetCartItmes} />} />
      </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;