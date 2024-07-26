import React, { createContext, useContext, useState, useEffect } from 'react';

const ClientCoffeeContext = createContext();

export const useClientCoffeeContext = () => useContext(ClientCoffeeContext);

export const ClientCoffeeProvider = ({ children }) => {
  const [coffees, setCoffees] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchCoffees();
    fetchIngredients();
  }, []);

  const fetchCoffees = async () => {
    try {
      const response = await fetch('https://crudapi.co.uk/api/v1/coffees');
      const data = await response.json();
      setCoffees(data.data);
    } catch (error) {
      console.error('Error fetching coffees:', error);
    }
  };

  const fetchIngredients = async () => {
    try {
      const response = await fetch('https://crudapi.co.uk/api/v1/ingredients');
      const data = await response.json();
      setIngredients(data.data);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    }
  };

  return (
    <ClientCoffeeContext.Provider value={{ coffees, ingredients }}>
      {children}
    </ClientCoffeeContext.Provider>
  );
};