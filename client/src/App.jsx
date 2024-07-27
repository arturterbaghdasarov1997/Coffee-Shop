import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ClientCoffeeProvider } from './context/ClientCoffeeContext';
import ClientRoutes from './routes/clientRoutes';

const App = () => {
  return (
    <Router>
      <ClientCoffeeProvider>
        <ClientRoutes />
      </ClientCoffeeProvider>
    </Router>
  );
};

export default App;