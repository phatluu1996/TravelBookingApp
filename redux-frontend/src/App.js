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
import {getRole} from './utils/Common';
import HotelBookingPage from './components/Hotel/HotelBookingPage';
import HotelBookingCompletePage from './components/Hotel/HotelBookingCompletePage';
import FlightBookingCompletePage from './components/Flight/FlightBookingCompletePage';
import AdminDashboard from './components/Admin/AdminDashboard';
import HotelProfile from './components/Hotel/HotelProfile';
// import FlightBookingPage from './components/Flight/FlightBookingPage';


const App = () => {
    return (
      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={getRole() === "ROLE_AIRLINE"} component={CreateNewFlight} path="/create-flight" />
          <PublicRoute restricted={getRole() === "ROLE_AIRLINE"} component={EditFlight} path="/edit-flight" />
          <PrivateRoute restricted={getRole() === "ROLE_AIRLINE"} component={Airline} path="/airline" />
          <PublicRoute restricted={getRole() === "ROLE_AIRLINE"} component={ListFlight} path="/list-flight"/>

          <PublicRoute restricted={true} component={AdminDashboard} path="/admin-dashboard" />
          <PublicRoute restricted={true} component={Register} path="/register" />

          <PublicRoute restricted={false} component={FlightSearchPage} path="/flight-list" />
          <PublicRoute restricted={false} component={FlightBookingPage} path="/flight-booking" />
          <PublicRoute restricted={false} component={FlightBookingCompletePage} path="/flight-booking-complete" />

          <PublicRoute restricted={false} component={HotelSearchPage} path="/hotel-list" />
          <PublicRoute restricted={false} component={HotelDetailPage} path="/hotel-detail" />
          <PublicRoute restricted={false} component={HotelBookingPage} path="/hotel-booking" />
          <PublicRoute restricted={false} component={HotelBookingCompletePage} path="/hotel-booking-complete" />

          <PublicRoute component={HotelProfile} path="/hotel" exact />
          <PublicRoute restricted={false} component={Dashboard} path="/dashboard" exact />
          <PrivateRoute restricted={getRole() === "ROLE_USER"} component={UserProfile} path="/user"/>
        </Switch>
      </BrowserRouter>
    );
}


export default App;
