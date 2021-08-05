import { useEffect, setState, useState, Component } from "react";
import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { importAll } from "../../utils/JqueryImport";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";

import { retrieveAirline } from "../../actions/actionAirline";
import {getUserId} from "../../utils/Common";

import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const ListFlight = (props) => {
  const dispatch = useDispatch();

  const airline = useSelector((state) => state.airline);


  const id = parseInt(getUserId());

  const header = [
    {
      name: 'FLIGHT',
      selector: 'flightCode',
      sortable: true,
    },
    {
      name: 'FROM',
      selector: 'departureCity',
      sortable: true,
    },
    {
      name: 'TO',
      selector: 'arrivalCity',
      sortable: true,
    },
    {
      name: 'DEPART TIME',
      selector: 'departureTime',
      sortable: true,
    },
    {
      name: 'ARRIVE TIME',
      selector: 'arrivalTime',
      sortable: true,
    },
    {
      name: 'AIRCRAFT',
      selector: 'aircraftType',
      sortable: true,
    },
    {
      name: 'STATUS',
      selector: 'status',
      sortable: true,
    },
    {
      name: 'ACTIONS',
      // cell: flight => <div data-tag="allowRowEvents"><div style={{ fontWeight: bold }}>{row.title}</div>{row.summary}</div>,
      cell: flight => <>
        <Link className="list-btn-sm mr-1" to={`/edit-flight?id=${flight["id"]}`}><FontAwesomeIcon className="list-btn-sm-icon" icon={faEdit}></FontAwesomeIcon> </Link>

        <Link className="list-btn-sm"><FontAwesomeIcon className="list-btn-sm-icon" icon={faTrash}></FontAwesomeIcon></Link></>,

    }
  ];



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
          <div className="content-wrapper ext-width">
            <div className="tables" >
              <div className="typography-heading">Scheduled Flights List</div>
              <div className="shortcodes">
                <DataTable className="table-a" columns={header} data={airline?.airline?.flights} pagination paginationPerPage={10} />                
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
