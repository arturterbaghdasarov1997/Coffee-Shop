import React, { createContext, useContext, useState, useCallback } from 'react';

const API_URL = 'https://crudapi.co.uk/api/v1';
const API_KEY = '630GAJaFqUOxuG0RbedTew8TTxaUDcc29YzPEHySDXQiN6fEWA';

const AdminCoffeeContext = createContext();

export const useAdminCoffeeContext = () => useContext(AdminCoffeeContext);

export const AdminCoffeeProvider = ({ children }) => {
    const [coffees, setCoffees] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);

    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    });

    const fetchCoffees = useCallback(async () => {
        setError(null);
        try {
            const response = await fetch(`${API_URL}/coffees`, { headers: getHeaders() });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setCoffees(data.items || []);
        } catch (error) {
            setError(error.message || 'Failed to fetch coffees');
        }
    }, []);

    const fetchIngredients = useCallback(async () => {
        setError(null);
        try {
            const response = await fetch(`${API_URL}/ingredients`, { headers: getHeaders() });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setIngredients(data.items || []);
        } catch (error) {
            setError(error.message || 'Failed to fetch ingredients');
        }
    }, []);

    const addItem = async (endpoint, item, setItemState) => {
        try {
            const response = await fetch(`${API_URL}/${endpoint}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify([item]),
            });
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setItemState((prevItems) => [...prevItems, ...data.items]);
        } catch (error) {
            setError(error.message || 'Failed to add item');
        }
    };

    const submitCoffee = async (coffee) => {
        await addItem('coffees', coffee, setCoffees);
        fetchCoffees();
    };

    const submitIngredient = async (ingredient) => {
        await addItem('ingredients', ingredient, setIngredients);
        fetchIngredients();
    };

    return (
        <AdminCoffeeContext.Provider value={{
            coffees,
            ingredients,
            error,
            fetchCoffees,
            fetchIngredients,
            submitCoffee,
            submitIngredient,
        }}>
            {children}
        </AdminCoffeeContext.Provider>
    );
};