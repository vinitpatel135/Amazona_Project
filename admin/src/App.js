import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './Component/Layout';
import Path from './Common/Path';
import DashBoardScreen from './Screens/DashBoard/DashBoardScreen';
import ProductScreen from './Screens/Product/ProductScreen';
import { useState } from 'react';
import UserData from './Screens/User/UserData';
import LoginScreen from './Screens/LoginScreen/LoginScreen';

function App() {

  const [Auth, setAuth] = useState(localStorage.getItem("TOKEN") ? true : false)

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={Path.dashBoard} element={<Layout Auth={Auth} component={<DashBoardScreen />} />} />
          <Route path={Path.product} element={<Layout Auth={Auth} component={<ProductScreen />} />} />
          <Route path={Path.user} element={<Layout Auth={Auth} component={<UserData />} />} />
          <Route path={Path.login} element={<LoginScreen setAuth={setAuth} Auth={Auth} />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
