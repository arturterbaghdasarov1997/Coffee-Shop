import React, { useState } from "react";
import { useAdminCoffeeContext } from "../context/AdminCoffeeContext";

function CoffeeForm() {
    const [coffee, setCoffee] = useState({ title: "", description: "", ingredients: [] });
    const { ingredients, submitCoffee } = useAdminCoffeeContext();

    const handleChange = (e) => {
        setCoffee({ ...coffee, [e.target.name]: e.target.value });
    }

    const ingredientChange = (ingredientId) => {
        setCoffee(prevState => {
            const isSelected = prevState.ingredients.includes(ingredientId);
            const newIngredients = isSelected
                ? prevState.ingredients.filter(id => id !== ingredientId)
                : [...prevState.ingredients, ingredientId];
            return { ...prevState, ingredients: newIngredients };
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submitCoffee(coffee);
            setCoffee({ title: "", description: "", ingredients: [] });
        } catch (error) {
            console.error('Error creating coffee:', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Title"
                value={coffee.title}
                onChange={handleChange}
                required
            />
            <div>
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={coffee.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                {ingredients.map(ingredient => (
                    <div key={ingredient.id}>
                        <input
                            type="checkbox"
                            id={`ingredient-${ingredient.id}`}
                            name="ingredients"
                            value={ingredient.id}
                            checked={coffee.ingredients.includes(ingredient.id)}
                            onChange={() => ingredientChange(ingredient.id)}
                        />
                        <label htmlFor={`ingredient-${ingredient.id}`}>{ingredient.name}</label>
                    </div>
                ))}
            </div>
            <button type="submit">Add Coffee</button>
        </form>
    );
}

export default CoffeeForm;