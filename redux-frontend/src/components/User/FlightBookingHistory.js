import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { getFlightBookingHistory } from '../../actions/actionUser';
import { importAll } from '../../utils/JqueryImport';

const FlightBookingHistory = (props) => {

    const header = [
        {
            name: 'Booking Code',
            selector: 'bookingCode',
            sortable: false
        },
        {
            name: 'Amount',
            selector: 'totalPrice',
            sortable: false
        },
        {
            name: 'Download',
            selector: 'paymentMethod',
            sortable: false
        }
    ];

    const customStyles = {
        headCells: {
            style: {
                fontSize: '13px',
                fontWeight: 'bold',
                color: '#ff7200',
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

    useEffect(() => {
        var mount = false;
        importAll();
        props.flightBookingHistory();
        return () => {
            mount = true;
        }
    },[]);

    return (
        <div>
            <DataTable className="table"
                customStyles={customStyles}
                theme='solarized'
                progressPending={!props.user?.flightBookingHistory}
                columns={header}
                data={props.user?.flightBookingHistory}
                pagination
                paginationPerPage={5}
            />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        flightBookingHistory: () => {
            dispatch(getFlightBookingHistory());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightBookingHistory);