import { faChartArea, faHotel, faPlane, faPlaneSlash, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PerfectScrollbar from 'perfect-scrollbar';
import React from 'react';
import { Link } from 'react-router-dom';
import { getRole, getUserFullName, ROLE_ADMIN } from '../../../utils';

const AdminSidebar = () => {
    return (
        <div>
            <nav className="sidebar sidebar-offcanvas" id="sidebar">
                <div className="sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top">
                    <a className="sidebar-brand brand-logo" href="index.html"><img src="./assets/images/logo.svg" alt="logo" /></a>
                    <a className="sidebar-brand brand-logo-mini" href="index.html"><img src="./assets/images/logo-mini.svg" alt="logo" /></a>
                </div>
                <ul className="nav">
                    <li className="nav-item profile">
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
                                <div className="dropdown-divider"></div>
                                <a href="#" className="dropdown-item preview-item">
                                    <div className="preview-thumbnail">
                                        <div className="preview-icon bg-dark rounded-circle">
                                            <i className="mdi mdi-calendar-today text-success"></i>
                                        </div>
                                    </div>
                                    <div className="preview-item-content">
                                        <p className="preview-subject ellipsis mb-1 text-small">To-do list</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li className="nav-item nav-category">
                        <span className="nav-link">Navigation</span>
                    </li>
                    <li className="nav-item menu-items">
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
                                {/* <i className="mdi mdi-speedometer"></i> */}
                                <FontAwesomeIcon icon={faUser} color="#00d25b"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Users</span>
                        </Link>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-toggle="collapse" href="#holtel-drop" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faHotel} color="#ffab00"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Hotels</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="holtel-drop">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link className="nav-link" to="/admin-hotel-manage">List</Link></li>
                                <li className="nav-item"> <Link className="nav-link" to="/admin-hotel-create">Create</Link></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-toggle="collapse" href="#airline-drop" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-icon">
                                <FontAwesomeIcon icon={faPlane} color="#ffab00"></FontAwesomeIcon>
                            </span>
                            <span className="menu-title">Airlines</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="airline-drop">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <Link className="nav-link" to="/admin-airline-manage">List</Link></li>
                                <li className="nav-item"> <Link className="nav-link" to="/admin-airline-create">Create</Link></li>
                            </ul>
                        </div>
                    </li>

                    {/* <li className="nav-item menu-items">
                        <a className="nav-link" data-toggle="collapse" href="#ui-basic" aria-expanded="false" aria-controls="ui-basic">
                            <span className="menu-icon">
                                <i className="mdi mdi-laptop"></i>
                            </span>
                            <span className="menu-title">Basic UI Elements</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="ui-basic">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="#">Buttons</a></li>
                                <li className="nav-item"> <a className="nav-link" href="#">Dropdowns</a></li>
                                <li className="nav-item"> <a className="nav-link" href="#">Typography</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="#">
                            <span className="menu-icon">
                                <i className="mdi mdi-playlist-play"></i>
                            </span>
                            <span className="menu-title">Form Elements</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="#">
                            <span className="menu-icon">
                                <i className="mdi mdi-table-large"></i>
                            </span>
                            <span className="menu-title">Tables</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="#">
                            <span className="menu-icon">
                                <i className="mdi mdi-chart-bar"></i>
                            </span>
                            <span className="menu-title">Charts</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="#">
                            <span className="menu-icon">
                                <i className="mdi mdi-contacts"></i>
                            </span>
                            <span className="menu-title">Icons</span>
                        </a>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" data-toggle="collapse" href="#auth" aria-expanded="false" aria-controls="auth">
                            <span className="menu-icon">
                                <i className="mdi mdi-security"></i>
                            </span>
                            <span className="menu-title">User Pages</span>
                            <i className="menu-arrow"></i>
                        </a>
                        <div className="collapse" id="auth">
                            <ul className="nav flex-column sub-menu">
                                <li className="nav-item"> <a className="nav-link" href="#"> Blank Page </a></li>
                                <li className="nav-item"> <a className="nav-link" href="#"> 404 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="#"> 500 </a></li>
                                <li className="nav-item"> <a className="nav-link" href="#"> Login </a></li>
                                <li className="nav-item"> <a className="nav-link" href="#"> Register </a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="nav-item menu-items">
                        <a className="nav-link" href="#">
                            <span className="menu-icon">
                                <i className="mdi mdi-file-document-box"></i>
                            </span>
                            <span className="menu-title">Documentation</span>
                        </a>
                    </li> */}
                </ul>
            </nav>
        </div>
    );
};

export default AdminSidebar;