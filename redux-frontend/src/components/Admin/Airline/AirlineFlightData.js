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
import { clearFlightsState, deleteFlight } from '../../../actions/actionFlightByAirline';
import { listFlights } from '../../../actions/actionFlightByAirline';

const AirlineFlightData = (props) => {

    let queryParam = useQuery();


    useEffect(() => {
        let mount = false;

        props.getProvince();
        props.getAirline(queryParam.get("id"));
        props.getListFlight(queryParam.get("id"));
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
            cell: (listflight,index) => <>
              <Link className="list-btn-sm mr-1" to={`/airline-update-flight?id=${queryParam.get("id")}&fid=${listflight["id"]}`}><FontAwesomeIcon className="list-btn-sm-icon" icon={faEdit}></FontAwesomeIcon> </Link>
      
      <a  className="list-btn-sm" data-toggle="modal" data-target={"#flight-" + index} ><FontAwesomeIcon className="list-btn-sm-icon" icon={faTrash}></FontAwesomeIcon></a>
      <div className="modal fade" id={"flight-" + index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog " role="document">
              <div className="modal-content">
                  <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={clearState}>
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <div className="modal-body py-2">
                      <h5 className="text-center pt-2">Are you sure you want to delete this flight?</h5>
                      <p className="text-center pb-2">This will be delete immediately. You can't undo this action</p>
                      <form onSubmit={(e) => handleSubmit(e, listflight.id)}>
                          <div className="form-group text-right">
                              <button type="submit" className="btn btn-primary btn-sm mr-2">Delete</button>
                              <button id={"close-"+index} type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Cancel</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
      </>
          }
    ];

    const handleSubmit = (e, id) => {
        e.preventDefault();
        var form=e.target;
        if (id) {
            props.delFlight(id);
            form.getElementsByTagName("button")[1].click();
        }
        
    }
    const clearState = () => {
        props.clearFlight();
    }
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
                                                                                    progressPending={!props.listflight?.all}
                                                                                    columns={header}
                                                                                    data={props.listflight?.all}
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
        airline: state.airline,
        flight: state.flights,
        listflight: state.flights
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
        delFlight: (id) => {
            dispatch(deleteFlight(id));
        },
        clearFlight: () => {
            dispatch(clearFlightsState)
        },
        getListFlight: (id) => {
            dispatch(listFlights(id));
        }
            
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AirlineFlightData);