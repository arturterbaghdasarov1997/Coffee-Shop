import React, { useEffect } from 'react';
import { useAdminCoffeeContext } from '../context/AdminCoffeeContext';

function CoffeeList() {
    const { coffees, ingredients, fetchCoffees, error } = useAdminCoffeeContext();

    useEffect(() => {
        fetchCoffees();
    }, [fetchCoffees]);

    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Coffee List</h2>
            <ul>
                {coffees.map(coffee => (
                    <li key={coffee.id}>
                        <h3>{coffee.title}</h3>
                        <p>{coffee.description}</p>
                        <p>Ingredients: {
                            coffee.ingredients && ingredients ? (
                                coffee.ingredients.map(ingredientId => {
                                    const ingredient = ingredients.find(ing => ing.id === ingredientId);
                                    return ingredient ? `${ingredient.name} - ₾${ingredient.price}` : 'Unknown';
                                }).join(', ')
                            ) : 'No ingredients available'
                        }</p>
                    </li>
                ))}
            </ul>
            <ul>
                {ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                        <h3>{ingredient.name}</h3>
                        <p>Price: ₾{ingredient.price}</p>
                        <p>{ingredient.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CoffeeList;