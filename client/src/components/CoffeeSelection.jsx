import React from 'react';
import '../App.css'

const CoffeeSelection = ({ coffees = [], selectedCoffee, onSelectCoffee }) => {
  if (!Array.isArray(coffees)) {
    console.error('Expected coffees to be an array');
    return null;
  }

  return (
    <div>
      <h2>Select Your Favourite Coffee</h2>
      <div className="coffee-list">
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
              <p>{coffee.title} - ₾{coffee.price}</p>

            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CoffeeSelection;
