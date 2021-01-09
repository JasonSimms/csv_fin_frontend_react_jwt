import React, { Component, useState } from "react";
import CSVReader from 'react-csv-reader';
// import { CSVReader } from 'react-papaparse';

import UserService from "../services/user.service";
import TransactionService from "../services/transaction.service";
import AuthService from "../services/auth.service";
import VendorService from "../services/vendor.service";

import TransactionCategorize from "./category-card.component";


function Upload(props) {
    const [message, setMessage] = useState("Grusse");
    const [transactions, setTransactions] = useState([]);

    const dummyVendors = [{ "description": "STANDARD 5 & 10 ACE SAN FRANCISCO CA", "category": "utilities" }];
    const [vendors, setVendors] = useState([dummyVendors]);
    const [newVendors, setNewVendors] = useState([]);


    function getCategory(obj) {
        let identifier = obj.Description;
        let knownVendor = vendors.find(el => el.description === identifier)
        return knownVendor ? knownVendor.category : null;
    }

    function parseCitiArr(arr) {
        let userId = AuthService.getCurrentUser()._id;
        return arr.map(o => {
            if (Object.keys(o).includes("description")) return o;
            return {
                description: o.Description,
                credit: o.Credit,
                debit: o.Debit,
                date: o.Date,
                category: getCategory(o),
                userId
            }
        })
    }


    function handleFileUpload(data, fileDate) {
        const parsedData = parseCitiArr(data);
        setTransactions(parsedData);
        let newVendors = []
        parsedData.filter(el => !el.category)
            .forEach(el => {
                var i = newVendors.findIndex(x => x.description == el.description);
                if (i <= -1) newVendors.push(el)
            });
        return setNewVendors(newVendors);
    }

    function submitCategorizedVendors(newVendors) {
        console.log('init submit cats',newVendors );
        //API CALL TO SUBMIT NEW VENDORS LIST
        VendorService.submitNewVendors(newVendors).then(vendors => {
            const newTransactions = transactions.map(el => {if(!el.category) el.category = getCategory(el)});
            console.log('debug>>',newTransactions.filter(el => !el.category))
            setTransactions(newTransactions);
            setNewVendors([]);
        })
        
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
            {/* {JSON.stringify(transactions)} */}
            <TransactionCategorize newVendors={newVendors} submitCategorizedVendors={submitCategorizedVendors} />
            <CSVReader
                parserOptions={{ header: true }}
                onFileLoaded={handleFileUpload}
            />
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