import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import Airline from './components/Airline/Airline';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const App = () => {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={Airline} path="/airline" />
          
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
        </Switch>
      </BrowserRouter>
    );
}

export default App;
