import React, { Component, useState } from "react";
import CSVReader from 'react-csv-reader';
// import { CSVReader } from 'react-papaparse';

import UserService from "../services/user.service";
import TransactionService from "../services/transaction.service";
import AuthService from "../services/auth.service";

import getInputCard from "./category-card.component";


function Upload(props) {
    const [message, setMessage] = useState("Grusse");
    const [transactions, setTransactions] = useState([]);
    const [count, setCount] = useState(0);
    const [vendors, setVendors] = useState([])

    const dummyVendors = [{ "description": "STANDARD 5 & 10 ACE SAN FRANCISCO CA", "category": "utilities" }];

    function getCategory(obj) {
        let identifier = obj.Description;
        let knownVendor = dummyVendors.find(el => el.description === identifier)
        return knownVendor ? knownVendor.category : null;
    }

    function parseCitiArr(arr){
        let userId = AuthService.getCurrentUser()._id;
        return arr.map(o => {
            return {
                description : o.Description, 
                credit : o.Credit, 
                debit : o.Debit, 
                date: o.Date,
                category: getCategory(o),
                userId}
        })
    }

    function assignCategoryToVendors(vendor, category) {
        let newTransactions = transactions.map(el =>{
            if(el.description == vendor) return {...el, category : category};
            else return el;
        });

        setTransactions(newTransactions);
    }

    function getCategoryFromUser() {
        if (!transactions || !transactions.length) return null;
        let newVendor = transactions.find(el => !el.category);
        try {
            return getInputCard(newVendor, assignCategoryToVendors);

        } catch (error) {
            return (
                <div>
                    <h1>Error!</h1>
                {JSON.stringify(error)}
                </div>)
        }
    }



    // function CategoryInput(obj) {
    //     if (!transactions || !transactions.length) return <div>No Input yet</div>
    //     if (count === transactions.length - 1) return <div>Done</div>
    //     const item = transactions[count];

    //     try {
    //         let description = item.Description;
    //         let debit = item.Debit;
    //         let credit = item.Credit;
    //         return (
    //             <div>
    //                 <h3>What Category Should This Item Have? {count + 1} of {transactions.length}</h3>
    //                 <p>Description: {description}</p>
    //                 <p>Category : {getCategory(item)}</p>
    //                 {debit ? <p>Debit: {debit} </p> : <p> Credit: {credit} </p>}
    //                 <button onClick={() => setCount(count + 1)}>Advance</button>
    //                 <button onClick={() => setCount(count - 1)}>Reverse</button>

    //             </div>
    //         )

    //     } catch (error) {
    //         return (
    //             <div>

    //                 <h3>Item Count {count} has error:</h3>
    //                 <p>{JSON.stringify(error)}</p>
    //                 <button onClick={() => setCount(count + 1)}>Next</button>

    //             </div>)
    //     }
    // }


    return (
        <div>
            Message: {message};
            {/* {transactionList(transactions)} */}

            {/* {CategoryInput()} */}
            {/* {getCategoryFromUser()} */}
            {JSON.stringify(transactions)}
            <CSVReader
                parserOptions={{ header: true }}
                onFileLoaded={(data, fileInfo) => setTransactions(parseCitiArr(data))} />
            {/* <CSVReader
                onDrop={data => console.log(data)}
                // onError={this.handleOnError}
                noDrag
                style={{}}
                config={{}}
                addRemoveButton
                // onRemoveFile={this.handleOnRemoveFile}
            >
                <span>Click to upload.</span>
            </CSVReader> */}
        </div>
    )

}

export default Upload;