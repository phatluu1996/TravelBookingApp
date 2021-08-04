import React, { useEffect, useState } from 'react';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import ChangePassword from '../User/ChangePassword';
import FlightBookingHistory from '../User/FlightBookingHistory';
import { importAll } from "../../utils/JqueryImport";
import { connect, useSelector } from 'react-redux';

import { getUser } from '../../actions/actionUser';
import {fetchHotelByAccountId} from '../../actions/actionHotel'
import { retrieveProvince } from '../../actions/actionLocation';

import Common from '../../utils/Common';
import AddNewRoom from '../Room/AddNewRoom';
import ListRoom from '../Room/ListRoom';
import UpdateHotel from './UpdateHotel';

const HotelProfile = (props) => {
    //  const user = useSelector((state) => state.user);
//    const hotel = hotel

    useEffect(()=>{
        importAll();

        // props.getUser(sessionStorage.getItem("userId"));
        if(!props.province.data){
            props.getProvince();
        }
        props.getHotel(sessionStorage.getItem("userId"));
            
    },[]);

    const getAddress = () => {
        const province = props.hotel?.data?.location?.province?.name;
        const district = props.hotel?.data.location?.district?.name;
        const ward = props.hotel?.data.location?.ward?.name;
        return ward+" ,"+district+" ,"+province;
    }

    // const checkGender = ()=> {
    //     if(user.data){
    //         if(user.data.gender === "Female"){
    //             return "Mrs.";
    //         }else if(user.data.gender === "Male"){
    //             return "Mr.";
    //         }else return "";
    //     }else{
    //         return "";
    //     }
    // }

    return (
        <>
            <body >
                <Header />
                <div className="main-cont">
                    <div className="body-wrapper">
                        <div className="wrapper-padding">
                            <div className="two-colls">
                                <div className="two-colls-left">
                                    <div className="side-block fly-in">
                                        <div className="side-block-search">
                                            <div className="page-search-p">
                                                <div className="checkout-head">
                                                    <div className="checkout-headl">
                                                        <img alt="" src="img/check-img-01.jpg" />
                                                    </div>
                                                    <div className="checkout-headr">
                                                        <div className="checkout-headrb">
                                                            <div className="checkout-headrp">
                                                                <div className="chk-left" style={{marginTop:'25px'}}>
                                                                    <div>User Name:</div>
                                                                    <div className="chk-lbl-a">{props.hotel.data?props.hotel.data.hotelName:""}</div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                </div>
                                                <div className="chk-details">
                                                    <h2>Details</h2>
                                                    <div className="chk-detais-row">
                                                        <div className="chk-line">
                                                            <span className="chk-l">Contact Name:</span>
                                                            <span className="chk-r" style={{textTransform:'none', textAlign:'right'}}>{props.hotel.data?props.hotel.data.contactName:""}</span>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="chk-line">
                                                            <span className="chk-l">Address:</span>
                                                            <span className="chk-r" style={{textTransform:'none', textAlign:'right'}}>{props.hotel.data?props.hotel.data.address:""}<br/>{props.hotel.data?getAddress():""}</span>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="chk-line">
                                                            <span className="chk-l">Phone:</span>
                                                            <span className="chk-r" style={{textTransform:'none', textAlign:'right'}}>{props.hotel.data?props.hotel.data.phone:""}</span>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="chk-line">
                                                            <span className="chk-l">Email</span>
                                                            <span className="chk-r" style={{textTransform:'none', textAlign:'right'}}>{props.hotel.data?props.hotel.data.email:""}</span>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="two-colls-right">
                                    <div className="two-colls-right-b">
                                        <div className="padding">
                                            <div className="catalog-row list-rows">
                                                <div className="cat-list-item fly-in">
                                                    <div className="payment-wrapper">
                                                        <div className="payment-tabs">
                                                            <a href="#" className="active">BOOKING HISTORY<span></span></a>
                                                             {/* <a href="#">UPDATE PROFILE<span></span></a> */}
                                                            <a href="#">UPDATE HOTEL PROFILE<span></span></a>
                                                            {/* <a href="#">CHANGE PASSWORD<span></span></a> */}
                                                            <a href="#">ROOM MANAGE<span></span></a>
                                                            {/* <a href="#">CREATE ROOM<span></span></a> */}
                                                        </div>
                                                        <div className="clear"></div>
                                                        <div className="payment-tabs-content">
                                                            <div className="payment-tab">
                                                                <div className="booking-form">
                                                                    <div className="tabs-type-a tabs-block">
                                                                        <nav className="tabs-nav">
                                                                            <ul>
                                                                                <li><a className="active" href="#">FLIGHT</a></li>
                                                                                <li><a href="#">HOTEL</a></li>
                                                                            </ul>
                                                                            <div className="clear"></div>
                                                                        </nav>
                                                                        <div className="tabs-content">
                                                                            <div className="tabs-content-i">
                                                                                <FlightBookingHistory />
                                                                            </div>
                                                                            <div className="tabs-content-i">
                                                                                {/* <HotelBookingHistory /> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="clear"></div>
                                                            </div>
                                                            {/* <div className="payment-tab">
                                                                {user.data && <UpdateUser dataUser={user} gender={user?.data.gender}/>}
                                                                <div className="clear"></div>
                                                            </div> */}
                                                            <div className="payment-tab">
                                                                {props.hotel.data && props.province.data && <UpdateHotel dataHotel={props.hotel?.data} province={props.province} />}
                                                                <div className="clear"></div>
                                                            </div>
                                                            {/* <div className="payment-tab">
                                                                <ChangePassword />
                                                                <div className="clear"></div>
                                                            </div> */}
                                                            <div className="payment-tab">
                                                                <div className="booking-form">
                                                                    <div className="tabs-type-a tabs-block">
                                                                        <nav className="tabs-nav">
                                                                            <ul>
                                                                                <li><a className="active" href="#">Room List</a></li>
                                                                                <li><a href="#">Create Room</a></li>
                                                                                <li><a href="#">View Room</a></li>
                                                                            </ul>
                                                                            <div className="clear"></div>
                                                                        </nav>
                                                                        <div className="tabs-content">
                                                                            <div className="tabs-content-i">
                                                                                {/* <ListRoom dataRoom={props?.hotel?.data?.rooms} /> */}
                                                                            </div>
                                                                            <div className="tabs-content-i">
                                                                                {/* <AddNewRoom /> */}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                    <br className="clear" />
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
                <Footer />
            </body>
        </>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
        hotel: state.hotels,
        province: state.province,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProvince: () => {
            dispatch(retrieveProvince());
        },
        getUser: (id) => {
            dispatch(getUser(id));
        },
        getHotel: (id) => {
            dispatch(fetchHotelByAccountId(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelProfile);