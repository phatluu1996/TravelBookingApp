import React, { Component, useState } from "react";
import HeaderViewed from "./Header/HeaderViewed";
import PopupLogin from "./Header/PopupLogin";
import { Link, useHistory } from 'react-router-dom';
import { removeUserSession } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faSignOutAlt, faUserAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { signout } from "../../actions/actionAuth";
import { connect } from "react-redux";
import { getUser, getUserFullName } from "../../utils";

const Header = (props) => {
    const history = useHistory();
    const [user, setUser] = useState(null)

    const signout = () => {
        setUser(null);
        props.doSignout();
        removeUserSession();
        const auth2 = window.gapi.auth2.getAuthInstance()
        if (auth2 != null) {//If signin with google
            auth2.signOut().then(
                auth2.disconnect().then(res => {
                    setUser(null);
                })
            )
        }
        history.push("/");
    }

    return (
        <>
            <PopupLogin onSubmitUser={setUser} />

            <header id="top">
                <div className="header-a">
                    <div className="wrapper-padding">
                        <div className="header-phone">
                            <span>0 - 888 - 555 - 555</span>
                        </div>

                        <div className="header-account" style={{ display: getUser() ? "none" : "block" }}>
                            <a>Login</a>
                        </div>
                        <div className="header-signup" style={{ display: getUser() ? "none" : "block" }}>
                            <Link to="/register">Register</Link>
                        </div>

                        <div className="header-lang header-signup" style={{ display: !getUser() ? "none" : "block", backgroundColor: "#ff7200" }}>
                            <a>
                                {getUserFullName()}
                            </a>
                            <div className="langs-drop">
                                <div><Link to="/user" className="langs-item"><FontAwesomeIcon className="mr-1" icon={faUserCircle}></FontAwesomeIcon>Profile</Link></div>
                                <div><a onClick={signout} className="langs-item"><FontAwesomeIcon className="mr-1" icon={faSignOutAlt}></FontAwesomeIcon>Sign out</a></div>
                            </div>
                        </div>

                        <div className="header-curency">
                            <a >USD</a>
                            <div className="curency-drop">
                                <div>
                                    <a >usd</a>
                                </div>
                                <div>
                                    <a >VND</a>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <div className="header-b">
                    <div className="mobile-menu">
                        <nav>
                            <ul>
                                <li>
                                    <a className="has-child" >
                                        HOME
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="index.html">Home style one</a>
                                        </li>
                                        <li>
                                            <a href="index_02.html">Home style two</a>
                                        </li>
                                        <li>
                                            <a href="index_03.html">Home style three</a>
                                        </li>
                                        <li>
                                            <a href="index_04.html">Home style four</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <Link to="/admin-dashboard" >
                                        admin
                                    </Link>
                                </li>
                                <li>
                                    <a className="has-child" >
                                        Hotels
                                    </a>
                                    <ul>
                                        <li>
                                            <Link to="/hotel-detail">Hotel item page</Link>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="has-child" >
                                        Flights
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="flight_round_trip.html">Flights round trip</a>
                                        </li>
                                        <li>
                                            <a href="flight_one_way.html">flights one way trip</a>
                                        </li>
                                        <li>
                                            <a href="flight_alternative.html">
                                                flights alternative style
                                            </a>
                                        </li>
                                        <li>
                                            <a href="flight_detail.html">Flights detail page</a>
                                        </li>
                                        <li>
                                            <a href="flight_booking.html">Flights booking page</a>
                                        </li>
                                        <li>
                                            <a href="booking_complete.html">booking complete</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="has-child" >
                                        Airline
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="/airline">Airline Profile</a>
                                        </li>
                                        <li>
                                            <a href="/create-flight">Create Flight</a>
                                        </li>
                                        <li>
                                            <a href="/list-flight">List Flights</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a href="contacts.html">CONTACS</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="wrapper-padding">
                        <div className="header-logo">
                            <Link to="/">
                                <img alt="" src="img/logo.png" />
                            </Link>
                        </div>
                        <div className="header-right">
                            <div className="hdr-srch">
                                <a className="hdr-srch-btn"></a>
                            </div>
                            <div className="hdr-srch-overlay">
                                <div className="hdr-srch-overlay-a">
                                    <input type="text" placeholder="Start typing..." />
                                    <a className="srch-close"></a>
                                    <div className="clear"></div>
                                </div>
                            </div>
                            <div className="hdr-srch-devider"></div>
                            <a className="menu-btn"></a>
                            <nav className="header-nav">
                                <ul>
                                    <li>
                                        <Link to="/" >Home</Link>
                                    </li>
                                    <li>
                                    <Link to="/admin-dashboard" >
                                        admin
                                    </Link>
                                </li>
                                    <li>
                                        <a>Hotels</a>
                                        <ul>
                                            <li>
                                                <Link to="/hotel-detail">Hotel item page</Link>
                                            </li>
                                            <li>
                                                <Link to="/hotel-booking">Hotel Booking Page</Link>
                                            </li>
                                            <li>
                                                <Link to="/hotel-booking-complete">Hotel Booking Finish</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a >Flights</a>
                                        <ul>
                                            <li>
                                                <Link to="/flight-booking">Flights Booking Page</Link>
                                            </li>
                                            <li>
                                                <Link to="/flight-booking-complete">Flight Booking Finish</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a >Airline</a>
                                        <ul>
                                            <li>
                                                <a href="/airline">Airline Profile</a>
                                            </li>
                                            <li>
                                                <a href="/create-flight">Create Flight</a>
                                            </li>
                                            <li>
                                                <a href="/list-flight">List Flights</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="/contact-us">Contacts</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
                <button className="scroll-top list-btn-sm" id="scroll-top" title="Go to top"><FontAwesomeIcon className="list-btn-sm-icon" icon={faArrowUp}></FontAwesomeIcon></button>
            </header>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        doSignout: () => {
            dispatch(signout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
