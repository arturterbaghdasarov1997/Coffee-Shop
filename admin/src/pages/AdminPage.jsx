import React, { useEffect } from 'react';
import CoffeeForm from '../components/CoffeeForm';
import IngredientForm from '../components/IngredientForm';
import CoffeeList from '../components/CoffeeList';
import IngredientList from '../components/IngredientList';
import { useAdminCoffeeContext } from '../context/AdminCoffeeContext';
import '../App.css';

const AdminPage = () => {
    const { fetchCoffees, fetchIngredients, loading, error } = useAdminCoffeeContext();

    useEffect(() => {
        fetchCoffees();
        fetchIngredients();
    }, [fetchCoffees, fetchIngredients]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="error-message">Error: {error}</p>;

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
                <CoffeeList />
                <IngredientList />
            </div>
        </div>
    );
};

export default AdminPage;