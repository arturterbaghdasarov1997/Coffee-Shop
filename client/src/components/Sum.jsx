import React from "react";

const Sum = ({ coffee, ingredient }) => {
  const coffeePrice = coffee ? parseFloat(coffee.price) : 2;
  const ingredientPrice = ingredient ? parseFloat(ingredient.price) : 0;
  const totalPrice = coffeePrice + ingredientPrice;

  return (
    <div className="totalPrice">
      <h2>Total Price</h2>
      {coffee && (
        <p>
          <strong>Coffee:</strong> {coffee.title} - ₾{coffeePrice.toFixed(2)}
        </p>
      )}
      {ingredient && (
        <p>
          <strong>Ingredient:</strong> {ingredient.name} - ₾{ingredientPrice}
        </p>
      )}
      <h3>Total: ₾{totalPrice.toFixed}</h3>
    </div>
  );
};

export default Sum;
