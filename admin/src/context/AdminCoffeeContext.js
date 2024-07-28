import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const API_URL = 'https://crudapi.co.uk/api/v1';
const API_KEY = '630GAJaFqUOxuG0RbedTew8TTxaUDcc29YzPEHySDXQiN6fEWA';

const AdminCoffeeContext = createContext();

export const useAdminCoffeeContext = () => useContext(AdminCoffeeContext);

export const AdminCoffeeProvider = ({ children }) => {
    const [coffees, setCoffees] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    });

    const fetchCoffees = useCallback(async () => {
        try {
            console.log('Fetching coffees...');
            setLoading(true);
            const response = await fetch(`${API_URL}/coffees`, { headers: getHeaders() });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Coffees fetched:', data);
            setCoffees(data.data);
        } catch (error) {
            console.error('Error fetching coffees:', error);
            setError(error.message || 'Failed to fetch coffees');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchIngredients = useCallback(async () => {
        try {
            console.log('Fetching ingredients...');
            setLoading(true);
            const response = await fetch(`${API_URL}/ingredients`, { headers: getHeaders() });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            console.log('Ingredients fetched:', data);
            setIngredients(data.data);
        } catch (error) {
            console.error('Error fetching ingredients:', error);
            setError(error.message || 'Failed to fetch ingredients');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCoffees();
        fetchIngredients();
    }, [fetchCoffees, fetchIngredients]);

    const addItem = async (endpoint, item, setItemState) => {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(item),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setItemState((prevItems) => [...prevItems, data.data]);
        } catch (error) {
            console.error('Error adding item:', error);
            setError(error.message || 'Failed to add item');
        }
    };

    const editItem = async (endpoint, id, updatedItem, setItemState) => {
        try {
            const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(updatedItem),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setItemState((prevItems) =>
                prevItems.map((item) => (item.id === id ? data.data : item))
            );
        } catch (error) {
            console.error('Error editing item:', error);
            setError(error.message || 'Failed to edit item');
        }
    };

    const submitItem = async (item, type) => {
        if (item.id) {
            await editItem(type, item.id, item, type === 'coffees' ? setCoffees : setIngredients);
        } else {
            await addItem(type, item, type === 'coffees' ? setCoffees : setIngredients);
        }
    };

    return (
        <AdminCoffeeContext.Provider value={{
            coffees,
            ingredients,
            loading,
            error,
            fetchCoffees,
            fetchIngredients,
            addCoffee: (coffee) => addItem('coffees', coffee, setCoffees),
            addIngredient: (ingredient) => addItem('ingredients', ingredient, setIngredients),
            editCoffee: (id, updatedCoffee) => editItem('coffees', id, updatedCoffee, setCoffees),
            editIngredient: (id, updatedIngredient) => editItem('ingredients', id, updatedIngredient, setIngredients),
            submitCoffee: (coffee) => submitItem(coffee, 'coffees'),
            submitIngredient: (ingredient) => submitItem(ingredient, 'ingredients'),
        }}>
            {children}
        </AdminCoffeeContext.Provider>
    );
};