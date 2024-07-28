import { useContext,useState } from "react";
import {AppContaxt} from `..AppContext/`



function CoffeeForm(){
 const[ coffee,setCoffee]=useState({title:"",description:"",ingredients:[]});
  // AppContext-ის გამოყენება useContext_ით,  მონაცემების და ფუნქციების მიღება
 const{ingredients, fetchCoffee}=useContext(AppContaxt);
//შეყვანილი მონაცემების ცვლილება,ახალი მნიშვნელობით განახლება.
const handleChange=(e)=>{
    setCoffee({...coffee,[e.target.name]:e.target.value})
}
 //ინგრედიენტების არჩევის და გაუქმების ფუნქცია.
 const ingredientChange=(ingredientId)=>{
    setCoffee(prevState =>{               // განახლება
        const isSelected = prevState.ingredients.includes(ingredientId)
        const newIngredients=isSelected
        ?prevState.ingredients.filter(id => id != ingredientId)//ინგრედიენტების ამოღება 
        :[...prevState.ingredients, ingredientId];//ინგრედიენტის დამატება
        return{...prevState, ingredients:newIngredients}
    })
}
// გაგზავნის ფუნქცია
    const handleSubmit= async(e)=>{
        e.preventDefailt();
        try{
            const response=await fetch("/api/v1/coffee",{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(coffee),//სევერზე გაგზავნა
            })
            if(response.ok){
                fetchCoffee();// ყავის განახლება
                setCoffee({title:"",description:"",ingredients:[]})//გასუფთავება
            }else{
                console.error('Error creating coffee:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating coffee:', error);
        }
    }
    
 
    return(
        <form onSubmit={handleSubmit}>
            <input
                type="tetx"
                name="title"
                placeholder="title"
                value={coffee.title}
                onChange={handleChange}
        />
        <div>
            <input
               type="text"
               name="description"
               placeholder="Description"
               value={coffee.description}
               onChange={handleChange}
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
    )
}

export default CoffeeForm;