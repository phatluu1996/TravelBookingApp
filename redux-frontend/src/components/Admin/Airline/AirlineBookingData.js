import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { retrieveProvince } from '../../../actions/actionLocation';
import { useQuery } from '../../../utils/QueryParam';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';
import { clearFlightBookingCached, editBookingFlight, getBookingFlight } from '../../../actions/actionBookingFlight';
import { countBookingTodayAirline, getAirline, getAllBookingAirline, getDailyIncomeAirline, getReportMonthAirline, getRevenueAirline } from '../../../actions/actionAirline';


const status = {
    properties: [
      {
        value: 1,
        label: "Confirmed",
      },
      {
        value: 2,
        label: "Requested",
      },
      {
        value: 3,
        label: "Cancel",
      },
    ],
  };
const AirlineBookingData = (props) => {

    let queryParam = useQuery();
    let history = useHistory();
    const [isInitial, setIsInitial] = useState(true);

    const handleGetSubmit = (e, booking) => {
        e.preventDefault();
        var form = e.target;
        
        if (booking) {
            var data = booking;
            booking.note = form.note.value;
            booking.status = form.status.value;
            props.updateBooking(booking.id, data);
            form.getElementsByTagName("button")[1].click()
        }
        
    }
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

        if (props.airline.single != null && isInitial) {
            props.getAllBookingAirline(props.airline.single?.id);
        
            setIsInitial(false);
        }
        clearBookingState();
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
            name: 'Id',
            selector: 'id',
            sortable: true,
            width: '5%'
        },
        {
            name: 'Booking Code',
            selector: 'bookingCode',
            sortable: true,
        },
        {
            name: 'Amount',
            selector: 'totalPrice',
            sortable: true,
        },
        {
            name: 'Payment',
            selector: 'paymentMethod',
            sortable: true,
        },
        {
            name: 'Created',
            selector: 'createdAt',
            sortable: true,
            width: '15%'
        },
        {
            name: 'Note',
            selector: 'note',
            sortable: true,

        },
        {
            name: 'Status',
            sortable: true,
            cell: booking =>
           { if (booking.status == 1)
             return "Confirmed" 
             else if (booking.status == 2)
             return "Requested"
             else return "Cancel"
        }
        },
        {
            name: 'User',
            selector: 'user.account.userName',
            sortable: true,
            width: '10%'
        },
        {
            name: 'ACTIONS',
            cell: (booking, index) => <>
                <a  className="list-btn-sm" data-toggle="modal" data-target={"#booking-" + index} ><FontAwesomeIcon className="list-btn-sm-icon" icon={faEdit}></FontAwesomeIcon></a>
                <div className="modal fade" id={"booking-" + index} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Update Booking</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={clearBookingState}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={(e) => handleGetSubmit(e, booking)}>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">Booking Code:</label>
                                        <input type="text" className="form-control" name="bookingCode" readOnly defaultValue={booking.bookingCode} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">User:</label>
                                        <input type="text" className="form-control" name="user" readOnly defaultValue={booking.user.account.userName} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Note</label>
                                        <input type="text" className="form-control" id="note" name="note" defaultValue={booking.note} />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="message-text" className="col-form-label">Status:</label>
                                        <select defaultValue={booking.status} className="form-control" name="status" id="status">
                                            {status.properties.map((status) => (<option key={status.value} value={status.value}> {status.label}</option>
                                              ) )}
                                          </select>
                                    </div>
                                    <div className="form-group">
                                        <button type="submit" className="btn btn-primary btn-sm mr-2">Update</button>
                                        <button id={"close-"+index} type="button" className="btn btn-danger btn-sm" data-dismiss="modal">Close</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            {/* <Link className="list-btn-sm"><FontAwesomeIcon className="list-btn-sm-icon" style={{color:"white"}} icon={faTrash}></FontAwesomeIcon></Link> */}
                              
            </>,
        }
    ];
    const clearBookingState = () => {
        props.clearState();
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
                                                                        <h4 className="card-title">BOOKING LIST</h4>
                                                                         <div className="table-responsive">
                                                                                <DataTable className="table-a"
                                                                                    customStyles={customStyles}
                                                                                    theme='solarized'
                                                                                    progressPending={!props.airline.allBooking}
                                                                                    columns={header}
                                                                                    data={props.airline.allBooking}
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
        booking: state.bookFlight
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProvince: () => {
            dispatch(retrieveProvince());
        },
        getAllBookingAirline: (id) => {
            dispatch(getAllBookingAirline(id));
        },
        getAirline: (id) => {
            dispatch(getAirline(id));
        },
        getBooking: (id) =>{
            dispatch(getBookingFlight(id));
        },
        updateBooking: (id, data) => {
            dispatch(editBookingFlight(id,data));
        },
        clearState: ()=>{
            dispatch(clearFlightBookingCached());
        }

    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AirlineBookingData);