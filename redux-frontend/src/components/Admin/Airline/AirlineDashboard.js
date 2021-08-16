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

const AirlineDashboard = (props) => {

    let queryParam = useQuery();
    const [isInitial, setIsInitial] = useState(true);
    const [slProvince, setSlProvince] = useState(null);
    const [slDistrict, setSlDistrict] = useState(null);
    const [slWard, setSlWard] = useState(null);

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

        if (props.airline.single != null && isInitial) {
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
                                                <div className="col-lg-2 col-xl-2">
                                                    <div className="card-box text-center">
                                                        <img src={props.airline.single?.image} className="rounded-circle avatar-xl img-thumbnail" alt="profile-image" style={{ height: '6rem', width: '6rem' }} />

                                                        <h4 className="mb-0 mt-2" style={{ color: '#fc9003' }}>{props.airline.single?.airlineName}</h4>
                                                        <div className="text-left mt-3">
                                                            <h6 className="font-13 text-uppercase mt-1 mb-1"> General </h6>
                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Home Page :</strong> <a className="ml-2">{props.airline.single?.homepage}</a></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Phone :</strong> <span className="ml-2 ">{props.airline.single?.phone}</span></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Fax :</strong> <span className="ml-2 ">{props.airline.single?.fax}</span></p>
                                                            <p className="text-muted mb-1 font-13"><strong style={{ color: '#fc9003' }}>Address :</strong> <span className="ml-2">{getAddress()}</span></p>
                                                            <h6 className="font-13 text-uppercase mt-3 mb-1"> Contact Information </h6>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Contact Name :</strong> <span className="ml-2">{props.airline.single?.contactName}</span></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Contact title :</strong><span className="ml-2">{props.airline.single?.contactTitle}</span></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Mobile :</strong> <span className="ml-2 ">{props.airline.single?.mobile}</span></p>
                                                            <p className="text-muted mb-2 font-13"><strong style={{ color: '#fc9003' }}>Email :</strong><span className="ml-2"></span>{props.airline.single?.email}</p>
                                                            
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-lg-10 col-xl-10">
                                                    <div className="card-box">
                                                        <div className="bg-dark ">
                                                            <div className=" show active" id="about-me">
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
                                                                    <div className="row" style={{ display: 'block' }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AirlineDashboard);