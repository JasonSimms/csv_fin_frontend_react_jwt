
import React, { Component, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";
import TransactionService from "./services/transaction.service";

import { Login, Register, Home, Profile, BoardUser, BoardModerator, BoardAdmin } from "./components/index";


function Example() {
  // Declare a new state variables 
  const [transactions, setTransaction] = useState([]);
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setUser] = useState(null);


  function foo() {
    console.log('Foo it!');
    TransactionService.getTransactions().then(res => {
      console.log('RES IS..', res.data);
      return setTransaction(res.data);
    })
    //   return setTransaction(["foo"])
  }

  
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

          {currentUser && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
                </Link>
            </li>
          )}
        </div>

        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to={"/profile"} className="nav-link">
                DBUG{JSON.stringify(currentUser)}
                {currentUser.email}
                {currentUser._id}

              </Link>
            </li>
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={this.logOut}>
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

          <div>Hello world 3<b>{process.env.NODE_ENV} {JSON.stringify(process.env)}</b></div>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/home"]} component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/profile" component={Profile} />
          <Route path="/user" component={BoardUser} />
          <Route path="/mod" component={BoardModerator} />
          <Route path="/admin" component={BoardAdmin} />
        </Switch>
      </div>
    </div>
  );
}

export default Example;