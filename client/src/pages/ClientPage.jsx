import React from 'react';
import CoffeeSelection from '../components/CoffeeSelection';
import IngredientSelection from '../components/IngredientSelection';
import Sum from '../components/Sum';
import { useClientCoffeeContext } from '../context/ClientCoffeeContext';
import '../App.css';

const ClientPage = () => {
  const { coffees, ingredients, selectedCoffee, selectedIngredients, handleSelectCoffee, handleToggleIngredient } = useClientCoffeeContext();

  const calculatePrice = () => {
    const ingredientSum = selectedIngredients.reduce((sum, ingredient) => sum + parseFloat(ingredient.price), 0);
    return selectedCoffee ? parseFloat(selectedCoffee.price) + ingredientSum : 0;
  };

  return (
    <div className="container">
      <h1>Coffee Shop</h1>
      <CoffeeSelection coffees={coffees} onSelectCoffee={handleSelectCoffee} />
      {selectedCoffee && (
        <IngredientSelection
          ingredients={ingredients}
          selectedIngredients={selectedIngredients}
          onToggleIngredient={handleToggleIngredient}
        />
      )}
      {selectedCoffee && (
        <Sum coffee={selectedCoffee} ingredients={selectedIngredients} totalPrice={calculatePrice()} />
      )}
    </div>
  );
};

export default ClientPage;
