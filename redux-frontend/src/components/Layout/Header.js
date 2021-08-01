import React, { Component } from "react";
import HeaderViewed from "./Header/HeaderViewed";
import PopupLogin from "./Header/PopupLogin";
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <>
            <div className="overlay"></div>
            <div className="autorize-popup">
                <div className="autorize-tabs">
                    <a href="#" className="autorize-tab-a current">
                        Sign in
                    </a>
                    <a href="#" className="autorize-tab-b"></a>
                    <a href="#" className="autorize-close"></a>
                    <div className="clear"></div>
                </div>
                <PopupLogin />
            </div>

            <header id="top">
                <div className="header-a">
                    <div className="wrapper-padding">
                        <div className="header-phone">
                            <span>0 - 888 - 555 - 555</span>
                        </div>
                        {!sessionStorage.getItem("user") &&
                            !sessionStorage.getItem("token") && (
                                <>
                                    <div className="header-account">
                                        <a href="#">Login</a>
                                    </div>
                                    <div className="header-signup">
                                        <Link to="/register">Register</Link>
                                    </div>
                                </>
                            )}
                        {sessionStorage.getItem("user") &&
                            sessionStorage.getItem("userToken") && (
                                <div className="header-signup">
                                    <a href="#" style={{ color: "#ff7200" }}>
                                        {sessionStorage.getItem("user")}
                                    </a>
                                </div>
                            )}
                        <div className="header-curency">
                            <a href="#">USD</a>
                            <div className="curency-drop">
                                <div>
                                    <a href="#">usd</a>
                                </div>
                                <div>
                                    <a href="#">VND</a>
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
                                    <a className="has-child" href="#">
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
                                    <a className="has-child" href="#">
                                        Hotels
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="hotel_list.html">Hotels standard list</a>
                                        </li>
                                        <li>
                                            <a href="hotel_simple_style.html">Hotels simple style</a>
                                        </li>
                                        <li>
                                            <a href="hotel_detail_style.html">Hotels detail style</a>
                                        </li>
                                        <li>
                                            <a href="hotel_detail.html">Hotel item page</a>
                                        </li>
                                        <li>
                                            <a href="hotel_booking.html">Hotel booking page</a>
                                        </li>
                                        <li>
                                            <a href="#">booking complete page</a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a className="has-child" href="#">
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
                                    <a className="has-child" href="#">
                                        Airline
                                    </a>
                                    <ul>
                                        <li>
                                            <a href="/airline">Airline Profile</a>
                                        </li>
                                        <li>
                                            <a href="/create-flight">Create flight</a>
                                        </li>
                                        <li>
                                            <a href="/list-flight">List flight</a>
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
                            <a href="/">
                                <img alt="" src="img/logo.png" />
                            </a>
                        </div>
                        <div className="header-right">
                            <div className="hdr-srch">
                                <a href="#" className="hdr-srch-btn"></a>
                            </div>
                            <div className="hdr-srch-overlay">
                                <div className="hdr-srch-overlay-a">
                                    <input type="text" placeholder="Start typing..." />
                                    <a href="#" className="srch-close"></a>
                                    <div className="clear"></div>
                                </div>
                            </div>
                            <div className="hdr-srch-devider"></div>
                            <a href="#" className="menu-btn"></a>
                            <nav className="header-nav">
                                <ul>
                                    <li>
                                        <a href="#">Home</a>
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
                                        <a href="#">Hotels</a>
                                        <ul>
                                            <li>
                                                <a href="hotel_list.html">Hotels standard list</a>
                                            </li>
                                            <li>
                                                <a href="hotel_simple_style.html">
                                                    Hotels simple style
                                                </a>
                                            </li>
                                            <li>
                                                <a href="hotel_detail_style.html">
                                                    Hotels detail style
                                                </a>
                                            </li>
                                            <li>
                                                <a href="hotel_detail.html">Hotel item page</a>
                                            </li>
                                            <li>
                                                <a href="hotel_booking.html">Hotel booking page</a>
                                            </li>
                                            <li>
                                                <a href="booking_complete.html">
                                                    booking complete page
                                                </a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="#">Flights</a>
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
                                        <a href="#">Airline</a>
                                        <ul>
                                            <li>
                                                <a href="/airline">Airline Profile</a>
                                            </li>
                                            <li>
                                                <a href="/create-flight">Create flight</a>
                                            </li>
                                            <li>
                                                <a href="/list-flight">List flight</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="contacts.html">Contacts</a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;