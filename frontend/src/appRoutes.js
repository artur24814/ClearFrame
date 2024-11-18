import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/home';
import Register from './pages/register/register';
import Login from './pages/login/login';
import ImageProcessing from './pages/imageProcessing/imageProcessing';
import BgRemoval from './pages/bgRemoval/bgRemoval';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path='/user/image-processing' element={<ImageProcessing />} />
      <Route path='/bg-removal' element={<BgRemoval />} />
    </Routes>
  );
}

export default AppRoutes