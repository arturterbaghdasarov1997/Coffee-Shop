import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClientPage from './pages/ClientPage';

const ClientRoutes = () => (
  <Routes>
    <Route path="/" element={<ClientPage />} />
  </Routes>
);

export default ClientRoutes;