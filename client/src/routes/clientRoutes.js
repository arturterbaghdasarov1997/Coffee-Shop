import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ClientPage from '../pages/ClientPage';

const ClientRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<ClientPage />} />
    </Routes>
  );
};

export default ClientRoutes;