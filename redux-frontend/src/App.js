import React, { Component, useEffect, useState } from 'react';
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
import UserProfile from './components/User/UserProfile';
import { connect } from 'react-redux';
import HotelSearchPage from './components/Hotel/HotelSearchPage';
import EditFlight from './components/Airline/EditFlight';
import HotelDetailPage from './components/Hotel/HotelDetailPage';
import { getRole } from './utils';
import HotelBookingPage from './components/Hotel/HotelBookingPage';
import HotelBookingCompletePage from './components/Hotel/HotelBookingCompletePage';
import FlightBookingCompletePage from './components/Flight/FlightBookingCompletePage';
import AdminDashboard from './components/Admin/AdminDashboard';
import HotelProfile from './components/Hotel/HotelProfile';
import { signin, googleSignin } from './actions/actionAuth';
import AdminManageUser from './components/Admin/AdminManageUser';
import AdminHotel from './components/Admin/Hotel/AdminHotel';
import AdminHotelCreate from './components/Admin/Hotel/AdminHotelCreate';
import AdminHotelEdit from './components/Admin/Hotel/AdminHotelEdit';
import { setUserSession } from './utils';
import AdminAirline from './components/Admin/Airline/AdminAirline';
import AdminAirlineCreate from './components/Admin/Airline/AdminAirlineCreate';
import AdminAirlineEdit from './components/Admin/Airline/AdminAirlineEdit';


const App = (props) => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    if (props.oath.data) {
      setuser(props.oath.data);
      if (props.oath.data && props.oath.success && !sessionStorage.getItem("user") && !sessionStorage.getItem("userToken")) {
        setUserSession(props.oath.data.accessToken, props.oath.data.username, props.oath.data.header, props.oath.data.id, props.oath.data.roles[0]);
      }
    }
    
  }, [props])

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={false} component={Home} path="/" exact />
        <PrivateRoute restricted={getRole() === "ROLE_USER"} component={UserProfile} path="/user" />

        {/* Airline , Flight */}
        <PrivateRoute restricted={getRole() === "ROLE_AIRLINE"} component={CreateNewFlight} path="/create-flight" />
        <PrivateRoute restricted={getRole() === "ROLE_AIRLINE"} component={EditFlight} path="/edit-flight" />
        <PrivateRoute restricted={getRole() === "ROLE_AIRLINE"} component={Airline} path="/airline" />
        <PrivateRoute restricted={getRole() === "ROLE_AIRLINE"} component={ListFlight} path="/list-flight" />

        <PrivateRoute restricted={getRole() === "ROLE_ADMIN"} component={AdminDashboard} path="/admin-dashboard" />
        <PrivateRoute restricted={getRole() === "ROLE_ADMIN"} component={AdminManageUser} path="/admin-user-manage" />

        <PrivateRoute restricted={getRole() === "ROLE_ADMIN"} component={AdminHotel} path="/admin-hotel-manage" />
        <PrivateRoute restricted={getRole() === "ROLE_ADMIN"} component={AdminHotelCreate} path="/admin-hotel-create" />
        <PrivateRoute restricted={getRole() === "ROLE_ADMIN"} component={AdminHotelEdit} path="/admin-hotel-edit" />

        <PrivateRoute restricted={getRole() === "ROLE_ADMIN"} component={AdminAirline} path="/admin-airline-manage" />
        <PrivateRoute restricted={getRole() === "ROLE_ADMIN"} component={AdminAirlineCreate} path="/admin-airline-create" />
        <PrivateRoute restricted={getRole() === "ROLE_ADMIN"} component={AdminAirlineEdit} path="/admin-airline-edit" />



        <PublicRoute restricted={true} component={Register} path="/register" />

        <PublicRoute restricted={false} component={FlightSearchPage} path="/flight-list" />
        <PublicRoute restricted={false} component={FlightBookingPage} path="/flight-booking" />
        <PublicRoute restricted={false} component={FlightBookingCompletePage} path="/flight-booking-complete" />

        <PublicRoute restricted={false} component={HotelSearchPage} path="/hotel-list" />
        <PublicRoute restricted={false} component={HotelDetailPage} path="/hotel-detail" />
        <PublicRoute restricted={false} component={HotelBookingPage} path="/hotel-booking" />
        <PublicRoute restricted={false} component={HotelBookingCompletePage} path="/hotel-booking-complete" />

        <PublicRoute component={HotelProfile} path="/hotel-profile" exact />


      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    oath: state.auth
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSignin: (username, password) => {
      dispatch(signin(username, password));
    },
    doGoogleSignin: (firstname, lastname, username, email, password) => {
      dispatch(googleSignin(firstname, lastname, username, email, password));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
