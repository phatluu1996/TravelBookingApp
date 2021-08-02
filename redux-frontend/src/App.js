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
import FlightBookingPage from './components/Flight/FlightBookingPage';
import Register from './components/Layout/Register';
import UserProfile from'./components/User/UserProfile';
import { connect } from 'react-redux';
import HotelSearchPage from './components/Hotel/HotelSearchPage';
import EditFlight from './components/Airline/EditFlight';
import HotelDetailPage from './components/Hotel/HotelDetailPage';
// import FlightBookingPage from './components/Flight/FlightBookingPage';


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
          <PrivateRoute restricted={false} component={Airline} path="/airline" />
          <PublicRoute restricted={false} component={ListFlight} path="/list-flight"/>
          <PublicRoute restricted={false} component={Register} path="/register" />
          <PublicRoute restricted={false} component={FlightSearchPage} path="/flight-list" />
          <PublicRoute restricted={false} component={FlightBookingPage} path="/flight-booking" />
          <PublicRoute restricted={false} component={HotelSearchPage} path="/hotel-list" />
          <PublicRoute restricted={false} component={HotelDetailPage} path="/hotel-detail" />

          <PrivateRoute component={Dashboard} path="/dashboard" exact />
          <PrivateRoute component={UserProfile} path="/user" exact />
        </Switch>
      </BrowserRouter>
    );
}


export default App;
