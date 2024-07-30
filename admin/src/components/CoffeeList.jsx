import React, { useEffect } from 'react';
import { useAdminCoffeeContext } from '../context/AdminCoffeeContext';
import '../App.css'

function CoffeeList() {
    const { coffees, ingredients, fetchCoffees, error } = useAdminCoffeeContext();

    useEffect(() => {
        fetchCoffees();
    }, [fetchCoffees]);

    if (error) return <p>Error: {error} </p>;

    return (
        <div>
            <h2>Coffee List</h2>
            <div  className='all-coffee-list'>
                <div className="coffee-list">
                    <ul>
                        {coffees.map(coffee => (
                            <li key={coffee.id}>
                                <h3>{coffee.title}</h3>
                                <p>{coffee.description}</p>
                                <p>Price: ₾{coffee.price}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
                <h2>Ingredients</h2>
                <div className="all-ingredient-list">
                    <div className="ingredients-list">
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
                </div>
        </div>
    );
}

export default CoffeeList;
