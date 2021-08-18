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
            name: 'Price',
            selector: 'price',
            width:'10%',
            sortable: true
        },
        {
            name: 'Max Adult',
            selector: 'maxAdult',
            width:'10%',
            sortable: true
        },
        {
            name: 'Max Children',
            selector: 'maxChildren',
            width:'10%',
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
                                <div className="col-sm-3">
                                </div>
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