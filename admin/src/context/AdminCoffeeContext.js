import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminCoffeeContext = createContext();

export const useAdminCoffeeContext = () => useContext(AdminCoffeeContext);

export const AdminCoffeeProvider = ({ children }) => {
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

  const addCoffee = async (coffee) => {
    try {
      const response = await fetch('https://crudapi.co.uk/api/v1/coffees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(coffee),
      });
      const data = await response.json();
      setCoffees([...coffees, data.data]);
    } catch (error) {
      console.error('Error adding coffee:', error);
    }
  };

  const addIngredient = async (ingredient) => {
    try {
      const response = await fetch('https://crudapi.co.uk/api/v1/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredient),
      });
      const data = await response.json();
      setIngredients([...ingredients, data.data]);
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const editCoffee = async (coffeeId, updatedCoffee) => {
    try {
      const response = await fetch(`https://crudapi.co.uk/api/v1/coffees/${coffeeId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedCoffee),
      });
      const data = await response.json();
      setCoffees(coffees.map(coffee => (coffee.id === coffeeId ? data.data : coffee)));
    } catch (error) {
      console.error('Error editing coffee:', error);
    }
  };

  const editIngredient = async (ingredientId, updatedIngredient) => {
    try {
      const response = await fetch(`https://crudapi.co.uk/api/v1/ingredients/${ingredientId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedIngredient),
      });
      const data = await response.json();
      setIngredients(ingredients.map(ingredient => (ingredient.id === ingredientId ? data.data : ingredient)));
    } catch (error) {
      console.error('Error editing ingredient:', error);
    }
  };

  const submitCoffee = async (coffee) => {
    if (coffee.id) {
      await editCoffee(coffee.id, coffee);
    } else {
      await addCoffee(coffee);
    }
  };

  const submitIngredient = async (ingredient) => {
    if (ingredient.id) {
      await editIngredient(ingredient.id, ingredient);
    } else {
      await addIngredient(ingredient);
    }
  };

  return (
    <AdminCoffeeContext.Provider value={{ coffees, ingredients, addCoffee, addIngredient, editCoffee, editIngredient, submitCoffee, submitIngredient }}>
      {children}
    </AdminCoffeeContext.Provider>
  );
};