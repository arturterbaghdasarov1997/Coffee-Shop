import { createContext, useState } from "react";
//აპლიკ.კონტექსტი
export const AppContext = createContext();
const AppProvaider=({children}) =>{
    const [ingredients,setIngredients]=useState([])
    const [ coffee,setCoffee]=useState([]);

//სერვერიდან ინგრედიენტების მიღება
    const fetchIngredients= async()=>{
        try{
            const response=await fetch("/api/v1/ingredients")
            if(response.ok){
                const data = await response.json();
                setIngredients(data);
            }else{
            console.error("error ingredients",response.statusText)
            }
        }catch(error){
            console.error("error ingredients",error)
        }
    }
    //სერვერიდან ყავის მიღება
    const fetchCoffee=async()=>{
        try{
            const response=await fetch("/api/v1//coffee")
            if(response.ok){
                const data=await response.json();
                setCoffee(data)
            }else{
                console.error("error coffee",response.statusText)
            }
        }catch(error){
            console.error("error coffee",error)
        }
    }
    // AppContext-ის პროვაიდერის დაბრუნება, რომელიც უზრუნველყოფს მონაცემებს ყველა შვილ კომპონენტისთვის.
    return(
     <AppProvaider.provider value={{ingredients,coffee,fetchIngredients,fetchCoffee}}>
     {children}
     </AppProvaider.provider>
    )
}