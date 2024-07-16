// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Kain from './kain';
import Profile from './profile';
import Login  from './login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './PrivateRoute';


const AppRouter = () => {
  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PrivateRoute element={App} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/kain" element={<PrivateRoute element={Kain} />} />
        <Route path="/profile" element={<PrivateRoute element={Profile} />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
