import { faCartPlus, faEdit, faPlus, faPlusCircle, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect } from 'react'
import DataTable, { createTheme } from 'react-data-table-component'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchAllAirline } from '../../../actions/actionAirline'
import { fetchAllHotel } from '../../../actions/actionHotel'
import AdminFooter from '../Layout/AdminFooter'
import AdminNavbar from '../Layout/AdminNavbar'
import AdminSidebar from '../Layout/AdminSidebar'

const AdminAirline = (props) => {

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
            selector: airline => airline['id'],
            sortable: true,
            width:'5%'
        },
        {
            name: 'Hotel Name',
            selector: airline => airline['airlineName'],
            sortable: true
        },
        {
            name: 'Email',
            selector: airline => airline['email'],
            sortable: true
        },
        {
            name: 'Phone',
            selector: airline => airline['phone'],
            sortable: true
        },
        {
            name: 'Contact Person',
            selector: airline => airline['contactName'],
            sortable: true
        },
        {
            name: 'Contact Person Title',
            selector: airline => airline['contactTitle'],
            sortable: true
        },
        {
            name: 'Actions',
            cell: airline => <>
                <Link className="btn btn-success mr-1" to={`/admin-airline-edit?id=${airline["account"]["id"]}`}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> </Link>

                <button className="btn btn-danger"><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button>
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
        // rows: {
        //   style: {
        //     minHeight: '72px', // override the row height
        //   }
        // },
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
                // backgroundColor: '#ff7200',
                borderTopStyle: 'solid',
                borderTopWidth: '1px',
                // borderTopColor: '#ff7200',

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
        // cells: {
        //   style: {
        //     paddingLeft: '8px', // override the cell padding for data cells
        //     paddingRight: '8px',
        //   },
        // },
    };

    useEffect(() => {
        console.log(props);
    })

    useEffect(() => {
        let mount = false;        
        props.getAllAirlines();
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
                                            {!props.airline.all && <div className="loading" delay-hide="10"></div>}
                                            <h4 className="card-title">Airlines</h4>
                                            <Link className="btn btn-success" to={`/admin-airline-create`}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> </Link>
                                            {props.airline.all && <div className="table-responsive">
                                                <DataTable className="table"
                                                    customStyles={customStyles}
                                                    theme='solarized'
                                                    columns={header} 
                                                    data={props.airline.all}
                                                    pagination
                                                    paginationPerPage={5}
                                                    subHeaderComponent={subHeader}                                                    
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
        airline: state.airline
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllAirlines: () => {
            dispatch(fetchAllAirline())
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminAirline);
