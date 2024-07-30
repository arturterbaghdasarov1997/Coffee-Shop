import React from 'react';
import CoffeeSelection from '../components/CoffeeSelection';
import IngredientSelection from '../components/IngredientSelection';
import { useClientCoffeeContext } from '../context/ClientCoffeeContext';
import '../App.css';

const ClientPage = () => {
  const { coffees, ingredients, selectedCoffee, selectedIngredient, handleSelectCoffee, handleToggleIngredient } = useClientCoffeeContext();

  return (
    <div className="container">
      <h1>Coffee Shop</h1>
      <CoffeeSelection
        coffees={coffees}
        selectedCoffee={selectedCoffee}
        onSelectCoffee={handleSelectCoffee}
      />
      {selectedCoffee && (
        <IngredientSelection
          ingredients={ingredients}
          selectedIngredient={selectedIngredient}
          onToggleIngredient={handleToggleIngredient}
        />
      )}
    </div>
  );
};

export default ClientPage;
