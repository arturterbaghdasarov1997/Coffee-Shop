import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

function IngredientForm() {
  const { fetchIngredients } = useContext(AppContext);
    // AppContext-ის გამოყენება useContext _ით, კონტექსტიდან fetchIngredients ფუნქციის მიღება
  const [ingredient, setIngredient] = useState({ name: '', price: '', description: '' });
//შეყვანილი მონაცემების ცვლილება
  const handleChange = (e) => {
    //განახლება ახალი მნიშვნელობით
    setIngredient({ ...ingredient, [e.target.name]: e.target.value });
  };
//გაზავნა
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/v1/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredient),
      });
      if (response.ok) {
        // თუ მოთხოვნა წარმატებით შესრულდა, განაახლებს სიას და გასუფთავებს ფორმას
        fetchIngredients();
        setIngredient({ name: '', price: '', description: '' });
      } else {
        console.error('Error creating ingredient:', response.statusText);
      }
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
