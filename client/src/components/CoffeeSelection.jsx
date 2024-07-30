import React from 'react';

const CoffeeSelection = ({ coffees = [], selectedCoffee, onSelectCoffee }) => {
  if (!Array.isArray(coffees)) {
    console.error('Expected coffees to be an array');
    return null;
  }

  return (
    <div>
      <h2>Select Your Favourite Coffee</h2>
      <ul>
        {coffees.map((coffee) => (
          <li
            key={coffee.id}
            onClick={() => onSelectCoffee(coffee)}
            style={{
              cursor: 'pointer',
              fontWeight: coffee.id === selectedCoffee?.id ? 'bold' : 'normal',
              color: 'brown',
            }}
          >
            {coffee.title} - ₾2
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoffeeSelection;
