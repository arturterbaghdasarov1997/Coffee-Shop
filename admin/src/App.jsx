import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AdminCoffeeProvider } from './context/AdminCoffeeContext';
import AdminPage from './pages/AdminPage';
import './App.css';

const App = () => (
    <Router>
        <AdminCoffeeProvider>
            <AdminPage />
        </AdminCoffeeProvider>
    </Router>
);

export default App;