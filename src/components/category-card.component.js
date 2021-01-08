import React, { Component, useState } from "react";
import CSVReader from 'react-csv-reader';
// import { CSVReader } from 'react-papaparse';

import UserService from "../services/user.service";
import TransactionService from "../services/transaction.service";
import AuthService from "../services/auth.service";


function getInputCard(obj, setCategory) {

    const options = ["utilities", "food", "entertainment", "other"];

    const mappedOptions = options.map((el, i) => {
        return (<label class="checkbox-inline">
            <input type="checkbox" id={"inlineCheckbox" + i} value={el} onClick={setCategory(el)} /> {el}
        </label>)
    })

    const date = obj.date
    const description= obj.description
    const debit = obj.debit
    const credit = obj.credit
    
    return (
    <div>
        <h3>What Category Should This Have?</h3>
        <p>Date: {date}</p>
        <p>Description: {description}</p>
        <p>Debit: {debit}</p>
        <p>Credit: {credit}</p>

    <div class="radio">
        {mappedOptions}

    </div>
    </div>
    )
}

export default getInputCard;