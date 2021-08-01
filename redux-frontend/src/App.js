import React, { Component, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

import Airline from './components/Airline/Airline';
import CreateNewFlight from './components/Airline/CreateNewFlight';
import ListFlight from './components/Airline/ListFlight';

import FlightSearchPage from './components/Flight/FlightSearchPage';
import Register from './components/Layout/Register';
import UserProfile from'./components/User/UserProfile';
import { connect } from 'react-redux';
import HotelSearchPage from './components/Hotel/HotelSearchPage';
import EditFlight from './components/Airline/EditFlight';


const App = () => {

    useEffect(() => {
      let mount = false;

      console.log("Render !");
      
      return () => {
        mount = true;
      }
    },[])

    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={CreateNewFlight} path="/create-flight" />
          <PublicRoute restricted={false} component={EditFlight} path="/edit-flight" />
          <PublicRoute restricted={false} component={Airline} path="/airline" />
          <PublicRoute restricted={false} component={ListFlight} path="/list-flight"/>
          <PublicRoute restricted={false} component={Register} path="/register" />
          <PublicRoute restricted={false} component={UserProfile} path="/user" />
          <PublicRoute restricted={false} component={FlightSearchPage} path="/flight-list" />
          <PublicRoute restricted={false} component={FlightBookingPage} path="/flight-booking" />

          <PublicRoute restricted={false} component={HotelSearchPage} path="/hotel-list" />
          <PrivateRoute component={Dashboard} path="/dashboard" exact />
        </Switch>
      </BrowserRouter>
    );
}


export default App;
