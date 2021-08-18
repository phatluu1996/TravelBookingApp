import { faBath, faDesktop,  faDumbbell, faMoneyCheckAlt, faParking, faPaw, faSwimmer, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { createTheme } from 'react-data-table-component';
import { connect} from 'react-redux';
import { getAllBookingHotel, getBookingTodayHotel, getDailyIncomeHotel, getHotel, getReportHotel, getRevenueHotel } from '../../../actions/actionHotel';
import { useQuery } from '../../../utils/QueryParam';
import AdminFooter from '../Layout/AdminFooter';
import AdminNavbar from '../Layout/AdminNavbar';
import AdminSidebar from '../Layout/AdminSidebar';
import { Bar } from "react-chartjs-2";
import { getUserId } from '../../../utils';

const AdminHotelDashboard = (props) => {
    let queryParam = useQuery();
    const [isInitial, setIsInitial] = useState(true);

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
        let id = queryParam.get("id") ? queryParam.get("id") : getUserId();
        props.getHotel(id);

        return () => {
            mount = true;
        }
    }, []);

    useEffect(() => {
        let mount = false;

        if (isInitial && props.hotel.one != null) {

            props.getDailyIncome(props.hotel.one?.id);
            props.getBookingToday(props.hotel.one?.id);
            props.getRevenueCurrent(props.hotel.one?.id);
            props.getAllBooking(props.hotel.one?.id);
            props.getReportMonth(props.hotel.one?.id);

            setIsInitial(false);
        }

        return () => {
            mount = true;
        }
    });

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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotel: (id) => {
            dispatch(getHotel(id));
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
        }
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHotelDashboard);