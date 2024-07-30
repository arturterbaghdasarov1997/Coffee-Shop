import React, { createContext, useContext, useState, useEffect } from 'react';

const API_URL = 'https://crudapi.co.uk/api/v1';
const API_KEY = '630GAJaFqUOxuG0RbedTew8TTxaUDcc29YzPEHySDXQiN6fEWA';

const ClientCoffeeContext = createContext();

export const useClientCoffeeContext = () => useContext(ClientCoffeeContext);

export const ClientCoffeeProvider = ({ children }) => {
    const [coffees, setCoffees] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [selectedCoffee, setSelectedCoffee] = useState(null);
    const [selectedIngredient, setSelectedIngredient] = useState(null);

    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching client data...');
                const [coffeesResponse, ingredientsResponse] = await Promise.all([
                    fetch(`${API_URL}/coffees`, { headers: getHeaders() }),
                    fetch(`${API_URL}/ingredients`, { headers: getHeaders() }),
                ]);

                if (!coffeesResponse.ok || !ingredientsResponse.ok) {
                    throw new Error('Failed to fetch client data');
                }

                const [coffeesData, ingredientsData] = await Promise.all([
                    coffeesResponse.json(),
                    ingredientsResponse.json(),
                ]);

                setCoffees(coffeesData.items || []);
                setIngredients(ingredientsData.items || []);
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };

        fetchData();
    }, []);

    const handleSelectCoffee = (coffee) => {
        setSelectedCoffee(coffee);
        setSelectedIngredient(null);
    };

    const handleToggleIngredient = (ingredient) => {
        setSelectedIngredient(ingredient);
    };

    return (
        <ClientCoffeeContext.Provider
            value={{
                coffees,
                ingredients,
                selectedCoffee,
                selectedIngredient,
                handleSelectCoffee,
                handleToggleIngredient,
            }}
        >
            {children}
        </ClientCoffeeContext.Provider>
    );
};
