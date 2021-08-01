import { useEffect, setState, useState, Component } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";


const HotelItemPage = () =>{
    

    return (
        <>
        </>
    )

};
const mapStateToProps = (state, ownProps) => {
    return {
      hotels: state.hotels,
      provinces: state.province,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getHotels: (
        province,
        district,
        ward,
        numberAdult,
        numberChildren,
        checkInDate,
        numRoom
      ) => {
        dispatch(
          fetchHotel(
            province,
            district,
            ward,
            numberAdult,
            numberChildren,
            checkInDate,
            numRoom
          )
        );
      },
      getProvince: () => {
        dispatch(retrieveProvince());
      },
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(HotelSearchPage);