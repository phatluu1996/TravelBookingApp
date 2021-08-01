import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { importAll } from "../../utils/JqueryImport";
import EditScheduleFlight from "./Component/EditScheduleFlight";
import { useLocation } from "react-router-dom";

export const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const EditFlight = (props) => {
  let queryParam = useQuery();
  const flightId =queryParam.get("id");
  return (
    <body className="inner-body">
      <Header />   
        <div className="main-cont">
        <div className="inner-page">
          <div className="inner-breadcrumbs" style={{marginBottom:'0'}}>
            <div className="content-wrapper">
              <div className="page-title">
                Airline - <span>Edit Flight</span>
              </div>
              <div className="breadcrumbs">
                <a href="/">Home</a> / <a href="/airline">Airline</a> / <a href="/list-flight">List Flights</a> /{" "}
                <span>Edit Flight</span>
              </div>
              <div className="clear"></div>
            </div>
          </div>
          </div>
          <div className="body-wrapper" style={{paddingTop:'30px' }}>
            <div className="wrapper-padding">
              <div className="typography-heading">Edit Schedule Flight </div>
              <EditScheduleFlight fltId={flightId} />
            </div>
          </div>
        </div>
      <Footer />
    </body>
  );
};

export default EditFlight;
