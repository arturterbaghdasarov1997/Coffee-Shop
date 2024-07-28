import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'https://crudapi.co.uk/api/v1';
const API_KEY = '630GAJaFqUOxuG0RbedTew8TTxaUDcc29YzPEHySDXQiN6fEWA';

const AdminCoffeeContext = createContext();

export const useAdminCoffeeContext = () => useContext(AdminCoffeeContext);

export const AdminCoffeeProvider = ({ children }) => {
  const [coffees, setCoffees] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [coffeesResponse, ingredientsResponse] = await Promise.all([
          fetch(`${API_URL}/coffees`, { headers: getHeaders() }),
          fetch(`${API_URL}/ingredients`, { headers: getHeaders() }),
        ]);
        const coffeesData = await coffeesResponse.json();
        const ingredientsData = await ingredientsResponse.json();
        setCoffees(coffeesData.data);
        setIngredients(ingredientsData.data);
      } catch (error) {
        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFetchError = (error) => {
    console.error(error);
    setError(error.message || 'An error occurred');
  };

  const addItem = async (endpoint, item, setItemState) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify(item),
      });
      const data = await response.json();
      setItemState((prevItems) => [...prevItems, data.data]);
    } catch (error) {
      handleFetchError(error);
    }
  };

  const editItem = async (endpoint, id, updatedItem, setItemState) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(updatedItem),
      });
      const data = await response.json();
      setItemState((prevItems) =>
        prevItems.map((item) => (item.id === id ? data.data : item))
      );
    } catch (error) {
      handleFetchError(error);
    }
  };

  const submitItem = async (item, type) => {
    if (item.id) {
      await editItem(type, item.id, item, type === 'coffees' ? setCoffees : setIngredients);
    } else {
      await addItem(type, item, type === 'coffees' ? setCoffees : setIngredients);
    }
  };

  return (
    <AdminCoffeeContext.Provider value={{
      coffees,
      ingredients,
      loading,
      error,
      addCoffee: (coffee) => addItem('coffees', coffee, setCoffees),
      addIngredient: (ingredient) => addItem('ingredients', ingredient, setIngredients),
      editCoffee: (id, updatedCoffee) => editItem('coffees', id, updatedCoffee, setCoffees),
      editIngredient: (id, updatedIngredient) => editItem('ingredients', id, updatedIngredient, setIngredients),
      submitCoffee: (coffee) => submitItem(coffee, 'coffees'),
      submitIngredient: (ingredient) => submitItem(ingredient, 'ingredients'),
    }}>
      {children}
    </AdminCoffeeContext.Provider>
  );
};