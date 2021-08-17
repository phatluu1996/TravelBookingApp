
import { faBath, faDesktop, faDollarSign, faDumbbell, faEdit, faEye, faHome, faMoneyCheckAlt, faParking, faPaw, faPlus, faRestroom, faSwimmer, faTachometerAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { connect ,dispatch, useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { retrieveProvince } from '../../../actions/actionLocation';
import { getHotel } from '../../../actions/actionHotel';
import { useQuery } from '../../../utils/QueryParam';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';


const AdminHotelBookingHistory = (props) => 
{
    let queryParam = useQuery();

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
        // props.getRoomByHotelId(queryParam.get("id"));
        props.getProvince();

        return () => {
            mount = true;
        }
    }, []);

    return (
        <div className="bootstrap-scope">
            <div className="container-scroller">
                <AdminSidebar />
                <div className="container-fluid page-body-wrapper">
                    <AdminNavbar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
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
        rooms:state.room
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotel: (id) => {
            dispatch(getHotel(id));
        },
        // updateHotel: (id, data) => {
        //     dispatch(updateProfileHotel(id, data));
        // },
        // getProvince: () => {
        //     dispatch(retrieveProvince());
        // },
        // getDailyIncome: (id) => {
        //     dispatch(getDailyIncomeHotel(id));
        // },
        // getBookingToday: (id) => {
        //     dispatch(getBookingTodayHotel(id));
        // },
        // getRevenueCurrent: (id) => {
        //     dispatch(getRevenueHotel(id));
        // },
        // getAllBooking: (id) => {
        //     dispatch(getAllBookingHotel(id));
        // },
        // getReportMonth: (id) => {
        //     dispatch(getReportHotel(id));
        // },
        // getRoomByHotelId: (id) => {
        //     dispatch(getRoomByHotelId(id));
        // }
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHotelBookingHistory);