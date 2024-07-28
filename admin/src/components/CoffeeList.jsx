import React, { useContext, useEffect } from 'react';
import { AppContext } from '../AppContext';

function CoffeeList() {
    const { coffees, fetchCoffees, ingredients } = useContext(AppContext);

    useEffect(() => {
        fetchCoffees();
    }, [fetchCoffees]);

    const getTotalPrice = (coffee) => {
        const ingredientPrices = coffee.ingredients.map(ingredientId => {
            const ingredient = ingredients.find(ing => ing.id === ingredientId);
            return ingredient ? ingredient.price : 0;
        });
        const totalPrice = 2 + ingredientPrices.reduce((acc, price) => acc + parseFloat(price), 0);
        return totalPrice.toFixed(2); 
    };

    return (
        <div>
            <h2>Coffee List</h2>
            <ul>
                {coffees.map(coffee => (
                    <li key={coffee.id}>
                        <h3>{coffee.title}</h3>
                        <p>{coffee.description}</p>
                        <p>Ingredients: {coffee.ingredients.map(ingredientId => {
                            const ingredient = ingredients.find(ing => ing.id === ingredientId);
                            return ingredient ? ingredient.name : 'Unknown';
                        }).join(', ')}</p>
                        <p>Price: {getTotalPrice(coffee)} GEL</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default CoffeeList;
