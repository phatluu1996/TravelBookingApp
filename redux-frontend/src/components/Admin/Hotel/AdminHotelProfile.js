import { faBath, faDesktop, faDollarSign, faDumbbell, faEdit, faEye, faHome, faMoneyCheckAlt, faParking, faPaw, faPlus, faRestroom, faSwimmer, faTachometerAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DataTable, { createTheme } from 'react-data-table-component';
import { connect ,dispatch, useDispatch} from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getAllBookingHotel, getBookingTodayHotel, getDailyIncomeHotel, getHotel, getReportHotel, getRevenueHotel, getUpdate, updateHotel, updateProfileHotel } from '../../../actions/actionHotel';
import { retrieveProvince } from '../../../actions/actionLocation';
import {getRoomByHotelId, removeRoom} from '../../../actions/actionRoom';
import { useQuery } from '../../../utils/QueryParam';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';
import { Bar } from "react-chartjs-2";
import ReactModal from 'react-modal';
import AddNewRoom from '../../Room/AddNewRoom';

const AdminHotelProfile = (props) => {
    const dispatch = useDispatch();
    let queryParam = useQuery();
    let history = useHistory();
    const [isEdit, setIsEdit] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInitial, setIsInitial] = useState(true);
    const [slProvince, setSlProvince] = useState(null);
    const [slDistrict, setSlDistrict] = useState(null);
    const [slWard, setSlWard] = useState(null);
    const [modalIsOpen,setModelStatus] = useState(false);
    const [room,setRoom] = useState(null);
    const [componentStatus,setComponentStatus] = useState(null);
    
    const [allService, setAllService] = useState({
        highSpeedInternet: false,
        entertainment: false,
        freeParking: false,
        petAllowed: false,
        hotTub: false,
        swimmingPool: false,
        gym: false,
        paymentAtHotel: false
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

    useEffect(() => {
        let mount = false;

        props.getHotel(queryParam.get("id"));
        props.getRoomByHotelId(queryParam.get("id"));
        props.getProvince();

        return () => {
            mount = true;
        }
    }, []);

    useEffect(() => {
        let mount = false;

        if (props.province.data && props.hotel.one) {

            var pv = props.hotel.one.location.province;
            var dt = props.hotel.one.location.district;
            var w = props.hotel.one.location.ward;

            if (!slProvince) {
                setSlProvince(pv);
            } else {
                pv = slProvince;
            }

            if (!slDistrict) {
                setSlDistrict(dt);
            } else {
                dt = slDistrict;
            }

            if (!slWard) {
                setSlWard(w);
            } else {
                w = slWard;
            }
        }

        if (isInitial && props.hotel.one != null) {
            let service = { ...allService };

            props.getDailyIncome(props.hotel.one?.id);
            props.getBookingToday(props.hotel.one?.id);
            props.getRevenueCurrent(props.hotel.one?.id);
            props.getAllBooking(props.hotel.one?.id);
            props.getReportMonth(props.hotel.one?.id);

            service.highSpeedInternet = props.hotel.one?.highSpeedInternet;
            service.entertainment = props.hotel.one?.entertaiment;
            service.freeParking = props.hotel.one?.freeParking;
            service.petAllowed = props.hotel.one?.petsAllowed;
            service.hotTub = props.hotel.one?.hotTub;
            service.swimmingPool = props.hotel.one?.swimmingPool;
            service.gym = props.hotel.one?.gym;
            service.paymentAtHotel = props.hotel.one?.paymentAtTheHotel;

            setAllService(service);
            setIsInitial(false);
        }

        if (isSuccess && props.hotel.message == "") {
            alert("Update successfully!");
        }

        return () => {
            mount = true;
        }
    });

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        let form = e.target;

        let data = { ...props.hotel.one };
        data.hotelName = form.hotelName.value;
        data.email = form.email.value;
        data.phone = form.phone.value;
        data.avgPriceAtNight = form.avgPriceAtNight.value;
        data.contactTitle = form.contactTitle.value;
        data.contactName = form.contactName.value;
        data.description = form.description.value;
        data.location.street = form.street.value;
        data.location.province = slProvince;
        data.location.district = slDistrict;
        data.location.ward = slWard;
        data.paymentAtTheHotel = allService.paymentAtHotel;
        data.entertaiment = allService.entertainment;
        data.freeParking = allService.freeParking;
        data.petsAllowed = allService.petAllowed;
        data.hotTub = allService.hotTub;
        data.swimmingPool = allService.swimmingPool;
        data.gym = allService.gym;
        data.highSpeedInternet = allService.highSpeedInternet;

        props.updateHotel(data.id, data);
        setIsSuccess(true);

    }

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
            cell: (room,index) => <React.Fragment key={index}>
                 <button className="btn btn-success mr-1"
                    onClick={() => modalStatus("View",room)}
                 ><FontAwesomeIcon icon={faEye}></FontAwesomeIcon> </button>
                <button className="btn btn-success mr-1"
                    onClick={() => modalStatus("Edit",room)}
                 ><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon> </button>
                {/* <button className="btn btn-danger" 
                    onClick={(e) => removeRoom(room.id,props.hotel?.one?.id)}
                ><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button> */}
            </React.Fragment>
        }
    ];
    // const deleteRoom = (roomId,data) => {dispatch(removeRoom(roomId,data))};
    
    // const removeRoom = (roomId,hotelId) =>{
    //     const data ={
    //         hotel:hotelId
    //     };
    //     deleteRoom(roomId,data);
        
    // }
    const modalStatus= (string,room) => {
        setModelStatus(true)
        switch(string){
            case"Edit":
                setRoom(room);
                return setComponentStatus("Edit Room");
            case"View":
                setRoom(room);
                return setComponentStatus("View Room");
            default:
                return setComponentStatus("Create Room");
        }

    };

    const closeModal = (status) => setModelStatus(status);

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
    const classes = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor:'rgb(30 13 13)',
          width: 500
        },
      };

    const barLabel = () => {
        var label = [];
        props.hotel.report?.forEach((element, index) => {
            label[index] = element[0];
        });
        return label;
    }

    const barData = () => {
        var data = [];
        props.hotel.report?.forEach((element, index) => {
            data[index] = element[1];
        });
        return data;
    }

    const onServiceClick = (e) => {
        let service = { ...allService };

        switch (e.target.name) {
            case "highSpeedInternet":
                service.highSpeedInternet = e.target.checked;
                break;
            case "entertainment":
                service.entertainment = e.target.checked;
                break;
            case "freeParking":
                service.freeParking = e.target.checked;
                break;
            case "petAllowed":
                service.petAllowed = e.target.checked;
                break;
            case "hotTub":
                service.hotTub = e.target.checked;
                break;
            case "swimmingPool":
                service.swimmingPool = e.target.checked;
                break;
            case "gym":
                service.gym = e.target.checked;
                break;
            case "paymentAtHotel":
                service.paymentAtHotel = e.target.checked;
                break;
            default: console.log(e.target.name); break;
        }

        setAllService(service);
    }

    const onChangeProvince = (e) => {
        setSlProvince(JSON.parse(e.target.value));
        setSlDistrict(0);
        setSlWard(0);
        e.target.form.district.value = 0;
        e.target.form.ward.value = 0;
    }

    const onChangeDistrict = (e) => {
        setSlDistrict(JSON.parse(e.target.value));
        setSlWard(0);
        e.target.form.ward.value = 0;
    }

    const onChangeWard = (e) => {
        setSlWard(JSON.parse(e.target.value));
    }

    const getAddress = () => {
        let province = props.hotel.one?.location.province.name;
        let district = props.hotel.one?.location.district.prefix + " " + props.hotel.one?.location.district.name;
        let ward = props.hotel.one?.location.ward.prefix + " " + props.hotel.one?.location.ward.name;
        return props.hotel.one?.location.street + ", " + ward + ", " + district + ", " + province;
    }

    return (
        <div className="bootstrap-scope">
            <div className="container-scroller">
                <div className="container-fluid">
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
                                                        <ul className="nav nav-pills navtab-bg">
                                                            <li className="nav-item">
                                                                <a href="#about-me" data-toggle="tab" aria-expanded="true" className="nav-link ml-0 active">
                                                                    <i className="mdi mdi-face-profile mr-1"></i>Report
                                                                </a>
                                                            </li>

                                                            <li className="nav-item">
                                                                <a href="#change-password" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                                    <FontAwesomeIcon icon={faDollarSign} /> Booking History
                                                                </a>
                                                            </li>

                                                            <li className="nav-item">
                                                                <a href="#settings" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                                    <i className="mdi mdi-settings-outline mr-1"></i>Settings
                                                                </a>
                                                            </li>
                                                            <li className="nav-item">
                                                                <a href="#room-manager" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                                    <FontAwesomeIcon icon={faHome} />  Room Manager
                                                                </a>
                                                            </li>
                                                        </ul>
                                                        <div className="tab-content bg-dark ">
                                                            <div className="tab-pane show active" id="about-me">
                                                                <div className="card-body">
                                                                    <div className="row ">
                                                                        <div className="col-xl-4 col-sm-6 grid-margin stretch-card ">
                                                                            <div className="card">
                                                                                <div className="card-body row mt-3">
                                                                                    <h4 className="text-muted col-8 mt-1">Booking Today</h4>
                                                                                    <div className="col-4">
                                                                                        <div className="d-flex align-items-center align-self-start">
                                                                                            <h3 className="mb-0 text-warning">{props.hotel.bookingToday}</h3>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
                                                                            <div className="card">
                                                                                <div className="card-body">
                                                                                    <div className="row">
                                                                                        <div className="col-9">
                                                                                            <div className="d-flex align-items-center align-self-start">
                                                                                                <h3 className="mb-0 text-danger">$ {props.hotel.dailyIncome}</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-3">
                                                                                            <div className="icon icon-box-danger">
                                                                                                <span className="mdi mdi-arrow-bottom-left icon-item"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <h4 className="text-muted font-weight-normal">Daily Income</h4>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-xl-4 col-sm-6 grid-margin stretch-card">
                                                                            <div className="card">
                                                                                <div className="card-body">
                                                                                    <div className="row">
                                                                                        <div className="col-9">
                                                                                            <div className="d-flex align-items-center align-self-start">
                                                                                                <h3 className="mb-0 text-success">$ {props.hotel.revenueCurrent}</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="col-3">
                                                                                            <div className="icon icon-box-success">
                                                                                                <span className="mdi mdi-arrow-top-right icon-item"></span>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <h4 className="text-muted font-weight-normal">Revenue current</h4>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                    </div>
                                                                    <div className="row" style={{ display: 'block' }}>
                                                                        <div className="card">
                                                                            <div className="card-body"></div>
                                                                            <Bar
                                                                                data={{
                                                                                    labels: barLabel(),
                                                                                    datasets: [
                                                                                        {
                                                                                            label: "Population (millions)",
                                                                                            backgroundColor: [
                                                                                                'rgba(54, 162, 235, 0.5)',
                                                                                                'rgba(255, 206, 86, 0.5)',
                                                                                                'rgba(75, 192, 192, 0.5)',
                                                                                                'rgba(153, 102, 255, 0.5)',
                                                                                                'rgba(255, 159, 64, 0.5)'
                                                                                            ],
                                                                                            borderColor: [
                                                                                                'rgba(54, 162, 235, 1)',
                                                                                                'rgba(255, 206, 86, 1)',
                                                                                                'rgba(75, 192, 192, 1)',
                                                                                                'rgba(153, 102, 255, 1)',
                                                                                                'rgba(255, 159, 64, 1)'
                                                                                            ],
                                                                                            borderWidth: 1,
                                                                                            fill: false,
                                                                                            data: barData()
                                                                                        }
                                                                                    ]
                                                                                }}
                                                                                options={{
                                                                                    legend: { display: false },
                                                                                    title: {
                                                                                        display: true,
                                                                                        text: "Predicted world population (millions) in 2050"
                                                                                    }
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="tab-pane" id="settings">
                                                                <form onSubmit={handleUpdateSubmit}>
                                                                    <h4 className="mb-3"> HOTEL INTRODUCTION:</h4>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="hotelName">Hotel Name</label>
                                                                                <input type="text" className="form-control" id="hotelName" name="hotelName" defaultValue={props.hotel.one?.hotelName} placeholder="Enter hotel name" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="email">Email</label>
                                                                                <input type="text" className="form-control" id="email" name='email' defaultValue={props.hotel.one?.email} placeholder="Enter email" />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="phone">Phone</label>
                                                                                <input type="text" className="form-control" id="phone" name="phone" defaultValue={props.hotel.one?.phone} placeholder="Enter phone" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <div className="form-group">
                                                                                <label for="avgPriceAtNight">Price</label>
                                                                                <input type="text" className="form-control" id="avgPriceAtNight" name='avgPriceAtNight' defaultValue={props.hotel.one?.avgPriceAtNight} placeholder="Enter price" />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <div className="form-group">
                                                                                <label for="contactTitle">Title</label>
                                                                                <input type="text" className="form-control" id="contactTitle" name="contactTitle" defaultValue={props.hotel.one?.contactTitle} placeholder="Enter title" />
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-8">
                                                                            <div className="form-group">
                                                                                <label for="contactName">Contact name</label>
                                                                                <input type="text" className="form-control" id="contactName" name='contactName' defaultValue={props.hotel.one?.contactName} placeholder="Enter contact name." />
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-12">
                                                                            <div className="form-group">
                                                                                <label for="description">Description</label>
                                                                                <textarea className="form-control" id="description" name="description" rows="4" defaultValue={props.hotel.one?.description} placeholder="Write something..."></textarea>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <hr style={{ backgroundColor: 'white' }} />
                                                                    <h4 className="mb-3"> LOCATION</h4>
                                                                    <div className="row">
                                                                        <div className="form-group col-md-12">
                                                                            <label for="street">Street</label>
                                                                            <input type="text" className="form-control" id="street" name="street" defaultValue={props.hotel.one?.location.street} placeholder="Enter street" />
                                                                        </div>
                                                                    </div>

                                                                    <div className="row">
                                                                        <div className="col-md-4">
                                                                            <div className="form-group">
                                                                                <label className="col-form-label">Province</label>
                                                                                <select className={`form-control`}
                                                                                    name="province"
                                                                                    onChange={onChangeProvince}>
                                                                                    <option value={null}>---</option>
                                                                                    {props.province.data?.map(province => <option key={province.id} value={JSON.stringify(province)} selected={slProvince?.id == province?.id}>{province.name}</option>)}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <div className="form-group">
                                                                                <label className="col-form-label">District</label>
                                                                                <select className={`form-control`}
                                                                                    name="district"
                                                                                    onChange={onChangeDistrict}>
                                                                                    <option value={null}>---</option>
                                                                                    {slProvince?.districts?.map(district => <option key={district.id} value={JSON.stringify(district)} selected={slDistrict?.id == district?.id}>{district.name}</option>)}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-md-4">
                                                                            <div className="form-group">
                                                                                <label className="col-form-label">Ward</label>
                                                                                <select className={`form-control`}
                                                                                    name="ward"
                                                                                    onChange={onChangeWard}
                                                                                >
                                                                                    <option value={null}>---</option>
                                                                                    {slDistrict?.wards?.map(ward => <option key={ward.id} value={JSON.stringify(ward)} selected={slWard?.id == ward?.id}>{ward.name}</option>)}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr style={{ backgroundColor: 'white' }} />
                                                                    <h4 className="mb-3">SERVICE</h4>
                                                                    <div className='row'>
                                                                        <div className="form-group col-sm-3">
                                                                            <div className="form-check">
                                                                                <label>
                                                                                    <input type="checkbox" name="highSpeedInternet" checked={allService.highSpeedInternet} onClick={onServiceClick} /> High Speed Internet </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group col-sm-3">
                                                                            <div className="form-check">
                                                                                <label>
                                                                                    <input type="checkbox" className="form-check-input" name="entertainment" checked={allService.entertainment} onClick={onServiceClick} /> Entertaiment </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group col-sm-3">
                                                                            <div className="form-check">
                                                                                <label>
                                                                                    <input type="checkbox" className="form-check-input" name="freeParking" checked={allService.freeParking} onClick={onServiceClick} /> Free Parking </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group col-sm-3">
                                                                            <div className="form-check">
                                                                                <label>
                                                                                    <input type="checkbox" className="form-check-input" name="petAllowed" checked={allService.petAllowed} onClick={onServiceClick} /> Pets Allowed </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='row'>
                                                                        <div className="form-group col-sm-3">
                                                                            <div className="form-check">
                                                                                <label>
                                                                                    <input type="checkbox" className="form-check-input" name="hotTub" checked={allService.hotTub} onClick={onServiceClick} /> Hot Tub </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group col-sm-3">
                                                                            <div className="form-check">
                                                                                <label>
                                                                                    <input type="checkbox" className="form-check-input" name="swimmingPool" checked={allService.swimmingPool} onClick={onServiceClick} /> Swimming Pool </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group col-sm-3">
                                                                            <div className="form-check">
                                                                                <label>
                                                                                    <input type="checkbox" className="form-check-input" name="gym" checked={allService.gym} onClick={onServiceClick} /> GYM </label>
                                                                            </div>
                                                                        </div>
                                                                        <div className="form-group col-sm-3">
                                                                            <div className="form-check">
                                                                                <label>
                                                                                    <input type="checkbox" className="form-check-input" name="paymentAtHotel" checked={allService.paymentAtHotel} onClick={onServiceClick} /> Payment At Hotel </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-right">
                                                                        <button type="submit" className="btn btn-success waves-effect waves-light mt-2"><i className="mdi mdi-content-save"></i> Save</button>
                                                                    </div>
                                                                </form>
                                                            </div>

                                                            <div className="tab-pane" id="change-password">
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
                                                            <div className="tab-pane" id="room-manager">
                                                                <h6 className="text-center text-warning">Room Manager</h6>
                                                                <Link className="btn btn-success" onClick={() =>modalStatus()}><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon> </Link>
                                                                <div className="table-responsive">
                                                                    <DataTable className="table"
                                                                        customStyles={customStyles}
                                                                        theme='solarized'
                                                                        progressPending={!props.rooms?.data}
                                                                        columns={roomHeader}
                                                                        data={Array.isArray(props.rooms?.data) && props.rooms?.data.length > 0?props.rooms?.data:""}
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
                        <AdminFooter />
                    </div>
                </div>
            </div>
        </div >
    );
};

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
        updateHotel: (id, data) => {
            dispatch(updateProfileHotel(id, data));
        },
        getProvince: () => {
            dispatch(retrieveProvince());
        },
        getDailyIncome: (id) => {
            dispatch(getDailyIncomeHotel(id));
        },
        getBookingToday: (id) => {
            dispatch(getBookingTodayHotel(id));
        },
        getRevenueCurrent: (id) => {
            dispatch(getRevenueHotel(id));
        },
        getAllBooking: (id) => {
            dispatch(getAllBookingHotel(id));
        },
        getReportMonth: (id) => {
            dispatch(getReportHotel(id));
        },
        getRoomByHotelId: (id) => {
            dispatch(getRoomByHotelId(id));
        }
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHotelProfile);