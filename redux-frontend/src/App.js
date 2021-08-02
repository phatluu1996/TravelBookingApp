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
import Common from './utils/Common';
import HotelBookingPage from './components/Hotel/HotelBookingPage';
import HotelBookingCompletePage from './components/Hotel/HotelBookingCompletePage';
import FlightBookingCompletePage from './components/Flight/FlightBookingCompletePage';
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
          <PublicRoute restricted={true} component={Home} path="/" exact />
          <PublicRoute restricted={true} component={CreateNewFlight} path="/create-flight" />
          <PublicRoute restricted={true} component={EditFlight} path="/edit-flight" />
          <PrivateRoute restricted={Common.getRole() === "ROLE_AIRLINE"} component={Airline} path="/airline" />
          <PublicRoute restricted={true} component={ListFlight} path="/list-flight"/>


          <PublicRoute restricted={true} component={Register} path="/register" />

          <PublicRoute restricted={true} component={FlightSearchPage} path="/flight-list" />
          <PublicRoute restricted={true} component={FlightBookingPage} path="/flight-booking" />
          <PublicRoute restricted={true} component={FlightBookingCompletePage} path="/flight-booking-complete" />

          <PublicRoute restricted={true} component={HotelSearchPage} path="/hotel-list" />
          <PublicRoute restricted={true} component={HotelDetailPage} path="/hotel-detail" />
          <PublicRoute restricted={true} component={HotelBookingPage} path="/hotel-booking" />
          <PublicRoute restricted={true} component={HotelBookingCompletePage} path="/hotel-booking-complete" />

          <PublicRoute component={Dashboard} path="/dashboard" exact />
          <PrivateRoute component={UserProfile} restricted={Common.getRole() === "ROLE_USER"} path="/user" exact />
        </Switch>
      </BrowserRouter>
    );
}


export default App;
