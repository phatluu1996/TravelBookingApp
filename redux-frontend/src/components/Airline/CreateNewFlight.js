import { useEffect} from "react";
import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { importAll } from "../../utils/JqueryImport";
import { retrieveAirline} from "../../actions/actionAirline";

import { useSelector, useDispatch } from "react-redux";
import AddNewFlight from "./Component/AddNewFlight";

const CreateNewFlight = (props) => {

  const dispatch = useDispatch();

  const airline = useSelector((state) => state.airline);


  const id = 2;

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
  }, [props]);
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
                <a href="/">Home</a> / <a href="/airline">Airline</a> /{" "}
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
