import React, { useEffect } from 'react';
import CoffeeForm from '../components/CoffeeForm';
import IngredientForm from '../components/IngredientForm';
import CoffeeList from '../components/CoffeeList';
import IngredientList from '../components/IngredientList';
import { useAdminCoffeeContext } from '../context/AdminCoffeeContext';

const AdminPage = () => {
    const { fetchCoffees, fetchIngredients, loading, error } = useAdminCoffeeContext();

    useEffect(() => {
        fetchCoffees();
        fetchIngredients();
    }, [fetchCoffees, fetchIngredients]);

    return (
        <div className="container">
            <h1>Admin Dashboard</h1>
            
            <div className="form-section">
                <h2>Add Coffee</h2>
                <CoffeeForm />
                <h2>Add Ingredient</h2>
                <IngredientForm />
            </div>
            
            <div className="list-section">
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                
                <h2>Coffee List</h2>
                <CoffeeList />
                
                <h2>Ingredient List</h2>
                <IngredientList />
            </div>
        </div>
    );
};

export default AdminPage;
