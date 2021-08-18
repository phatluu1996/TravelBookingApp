import { faChartArea, faHotel, faMailBulk, faPlane, faPlaneSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'perfect-scrollbar';
import React from 'react';
import { Link } from 'react-router-dom';
import { getUserId, getRole, getUserFullName, ROLE_ADMIN, ROLE_AIRLINE, ROLE_HOTEL } from '../../../utils';

const AdminSidebar = () => {
    return (
        <div>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    <a className="sidebar-brand brand-logo"><img src="./assets/images/logo.svg" alt="logo" /></a>
                    <a className="sidebar-brand brand-logo-mini"><img src="./assets/images/logo-mini.svg" alt="logo" /></a>
                </div>
                <ul className="nav">
                    {/* <li className="nav-item profile">
                        <div className="profile-desc">
                            <div className="profile-pic" >
                                <div className="count-indicator">
                                    <img className="img-xs rounded-circle " src="./assets/images/faces/face15.jpg" calt="" />
                                    <span className="count bg-success"></span>
                                </div>
                                <div className="profile-name">
                                    {getRole() === ROLE_ADMIN && <><h5 className="mb-0 font-weight-normal">{getUserFullName()}</h5><span>Administrator</span></>}
                                </div>
                            </div>

                            <a href="#" id="profile-dropdown" data-toggle="dropdown"><i className="mdi mdi-dots-vertical"></i></a>
                            <div className="dropdown-menu dropdown-menu-right sidebar-dropdown preview-list" aria-labelledby="profile-dropdown">
                                <a href="#" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-settings text-primary"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1 text-small">Account settings</p>
                                    </div>
                                </a>
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-onepassword  text-info"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1 text-small">Change Password</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li> */}
                    <li className="nav-item nav-category">
                        <span className="nav-link">Navigation</span>
                    </li>
                    {getRole() === ROLE_ADMIN && 
                    <><li className="nav-item menu-items">
                        <Link className="nav-link" to="/admin-dashboard">
                            <span className="menu-icon">
                                {/* <i className="mdi mdi-speedometer"></i> */}
                                <FontAwesomeIcon icon={faChartArea} color="#0090e7"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to="/admin-user-manage">
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faUser} color="#00d25b"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Users</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to="/admin-hotel-manage">
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faHotel} color="#ffab00"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Hotels</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to="/admin-airline-manage">
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faPlane} color="#ffab00"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Airlines</span>
                        </Link>                        
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to="/admin-feedback-manage">
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faMailBulk} color="#ffab00"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Feedback</span>
                        </Link>                        
                    </li></>}
                    {getRole() === ROLE_AIRLINE && 
                    <><li className="nav-item menu-items">
                        <Link className="nav-link" to={`/airline-dashboard?id=${getUserId()}`}>
                            <span className="menu-icon">
                                {/* <i className="mdi mdi-speedometer"></i> */}
                                <FontAwesomeIcon icon={faChartArea} color="#0090e7"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link"  to={`/airline-update-profile?id=${getUserId()}`}>
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faUser} color="#00d25b"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Update Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to={`/airline-booking-data?id=${getUserId()}`}>
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faHotel} color="#ffab00"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Booking Data</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to={`/airline-flight-data?id=${getUserId()}`}>
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faPlane} color="#ffab00"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Flight data</span>
                        </Link>                        
                    </li></>}
                    {getRole() === ROLE_HOTEL && 
                    <><li className="nav-item menu-items">
                        <Link className="nav-link" to={`/hotel-admin-dashboard?id=${getUserId()}`}>
                            <span className="menu-icon">
                                {/* <i className="mdi mdi-speedometer"></i> */}
                                <FontAwesomeIcon icon={faChartArea} color="#0090e7"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Dashboard</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link"  to={`/hotel-admin-update?id=${getUserId()}`}>
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faUser} color="#00d25b"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Update Profile</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to={`/hotel-admin-booking?id=${getUserId()}`}>
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faHotel} color="#ffab00"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Booking Data</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <Link className="nav-link" to={`/hotel-admin-room?id=${getUserId()}`}>
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faPlane} color="#ffab00"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Room data</span>
                        </Link>
                    </li></>}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;