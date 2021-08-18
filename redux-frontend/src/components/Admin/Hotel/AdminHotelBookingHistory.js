
import { faBath, faDesktop, faDollarSign, faDumbbell, faEdit, faEye, faHome, faMoneyCheckAlt, faParking, faPaw, faPlus, faRestroom, faSwimmer, faTachometerAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { connect, dispatch, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { retrieveProvince } from '../../../actions/actionLocation';
import { getAllBookingHotel, getHotel } from '../../../actions/actionHotel';
import { useQuery } from '../../../utils/QueryParam';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';


const AdminHotelBookingHistory = (props) => {
    let queryParam = useQuery();

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

    const customStyles = {
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: 'bold',

                color: 'white',
                paddingLeft: '16px',
                paddingRight: '16px',
            },
            activeSortStyle: {
                color: '#ff7200',
                '&:focus': {
                    outline: 'none',
                },
                '&:hover:not(:focus)': {
                    color: '#ff7200',
                },
            },
            inactiveSortStyle: {
                '&:focus': {
                    outline: 'none',
                    color: '#ff7200',
                },
                '&:hover': {
                    color: '#ff7200',
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

    const header = [

        {
            name: 'Booking Code',
            selector: 'bookingCode',
            sortable: true
        },
        {
            name: 'Number Of Guest',
            selector: 'numOfGuest',
            sortable: true
        },
        {
            name: 'Payment Method',
            selector: 'paymentMethod',
            sortable: true
        },
        {
            name: 'Check In',
            selector: 'checkInDate',
            sortable: true
        },
        {
            name: 'Check Out',
            selector: 'checkOutDate',
            sortable: true
        },
        {
            name: 'Amount',
            selector: 'totalPrice',
            sortable: true
        },
        {
            name: 'Created Date',
            selector: 'createdAt',
            sortable: true
        },
        {
            name: 'Update Date',
            selector: 'updateAt',
            sortable: true
        },
    ];
    useEffect(() => {

        let mount = false;
        props.getHotel(queryParam.get("id"));
        props.getAllBooking(queryParam.get("id"));

        return () => {
            mount = true;
        }
    }, []);

    const getAddress = () => {
        let province = props.hotel.one?.location.province.name;
        let district = props.hotel.one?.location.district.prefix + " " + props.hotel.one?.location.district.name;
        let ward = props.hotel.one?.location.ward.prefix + " " + props.hotel.one?.location.ward.name;
        return props.hotel.one?.location.street + ", " + ward + ", " + district + ", " + province;
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
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-3 col-xl-3">
                                                    <div className="card-box text-center">
                                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" className="rounded-circle avatar-xl img-thumbnail" alt="profile-image" style={{ height: '6rem', width: '6rem' }} />

                                                        <h4 className="mb-0 mt-2" style={{ color: '#fc9003' }}>{props.hotel.one?.hotelName}</h4>
                                                        <div className="text-left mt-3">
                                                            <h6 className="font-13 text-center text-uppercase">Infomation</h6>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Name :</strong> <span className="ml-2">{props.hotel.one?.contactName} ({props.hotel.one?.contactTitle})</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Email :</strong><span className="ml-2">{props.hotel.one?.email}</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Phone :</strong> <span className="ml-2 ">0{props.hotel.one?.phone}</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Address :</strong> <span className="ml-2">{getAddress()}</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Total rooms :</strong> <span className="ml-2">{props.hotel.one?.numberOfRoom}</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Avg Price :</strong> <span className="ml-2">{props.hotel.one?.avgPriceAtNight}</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Description :</strong> <span className="ml-2">{props.hotel.one?.description}</span></p>
                                                        </div>

                                                        <div className="text-left mt-3">
                                                            <h6 className="font-13 text-center text-uppercase">Service</h6>
                                                            {props.hotel.one?.paymentAtTheHotel && <p className="text-muted mb-2 font-13"><FontAwesomeIcon icon={faMoneyCheckAlt} /> Payment at Hotel</p>}
                                                            {props.hotel.one?.highSpeedInternet && <p className="text-muted mb-2 font-13"><FontAwesomeIcon icon={faTachometerAlt} /> High Speed Internet</p>}
                                                            {props.hotel.one?.entertaiment && <p className="text-muted mb-2 font-13"><FontAwesomeIcon icon={faDesktop} /> Entertainment</p>}
                                                            {props.hotel.one?.freeParking && <p className="text-muted mb-2 font-13"><FontAwesomeIcon icon={faParking} /> Free Parking</p>}
                                                            {props.hotel.one?.petsAllowed && <p className="text-muted mb-2 font-13"><FontAwesomeIcon icon={faPaw} /> Pets Allowed</p>}
                                                            {props.hotel.one?.hotTub && <p className="text-muted mb-2 font-13"><FontAwesomeIcon icon={faBath} /> Hot Tub</p>}
                                                            {props.hotel.one?.swimmingPool && <p className="text-muted mb-2 font-13"><FontAwesomeIcon icon={faSwimmer} /> Swimming Pool</p>}
                                                            {props.hotel.one?.gym && <p className="text-muted mb-2 font-13"><FontAwesomeIcon icon={faDumbbell} /> GYM</p>}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-9 col-xl-9">
                                                    <div className="card-box">
                                                        <div className="tab-content bg-dark ">
                                                            <div className="tab-pane show active" id="about-me">
                                                                <div className="card-body">
                                                                    <h6 className="text-center text-warning">BOOKING HISTORY</h6>
                                                                    <div className="table-responsive">
                                                                        <DataTable className="table"
                                                                            customStyles={customStyles}
                                                                            theme='solarized'
                                                                            progressPending={!props.hotel.allBooking}
                                                                            columns={header}
                                                                            data={props.hotel?.allBooking}
                                                                            pagination
                                                                            paginationPerPage={5}
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
                        <AdminFooter />
                    </div>
                </div>
            </div>
        </div>
    );

}
const mapStateToProps = (state, ownProps) => {
    return {
        hotel: state.hotels,
        province: state.province,
        rooms: state.room
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotel: (id) => {
            dispatch(getHotel(id));
        },
        getAllBooking: (id) => {
            dispatch(getAllBookingHotel(id));
        }
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHotelBookingHistory);