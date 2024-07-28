import React, { useEffect } from 'react';
import { useAdminCoffeeContext } from '../context/AdminCoffeeContext';

function IngredientList() {
    const { ingredients, fetchIngredients, loading, error } = useAdminCoffeeContext();

    useEffect(() => {
        fetchIngredients();
    }, [fetchIngredients]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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