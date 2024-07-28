import React from "react";

const Sum = ({ coffee, ingredients, totalPrice }) => {
    return (
        <div className="totalPrice">
            <h2>Total Price</h2>
            {coffee && <p><strong>Coffee:</strong> {coffee.name} - ₾{coffee.price}</p>}
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.name} - ₾{ingredient.price}</li>
                ))}
            </ul>
            <h3>Total Price: ₾{totalPrice.toFixed(2)}</h3>
        </div>
    );
};

export default Sum;