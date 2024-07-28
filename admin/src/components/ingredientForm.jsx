import React, { useState } from 'react';
import { useAdminCoffeeContext } from '../context/AdminCoffeeContext';

function IngredientForm() {
    const { submitIngredient } = useAdminCoffeeContext();
    const [ingredient, setIngredient] = useState({ name: '', price: '', description: '' });

    const handleChange = (e) => {
        setIngredient({ ...ingredient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitIngredient(ingredient);
            setIngredient({ name: '', price: '', description: '' });
        } catch (error) {
            console.error('Error creating ingredient:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={ingredient.name} onChange={handleChange} required />
            <input type="number" name="price" placeholder="Price" value={ingredient.price} onChange={handleChange} required />
            <input type="text" name="description" placeholder="Description" value={ingredient.description} onChange={handleChange} />
            <button type="submit">Add Ingredient</button>
        </form>
    );
}

export default IngredientForm;