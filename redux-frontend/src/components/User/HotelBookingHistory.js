import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { getHotelBookingHistory } from '../../actions/actionUser';
import { ROOT_URL } from '../../config/api';
import { importAll } from '../../utils/JqueryImport';

const HotelBookingHistory = (props) => {
    const header = [
        {
            name: '#',
            selector: bk => bk.id,
            sortable: true,
            width: '10%'
        },
        {            
            name: 'Booking Code',
            selector: bk => bk.bookingCode,
            sortable: true
        },
        {
            name: 'Issued Date',
            selector: bk => new Date(bk.createdAt).toLocaleDateString(),
            sortable: false
        },
        {
            name: 'Total Amount',
            selector: bk => bk.totalPrice + '$',
            sortable: false
        },
        {
            name: 'Download',
            cell: bk => <div style={{padding : "0 auto"}}><button className="list-btn-sm mr-1"><FontAwesomeIcon className="list-btn-sm-icon" icon={faDownload} onClick={() => downloadPDF(bk.id)}></FontAwesomeIcon> </button></div>
        },
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
        props.hotelBookingHistory();
        return () => {
            mount = true;
        }
    },[]);

    const downloadPDF = (id) => {
        window.open(`${ROOT_URL}/api/downloadHotelInvoice/${id}`, "_blank");        
    }

    return (
        
        <div>
            <DataTable className="table"
                customStyles={customStyles}
                theme='solarized'
                progressPending={!props.user?.hotelBookingHistory}
                columns={header}
                data={props.user?.hotelBookingHistory}
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
        hotelBookingHistory: () => {
            dispatch(getHotelBookingHistory());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelBookingHistory);