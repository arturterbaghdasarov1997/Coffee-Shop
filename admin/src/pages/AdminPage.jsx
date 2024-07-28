import React from 'react';
import CoffeeForm from '../components/CoffeeForm';
import IngredientForm from '../components/ingredientForm';
import CoffeeList from '../components/CoffeeList';
import IngredientList from '../components/IngredientList';

function AdminPage() {
    return (
        <div>
            <div className="form">
                <h1>Admin</h1>
                <CoffeeForm />
                <IngredientForm />
            </div>
            <div className="list">
                <CoffeeList />
                <IngredientList />
            </div>
        </div>
    );
}

export default AdminPage;