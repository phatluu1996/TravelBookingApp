import { faCartPlus, faEdit, faPlus, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearHotelState, fetchAllHotel, removeHotel } from '../../../actions/actionHotel'
import AdminFooter from '../Layout/AdminFooter'
import AdminNavbar from '../Layout/AdminNavbar'
import AdminSidebar from '../Layout/AdminSidebar'

const AdminHotel = (props) => {
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
            name: '#',
            selector: hotel => hotel['id'],
            sortable: true,
            width:'5%'
        },
        {
            name: 'Hotel Name',
            selector: hotel => hotel['hotelName'],
            sortable: true
        },
        {
            name: 'Email',
            selector: hotel => hotel['email'],
            sortable: true
        },
        {
            name: 'Phone',
            selector: hotel => hotel['phone'],
            sortable: true
        },
        {
            name: 'Contact Person',
            selector: hotel => hotel['contactName'],
            sortable: true
        },
        {
            name: 'Contact Person Title',
            selector: hotel => hotel['contactTitle'],
            sortable: true
        },
        {
            name: 'Actions',
            // cell: flight => <div data-tag="allowRowEvents"><div style={{ fontWeight: bold }}>{row.title}</div>{row.summary}</div>,
            cell: hotel => <>
                <Link className="btn btn-success mr-1" to={`/admin-hotel-edit?id=${hotel["account"]["id"]}`}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> </Link>

                <button className="btn btn-danger" onClick={() => removeHotel(hotel['id'])}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
            </>
        }
    ];

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

    useEffect(() => {  
        props.clearState();
        props.getAllHotels();
    }, []);

    const removeHotel = (id) => {
        props.removeHotel(id);
        props.clearState();
        props.getAllHotels();
    }

    return (
        <>
            <div className="bootstrap-scope">
                <div className="container-scroller">
                    <AdminSidebar />
                    <div className="container-fluid page-body-wrapper">
                        <AdminNavbar />
                        <div className="main-panel">
                            <div className="content-wrapper">
                                <div className="col-lg-12 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            {!props.hotel.all && <div className="loading" delay-hide="10"></div>}
                                            <h4 className="card-title">Hotels</h4>
                                            <Link className="btn btn-success" to="/admin-hotel-create"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> </Link>
                                            {props.hotel.all && <div className="table-responsive">
                                                <DataTable className="table"
                                                    customStyles={customStyles}
                                                    theme='solarized'                                                    
                                                    columns={header} data={props.hotel.all}
                                                    pagination
                                                    paginationPerPage={5}
                                                    // subHeaderComponent={subHeader}                                                    
                                                />
                                            </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <AdminFooter />
                        </div>
                    </div>
                </div>

            </div >
        </>
    )
}


const mapStateToProps = (state, ownProps) => {
    return {
        hotel: state.hotels
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllHotels: () => {
            dispatch(fetchAllHotel())
        },
        removeHotel: (id) => {
            dispatch(removeHotel(id))
        },
        clearState: () => {
            dispatch(clearHotelState())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHotel);
