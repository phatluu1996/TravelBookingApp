import React, { useEffect } from 'react'
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { importAll, customCheckBoxInput } from '../../utils/JqueryImport';
import { getUser } from "../../actions/actionUser";
import { fetchHotelById } from "../../actions/actionHotel";
import { getRoom } from '../../actions/actionRoom';
import { connect } from 'react-redux';
import { PROPERTY_TYPES } from '@babel/types';
import { useLocation } from 'react-router-dom';


function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const HotelBookingPage = (props) => {
    let queryParam = useQuery();
    const user = sessionStorage.getItem("userId")

    
    useEffect(() => {
        let mount = false;

        importAll();
        customCheckBoxInput();
        
        getUser(queryParam.get("userId"));
        fetchHotelById(queryParam.get("hotelId"));
        getRoom(queryParam.get("roomId"));
        

        return () => {
            mount = true;
        }
    }, [])

    return (
        <>
            <Header></Header>
            <div className="main-cont">
                <div className="body-wrapper">
                    <div className="wrapper-padding">
                        <div className="page-head">
                            <div className="page-title">Hotels - <span>booking</span></div>
                            <div className="breadcrumbs">
                                <a href="#">Home</a> / <a href="#">Hotel</a> / <span>hotel booking</span>
                            </div>
                            <div className="clear"></div>
                        </div>

                        <div className="sp-page">
                            <div className="sp-page-a">
                                <div className="sp-page-l">
                                    <div className="sp-page-lb">
                                        <div className="sp-page-p">
                                            <div className="booking-left">
                                                <h2>Your Personal Information</h2>
                                                <div className="booking-form">
                                                    <div className="booking-form-i">
                                                        <label>First Name:</label>
                                                        <div className="input"><input type="text" value="" /></div>
                                                    </div>
                                                    <div className="booking-form-i">
                                                        <label>Last Name:</label>
                                                        <div className="input"><input type="text" value="" /></div>
                                                    </div>
                                                    <div className="booking-form-i">
                                                        <label>Email Adress:</label>
                                                        <div className="input"><input type="text" value="" /></div>
                                                    </div>
                                                    <div className="booking-form-i">
                                                        <label>Confirm Email Adress:</label>
                                                        <div className="input"><input type="text" value="" /></div>
                                                    </div>
                                                    <div className="booking-form-i">
                                                        <label>Country code:</label>
                                                        <div className="input"><input type="text" value="" /></div>
                                                    </div>
                                                    <div className="booking-form-i">
                                                        <label>Preferred Phone Number:</label>
                                                        <div className="input"><input type="text" value="" /></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                    <div className="checkbox">
                                                        <label>
                                                            <input type="checkbox" value="" />
                                                            I want to receive Sparrow news in the future
                                                        </label>
                                                    </div>
                                                    <div className="booking-devider"></div>
                                                </div>
                                                <h2>How would you like to pay?</h2>

                                                <div className="payment-wrapper">
                                                    <div className="payment-tabs">
                                                        <a href="#" className="active">Credit Card <span></span></a>
                                                        <a href="#">Paypal <span></span></a>
                                                    </div>
                                                    <div className="clear"></div>
                                                    <div className="payment-tabs-content">

                                                        <div className="payment-tab">
                                                            <div className="payment-type">
                                                                <label>Card Type:</label>
                                                                <div className="card-type"><img alt="" src="img/paymentt-01.png" /></div>
                                                                <div className="card-type"><img alt="" src="img/paymentt-02.png" /></div>
                                                                <div className="card-type"><img alt="" src="img/paymentt-03.png" /></div>
                                                                <div className="clear"></div>
                                                            </div>
                                                            <div className="booking-form">
                                                                <div className="booking-form-i">
                                                                    <label>Card Number:</label>
                                                                    <div className="input"><input type="text" /></div>
                                                                </div>
                                                                <div className="booking-form-i">
                                                                    <label>Card Holder Name:</label>
                                                                    <div className="input"><input type="text" /></div>
                                                                </div>
                                                                <div className="booking-form-i">
                                                                    <label>Expiration Date:</label>
                                                                    <div className="card-expiration">
                                                                        <select className="custom-select">
                                                                            <option>Month</option>
                                                                            <option>01</option>
                                                                            <option>02</option>
                                                                            <option>03</option>
                                                                            <option>04</option>
                                                                            <option>05</option>
                                                                            <option>06</option>
                                                                            <option>07</option>
                                                                            <option>08</option>
                                                                            <option>09</option>
                                                                            <option>10</option>
                                                                            <option>11</option>
                                                                            <option>12</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="card-expiration">
                                                                        <select className="custom-select card-year">
                                                                            <option>Year</option>
                                                                            <option>2015</option>
                                                                            <option>2016</option>
                                                                            <option>2017</option>
                                                                            <option>2018</option>
                                                                            <option>2019</option>
                                                                            <option>2020</option>
                                                                        </select>
                                                                    </div>
                                                                    <div className="clear"></div>
                                                                </div>
                                                                <div className="booking-form-i">
                                                                    <label>Card Indefication Number:</label>
                                                                    <div className="inpt-comment">
                                                                        <div className="inpt-comment-l">
                                                                            <div className="inpt-comment-lb">
                                                                                <div className="input"><input type="text" /></div>
                                                                            </div>
                                                                            <div className="clear"></div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="inpt-comment-r">
                                                                        <div className="padding">
                                                                            <a href="#">What’s This?</a>
                                                                        </div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                    <div className="clear"></div>
                                                                </div>
                                                            </div>
                                                            <div className="clear"></div>
                                                            <div className="checkbox">
                                                                <label>
                                                                    <input type="checkbox" value="" />
                                                                    Im accept the rules <a href="#">Terms & Conditions</a>
                                                                </label>
                                                            </div>
                                                        </div>


                                                        <div className="payment-tab">
                                                            <div className="payment-alert">
                                                                <span>You will be redirected to PayPal's website to securely complete your payment.</span>
                                                                <div className="payment-alert-close"><a href="#"><img alt="" src="img/alert-close.png" /></a></div>
                                                            </div>
                                                            <a href="#" className="paypal-btn">proceed to paypall</a>
                                                        </div>

                                                    </div>
                                                </div>
                                                <div className="booking-complete">
                                                    <h2>Review and book your trip</h2>
                                                    <p>Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui voluptatem sequi nesciunt. </p>
                                                    <button className="booking-complete-btn">COMPLETE BOOKING</button>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>

                            <div className="sp-page-r">

                                <div className="checkout-coll">
                                    <div className="checkout-head">
                                        <div className="checkout-headl">
                                            <a href="#"><img alt="" src="img/check-img.png" /></a>
                                        </div>
                                        <div className="checkout-headr">
                                            <div className="checkout-headrb">
                                                <div className="checkout-headrp">
                                                    <div className="chk-left">
                                                        <div className="chk-lbl"><a href="#">Andrassy Thai Hotel </a></div>
                                                        <div className="chk-lbl-a">Paris, france</div>
                                                        <nav className="chk-stars">
                                                            <ul>
                                                                <li><img alt="" src="img/chk-star-b.png" /></li>
                                                                <li><img alt="" src="img/chk-star-b.png" /></li>
                                                                <li><img alt="" src="img/chk-star-b.png" /></li>
                                                                <li><img alt="" src="img/chk-star-b.png" /></li>
                                                                <li><img alt="" src="img/chk-star-a.png" /></li>
                                                            </ul>
                                                            <div className="clear"></div>
                                                        </nav>

                                                    </div>
                                                    <div className="chk-right">
                                                        <a href="#"><img alt="" src="img/chk-edit.png" /></a>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="chk-lines">
                                        <div className="chk-line">
                                            <span className="chk-nights">3 Nights</span>
                                            <span className="chk-dates">feb 05, 2015  /  feb 08, 2015</span>
                                        </div>
                                        <div className="chk-line">
                                            1 STANDARD FAMILY ROOM FOR <span className="chk-persons">3 PERSONS</span>
                                        </div>
                                    </div>

                                    <div className="chk-details">
                                        <h2>Details</h2>
                                        <div className="chk-detais-row">
                                            <div className="chk-line">
                                                <span className="chk-l">Room type</span>
                                                <span className="chk-r">Standard family</span>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="chk-line">
                                                <span className="chk-l">price</span>
                                                <span className="chk-r">200$</span>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="chk-line">
                                                <span className="chk-l">3 nights stay</span>
                                                <span className="chk-r">600$</span>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="chk-line">
                                                <span className="chk-l">taxes and fees per night</span>
                                                <span className="chk-r">3.52$</span>
                                                <div className="clear"></div>
                                            </div>
                                        </div>
                                        <div className="chk-total">
                                            <div className="chk-total-l">Total Price</div>
                                            <div className="chk-total-r">$603.52</div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                </div>

                                <div className="h-help">
                                    <div className="h-help-lbl">Need Sparrow Help?</div>
                                    <div className="h-help-lbl-a">We would be happy to help you!</div>
                                    <div className="h-help-phone">2-800-256-124 23</div>
                                    <div className="h-help-email">sparrow@mail.com</div>
                                </div>

                            </div>
                            <div className="clear"></div>
                        </div>

                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        hotel: state.hotels,
        user:state.user,
        room:state.room,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotel: (id) => dispatch(fetchHotelById(id)),
        getRoom:(id) => dispatch(getRoom(id)),
        getUser: (id) => dispatch(getUser(id)),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelBookingPage);
