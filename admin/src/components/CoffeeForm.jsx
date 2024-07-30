import React, { useState } from 'react';
import { useAdminCoffeeContext } from '../context/AdminCoffeeContext';

function CoffeeForm() {
    const { ingredients, submitCoffee, submitIngredient } = useAdminCoffeeContext();

    const [coffee, setCoffee] = useState({ title: "", description: "", ingredients: [] });
    const [ingredient, setIngredient] = useState({ name: '', price: '', description: '' });

    const handleCoffeeChange = (e) => {
        setCoffee({ ...coffee, [e.target.name]: e.target.value });
    };

    const handleIngredientChange = (e) => {
        setIngredient({ ...ingredient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitIngredient(ingredient);
            await submitCoffee(coffee);
            setCoffee({ title: "", description: "", ingredients: [] });
            setIngredient({ name: '', price: '', description: '' });
        } catch (error) {
            console.error('Error creating coffee or ingredient:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={coffee.title}
                onChange={handleCoffeeChange}
                required
            />
            <input
                type="text"
                name="description"
                placeholder="Description"
                value={coffee.description}
                onChange={handleCoffeeChange}
                required
            />

            <h2>Add New Ingredient</h2>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={ingredient.name}
                onChange={handleIngredientChange}
                required
            />
            <input
                type="number"
                name="price"
                placeholder="Price"
                value={ingredient.price}
                onChange={handleIngredientChange}
                required
            />

            <button type="submit">Add Coffee and Ingredient</button>
        </form>
    );
}

export default CoffeeForm;