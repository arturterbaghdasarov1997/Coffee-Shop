import React from "react";

const IngredientSelection = ({ ingredients, selectedIngredient, onToggleIngredient }) => {
    if (!Array.isArray(ingredients)) {
        console.error('Expected ingredients to be an array');
        return null;
    }

    return (
        <div className="ingredientSelection">
            <h2>Select an Ingredient</h2>
            <div className="ingredient-list">
            <ul>
                {ingredients.map((ingredient) => (
                    <li key={ingredient.id}>
                        <input
                            type="radio"
                            name="ingredient"
                            checked={selectedIngredient?.id === ingredient.id}
                            onChange={() => onToggleIngredient(ingredient)}
                        />
                        {ingredient.name} - ₾{ingredient.price}
                    </li>
                ))}
            </ul>
            </div>
        </div>
    );
};

export default IngredientSelection;
