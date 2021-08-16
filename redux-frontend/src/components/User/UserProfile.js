import React, { useEffect, useState } from 'react';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import ChangePassword from './ChangePassword';
import FlightBookingHistory from './FlightBookingHistory';
import HotelBookingHistory from './HotelBookingHistory';
import UpdateUser from './UpdateUser';

import { connect, useSelector } from 'react-redux';
import { getUser, updateUserPicture } from '../../actions/actionUser';
import { retrieveProvince } from '../../actions/actionLocation';
import { getToken, getUserId } from '../../utils';

const UserProfile = (props) => {
    useEffect(() => {
        props.getUser(getUserId(), getToken());
        if (!props.province.data) {
            props.getProvince();
        }
    }, []);

    const getAddress = () => {
        const province = props.user.data?.location?.province;
        const district = props.user.data?.location?.district;
        const ward = props.user.data?.location?.ward;

        if (!props.user.data?.location) return "";

        if (province && !district && !ward) {
            return province.name;
        } else if (province && district && !ward) {
            return district.prefix + " " + district.name + ", " + province.name;
        } else if (province && district && ward) {
            return ward.prefix + " " + ward.name + ", " + district.prefix + " " + district.name + ", " + province.name;
        } else { return ""; }

    }

    const openImageDialog = (e) => {
        var input = e.currentTarget;
        input.querySelector("input").click();
    }

    const onChangeUserProfilePicture = (e) => {
        if(e.target.files.length > 0){
            if(isFileImage(e.target.files[0])){
                const fileData = new FormData();
                fileData.append('id', props.user.data.id);
                fileData.append('file', e.target.files[0]);
                props.uploadProfilePicture(fileData);
            }else{
                alert("Selected file is not an image extension");
            }
        }
    }

    const isFileImage = (file) => {
        return file && file['type'].split('/')[0] === 'image';
    }

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
                                                        <img width="93" height="75" alt="" src={props.user.data?.account?.thumbnail ?  props.user.data.account.thumbnail :"img/check-img-01.jpg"} />
                                                    </div>
                                                    <div className="checkout-headr">
                                                        <div className="checkout-headrb">
                                                            <div className="checkout-headrp">
                                                                <div className="chk-left" style={{ marginTop: '25px' }}>
                                                                    <div className="chk-lbl-a"><h3>{props.user.data ? props.user.data.lastName : ""} {props.user.data ? props.user.data.firstName : ""}</h3></div>
                                                                </div>
                                                                <div type='file' className="chk-right" title="Change user Profile picture" onClick={openImageDialog}>
                                                                    <input type="file" id="changeThumbnail" hidden={true} onChange={onChangeUserProfilePicture}/>
                                                                    <a><img alt="" src="img/chk-edit.png" /></a>
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
                                                            <span className="chk-l">Birth day:</span>
                                                            <span className="chk-r" style={{ textTransform: 'none', textAlign: 'right' }}>{props.user.data?.dateOfBirth}</span>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="chk-line">
                                                            <span className="chk-l">Address:</span>
                                                            <span className="chk-r" style={{ textTransform: 'none', textAlign: 'right' }}>{props.user.data?.location?.street}<br />{props.user.data ? getAddress() : ""}</span>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="chk-line">
                                                            <span className="chk-l">Phone:</span>
                                                            <span className="chk-r" style={{ textTransform: 'none', textAlign: 'right' }}>{props.user.data?.phoneNumber}</span>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="chk-line">
                                                            <span className="chk-l">Email</span>
                                                            <span className="chk-r" style={{ textTransform: 'none', textAlign: 'right' }}>{props.user.data?.email}</span>
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
                                                            <a className="active">BOOKING HISTORY<span></span></a>
                                                            <a>UPDATE PROFILE<span></span></a>
                                                            <a>CHANGE PASSWORD<span></span></a>
                                                        </div>
                                                        <div className="clear"></div>
                                                        <div className="payment-tabs-content">
                                                            <div className="payment-tab">
                                                                <div className="booking-form">

                                                                    <div className="tabs-type-a tabs-block">
                                                                        <nav className="tabs-nav">
                                                                            <ul>
                                                                                <li><a className="active">FLIGHT</a></li>
                                                                                <li><a>HOTEL</a></li>
                                                                            </ul>
                                                                            <div className="clear"></div>
                                                                        </nav>
                                                                        <div className="tabs-content">
                                                                            <div className="tabs-content-i">
                                                                                <FlightBookingHistory />
                                                                            </div>
                                                                            <div className="tabs-content-i">
                                                                                <HotelBookingHistory />
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="clear"></div>
                                                            </div>
                                                            <div className="payment-tab">
                                                                {props.user.data?.email && props.province.data && <UpdateUser dataUser={props.user} province={props.province} gender={props.user.data.gender} />}
                                                                <div className="clear"></div>
                                                            </div>
                                                            <div className="payment-tab">
                                                                {props.user.data?.account && <ChangePassword account={props.user.data?.account} />}
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
        province: state.province
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (id) => {
            dispatch(getUser(id));
        },
        getProvince: () => {
            dispatch(retrieveProvince());
        },
        uploadProfilePicture : (id, file) => {
            dispatch(updateUserPicture(id, file));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);