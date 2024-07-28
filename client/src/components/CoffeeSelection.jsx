import React from 'react';

const CoffeeSelection = ({ coffees = [], onSelectCoffee }) => {
  if (!Array.isArray(coffees)) {
    console.error('Expected coffees to be an array');
    return null;
  }

  return (
    <div>
      <h2>Select Your Favourite Coffee</h2>
      <ul>
        {coffees.map((coffee) => (
          <li key={coffee.id} onClick={() => onSelectCoffee(coffee)}>
            {coffee.name} - ${coffee.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoffeeSelection;