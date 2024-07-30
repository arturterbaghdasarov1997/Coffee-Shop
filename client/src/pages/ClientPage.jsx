import React from 'react';
import CoffeeSelection from '../components/CoffeeSelection';
import IngredientSelection from '../components/IngredientSelection';
import Sum from '../components/Sum';
import { useClientCoffeeContext } from '../context/ClientCoffeeContext';
import '../App.css';

const ClientPage = () => {
  const { coffees, ingredients, selectedCoffee, selectedIngredient, handleSelectCoffee, handleToggleIngredient } = useClientCoffeeContext();

  const calculatePrice = () => {
    const coffeePrice = selectedCoffee ? parseFloat(selectedCoffee.price) : 0;
    const ingredientPrice = selectedIngredient ? parseFloat(selectedIngredient.price) : 0;

    console.log('Coffee Price:', coffeePrice);
    console.log('Ingredient Price:', ingredientPrice);

    return (isNaN(coffeePrice) ? 2 : coffeePrice) + (isNaN(ingredientPrice));
  };

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
      {selectedCoffee && (
        <Sum totalPrice={calculatePrice()} />
      )}
    </div>
  );
};

export default ClientPage;
