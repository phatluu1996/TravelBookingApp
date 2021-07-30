import React, { Component, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import Airline from './components/Airline/Airline';
import FlightSearchPage from './components/Flight/FlightSearchPage';
import { connect } from 'react-redux';


const App = () => {

    useEffect(() => {
      // let mount = false;

      console.log("Render !");

      // return () => {
      //   mount = true;
      // }
    })

    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={Airline} path="/airline" />

          <PublicRoute restricted={false} component={FlightSearchPage} path="/flight-list" />

          <PrivateRoute component={Dashboard} path="/dashboard" exact />
        </Switch>
      </BrowserRouter>
    );
}


export default App;
