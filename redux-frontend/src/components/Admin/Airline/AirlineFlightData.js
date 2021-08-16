import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEdit, faTrash,faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { retrieveProvince } from '../../../actions/actionLocation';
import { useQuery } from '../../../utils/QueryParam';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';
import { getAirline } from '../../../actions/actionAirline';

const AirlineFlightData = (props) => {

    let queryParam = useQuery();


    useEffect(() => {
        let mount = false;

        props.getProvince();
        props.getAirline(queryParam.get("id"));

        return () => {
            mount = true;
        }
    }, []);

    useEffect(() => {
        let mount = false;

        return () => {
            mount = true;
        }
    });
    createTheme('solarized', {
        text: {
            primary: 'white',
            secondary: '#2aa198',
        },
        background: {
            default: '#191c24',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#073642',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    });
    const header = [
        {
            name: 'id',
            selector: 'id',
            sortable: true,
            width: '5%'
        },
        {
            name: 'Flight',
            selector: 'flightCode',
            sortable: true,
        },
        {
            name: 'From',
            selector: 'departureCity',
            sortable: true,
        },
        {
            name: 'To',
            selector: 'arrivalCity',
            sortable: true,
        },
        {
            name: 'Depart time',
            selector: 'departureTime',
            sortable: true,
        },
        {
            name: 'Arrival',
            selector: 'arrivalTime',
            sortable: true,
        },
        {
            name: 'Aircraft',
            selector: 'aircraftType',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true,
        },
        {
            name: 'ACTIONS',
            cell: flight => <>
              <Link className="list-btn-sm mr-1" to={`/airline-update-flight?id=${queryParam.get("id")}&fid=${flight["id"]}`}><FontAwesomeIcon className="list-btn-sm-icon" icon={faEdit}></FontAwesomeIcon> </Link>
      
              <Link className="list-btn-sm"><FontAwesomeIcon className="list-btn-sm-icon" icon={faTrash}></FontAwesomeIcon></Link></>,
      
          }
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: 'bold',

                color: '#FC9003',
                paddingLeft: '16px',
                paddingRight: '16px',
            },
            activeSortStyle: {
                color: '#FC9003',
                '&:focus': {
                    outline: 'none',
                },
                '&:hover:not(:focus)': {
                    color: '#FC9003',
                },
            },
            inactiveSortStyle: {
                '&:focus': {
                    outline: 'none',
                    color: '#FC9003',
                },
                '&:hover': {
                    color: '#FC9003',
                },
            },
        },
        pagination: {
            style: {
                color: 'white',
                fontSize: '14px',
                fontWeight: 400,
                minHeight: '56px',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',

            },
            pageButtonsStyle: {
                borderRadius: '50%',
                height: '40px',
                width: '40px',
                padding: '8px',
                margin: 'px',
                cursor: 'pointer',
                transition: '0.4s',
                color: '#007bff',
                fill: '#007bff',
                backgroundColor: 'transparent',
                '&:disabled': {
                    cursor: 'unset',
                    color: '#007bff',
                    fill: 'white',
                },
                '&:hover:not(:disabled)': {
                    backgroundColor: 'white',
                },
                '&:focus': {
                    outline: 'white',
                    backgroundColor: 'white',
                },
            },
        },
    };

    const getAddress = () => {
        let province = props.airline.single?.location.province.name;
        let district = props.airline.single?.location.district.prefix + " " + props.airline.single?.location.district.name;
        let ward = props.airline.single?.location.ward.prefix + " " + props.airline.single?.location.ward.name;
        return props.airline.single?.location.street + ", " + ward + ", " + district + ", " + province;
    }

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
                                            <div className="col-lg-2 col-xl-2">
                                                    <div className="card-box text-center">
                                                        <img src={props.airline.single?.image} className="rounded-circle avatar-xl img-thumbnail" alt="profile-image" style={{ height: '6rem', width: '6rem' }} />

                                                        <h4 className="mb-0 mt-2" style={{ color: '#fc9003' }}>{props.airline.single?.airlineName}</h4>
                                                        <div className="text-left mt-3">
                                                            <h6 className="font-13 text-uppercase mt-1 mb-1"> General </h6>
                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Home Page :</strong> <a className="ml-2">{props.airline.single?.homepage}</a></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Phone :</strong> <span className="ml-2 ">{props.airline.single?.phone}</span></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Fax :</strong> <span className="ml-2 ">{props.airline.single?.fax}</span></p>
                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Address :</strong> <span className="ml-2">{getAddress()}</span></p>
                                                            <h6 className="font-13 text-uppercase mt-3 mb-1"> Contact Information </h6>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Contact Name :</strong> <span className="ml-2">{props.airline.single?.contactName}</span></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Contact title :</strong><span className="ml-2">{props.airline.single?.contactTitle}</span></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Mobile :</strong> <span className="ml-2 ">{props.airline.single?.mobile}</span></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Email :</strong><span className="ml-2"></span>{props.airline.single?.email}</p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-10 col-xl-10">
                                                    <div className="main-panel">
                                                        <div className="content-wrapper">
                                                            <div className="col-lg-12 grid-margin stretch-card">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <div className="row">
                                                                        <div className="col-lg-8">
                                                                            <h4 className="card-title">SCHEDULE FLIGHT DATA</h4>
                                                                        </div>
                                                                        <div className="col-lg-4">
                                                                            <Link to={`/airline-create-flight?id=${queryParam.get("id")}`} className="btn btn-outline-primary">
                                                                           Add New Flight {"  "} <FontAwesomeIcon className="list-btn-sm-icon mb-1 ml-1" icon={faPlusSquare}/>
                                                                            </Link>
                                                                        </div>
                                                                        </div>
                                                                         <div className="table-responsive">
                                                                                <DataTable className="table-a"
                                                                                    customStyles={customStyles}
                                                                                    theme='solarized'
                                                                                    progressPending={!props.airline?.single?.flights}
                                                                                    columns={header}
                                                                                    data={props.airline?.single?.flights}
                                                                                    pagination
                                                                                    paginationPerPage={10}
                                                                                />
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

const mapStateToProps = (state, ownProps) => {
    return {
        province: state.province,
        airline: state.airline
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProvince: () => {
            dispatch(retrieveProvince());
        },
        getAirline: (id) => {
            dispatch(getAirline(id));
        },
            
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AirlineFlightData);