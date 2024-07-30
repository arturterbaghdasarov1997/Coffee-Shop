import React from "react";

const Sum = ({ coffee, selectedIngredient, totalPrice }) => {
  return (
    <div className="totalPrice">
      <h2>Total Price</h2>
      {coffee && <p><strong>Coffee:</strong> {coffee.title} - ₾{coffee.price}</p>}
      {selectedIngredient && <p><strong>Ingredient:</strong> {selectedIngredient.name} - ₾{selectedIngredient.price}</p>}
      <h3>₾{totalPrice}</h3>
    </div>
  );
};

export default Sum;
