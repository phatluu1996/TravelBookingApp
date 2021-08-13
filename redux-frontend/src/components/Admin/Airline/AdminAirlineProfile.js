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
import { countBookingTodayAirline, getAirline, getAllBookingAirline, getDailyIncomeAirline, getReportMonthAirline, getRevenueAirline } from '../../../actions/actionAirline';
import AdminAirlineEdit from './AdminAirlineEdit';

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
        
        return () => {
            mount = true;
        }
    }, []);

    useEffect(() => {
        let mount = false;

        if(props.airline.single != null && isInitial){
            props.getAllBookingAirline(props.airline.single?.id);
            props.getDailyIncome(props.airline.single?.id);
            props.getRevenue(props.airline.single?.id);
            props.countBookingToday(props.airline.single?.id);
            props.getReportMonth(props.airline.single?.id);
            setIsInitial(false);
        }

        if (props.province.data && props.airline.single) {
            var pv = props.airline.single?.location.province;
            var dt = props.airline.single?.location.district;
            var w = props.airline.single?.location.ward;

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
            width: '5%'
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

    const barLabel = () => {
        var label = [];
        props.airline.report?.forEach((element, index) => {
            label[index] = element[0];
        });
        return label;
    }

    const barData = () => {
        var data = [];
        props.airline.report?.forEach((element, index) => {
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
        let province = props.airline.single?.location.province.name;
        let district = props.airline.single?.location.district.prefix + " " + props.airline.single?.location.district.name;
        let ward = props.airline.single?.location.ward.prefix + " " + props.airline.single?.location.ward.name;
        return props.airline.single?.location.street + ", " + ward + ", " + district + ", " + province;
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

                                                        <h4 className="mb-0 mt-2" style={{ color: '#fc9003' }}>{props.airline.single?.airlineName}</h4>
                                                        <div className="text-left mt-3">
                                                            <h6 className="font-13 text-center text-uppercase">Infomation</h6>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Contact Name :</strong> <span className="ml-2">{props.airline.single?.contactName}</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Contact title :</strong><span className="ml-2">{props.airline.single?.contactTitle}</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Email :</strong><span className="ml-2"></span>{props.airline.single?.email}</p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Phone :</strong> <span className="ml-2 ">{props.airline.single?.phone}</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Mobile :</strong> <span className="ml-2 ">{props.airline.single?.mobile}</span></p>

                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Fax :</strong> <span className="ml-2 ">{props.airline.single?.fax}</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Address :</strong> <span className="ml-2">{getAddress()}</span></p>

                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Home Page :</strong> <a className="ml-2">{props.airline.single?.homepage}</a></p>
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
                                                                                            <h3 className="mb-0 text-warning">{props.airline.count}</h3>
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
                                                                                                <h3 className="mb-0 text-danger">$ {props.airline.dailyIncome}</h3>
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
                                                                                                <h3 className="mb-0 text-success">$ {props.airline.revenue}</h3>
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
                                                                    <div className="row" style={{display:'block'}}>
                                                                        <div className="card">
                                                                            <div className="card-body">
                                                                                <Bar
                                                                                    data={{
                                                                                        labels: barLabel(),
                                                                                        datasets: [
                                                                                            {
                                                                                                label: "Total Amount($)",
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
                                                            </div>

                                                            <div className="tab-pane" id="settings">
                                                                <AdminAirlineEdit/>
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
        },
        getDailyIncome: (id) => {
            dispatch(getDailyIncomeAirline(id));
        },
        getRevenue: (id) => {
            dispatch(getRevenueAirline(id));
        },
        countBookingToday: (id) => {
            dispatch(countBookingTodayAirline(id));
        },
        getReportMonth: (id) => {
            dispatch(getReportMonthAirline(id));
        }
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AdminẢilineProfile);