import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen';
import MenuScreen from './screens/MenuScreen';
import RegisterScreen from './screens/RegisterScreen';
import ReportsScreen from './screens/ReportsScreen';
import ArticlesScreen from './screens/ArticlesScreen';
import RegistrarArticuloScreen from './screens/RegistrarArticulo';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  return (
    <>
      <Router basename="/app/PedidoWeb/">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/menu" element={<MenuScreen />} />
          <Route path="/articles" element={<ArticlesScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/reports" element={<ReportsScreen />} />
          <Route path="/registrar-articulo" element={<RegistrarArticuloScreen />} />
        </Routes>
      </Router>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
