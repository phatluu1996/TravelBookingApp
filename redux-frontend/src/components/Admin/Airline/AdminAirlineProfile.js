import { faBath, faDesktop, faDollarSign, faDumbbell, faMoneyCheckAlt, faParking, faPaw, faSwimmer, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllBookingHotel, getBookingTodayHotel, getDailyIncomeHotel, getHotel, getRevenueHotel, getUpdate, updateHotel, updateProfileHotel } from '../../../actions/actionHotel';
import { retrieveProvince } from '../../../actions/actionLocation';
import { useQuery } from '../../../utils/QueryParam';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';
import { Bar } from "react-chartjs-2";
import { getAirline, getAllBookingAirline } from '../../../actions/actionAirline';

const AdminẢilineProfile = (props) => {

    let queryParam = useQuery();
    let history = useHistory();
    const [isEdit, setIsEdit] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isInitial, setIsInitial] = useState(true);
    const [slProvince, setSlProvince] = useState(null);
    const [slDistrict, setSlDistrict] = useState(null);
    const [slWard, setSlWard] = useState(null);
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

    useEffect(() => {
        let mount = false;

        props.getProvince();
        props.getAirline(queryParam.get("id"));
        props.getAllBookingAirline(queryParam.get("id"));

        return () => {
            mount = true;
        }
    }, []);

    useEffect(() => {
        let mount = false;

        // if (props.province.data && props.hotel.single) {
        //     var pv = props.hotel.single.location.province;
        //     var dt = props.hotel.single.location.district;
        //     var w = props.hotel.single.location.ward;

        //     if (!slProvince) {
        //         setSlProvince(pv);
        //     } else {
        //         pv = slProvince;
        //     }

        //     if (!slDistrict) {
        //         setSlDistrict(dt);
        //     } else {
        //         dt = slDistrict;
        //     }

        //     if (!slWard) {
        //         setSlWard(w);
        //     } else {
        //         w = slWard;
        //     }
        // }


        // if (isSuccess && props.hotel.message == "") {
        //     alert("Update successfully!");
        // }

        return () => {
            mount = true;
        }
    });

    const handleUpdateSubmit = (e) => {
        e.preventDefault();
        let form = e.target;

        // let data = { ...props.hotel.single };
        // data.hotelName = form.hotelName.value;
        // data.email = form.email.value;
        // data.phone = form.phone.value;
        // data.avgPriceAtNight = form.avgPriceAtNight.value;
        // data.contactTitle = form.contactTitle.value;
        // data.contactName = form.contactName.value;
        // data.description = form.description.value;
        // data.location.street = form.street.value;
        // data.location.province = slProvince;
        // data.location.district = slDistrict;
        // data.location.ward = slWard;
        // data.paymentAtTheHotel = allService.paymentAtHotel;
        // data.entertaiment = allService.entertainment;
        // data.freeParking = allService.freeParking;
        // data.petsAllowed = allService.petAllowed;
        // data.hotTub = allService.hotTub;
        // data.swimmingPool = allService.swimmingPool;
        // data.gym = allService.gym;
        // data.highSpeedInternet = allService.highSpeedInternet;

        // props.updateHotel(data.id, data);
        setIsSuccess(true);

    }

    const header = [
        {
            name: '#',
            selector: 'serial',
            sortable: true,
            width:'5%'
        },
        {
            name: 'Booking Code',
            selector: 'bookingCode',
            sortable: true
        },
        {
            name: 'Status',
            selector: 'status',
            sortable: true
        },
        {
            name: 'Payment Method',
            selector: 'paymentMethod',
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
            selector: 'updatedAt',
            sortable: true
        },
        {
            name: 'Note',
            selector: 'note',
            sortable: true
        },
        {
            name: 'User',
            selector: 'user.userName',
            sortable: true
        },
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
        background: {
            default: '#191c24',
        },
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

    // const getAddress = () => {
    //     let province = props.hotel.single?.location.province.name;
    //     let district = props.hotel.single?.location.district.prefix + " " + props.hotel.single?.location.district.name;
    //     let ward = props.hotel.single?.location.ward.prefix + " " + props.hotel.single?.location.ward.name;
    //     return props.hotel.single?.location.street + ", " + ward + ", " + district + ", " + province;
    // }

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

                                                        <h4 className="mb-0 mt-2" style={{ color: '#fc9003' }}>{props.airline.single?.airlineName}</h4>
                                                        <div className="text-left mt-3">
                                                            <h6 className="font-13 text-center text-uppercase">Infomation</h6>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Contact Name :</strong> <span className="ml-2">{props.airline.single?.contactName}</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Contact title :</strong><span className="ml-2">{props.airline.single?.contactTitle}</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Email :</strong><span className="ml-2"></span>{props.airline.single?.email}</p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Phone :</strong> <span className="ml-2 ">{props.airline.single?.phone}</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Fax :</strong> <span className="ml-2 ">{props.airline.single?.fax}</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Address :</strong> <span className="ml-2">{props.airline.single?.contactName}</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Home Page :</strong> <a className="ml-2">{props.airline.single?.homepage}</a></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Avg Price :</strong> <span className="ml-2">{props.airline.single?.contactName}</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Description :</strong> <span className="ml-2">{props.airline.single?.contactName}</span></p>
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
                                                                    <FontAwesomeIcon icon={faDollarSign} /> Pricing
                                                                </a>
                                                            </li>

                                                            <li className="nav-item">
                                                                <a href="#settings" data-toggle="tab" aria-expanded="false" className="nav-link">
                                                                    <i className="mdi mdi-settings-outline mr-1"></i>Settings
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
                                                                                            <h3 className="mb-0 text-warning"></h3>
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
                                                                                                <h3 className="mb-0 text-danger">$ </h3>
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
                                                                                                <h3 className="mb-0 text-success">$ </h3>
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
                                                                    <Bar
                                                                        data={{
                                                                            labels: [
                                                                                "Africa",
                                                                                "Asia",
                                                                                "Europe",
                                                                                "Latin America",
                                                                                "North America"
                                                                            ],
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
                                                                                    data: [2478, 5267, 734, 784, 433]
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

                                                            <div className="tab-pane" id="settings">
                                                                    {/* <form onSubmit={handleUpdateSubmit}>
                                                                        <h4 className="mb-3"> HOTEL INTRODUCTION:</h4>
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label for="hotelName">Hotel Name</label>
                                                                                    <input type="text" className="form-control" id="hotelName" name="hotelName" defaultValue={props.hotel.single?.hotelName} placeholder="Enter hotel name" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label for="email">Email</label>
                                                                                    <input type="text" className="form-control" id="email" name='email' defaultValue={props.hotel.single?.email} placeholder="Enter email" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label for="phone">Phone</label>
                                                                                    <input type="text" className="form-control" id="phone" name="phone" defaultValue={props.hotel.single?.phone} placeholder="Enter phone" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-6">
                                                                                <div className="form-group">
                                                                                    <label for="avgPriceAtNight">Price</label>
                                                                                    <input type="text" className="form-control" id="avgPriceAtNight" name='avgPriceAtNight' defaultValue={props.hotel.single?.avgPriceAtNight} placeholder="Enter price" />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row">
                                                                            <div className="col-md-4">
                                                                                <div className="form-group">
                                                                                    <label for="contactTitle">Title</label>
                                                                                    <input type="text" className="form-control" id="contactTitle" name="contactTitle" defaultValue={props.hotel.single?.contactTitle} placeholder="Enter title" />
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-md-8">
                                                                                <div className="form-group">
                                                                                    <label for="contactName">Contact name</label>
                                                                                    <input type="text" className="form-control" id="contactName" name='contactName' defaultValue={props.hotel.single?.contactName} placeholder="Enter contact name." />
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <div className="row">
                                                                            <div className="col-12">
                                                                                <div className="form-group">
                                                                                    <label for="description">Description</label>
                                                                                    <textarea className="form-control" id="description" name="description" rows="4" defaultValue={props.hotel.single?.description} placeholder="Write something..."></textarea>
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <hr style={{ backgroundColor: 'white' }} />
                                                                        <h4 className="mb-3"> LOCATION</h4>
                                                                        <div className="row">
                                                                            <div className="form-group col-md-12">
                                                                                <label for="street">Street</label>
                                                                                <input type="text" className="form-control" id="street" name="street" defaultValue={props.hotel.single?.location.street} placeholder="Enter street" />
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
                                                                                    <label className="form-check-label">
                                                                                        <input type="checkbox" className="form-check-input" name="highSpeedInternet" checked={allService.highSpeedInternet} onClick={onServiceClick} /> High Speed Internet </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group col-sm-3">
                                                                                <div className="form-check">
                                                                                    <label className="form-check-label">
                                                                                        <input type="checkbox" className="form-check-input" name="entertainment" checked={allService.entertainment} onClick={onServiceClick} /> Entertaiment </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group col-sm-3">
                                                                                <div className="form-check">
                                                                                    <label className="form-check-label">
                                                                                        <input type="checkbox" className="form-check-input" name="freeParking" checked={allService.freeParking} onClick={onServiceClick} /> Free Parking </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group col-sm-3">
                                                                                <div className="form-check">
                                                                                    <label className="form-check-label">
                                                                                        <input type="checkbox" className="form-check-input" name="petAllowed" checked={allService.petAllowed} onClick={onServiceClick} /> Pets Allowed </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='row'>
                                                                            <div className="form-group col-sm-3">
                                                                                <div className="form-check">
                                                                                    <label className="form-check-label">
                                                                                        <input type="checkbox" className="form-check-input" name="hotTub" checked={allService.hotTub} onClick={onServiceClick} /> Hot Tub </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group col-sm-3">
                                                                                <div className="form-check">
                                                                                    <label className="form-check-label">
                                                                                        <input type="checkbox" className="form-check-input" name="swimmingPool" checked={allService.swimmingPool} onClick={onServiceClick} /> Swimming Pool </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group col-sm-3">
                                                                                <div className="form-check">
                                                                                    <label className="form-check-label">
                                                                                        <input type="checkbox" className="form-check-input" name="gym" checked={allService.gym} onClick={onServiceClick} /> GYM </label>
                                                                                </div>
                                                                            </div>
                                                                            <div className="form-group col-sm-3">
                                                                                <div className="form-check">
                                                                                    <label className="form-check-label">
                                                                                        <input type="checkbox" className="form-check-input" name="paymentAtHotel" checked={allService.paymentAtHotel} onClick={onServiceClick} /> Payment At Hotel </label>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="text-right">
                                                                            <button type="submit" className="btn btn-success waves-effect waves-light mt-2"><i className="mdi mdi-content-save"></i> Save</button>
                                                                        </div>
                                                                    </form> */}
                                                            </div>

                                                            <div className="tab-pane" id="change-password">
                                                                <h6 className="text-center text-warning">BOOKING HISTORY</h6>
                                                                <DataTable className="table"
                                                                    customStyles={customStyles}
                                                                    theme='solarized'
                                                                    // progressPending={!props.hotel.all}
                                                                    columns={header} 
                                                                    data={props.airline.allBooking}
                                                                    pagination
                                                                    paginationPerPage={5}
                                                                // subHeaderComponent={subHeader}                                                    
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
                        <AdminFooter />
                    </div>
                </div>
            </div>
        </div >
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        province: state.province,
        airline: state.airline
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProvince: () => {
            dispatch(retrieveProvince());
        },
        getAllBookingAirline: (id) => {
            dispatch(getAllBookingAirline(id));
        },
        getAirline: (id) => {
            dispatch(getAirline(id));
        }
    };
    
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminẢilineProfile);