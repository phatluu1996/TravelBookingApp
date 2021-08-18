import React, { useEffect } from 'react';
import { Bar, Pie } from "react-chartjs-2";
import { connect } from 'react-redux';
import { getAdminRPDailyIncome, getAdminRPMonth, getAdminRPTotalAmount } from '../../actions/actionAdminReport';
import AdminFooter from './Layout/AdminFooter';
import AdminNavbar from './Layout/AdminNavbar';
import AdminSidebar from './Layout/AdminSidebar';

const AdminDashboard = (props) => {

    const data = {
        labels: props.report.reportMonth?.month,
        datasets: [
          {
            label: 'Hotel',
            data: props.report.reportMonth?.hotel,
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
          },
          {
            label: 'Airline',
            data: props.report.reportMonth?.airline,
            backgroundColor: 'rgba(255, 99, 132, 0.8)',
          }
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
      

    const getPieData = () => {
        var data = [];

        var percentAirline = (props.report?.totalAmount?.flight / props.report?.totalAmount?.total) * 100;
        var percentHotel = (props.report?.totalAmount?.hotel / props.report?.totalAmount?.total) * 100;

        data[0] = percentAirline.toFixed(2);
        data[1] = percentHotel.toFixed(2);

        return data;
    }

    const dataPieChart = {
        labels: ['Airline', 'Hotel'],
        datasets: [
            {
                label: '# of Votes',
                data: getPieData(),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    useEffect(() =>{
        let mount = false;

        props.getTotalAmountRP();
        props.getDailyIncomeRP();
        props.getAdminRPMonth();

        return () => {
            mount = true;
        }
    },[]);

    useEffect(()=>{
        console.log(props.report);
    });

    return (
        <div className="bootstrap-scope">
            <div className="container-scroller">
                <AdminSidebar />
                <div className="container-fluid page-body-wrapper">
                    <AdminNavbar />
                    <div className="main-panel">
                        <div className="content-wrapper">
                            <div className="row">
                                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-9">
                                                    <div className="d-flex align-items-center align-self-start">
                                                        {/* <h3 className="mb-0">$12.34</h3>
                                                        <p className="text-success ml-2 mb-0 font-weight-medium">+3.5%</p> */}
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="icon icon-box-success ">
                                                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="text-muted font-weight-normal"></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-9">
                                                    <div className="d-flex align-items-center align-self-start">
                                                        {/* <h3 className="mb-0">$17.34</h3> */}
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="icon icon-box-success">
                                                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="text-muted font-weight-normal"></h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-9">
                                                    <div className="d-flex align-items-center align-self-start">
                                                        <h3 className="mb-0">$ {props.report?.dailyIncome}</h3>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="icon icon-box-success ">
                                                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="text-muted font-weight-normal">Daily Income</h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-9">
                                                    <div className="d-flex align-items-center align-self-start">
                                                        <h3 className="mb-0">$ {props.report?.totalAmount?.total}</h3>
                                                    </div>
                                                </div>
                                                <div className="col-3">
                                                    <div className="icon icon-box-success ">
                                                        <span className="mdi mdi-arrow-top-right icon-item"></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <h6 className="text-muted font-weight-normal">Total Revenue</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body">
                                            
                                            <h4 className="card-title" style={{textAlign:'center'}}>Revenue current</h4>
                                            <Pie data={dataPieChart}/>
                                            <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                                                <div className="text-md-center text-xl-left">
                                                    <h6 className="mb-1">Revenue by Airline</h6>
                                                </div>
                                                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                                                    <h6 className="font-weight-bold mb-0">$ {props.report?.totalAmount?.flight}</h6>
                                                </div>
                                            </div>
                                            <div className="bg-gray-dark d-flex d-md-block d-xl-flex flex-row py-3 px-4 px-md-3 px-xl-4 rounded mt-3">
                                                <div className="text-md-center text-xl-left">
                                                    <h6 className="mb-1">Revenue by Hotel</h6>
                                                </div>
                                                <div className="align-self-center flex-grow text-right text-md-center text-xl-right py-md-2 py-xl-0">
                                                    <h6 className="font-weight-bold mb-0">$ {props.report?.totalAmount?.hotel}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 grid-margin stretch-card">
                                    <div className="card">
                                        <div className="card-body mt-5">
                                            <Bar data={data} options={options} />
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
};

const mapStateToProps = (state, ownProps) => {
    return {
        report: state.adminReport,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTotalAmountRP: () => {
            dispatch(getAdminRPTotalAmount());
        },
        getDailyIncomeRP: () => {
            dispatch(getAdminRPDailyIncome());
        },
        getAdminRPMonth: () => {
            dispatch(getAdminRPMonth());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);