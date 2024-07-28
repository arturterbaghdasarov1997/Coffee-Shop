import React from "react";

const IngredientSelection = ({ ingredients, selectedIngredients, onToggleIngredient }) => {
    return (
        <div className="ingredientSelection">
            <h2>Select Ingredients</h2>
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        <input
                            type="checkbox"
                            checked={selectedIngredients.some((i) => i.id === ingredient.id)}
                            onChange={() => onToggleIngredient(ingredient)}
                        />
                        {ingredient.name} - ${ingredient.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IngredientSelection;