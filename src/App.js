
import React, { Component, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import TransactionService from "./services/transaction.service";

import { Login, Register, Home, Profile, BoardUser, BoardModerator, BoardAdmin } from "./components/index";


function Example() {
  // Declare a new state variable, which we'll call "count"  
  const [transactions, setTransaction] = useState([]);

  function foo() {
      console.log('Foo it!');
      TransactionService.getTransactions().then(res => {
          console.log('RES IS..',res);
          return setTransaction(res)

      })
    //   return setTransaction(["foo"])
  }
  
  return (
    <div>
      <p>You clicked {JSON.stringify(transactions)} times</p>
      <button onClick={foo}>
        Click me
      </button>
    </div>
  );
}

export default Example;