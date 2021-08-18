import React, { Component, useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import FlightSearchPage from './components/Flight/FlightSearchPage';
import FlightBookingPage from './components/Flight/FlightBookingPage';
import Register from './components/Layout/Register';
import UserProfile from './components/User/UserProfile';
import { connect } from 'react-redux';
import HotelSearchPage from './components/Hotel/HotelSearchPage';
import HotelDetailPage from './components/Hotel/HotelDetailPage';
import { getRole, ROLE_ADMIN, ROLE_AIRLINE, ROLE_HOTEL, ROLE_USER } from './utils';
import HotelBookingPage from './components/Hotel/HotelBookingPage';
import HotelBookingCompletePage from './components/Hotel/HotelBookingCompletePage';
import FlightBookingCompletePage from './components/Flight/FlightBookingCompletePage';
import AdminDashboard from './components/Admin/AdminDashboard';
import { signin, googleSignin } from './actions/actionAuth';
import AdminManageUser from './components/Admin/AdminManageUser';
import AdminHotel from './components/Admin/Hotel/AdminHotel';
import AdminHotelCreate from './components/Admin/Hotel/AdminHotelCreate';
import AdminHotelEdit from './components/Admin/Hotel/AdminHotelEdit';
import { setUserSession } from './utils';
import UpdateUserDetail from './components/Admin/User/UpdateUserDetail';
import AdminAirline from './components/Admin/Airline/AdminAirline';
import AdminAirlineCreate from './components/Admin/Airline/AdminAirlineCreate';
import AdminAirlineEdit from './components/Admin/Airline/AdminAirlineEdit';

import About from './components/About';
import Contact from './components/Contact';

import FlightSearchPage2 from './components/Flight/FlightSearchPage2';
import RoundFlightBookingPage from './components/Flight/RoundFlightBookingPage';
import RoundFlightBookingCompletePage from './components/Flight/RoundFlightBookingCompletePage';

import ComboBookingPage from './components/Combo/ComboBookingPage';
import ComboStepWizard from './components/Combo/ComboStepWizard';
import ComboBookingCompletePage from './components/Combo/ComboBookingCompletePage';
import AdminFeedback from './components/Admin/Feedback/AdminFeedback';

import AirlineDashboard from './components/Admin/Airline/AirlineDashboard';
import AirlineUpdateProfile from './components/Admin/Airline/AirlineUpdateProfile';
import AirlineBookingData from './components/Admin/Airline/AirlineBookingData';
import AirlineFlightData from './components/Admin/Airline/AirlineFlightData';
import AirlineCreateFlight from './components/Admin/Airline/AirlineCreateFlight';
import AirlineUpdateFlight from './components/Admin/Airline/AirlineUpdateFlight';

import ChangePasswordFoget from './components/Layout/ChangePasswordForget';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from 'styled-components';
import AddNewRoom from './components/Room/AddNewRoom';
import ConfirmRegister from './components/Layout/ConfirmRegister';
import AdminHotelDashboard from './components/Admin/Hotel/AdminHotelDashboard';
import AdminHotelUpdate from './components/Admin/Hotel/AdminHotelUpdate';
import AdminHotelRoom from './components/Admin/Hotel/AdminHotelRoom';
import AdminHotelBookingHistory from './components/Admin/Hotel/AdminHotelBookingHistory';

import HotelPartnerRegister from './components/Layout/HotelPartnerRegister';


const App = (props) => {
  const theme = createTheme();

  const [user, setuser] = useState(null);
  useEffect(() => {
    if (props.oath.data) {
      setuser(props.oath.data);
      if (props.oath.data && props.oath.success && props.oath.data.accessToken && !sessionStorage.getItem("user") && !sessionStorage.getItem("userToken")) {
        setUserSession(props.oath.data.accessToken, props.oath.data.username, props.oath.data.header, props.oath.data.id, props.oath.data?.roles[0]);
      }
    }

  }, [props])

  return (
    <ThemeProvider theme={theme}>

      <BrowserRouter>
        <Switch>
          <PublicRoute restricted={false} component={Home} path="/" exact />
          <PublicRoute restricted={false} component={About} path="/about" exact />
          <PublicRoute restricted={false} component={Contact} path="/contact" exact />

          {/* Register */}
          <PublicRoute restricted={true} component={Register} path="/register"/>
          <PublicRoute restricted={getRole() == ROLE_ADMIN || getRole() == ROLE_AIRLINE || getRole() == ROLE_HOTEL || getRole() == ROLE_USER} component={HotelPartnerRegister} path="/hotel-partner-register" />
          <PublicRoute restricted={false} component={ConfirmRegister} path="/activateAccount"/>
          <PublicRoute restricted={false} component={ChangePasswordFoget} path="/resetPassword"/>

          {/* User */}
          <PrivateRoute restricted={getRole() === ROLE_USER} component={UserProfile} path="/user"/>


          {/* Admin */}
          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminDashboard} path="/admin-dashboard" />
          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminManageUser} path="/admin-user-manage" />
          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminFeedback} path="/admin-feedback-manage" />
          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={UpdateUserDetail} path="/update-user-detail" />

          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminHotel} path="/admin-hotel-manage" />
          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminHotelCreate} path="/admin-hotel-create" />
          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminHotelEdit} path="/admin-hotel-edit" />

          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminAirline} path="/admin-airline-manage" />
          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminAirlineCreate} path="/admin-airline-create" />
          <PrivateRoute restricted={getRole() === ROLE_ADMIN} component={AdminAirlineEdit} path="/admin-airline-edit" />


          {/* Booking */}
          <PublicRoute restricted={false} component={FlightSearchPage} path="/flight-list" />
          <PublicRoute restricted={false} component={FlightSearchPage2} path="/flight-round-list" />
          <PrivateRoute restricted={getRole() == ROLE_USER} component={FlightBookingPage} path="/flight-booking" />
          <PrivateRoute restricted={getRole() == ROLE_USER} component={RoundFlightBookingPage} path="/round-flight-booking" />
          <PrivateRoute restricted={getRole() == ROLE_USER} component={FlightBookingCompletePage} path="/flight-booking-complete" />
          <PrivateRoute restricted={getRole() == ROLE_USER} component={RoundFlightBookingCompletePage} path="/round-flight-booking-complete" />

          <PublicRoute restricted={false} component={HotelSearchPage} path="/hotel-list"/>
          <PublicRoute restricted={false} component={HotelDetailPage} path="/hotel-detail"/>
          <PrivateRoute restricted={getRole() == ROLE_USER} component={HotelBookingPage} path="/hotel-booking" />
          <PrivateRoute restricted={getRole() == ROLE_USER} component={HotelBookingCompletePage} path="/hotel-booking-complete" />

          <PublicRoute restricted={false} component={ComboStepWizard} path="/combo-list"/>
          <PrivateRoute restricted={getRole() == ROLE_USER} component={ComboBookingPage} path="/combo-booking"/>
          <PrivateRoute restricted={getRole() == ROLE_USER} component={ComboBookingCompletePage} path="/combo-booking-complete"/>


          {/* Ngoc */}
          {/* Airline Management */}
          <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={AirlineDashboard} path="/airline-dashboard" />
          <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={AirlineUpdateProfile} path="/airline-update-profile" />
          <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={AirlineBookingData} path="/airline-booking-data" />
          <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={AirlineFlightData} path="/airline-flight-data" />
          <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={AirlineCreateFlight} path="/airline-create-flight" />
          <PrivateRoute restricted={getRole() === ROLE_AIRLINE} component={AirlineUpdateFlight} path="/airline-update-flight" />

          {/* Hoa */}
          {/* Hotel Management */}
          <PrivateRoute restricted={getRole() === ROLE_HOTEL} component={AdminHotelDashboard} path="/hotel-admin-dashboard" />
          <PrivateRoute restricted={getRole() === ROLE_HOTEL} component={AdminHotelUpdate} path="/hotel-admin-update" />
          <PrivateRoute restricted={getRole() === ROLE_HOTEL} component={AdminHotelBookingHistory} path="/hotel-admin-booking" />
          <PrivateRoute restricted={getRole() === ROLE_HOTEL} component={AdminHotelRoom} path="/hotel-admin-room" />
          <PrivateRoute restricted={getRole() === ROLE_HOTEL} component={AddNewRoom} path="/admin-room-create" />

        </Switch>
      </BrowserRouter>
    </ThemeProvider>
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
