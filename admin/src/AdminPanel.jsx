import React from "react";
import IngredientForm  from "./components/ingredientForm";
import CoffeeForm from "./components/CoffeeForm";


function AdminPanel(){
    return(
        <div>
            <h1>Admin</h1>
            <CoffeeForm></CoffeeForm>
            <IngredientForm></IngredientForm>
        </div>
    )
}

export default AdminPanel;