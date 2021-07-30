import { useEffect, setState, useState, Component } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";

import { retrieveAirline } from "../../actions/actionAirline";
import { listFlightsByAirline } from "../../actions/actionFlightByAirline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlaneArrival,
  faPlaneDeparture,
  faCalendar,
  faRetweet,
  faSearch,
  faUserFriends,
  faChild,
  faBaby,
  faMale,
  faChair,
} from "@fortawesome/free-solid-svg-icons";

import { useSelector, useDispatch } from "react-redux";

// function useQuery() {
//     return new URLSearchParams(useLocation().search);
// }

const Airline = (props) => {
  // let query = useQuery();
  const dispatch = useDispatch();

  const airline = useSelector((state) => state.airline);
  
  const flights = useSelector((state) => state.flights);


  const id  = 2;

  const getAirline = (id) => {
    dispatch(retrieveAirline(id));
  };

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
        </div>

        <div className="typography">
          <div className="content-wrapper">
            <div className="shortcodes-block">
              <div className="accordeons-toggles">
                <div className="typography-heading">{airline.airline.airlineName}</div>
                <div className="shortcodes-left">
                  <div className="toggle">
                    <div className="toggle-i open">
                      <div className="toggle-ia">
                        <div className="toggle-ia-a">
                          <div className="toggle-ia-l">
                            <a href="#" className="toggle-trigger"></a>
                          </div>
                          <div className="toggle-ia-r">
                            <div className="toggle-ia-rb">
                              <div className="toggle-lbl">
                                perspiciatis unde omnis iste natus
                              </div>
                              <div className="toggle-txt">
                                Voluptatem quia voluptas sit aspern atur aut
                                odit aut fugit, sed quia cons equuntur magni
                                dolores eos qui voluptatem sequi nesciunt.
                              </div>
                            </div>
                            <div className="clear"></div>
                          </div>
                        </div>
                        <div className="clear"></div>
                      </div>
                    </div>
                    <div className="toggle-i">
                      <div className="toggle-ia">
                        <div className="toggle-ia-a">
                          <div className="toggle-ia-l">
                            <a href="#" className="toggle-trigger"></a>
                          </div>
                          <div className="toggle-ia-r">
                            <div className="toggle-ia-rb">
                              <div className="toggle-lbl">
                                simply dummy text of the printing
                              </div>
                              <div className="toggle-txt">
                                Voluptatem quia voluptas sit aspern atur aut
                                odit aut fugit, sed quia cons equuntur magni
                                dolores eos qui voluptatem sequi nesciunt.
                              </div>
                            </div>
                            <div className="clear"></div>
                          </div>
                        </div>
                        <div className="clear"></div>
                      </div>
                    </div>
                    <div className="toggle-i">
                      <div className="toggle-ia">
                        <div className="toggle-ia-a">
                          <div className="toggle-ia-l">
                            <a href="#" className="toggle-trigger"></a>
                          </div>
                          <div className="toggle-ia-r">
                            <div className="toggle-ia-rb">
                              <div className="toggle-lbl">
                                crambled it to make a type specimen
                              </div>
                              <div className="toggle-txt">
                                Voluptatem quia voluptas sit aspern atur aut
                                odit aut fugit, sed quia cons equuntur magni
                                dolores eos qui voluptatem sequi nesciunt.
                              </div>
                            </div>
                            <div className="clear"></div>
                          </div>
                        </div>
                        <div className="clear"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shortcodes-right">
                  <div className="accordeon">
                    <div className="accordeon-item open">
                      <div className="accordeon-a">
                        <i className="accordeon-icon"></i>
                        <span>perspiciatis unde omnis iste natus</span>
                        <div className="clear"></div>
                      </div>
                      <div className="accordeon-b">
                        Voluptatem quia voluptas sit aspern atur aut odit aut
                        fugit, sed quia cons equuntur magni dolores eos qui
                        voluptatem sequi nesciunt.
                      </div>
                    </div>
                    <div className="accordeon-item">
                      <div className="accordeon-a">
                        <i className="accordeon-icon"></i>
                        <span>simply dummy text of the printing</span>
                        <div className="clear"></div>
                      </div>
                      <div className="accordeon-b">
                        Voluptatem quia voluptas sit aspern atur aut odit aut
                        fugit, sed quia cons equuntur magni dolores eos qui
                        voluptatem sequi nesciunt.
                      </div>
                    </div>
                    <div className="accordeon-item">
                      <div className="accordeon-a">
                        <i className="accordeon-icon"></i>
                        <span>crambled it to make a type specimen</span>
                        <div className="clear"></div>
                      </div>
                      <div className="accordeon-b">
                        Voluptatem quia voluptas sit aspern atur aut odit aut
                        fugit, sed quia cons equuntur magni dolores eos qui
                        voluptatem sequi nesciunt.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
              <div className="tabs">
                <div className="typography-heading">tabs</div>
                <div className="shortcodes-left">
                  <div className="tabs-type-a tabs-block">
                    <nav className="tabs-nav">
                      <ul>
                        <li>
                          <a className="active" href="#">
                            Sample tab #1
                          </a>
                        </li>
                        <li>
                          <a href="#">Sample tab #2</a>
                        </li>
                        <li>
                          <a href="#">Sample tab #3</a>
                        </li>
                      </ul>
                      <div className="clear"></div>
                    </nav>
                    <div className="tabs-content">
                      <div className="tabs-content-i">
                        <p>
                          Aperiam, eaque ipsa quae ab illo inventore veritatis
                          et quasi architecto beatae vitae dicta sunt explicabo.
                          Nemo enim ipsam voluptatem quia. Voluptas sit
                          aspernatur aut odit aut fugit, sed quia consequuntu.
                        </p>
                        <p>
                          Magni dolores eos qui ratione voluptatem sequi
                          nesciunt eque porro quisquam est, qui dolorem ipsum
                          quia dolor sit amet, consectetur.
                        </p>
                      </div>
                      <div className="tabs-content-i">
                        <p>
                          Aperiam, eaque ipsa quae ab illo inventore veritatis
                          et quasi architecto beatae vitae dicta sunt explicabo.
                          Nemo enim ipsam voluptatem quia. Voluptas sit
                          aspernatur aut odit aut fugit, sed quia consequuntu.
                        </p>
                        <p>
                          Magni dolores eos qui ratione voluptatem sequi
                          nesciunt eque porro quisquam est, qui dolorem ipsum
                          quia dolor sit amet, consectetur.
                        </p>
                      </div>
                      <div className="tabs-content-i">
                        <p>
                          Aperiam, eaque ipsa quae ab illo inventore veritatis
                          et quasi architecto beatae vitae dicta sunt explicabo.
                          Nemo enim ipsam voluptatem quia. Voluptas sit
                          aspernatur aut odit aut fugit, sed quia consequuntu.
                        </p>
                        <p>
                          Magni dolores eos qui ratione voluptatem sequi
                          nesciunt eque porro quisquam est, qui dolorem ipsum
                          quia dolor sit amet, consectetur.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="shortcodes-right">
                  <div className="tabs-type-b tabs-block">
                    <div className="tabs-type-bi">
                      <div className="tabs-type-bi-a">
                        <div className="tabs-type-bi-l">
                          <nav className="tabs-nav">
                            <ul>
                              <li>
                                <a className="active" href="#">
                                  Sample tab #1 <span></span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  Sample tab #2 <span></span>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  Sample tab #3 <span></span>
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
                                  <p>
                                    Aperiam, eaque ipsa quae ab illo inventore
                                    veritatis et quasi architecto beatae vitae
                                    dicta sunt explicabo. Nemo enim ipsam
                                    voluptatem quia. Voluptas sit aspernatur aut
                                    odit aut fugit, sed quia consequuntu.
                                  </p>
                                  <p>
                                    Magni dolores eos qui ratione voluptatem
                                    sequi nesciunt eque porro quisquam est, qui
                                    dolorem ipsum quia dolor sit amet,
                                    consectetur.
                                  </p>
                                </div>
                                <div className="tabs-content-i">
                                  <p>
                                    Aperiam, eaque ipsa quae ab illo inventore
                                    veritatis et quasi architecto beatae vitae
                                    dicta sunt explicabo. Nemo enim ipsam
                                    voluptatem quia. Voluptas sit aspernatur aut
                                    odit aut fugit, sed quia consequuntu.
                                  </p>
                                  <p>
                                    Magni dolores eos qui ratione voluptatem
                                    sequi nesciunt eque porro quisquam est, qui
                                    dolorem ipsum quia dolor sit amet,
                                    consectetur.
                                  </p>
                                </div>
                                <div className="tabs-content-i">
                                  <p>
                                    Aperiam, eaque ipsa quae ab illo inventore
                                    veritatis et quasi architecto beatae vitae
                                    dicta sunt explicabo. Nemo enim ipsam
                                    voluptatem quia. Voluptas sit aspernatur aut
                                    odit aut fugit, sed quia consequuntu.
                                  </p>
                                  <p>
                                    Magni dolores eos qui ratione voluptatem
                                    sequi nesciunt eque porro quisquam est, qui
                                    dolorem ipsum quia dolor sit amet,
                                    consectetur.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="clear"></div>
                        </div>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
              <div className="message-box">
                <div className="typography-heading">Message boxes</div>
                <div className="message-box-a">
                  nvidunt ut labore et dolore magna aliquyam
                </div>
                <div className="message-box-b">
                  t, consectetuer adipiscing elit, sed diam nonummy nibh euismod
                  tincidunt
                </div>
                <div className="message-box-c">
                  diam nonummy nibh euismod tincidunt ut laoreet{" "}
                </div>
              </div>
              <div className="list-elements">
                <div className="typography-heading">LIST ELEMENTS</div>
                <div className="list-row">
                  <div className="list-row-i">
                    <nav className="marked-a">
                      <ul>
                        <li>Unde omnis iste natus doxes sit voluptatem;</li>
                        <li>Rccusantium doloremque la dantium totam;</li>
                        <li>Aperiam eaque ipsa quaeab illo inventore;</li>
                        <li>
                          Veritatis et quasi architecto beatae vitae dicta;{" "}
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="list-row-i">
                    <nav className="marked-b">
                      <ul>
                        <li>Unde omnis iste natus doxes sit voluptatem;</li>
                        <li>Rccusantium doloremque la dantium totam;</li>
                        <li>Aperiam eaque ipsa quaeab illo inventore;</li>
                        <li>
                          Veritatis et quasi architecto beatae vitae dicta;{" "}
                        </li>
                      </ul>
                    </nav>
                  </div>
                  <div className="list-row-i">
                    <nav className="marked-c">
                      <ul>
                        <li>Unde omnis iste natus doxes sit voluptatem;</li>
                        <li>Rccusantium doloremque la dantium totam;</li>
                        <li>Aperiam eaque ipsa quaeab illo inventore;</li>
                        <li>
                          Veritatis et quasi architecto beatae vitae dicta;{" "}
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="clear"></div>
              </div>
              <div className="tables">
                <div className="typography-heading">Flights List</div>
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
                        </tr>
                      </thead>
                    
                    <tbody>
                    {
                        airline?.airline?.flights?.map(item => 
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.flightCode}</td>
                            <td>{item.departureCity}</td>
                            <td>{item.arrivalCity}</td>
                            <td>{item.departureTime}</td>
                            <td>{item.arrivalTime}</td>
                            <td>{item.businessCapacity}</td>
                            <td>{item.economyCapacity}</td>
                            <td>{item.aircraftType}</td>
                            <td>{item.status}</td>
                        </tr>)                       
                    }
                    </tbody>
                    <tfoot></tfoot>                    
                  </table>
                </div>
                <div className="clear"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Airline;
