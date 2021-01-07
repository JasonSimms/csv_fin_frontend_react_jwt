import React, { Component, useState } from "react";

import UserService from "../services/user.service";
import TransactionService from "../services/transaction.service";


function Home(props) {
  const [message, setMessage] = useState("Grusse");
  const [transactions, setTransactions] = useState([]);

  function getTransactionsByUser() {
    try{

      console.log('Foo it!', Object.keys(props.user));
      const userId = props.user._id || "";
      TransactionService.getTransactionsByUser(userId).then(res => {
        console.log('RES IS..', res.data);
        return setTransactions(res.data);
      })
    }catch(e){
      console.error(e);
      setMessage(JSON.stringify(e));
    }
  }

  function createTransactionsByUser(){
    try{

      const dummyTrans = {
        description:"dummy",
        date: Date.now(),
        debit: 1337,
        userId: props.user._id || "errorOnId!",
      }
      TransactionService.createTransactionsByUser(dummyTrans).then(res => {
        console.log('Res ==> ',res);
        getTransactionsByUser();
      })
    }catch(e){
      console.error(e);
      setMessage(JSON.stringify(e));
    }
  }

  function bulkWriteTransactions(){
    console.log("INIT..");
    const dummyTrans = {
      description:"dummy",
      date: Date.now(),
      debit: 1337,
      userId: props.user._id || "errorOnId!",
    }
    const arr = [dummyTrans,dummyTrans,dummyTrans];
    try{

      TransactionService.bulkWriteTransactions(arr).then(res => {
        console.log('result>>', res);
      })}catch(e){
        console.error(e);
        setMessage(JSON.stringify(e));
      }
  }

  return (
    <div>
      Howdy there: {message};
      <button onClick={getTransactionsByUser}>
        Get Transactions By User
      </button>
      <button onClick={createTransactionsByUser}>
        Create Transactions By User
      </button>
      <button onClick={bulkWriteTransactions}>
        Bulk Transactions By User
      </button>
      <br/>
      Transactions: {JSON.stringify(transactions)}
    </div>
  )

}

export default Home;