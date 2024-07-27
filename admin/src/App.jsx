import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminCoffeeProvider } from './context/AdminCoffeeContext';
import AdminRoutes from './routes/adminRoutes';
import './App.css';

const App = () => (
  <Router>
    <AdminCoffeeProvider>
      <AdminRoutes />
    </AdminCoffeeProvider>
  </Router>
);

export default App;