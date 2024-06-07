// src/AppRouter.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Kain from './kain';
import Profile from './profile';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/kain" element={<Kain />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
