import React, { Component, useState } from "react";
import CSVReader from 'react-csv-reader';
// import { CSVReader } from 'react-papaparse';

import UserService from "../services/user.service";
import TransactionService from "../services/transaction.service";
import AuthService from "../services/auth.service";

export default function Card({ newVendors, categories, submitCategorizedVendors }) {
    // console.log(params)
    const [count, setCount] = useState(0);
    const [categorizedVendors, setCategorizedVendors] = useState([]);


    function handleAdvance(category) {
        const categorizedVendor = { description : newVendors[count].description, "category" : category };
        console.log(categorizedVendors, 'wat', categorizedVendor);
        let arr = [...categorizedVendors , categorizedVendor];
        console.log(arr);
        setCategorizedVendors(arr);
        setCount(count+1);
    }

    function categoryOptions(){

        if(!categories || !categories.length) categories = ["utilities", "food", "entertainment", "other"];
        
        return categories.map((el,i)=>{
            return <button key={"cat"+i} onClick={()=>handleAdvance(el)}>{el}</button>
        })
    
    }



    if(!newVendors || !newVendors.length)return null;
    if(count == newVendors.length -1){
        submitCategorizedVendors(categorizedVendors);
        return null;
    }
    return (
        <div>Helllo World {count}
            <p>{JSON.stringify(newVendors[count])}</p>
            {categoryOptions()}
            {/* <button onClick={handleAdvance}>Advance</button> */}
        </div>
    )

}



// function getInputCard(obj, setCategory) {

//     const options = ["utilities", "food", "entertainment", "other"];

//     const mappedOptions = options.map((el, i) => {
//         return (<label class="checkbox-inline">
//             <input type="checkbox" id={"inlineCheckbox" + i} value={el} onClick={setCategory(el)} /> {el}
//         </label>)
//     })

//     const date = obj.date
//     const description= obj.description
//     const debit = obj.debit
//     const credit = obj.credit

//     return (
//     <div>
//         <h3>What Category Should This Have?</h3>
//         <p>Date: {date}</p>
//         <p>Description: {description}</p>
//         <p>Debit: {debit}</p>
//         <p>Credit: {credit}</p>

//     <div class="radio">
//         {mappedOptions}

//     </div>
//     </div>
//     )
// }

// export default getInputCard;