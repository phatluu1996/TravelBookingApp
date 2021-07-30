import { useEffect, setState, useState, Component } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";

import { retrieveAirline } from "../../actions/actionAirline";
import { listFlightsByAirline } from "../../actions/actionFlightByAirline";

import { useSelector, useDispatch } from "react-redux";
import AddNewFlight from "./AddNewFlight";

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

const Airline = (props) => {
  // let query = useQuery();
  const dispatch = useDispatch();

  const airline = useSelector((state) => state.airline);

  const flights = useSelector((state) => state.flights);

  const id = 2;

  const getAirline = (id) => {
    dispatch(retrieveAirline(id));
  };

  const fullAddress = (addr) => {
    return addr.street + ", " + addr.ward.prefix 
    + " " + addr.ward.name + ", " + addr.district.prefix + " " + addr.district.name
    + ", " + addr.province.name  + ", " + addr.postalCode;
  }

  useEffect(() => {
    var mount = false;

    getAirline(id);
    // const flights = listFlights(2)
    // console.log(flights);
    return () => {
      mount = true;
    };
  }, [props]);
  console.log(airline);

  return (
    <>
      <Header />
      <div className="main-cont">
        <div className="inner-page">
          <div className="inner-breadcrumbs">
            <div className="content-wrapper">
              <div className="page-title">Airline Profile</div>
              <div className="breadcrumbs">
                <a href="#">Home</a> / <span>Profile</span>
              </div>
              <div className="clear"></div>
            </div>
          </div>
          <div className="content-wrapper">
            <div className="shortcodes-block">
              <div className="p-item-page" style={{ paddingBottom: "250px" }}>
                <div className="p-item-page-l">
                  <div className="p-item-page-lb">
                    <div className="p-item-padding">
                      <div id="p-item-slider">
                        <div className="p-item-slide">
                          <img
                            alt=""
                            src="img/p-slider-01.jpg"
                            style={{ width: "45%" }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <br className="clear" />
                </div>
              </div>
              <div className="p-item-page-r">
                <div className="shortcodes-right" style={{ width: "100%" }}>
                  <div className="tabs-type-b tabs-block">
                    <div className="tabs-type-bi">
                      <div className="tabs-type-bi-a">
                        <div className="tabs-type-bi-l">
                          <nav className="tabs-nav">
                            <ul>
                              <li>
                                <a className="active" href="#">
                                  Information <span></span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  Contact details <span></span>
                                </a>
                              </li>
                            </ul>
                            <div className="clear"></div>
                          </nav>
                        </div>
                        <div className="tabs-type-bi-r">
                          <div className="tabs-type-bi-rb">
                            <div className="tabs-type-bi-p">
                              <div className="tabs-content">
                                <div className="tabs-content-i">
                                  <div className="p-item-details">
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Airline Name
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.airlineName}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Homepage
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.homepage}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Phone
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.phone}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Fax
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.fax}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Address
                                      </div>
                                      <div className="p-item-details-ir">{fullAddress(airline.airline?.location)}</div>
                                      <div className="clear"></div>
                                    </div>
                                  </div>
                                </div>
                                <div className="tabs-content-i">
                                  <div className="p-item-details">
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Contact Name
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.contactName}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Title
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.contactTitle}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Mobile
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.mobile}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                    <div className="p-item-details-i">
                                      <div className="p-item-details-il">
                                        Email
                                      </div>
                                      <div className="p-item-details-ir">
                                        {airline.airline.email}
                                      </div>
                                      <div className="clear"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="clear"></div>
                        </div>
                      </div>
                      <div className="clear"></div>
                    </div>
                    <h3>Description</h3>
                    <div className="p-item-more">
                      Cursus. Morbi ut mi. Nullam enim leo, egestas id,
                      condimentum at, laoreet mattis, massa. Sed eleifend
                      nonummy diam. Praesent mauris ante, elementum et,
                      bibendrem ipsum dolor sit amet, consectetuer adipiscing
                      elit. Nam cursus. Morbi ut mi. Nullam enim leo.
                    </div>
                    <div className="p-item-social">
                      <a className="team-fb" href="#"></a>
                      <a className="team-tw" href="#"></a>
                      <a className="team-gp" href="#"></a>
                      <a className="team-inst" href="#"></a>
                      <a className="team-pint" href="#"></a>
                    </div>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="main-cont">
          <div className="body-wrapper">
            <div className="wrapper-padding">
              <div className="typography-heading">For Flight Management</div>
              <AddNewFlight airlineId={id}/>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="tables">
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
                    <tr key={i + 1}>
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
                        <a
                          href="#"
                          className="header-viewed-btn"
                          style={{
                            padding: "5px 5px 0px 10px",
                            color: "#ff7200",
                          }}
                        >
                          Update
                        </a>
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
                  ))}
                </tbody>
                <tfoot></tfoot>
              </table>
            </div>
            <div className="clear"></div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Airline;
