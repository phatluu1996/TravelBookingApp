import { faBath, faDesktop, faDumbbell, faEdit, faEye, faMoneyCheckAlt, faParking, faPaw, faPlus, faSwimmer, faTachometerAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { defaults } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getHotel, updateProfileHotel } from '../../../actions/actionHotel';
import { removeRoom, getRoomByHotelId } from '../../../actions/actionRoom';
import { retrieveProvince } from '../../../actions/actionLocation';
import { useQuery } from '../../../utils/QueryParam';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';
import ReactModal from 'react-modal';
import DataTable, { createTheme } from 'react-data-table-component';
import AddNewRoom from '../../Room/AddNewRoom';


const AdminHotelRoom = (props) => {

    const [modalIsOpen, setModelStatus] = useState(false);
    const [componentStatus, setComponentStatus] = useState(null);
    const [room, setRoom] = useState(null);

    const dispatch = useDispatch();
    let queryParam = useQuery();

    const closeModal = (status) => setModelStatus(status);

    const modalStatus = (string, room) => {
        setModelStatus(true)
        switch (string) {
            case "Edit":
                setRoom(room);
                return setComponentStatus("Edit Room");
            case "View":
                setRoom(room);
                return setComponentStatus("View Room");
            default:
                return setComponentStatus("Create Room");
        }

    };
    const classes = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgb(30 13 13)',
            width: 500
        },
    };
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

    const roomHeader = [

        {
            name: 'Room Type',
            selector: 'roomType',
            sortable: true
        },
        {
            name: 'Room Number',
            selector: 'roomNumber',
            sortable: true
        },
        {
            name: 'Available Time',
            selector: 'availableTime',
            sortable: true
        },
        {
            name: 'Price',
            selector: 'price',
            sortable: true
        },
        {
            name: 'Max Adult',
            selector: 'maxAdult',
            sortable: true
        },
        {
            name: 'Max Children',
            selector: 'maxChildren',
            sortable: true
        },
        {
            name: 'Actions',
            // cell: flight => <div data-tag="allowRowEvents"><div style={{ fontWeight: bold }}>{row.title}</div>{row.summary}</div>,
            cell: (room, index) => <React.Fragment key={index}>
                <button className="btn btn-success mr-1"
                    onClick={() => modalStatus("View", room)}
                >
                    <FontAwesomeIcon icon={faEye}></FontAwesomeIcon>
                </button>
                <button className="btn btn-success mr-1"
                    onClick={() => modalStatus("Edit", room)}
                >
                    <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                </button>
                <button className="btn btn-danger"
                    onClick={() => {
                        dispatch(removeRoom(room.id, props.hotel?.one?.id))
                    }}
                >
                    <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
            </React.Fragment>
        }
    ];

    useEffect(() => {
        let mount = false;

        props.getHotel(queryParam.get("id"));
        props.getRoomByHotelId(queryParam.get("id"));

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
                                <div className="col-sm-3">
                                </div>
                                <div className="col-sm-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-lg-2 col-xl-2">
                                                </div>
                                                <div className="col-lg-10 col-xl-10">
                                                    <div className="main-panel">
                                                        <div className="content-wrapper">
                                                            <div className="col-lg-12 grid-margin stretch-card">
                                                                <div className="card">
                                                                    <div className="card-body">
                                                                        <div className="row">
                                                                            <div className="col-lg-8">
                                                                                <h4 className="card-title">Room List</h4>
                                                                            </div>
                                                                            <div className="col-lg-8">
                                                                                <Link className="btn btn-success" onClick={() => modalStatus()}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> </Link>
                                                                            </div>
                                                                        </div>

                                                                        <div className="table-responsive">
                                                                            <DataTable className="table"
                                                                                customStyles={customStyles}
                                                                                theme='solarized'
                                                                                progressPending={!props.rooms?.data}
                                                                                columns={roomHeader}
                                                                                data={Array.isArray(props.rooms?.data) && props.rooms?.data.length > 0 ? props.rooms?.data : ""}
                                                                                pagination
                                                                                paginationPerPage={5}
                                                                            />
                                                                        </div>
                                                                        <ReactModal
                                                                            isOpen={modalIsOpen}
                                                                            //  onAfterOpen={afterOpenModal}
                                                                            //  onRequestClose={closeModal}
                                                                            style={classes}
                                                                            contentLabel="Room Manager Modal"
                                                                        >
                                                                            <AddNewRoom
                                                                                closeModal={closeModal}
                                                                                customStyles={customStyles}
                                                                                componentStatus={componentStatus}
                                                                                room={room}
                                                                                hotel={props.hotel?.one}
                                                                            />
                                                                        </ReactModal>
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
        rooms: state.room
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotel: (id) => {
            dispatch(getHotel(id));
        },
        getRoomByHotelId: (id) => {
            dispatch(getRoomByHotelId(id));
        }
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHotelRoom);