import React from 'react';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';

const AdminHotelProfile = (props) => {
    return (
        <div className="bootstrap-scope">
            <div className="container-scroller">
                <AdminSidebar />
                <div className="container-fluid page-body-wrapper">
                    <AdminNavbar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-sm-3">
                                </div>
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">

                                            <div className="row">
                                                <div className="col-lg-3 col-xl-3">
                                                    <div className="card-box text-center">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="rounded-circle avatar-xl img-thumbnail" alt="profile-image" style={{ height: '6rem', width: '6rem' }} />
                                                        <h4 className="mb-0 mt-2">Hotel Name</h4>
                                                        <p className="text-muted">@webdesigner</p>
                                                        <div className="text-left mt-3">
                                                            <h4 className="font-13 text-uppercase">About Me :</h4>

                                                            <p className="text-muted mb-2 font-13"><strong>Full Name :</strong> <span className="ml-2">Nik G. Patel</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong>Mobile :</strong><span className="ml-2">(123)
                                                                123 1234</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong>Email :</strong> <span className="ml-2 ">user@email.domain</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong>Location :</strong> <span className="ml-2">USA</span></p>
                                                        </div>

                                                        <ul className="social-list list-inline mt-3 mb-0">
                                                            <li className="list-inline-item">
                                                                <a href="javascript: void(0);" className="social-list-item border-purple text-purple"><i className="fab fa-facebook"></i></a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href="javascript: void(0);" className="social-list-item border-danger text-danger"><i className="fab fa-google"></i></a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href="javascript: void(0);" className="social-list-item border-info text-info"><i className="fab fa-twitter"></i></a>
                                                            </li>
                                                            <li className="list-inline-item">
                                                                <a href="javascript: void(0);" className="social-list-item border-secondary text-secondary"><i className="fab fa-github"></i></a>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="col-lg-9 col-xl-9">
                                                    <div className="card-box">
                                                        <ul className="nav nav-pills navtab-bg">
                                                            <li className="nav-item">
                                                                <a href="#about-me" data-toggle="tab" aria-expanded="true" className="nav-link ml-0 active">
                                                                    <i className="mdi mdi-face-profile mr-1"></i>About Me
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a href="#settings" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                                    <i className="mdi mdi-settings-outline mr-1"></i>Settings
                                                                </a>
                                                            </li>
                                                        </ul>

                                                        <div className="tab-content">
                                                            <div className="tab-pane show active" id="about-me">
                                                                <h5 className="mb-4 text-uppercase"><i className="mdi mdi-briefcase mr-1"></i>DASHBOARD</h5>
                                                                <div className="card-body">
                                                                    <h4 className="card-title">Bar chart</h4>
                                                                    <canvas id="barChart" style={{height:'230px'}}></canvas>
                                                                </div>

                                                                <h5 className="mb-3 mt-4 text-uppercase"><i className="mdi mdi-cards-variant mr-1"></i>
                                                                    HISTORY</h5>
                                                                <div className="table-responsive">
                                                                    <table className="table table-borderless mb-0">
                                                                        <thead className="thead-light">
                                                                            <tr>
                                                                                <th>#</th>
                                                                                <th>Project Name</th>
                                                                                <th>Start Date</th>
                                                                                <th>Due Date</th>
                                                                                <th>Status</th>
                                                                                <th>Clients</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td>1</td>
                                                                                <td>App design and development</td>
                                                                                <td>01/01/2015</td>
                                                                                <td>10/15/2018</td>
                                                                                <td><span className="badge badge-info">Work in Progress</span></td>
                                                                                <td>Halette Boivin</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>2</td>
                                                                                <td>Coffee detail page - Main Page</td>
                                                                                <td>21/07/2016</td>
                                                                                <td>12/05/2018</td>
                                                                                <td><span className="badge badge-success">Pending</span></td>
                                                                                <td>Durandana Jolicoeur</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>3</td>
                                                                                <td>Poster illustation design</td>
                                                                                <td>18/03/2018</td>
                                                                                <td>28/09/2018</td>
                                                                                <td><span className="badge badge-pink">Done</span></td>
                                                                                <td>Lucas Sabourin</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>4</td>
                                                                                <td>Drinking bottle graphics</td>
                                                                                <td>02/10/2017</td>
                                                                                <td>07/05/2018</td>
                                                                                <td><span className="badge badge-purple">Work in Progress</span></td>
                                                                                <td>Donatien Brunelle</td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>5</td>
                                                                                <td>Landing page design - Home</td>
                                                                                <td>17/01/2017</td>
                                                                                <td>25/05/2021</td>
                                                                                <td><span className="badge badge-warning">Coming soon</span></td>
                                                                                <td>Karel Auberjo</td>
                                                                            </tr>

                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                            </div>

                                                            <div className="tab-pane" id="settings">
                                                                <form>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="firstname">First Name</label>
                                                                                <input type="text" className="form-control" id="firstname" placeholder="Enter first name" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="lastname">Last Name</label>
                                                                                <input type="text" className="form-control" id="lastname" placeholder="Enter last name" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="form-group">
                                                                                <label for="userbio">Bio</label>
                                                                                <textarea className="form-control" id="userbio" rows="4" placeholder="Write something..."></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="useremail">Email Address</label>
                                                                                <input type="email" className="form-control" id="useremail" placeholder="Enter email" />
                                                                                <span className="form-text text-muted"><small>If you want to change email please <a href="javascript: void(0);">click</a> here.</small></span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="userpassword">Password</label>
                                                                                <input type="password" className="form-control" id="userpassword" placeholder="Enter password" />
                                                                                <span className="form-text text-muted"><small>If you want to change password please <a href="javascript: void(0);">click</a> here.</small></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="companyname">Company Name</label>
                                                                                <input type="text" className="form-control" id="companyname" placeholder="Enter company name" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="cwebsite">Website</label>
                                                                                <input type="text" className="form-control" id="cwebsite" placeholder="Enter website url" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <button type="submit" className="btn btn-success waves-effect waves-light mt-2"><i className="mdi mdi-content-save"></i> Save</button>
                                                                    </div>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <AdminFooter />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default AdminHotelProfile;