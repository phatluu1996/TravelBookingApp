import React, { Component, useState } from "react";
import HeaderViewed from "./Header/HeaderViewed";
import PopupLogin from "./Header/PopupLogin";
import { Link, useHistory } from 'react-router-dom';
import { getRole, getUserId, removeUserSession, ROLE_ADMIN, ROLE_AIRLINE, ROLE_HOTEL, ROLE_USER } from "../../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faCogs, faMedkit, faScrewdriver, faSignOutAlt, faUserAlt, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { signout } from "../../actions/actionAuth";
import { connect } from "react-redux";
import { getUser, getUserFullName } from "../../utils";
import { clearUserState } from "../../actions/actionUser";

const Header = (props) => {
    const history = useHistory();
    const [user, setUser] = useState(null)

    const signout = () => {
        setUser(null);
        props.doSignout();
        props.clearState();
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
                        {/* <div className="header-signup" style={{ display: getRole() == ROLE_USER?"block":"none"}}>
                            <Link to="/hotel-partner-register">Hotel Partner Register</Link>
                        </div> */}
                        <div className="header-lang header-signup" style={{ display: !getUser() ? "none" : "block", backgroundColor: "#ff7200" }}>
                            <a>
                                {getUserFullName()}
                            </a>
                            <div className="langs-drop">
                                {(getRole() == ROLE_USER) && <div><Link to="/user" className="langs-item"><FontAwesomeIcon className="mr-1" icon={faUserCircle}></FontAwesomeIcon>Profile</Link></div>}
                                {getRole() == ROLE_HOTEL && <div><Link to={`/hotel-dashboard?id=${getUserId()}`} className="langs-item"><FontAwesomeIcon className="mr-1" icon={faUserCircle}></FontAwesomeIcon>Profile</Link></div>}
                                {getRole() == ROLE_AIRLINE && <div><Link to={`/airline-dashboard?id=${getUserId()}`} className="langs-item"><FontAwesomeIcon className="mr-1" icon={faUserCircle}></FontAwesomeIcon>Profile</Link></div>}
                                {getRole() !== ROLE_USER && <div><Link to="/admin-dashboard" className="langs-item"><FontAwesomeIcon className="mr-1" icon={faCogs}></FontAwesomeIcon>My Admin</Link></div>}
                                <div><a onClick={signout} className="langs-item"><FontAwesomeIcon className="mr-1" icon={faSignOutAlt}></FontAwesomeIcon>Sign out</a></div>
                            </div>
                        </div>
                        {/* <div className="header-curency">
                            <a >USD</a>
                            <div className="curency-drop">
                                <div>
                                    <a >usd</a>
                                </div>
                                <div>
                                    <a >VND</a>
                                </div>
                            </div>
                        </div> */}
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
                                    {/* <li>
                                        <Link to="/admin-dashboard" >
                                            admin
                                        </Link>
                                    </li> */}
                                    {/* <li>
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
                                    </li> */}
                                    {/* <li>
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
                                    </li> */}
                                    <li>
                                        <Link to="/about">About</Link>
                                    </li>
                                    <li>
                                        <Link to="/contact">Contact</Link>
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
        },
        clearState: () => {
            dispatch(clearUserState());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
