import { useEffect, setState, useState, Component } from "react";
import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { importAll } from "../../utils/JqueryImport";
import { Link } from "react-router-dom";

import { retrieveAirline } from "../../actions/actionAirline";

import { useSelector, useDispatch } from "react-redux";

const ListFlight = (props) => {
  const dispatch = useDispatch();

  const airline = useSelector((state) => state.airline);

  const flights = useSelector((state) => state.flights);

  const id = 2;

  const getAirline = (id) => {
    dispatch(retrieveAirline(id));
  };

  useEffect(() => {
    var mount = false;
    window.scrollTo(0, 0);
    importAll();
    getAirline(id);

    return () => {
      mount = true;
    };
  }, []);
  console.log(airline);
  return (
    <>
      <Header />
      <div className="main-cont" style={{ backgroundColor: "#fff" }}>
        <div className="inner-page">
          <div className="inner-breadcrumbs" style={{ marginBottom: "50px" }}>
            <div className="content-wrapper">
              <div className="page-title">
                Airline - <span>List Flights</span>
              </div>
              <div className="breadcrumbs">
                <a href="/">Home</a> / <a href="/airline">Airline</a> /{" "}
                <span>List Flights</span>
              </div>
              <div className="clear"></div>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="tables" >
              <div className="typography-heading">Scheduled Flights List</div>
              <div className="shortcodes">
                <table className="table-a light">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Flight</th>
                      <th>From</th>
                      <th>To</th>
                      <th>Schedule Time</th>
                      <th>Arrival Time</th>
                      <th>Business</th>
                      <th>Economic</th>
                      <th>Aircraft</th>
                      <th>Status</th>
                      <th>#</th>
                    </tr>
                  </thead>

                  <tbody>
                    {airline?.airline?.flights?.map((item, i) => (
                      <tr key={item.id}>
                        <td>{i + 1}</td>
                        <td>{item.flightCode}</td>
                        <td>{item.departureCity}</td>
                        <td>{item.arrivalCity}</td>
                        <td>{item.departureTime}</td>
                        <td>{item.arrivalTime}</td>
                        <td>{item.businessCapacity}</td>
                        <td>{item.economyCapacity}</td>

                        <td>{item.aircraftType}</td>

                        <td>{item.status}</td>
                        <td>
                          {/* <a
                            href="/edit-flight/{item.}"
                            className="header-viewed-btn"
                            style={{
                              padding: "5px 5px 0px 10px",
                              color: "#ff7200",
                            }}
                          > */}
                            <Link  style={{
                              padding: "5px 5px 0px 10px",
                              color: "#ff7200",
                            }} className="header-viewed-btn" to={`/edit-flight?id=${ item.id }`}>Edit</Link>
                          {/* </a> */}
                          <a
                            href="#"
                            className="header-viewed-btn"
                            style={{
                              padding: "5px 5px 0px 10px",
                              color: "#ff7200",
                            }}
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ) )}
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
              <div className="clear"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ListFlight;
