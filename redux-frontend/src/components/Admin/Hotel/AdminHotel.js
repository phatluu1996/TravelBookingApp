import { faCartPlus, faEdit, faPlus, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllHotel } from '../../../actions/actionHotel'
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
            selector: 'id',
            sortable: true,
            width:'5%'
        },
        {
            name: 'Hotel Name',
            selector: 'hotelName',
            sortable: true
        },
        {
            name: 'Email',
            selector: 'email',
            sortable: true
        },
        {
            name: 'Phone',
            selector: 'phone',
            sortable: true
        },
        {
            name: 'Contact Person',
            selector: 'contactName',
            sortable: true
        },
        {
            name: 'Contact Person Title',
            selector: 'contactTitle',
            sortable: true
        },
        {
            name: 'Actions',
            // cell: flight => <div data-tag="allowRowEvents"><div style={{ fontWeight: bold }}>{row.title}</div>{row.summary}</div>,
            cell: hotel => <>
                <Link className="btn btn-success mr-1" to={`/admin-hotel-edit?id=${hotel["account"]["id"]}`}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> </Link>

                <Link className="btn btn-danger"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Link>
            </>
        }
    ];

    const subHeader = (<thead><tr>
        <td>#</td>
        <td>Hotel Name</td>
        <td>Email</td>
        <td>Phone</td>
        <td>Contact Person</td>
        <td>Contact Person Title</td>
    </tr></thead>);

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
        let mount = false;        
        props.getAllHotels();
        return () => {
            mount = true;
        }
    }, [])

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
                                            <h4 className="card-title">List All Hotels</h4>
                                            <Link className="btn btn-success" to={`/admin-hotel-create`}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> </Link>
                                            <div className="table-responsive">
                                                <DataTable className="table"
                                                    customStyles={customStyles}
                                                    theme='solarized'
                                                    progressPending={!props.hotel.all}
                                                    columns={header} data={props.hotel.all}
                                                    pagination
                                                    paginationPerPage={5}
                                                    subHeaderComponent={subHeader}                                                    
                                                />
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
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHotel);
