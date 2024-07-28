import React, { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';

function IngredientList() {
    const { ingredients, fetchIngredients } = useContext(AppContext);

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]);

    return (
        <div>
            <h2>Ingredient List</h2>
            <ul>
                {ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                        <h3>{ingredient.name}</h3>
                        <p>Description: {ingredient.description}</p>
                        <p>Price: {parseFloat(ingredient.price).toFixed(2)} GEL</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default IngredientList;
