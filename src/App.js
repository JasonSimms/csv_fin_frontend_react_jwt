
import React, { Component, useState, useEffect, useLocalStorage } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import TransactionService from "./services/transaction.service";

import { Login, Register, Home, Profile, BoardUser, BoardModerator, BoardAdmin } from "./components/index";


// function useStickyState(defaultValue, key) {
//   const [value, setValue] = useState(() => {
//     const stickyValue = window.localStorage.getItem(key);
//     console.log("wtf?", stickyValue, "::::: ", defaultValue)

//     return !!stickyValue ? JSON.parse(stickyValue) : defaultValue;
//   });

//   React.useEffect(() => {
//     window.localStorage.setItem(key, JSON.stringify(value));
//   }, [key, value])

//   return [value, setValue];
// }


function Example() {
  // Declare a new state variables 
  const [transactions, setTransaction] = useState([]);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setUser] = useState(() => JSON.parse(localStorage.getItem("user", null)));

  // useEffect(() => {
  //   localStorage.setItem("user", currentUser);
  // }, [currentUser]);


  function logOut() {
    AuthService.logout();
    setUser(null);
  }

  // function foo() {
  //   console.log('Foo it!');
  //   TransactionService.getTransactions().then(res => {
  //     console.log('RES IS..', res.data);
  //     return setTransaction(res.data);
  //   })
  //   //   return setTransaction(["foo"])
  // }

  
  return (
    <div>
      {/* <p>You clicked {JSON.stringify(transactions)} times</p>
      <button onClick={foo}>
        Click me
      </button> */}

      <nav className="navbar navbar-expand navbar-dark bg-dark">
        {/* <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link> */}
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
              </Link>
          </li>

          {showModeratorBoard && (
            <li className="nav-item">
              <Link to={"/mod"} className="nav-link">
                Moderator Board
                </Link>
            </li>
          )}

          {showAdminBoard && (
            <li className="nav-item">
              <Link to={"/admin"} className="nav-link">
                Admin Board
                </Link>
            </li>
          )}

          {/* {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
                </Link>
            </li>
          )} */}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                {currentUser.email}
                {currentUser._id}

              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                LogOut
                </a>
            </li>
          </div>
        ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} render={props => <Home {...props} user={currentUser} />} />
          <Route exact path="/login" render={props => <Login {...props} setUser={setUser}/>} />
          <Route exact path="/register" render={props => <Register {...props} setUser={setUser}/>} />
          <Route exact path="/profile" component={Profile} />
          {/* <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default Example;