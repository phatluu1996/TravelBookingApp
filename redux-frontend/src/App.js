import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

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
import { getRole, ROLE_ADMIN, ROLE_AIRLINE, ROLE_HOTEL, ROLE_USER } from './utils';
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
import UpdateUserDetail from './components/Admin/User/UpdateUserDetail';
import UserDetail from './components/Admin/User/UserDetail';
import AdminAirline from './components/Admin/Airline/AdminAirline';
import AdminAirlineCreate from './components/Admin/Airline/AdminAirlineCreate';
import AdminAirlineEdit from './components/Admin/Airline/AdminAirlineEdit';
import AirlineProfile from './components/Airline/Airline';
import About from './components/About';
import Contact from './components/Contact';
import AdminHotelProfile from './components/Admin/Hotel/AdminHotelProfile';
import FlightSearchPage2 from './components/Flight/FlightSearchPage2';
import RoundFlightBookingPage from './components/Flight/RoundFlightBookingPage';
import RoundFlightBookingCompletePage from './components/Flight/RoundFlightBookingCompletePage';

import ComboBookingPage from './components/Combo/ComboBookingPage';
import ComboStepWizard from './components/Combo/ComboStepWizard';
import AdminAirlineProfile from './components/Admin/Airline/AdminAirlineProfile';
import ComboBookingCompletePage from './components/Combo/ComboBookingCompletePage';


const App = (props) => {
  const [user, setuser] = useState(null);
  useEffect(() => {
    if (props.oath.data) {
      setuser(props.oath.data);
      if (props.oath.data && props.oath.success && !sessionStorage.getItem("user") && !sessionStorage.getItem("userToken")) {
        setUserSession(props.oath.data.accessToken, props.oath.data.username, props.oath.data.header, props.oath.data.id, props.oath.data?.roles[0]);
      }
    }

  }, [props])

  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute restricted={false} component={Home} path="/" exact />
        <PublicRoute restricted={false} component={About} path="/about" exact />
        <PublicRoute restricted={false} component={Contact} path="/contact" exact />


        <PrivateRoute restricted={getRole() === ROLE_USER} component={UserProfile} path="/user" />

        {/* Airline , Flight */}
        <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={CreateNewFlight} path="/create-flight" />
        <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={EditFlight} path="/edit-flight" />
        <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={AirlineProfile} path="/airline-profile" />
        <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={ListFlight} path="/list-flight" />

        <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminDashboard} path="/admin-dashboard" />
        <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminManageUser} path="/admin-user-manage" />

        <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminHotel} path="/admin-hotel-manage" />
        <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminHotelCreate} path="/admin-hotel-create" />
        <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminHotelEdit} path="/admin-hotel-edit" />

        <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminAirline} path="/admin-airline-manage" />
        <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminAirlineCreate} path="/admin-airline-create" />
        <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminAirlineEdit} path="/admin-airline-edit" />


        <PublicRoute restricted={true} component={Register} path="/register" />

        <PublicRoute restricted={false} component={FlightSearchPage} path="/flight-list" />
        <PublicRoute restricted={false} component={FlightSearchPage2} path="/flight-round-list" />
        <PublicRoute restricted={getRole() == ROLE_ADMIN || getRole() == ROLE_AIRLINE || getRole() == ROLE_HOTEL} component={FlightBookingPage} path="/flight-booking" />
        <PublicRoute restricted={getRole() == ROLE_ADMIN || getRole() == ROLE_AIRLINE || getRole() == ROLE_HOTEL} component={RoundFlightBookingPage} path="/round-flight-booking" />
        <PublicRoute restricted={getRole() == ROLE_ADMIN || getRole() == ROLE_AIRLINE || getRole() == ROLE_HOTEL} component={FlightBookingCompletePage} path="/flight-booking-complete" />
        <PublicRoute restricted={getRole() == ROLE_ADMIN || getRole() == ROLE_AIRLINE || getRole() == ROLE_HOTEL} component={RoundFlightBookingCompletePage} path="/round-flight-booking-complete" />

        <PublicRoute restricted={false} component={HotelSearchPage} path="/hotel-list" />
        <PublicRoute restricted={false} component={HotelDetailPage} path="/hotel-detail" />
        <PublicRoute restricted={getRole() == ROLE_ADMIN || getRole() == ROLE_AIRLINE || getRole() == ROLE_HOTEL} component={HotelBookingPage} path="/hotel-booking" />
        <PublicRoute restricted={getRole() == ROLE_ADMIN || getRole() == ROLE_AIRLINE || getRole() == ROLE_HOTEL} component={HotelBookingCompletePage} path="/hotel-booking-complete" />

        <PublicRoute restricted={false} component={ComboBookingPage} path="/combo-booking" />
        <PublicRoute restricted={false} component={ComboBookingCompletePage} path="/combo-booking-complete" />
        <PublicRoute restricted={false} component={ComboStepWizard} path="/combo-list" />

        <PrivateRoute restricted={getRole() === ROLE_HOTEL} component={HotelProfile} path="/hotel-profile" exact />

        <PublicRoute restricted={false} component={UpdateUserDetail} path="/update-user-detail" />
        <PublicRoute restricted={false} component={UserDetail} path="/user-detail" />

        <PublicRoute restricted={false} component={AdminHotelProfile} path="/admin-hotel-profile" />
        <PublicRoute restricted={false} component={AdminAirlineProfile} path="/admin-airline-profile" />

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
