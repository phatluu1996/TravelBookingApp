import { useEffect} from "react";
import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import Common from '../../utils';

import { importAll } from "../../utils/JqueryImport";
import { retrieveAirline} from "../../actions/actionAirline";
import {getUserId} from "../../utils";
import { useSelector, useDispatch } from "react-redux";
import AddNewFlight from "./Component/AddNewFlight";
import { Link } from "react-router-dom";

const CreateNewFlight = (props) => {

  const dispatch = useDispatch();

  const airline = useSelector((state) => state.airline);

  const id = parseInt(getUserId())


  const getAirline = (id) => {
    dispatch(retrieveAirline(id));
  };

  useEffect(() => {
    var mount = false;
    importAll(); 
    getAirline(id);
    return () => {
      mount = true;
    };  
  }, []);
  console.log(airline);

  return (
    <body class="inner-body">
      <Header />   
        <div className="main-cont">
        <div className="inner-page">
          <div className="inner-breadcrumbs" style={{marginBottom:'0'}}>
            <div className="content-wrapper">
              <div className="page-title">
                Airline - <span>Create New Flight</span>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link> / <Link to="/airline-profile">Airline</Link> / <Link href="/list-flight">List Flights</Link> /{" "}
                <span>Create Flight</span>
              </div>
              <div className="clear"></div>
            </div>
          </div>
          </div>
          <div className="body-wrapper" style={{paddingTop:'30px' }}>
            <div className="wrapper-padding">
              <div className="typography-heading">More Flight To More Increase Sales Growth</div>
              <AddNewFlight airlineId={id} />
            </div>
          </div>
        </div>
      <Footer />
    </body>
  );
};

export default CreateNewFlight;
