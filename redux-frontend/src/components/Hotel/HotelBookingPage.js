import React, { useEffect, useState } from 'react';
import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import { importAll, customCheckBoxInput } from '../../utils/JqueryImport';
import { getUser } from "../../actions/actionUser";
import { fetchHotelById } from "../../actions/actionHotel";
import { getRooms } from "../../actions/actionRoom";
import { bookRoom } from "../../actions/actionBookingRoom";
import { connect } from 'react-redux';
import { PROPERTY_TYPES } from '@babel/types';
import {  useHistory, useLocation } from 'react-router-dom';
import $ from "jquery";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PP_ID } from "../../config/api";
import { faMinusCircle, faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const HotelBookingPage = (props) => {
    let queryParam = useQuery();
    const history = useHistory();
    const user = sessionStorage.getItem("userId")
    const [date, setDateCalculate] = useState(0);
    const [roomTypeCount, setRoomTypeCount] = useState([{
        
        roomType: "",
        quantity: ""
    }])
    const [isCheck, setIsCheck] = useState(true);
    // const [paymentCheck, setPayment] = useState(false);
    const [checkout, setCheckout] = useState(false);
    const [dataConfirm, setDataConfirm] = useState(null);
    const [isComplete, setIsComplete] = useState(false)
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }
    const [error, setError] = useState([{
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: ""
    }]);

    const dateCalculate = () => {
        // console.log(Date.parse());;
        var co = queryParam.get("checkOutDate");
        var ci = queryParam.get("checkInDate");
        // console.log(getTimeDiff(dateConvert(ci),dateConvert(co),"d"));
        setDateCalculate(getTimeDiff(dateConvert(ci), dateConvert(co), "d"));
    }

    const getTimeDiff = (startTime, endTime, type) => {
        // let startTime = new Date(_startTime.replace(/-/g, '/'));
        // let endTime = new Date(_endTime.replace(/-/g, '/'));
        let diff = endTime.getTime() - startTime.getTime(); //Time difference in milliseconds
        let day = Math.floor(diff / (24 * 60 * 60 * 1000)); //day
        let hour = Math.floor(diff / (60 * 60 * 1000)) - day * 24; //Time
        let minute = Math.floor(diff / (60 * 1000)) - day * 24 * 60 - hour * 60; //Minute
        let second = Math.floor(diff / 1000) - day * 24 * 60 * 60 - hour * 60 * 60 - minute * 60; //second
        // console.log(day, hour, minute, second);
        switch (type) {
            case "h":
                return hour;
            case "m":
                return minute;
            case 'd':
                return day;
            default:
                return minute;
        }
    }

    const dateConvert = (date) => {
        var st = date.replace("/", ".");
        var pattern = /(\d{2}).(\d{2}).(\d{4})/;
        var dt = new Date(st.replace(pattern, '$3-$2-$1'));
        return dt;
    }


    const allRoomTypeString = () => {
        var roomTypes = [];
        props.rooms?.data?.map(
            room => roomTypes.push(room.roomType)
        )
        return roomTypes.join(",");
    }
    const calculatePrice = () => {
        let dateNumber = date;
        var totalPrice = 0;
        props.rooms?.data?.map(
            room => totalPrice = totalPrice + room.price
        )
        return totalPrice * dateNumber;
    }
    const validateForm = (e) => {
        const form = e.target;
        const err = { ...error };
        const pattern =
            /[a-zA-Z0-9]+[\.]?([a-zA-Z0-9]+)?[\@][a-z]{3,9}[\.][a-z]{2,5}/g;
        const result = pattern.test(form.email.value);

        if (!form.firstName.value) {
            err.firstName = "First Name name is required ";
        } else {
            err.firstName = "";
        }
        if (!form.lastName.value) {
            err.lastName = "Last Name name is required ";
        } else {
            err.lastName = "";
        }
        if (!form.email.value) {
            err.email = "Email is required ";
        } else if (!result) {
            err.email = "Email is valid";
        } else {
            err.email = "";
        }
        if (!form.phoneNumber.value) {
            err.phoneNumber = "Phone is required ";
        } else {
            err.phoneNumber = "";
        }

        if (
            err.firstName ||
            err.lastName ||
            err.phoneNumber ||
            err.email
        ) {
            setError(err);
            return false;
        }
        return true;
    };
    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
          console.log(`Transaction completed by ${details.payer.name.given_name}!`);
          setCheckout(true);
        });
      };
    

    const onError = (err) => {
        console.log(err.toString());
    };

    const bookingSubmit = (e) => {
        e.preventDefault()
        var totalPrice = calculatePrice();
        // var room = [...props.rooms?.data];
        var newArr = [];
        props.rooms?.data.map(
            room => newArr.push({ id: room.id })
        )
        // console.log(room);
        if (validateForm(e)) {
            var data =
            {
                user: props.user?.data,
                nightCount:date,
                rooms: newArr,
                dateBooking: new Date(),
                checkInDate: new Date(dateConvert(queryParam.get("checkInDate"))),
                checkOutDate: new Date(dateConvert(queryParam.get("checkOutDate"))),
                numberOfGuests: parseInt(queryParam.get("numberAdult")) + parseInt(queryParam.get("numberChildren")),
                totalPrice: totalPrice,
                paymentMethod: "Payment"
            }

            //   console.log(data);
            
            setDataConfirm(data);
            setModalIsOpen(true);
            //   props.bookRoom(data);
            // console.log(JSON.stringify(props.user?.data));
            // console.log(JSON.stringify(room));
        }
    }


    useEffect(() => {

        let mount = false;
        var listIds = queryParam.get("roomIds").split(".").map(x => +x);
        window.scrollTo(0, 0);
        // var b = a.split(',').map(function(item) {
        //     return parseInt(item, 10);
        // });

        importAll();

        if (!sessionStorage.getItem("isRoomBooking")) {
            history.push("/");
        }

        if (user) {
            props.getUser(user);
            props.getHotel(queryParam.get("id"));
            props.getRooms(listIds);
            dateCalculate();
        } else {
            $(".header-account a").click();
        }
    
        return () => {
            mount = true;
        }
    }, [])

    useEffect(() => {
        if (props.bookRoomData?.data && checkout) {
            setCheckout(false)
            history.push("/hotel-booking-complete");
        }
        if (checkout && !isComplete) {
            props.bookRoom(dataConfirm);
            setIsComplete(true);
        }    
    })

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
                                                <form onSubmit={bookingSubmit}>
                                                    <div className="booking-form">
                                                        <div className="booking-form-i">
                                                            <label>First Name:</label>
                                                            <div className="input"><input disabled={true} type="text" name="firstName" value={props.user?.data?.firstName} /></div>
                                                            <div className="booking-error-input">
                                                                {error.firstName}
                                                            </div>
                                                        </div>
                                                        <div className="booking-form-i">
                                                            <label>Last Name:</label>
                                                            <div className="input"><input disabled={true} type="text" name="lastName" value={props.user?.data?.lastName} /></div>
                                                            <div className="booking-error-input">
                                                                {error.lastName}
                                                            </div>
                                                        </div>
                                                        <div className="booking-form-i">
                                                            <label>Email Adress:</label>
                                                            <div className="input"><input disabled={true} type="text" name="email" defaultValue={props.user?.data?.email} /></div>
                                                            <div className="booking-error-input">
                                                                {error.email}
                                                            </div>
                                                        </div>
                                                        <div className="booking-form-i">
                                                            <label>Preferred Phone Number:</label>
                                                            <div className="input"><input disabled={true} type="text" name="phoneNumber" defaultValue={props.user?.data?.phoneNumber} /></div>
                                                            <div className="booking-error-input">
                                                                {error.phoneNumber}
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                        <div className="checkbox">
                                                            <label>
                                                                <input type="checkbox" onChange={isCheck ? () => setIsCheck(false) : () => setIsCheck(true)} value="" />
                                                                Do you have another check-in?
                                                            </label>
                                                        </div>
                                                        <div className="booking-devider"></div>
                                                    </div>

                                                    {/* <div hidden={isCheck ? true : false}>
                                                    <h2>Your Representative Information</h2>
                                                    <div className="booking-form">
                                                        <div className="booking-form-i">
                                                            <label>First Name:</label>
                                                            <div className="input"><input type="text" name="firstName" /></div>
                                                            <div className="booking-error-input">
                                                                {error.firstName}
                                                            </div>
                                                        </div>

                                                        <div className="booking-form-i">
                                                            <label>Last Name:</label>
                                                            <div className="input"><input type="text" name="lastName" /></div>
                                                            <div className="booking-error-input">
                                                                {error.lastName}
                                                            </div>
                                                        </div>
                                                        <div className="booking-form-i">
                                                            <label>Email Adress:</label>
                                                            <div className="input"><input type="text" name="email" /></div>
                                                            <div className="booking-error-input">
                                                                {error.email}
                                                            </div>
                                                        </div>
                                                        <div className="booking-form-i">
                                                            <label>Preferred Phone Number:</label>
                                                            <div className="input"><input type="text" name="phoneNumber" /></div>
                                                            <div className="booking-error-input">
                                                                {error.phoneNumber}
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                        <div className="booking-devider"></div>
                                                    </div>
                                                </div> */}
                                                    <div className="booking-complete">
                                                        <button className="booking-complete-btn" type="submit">Process payment</button>
                                                    </div>
                                                    {checkout && <div className="loading" delay-hide="10"></div>}
                                                    {/* </form> */}
                                                    <ReactModal
                                                        isOpen={modalIsOpen}
                                                        // onAfterOpen={afterOpenModal}
                                                        // onRequestClose={closeModal}
                                                        ariaHideApp={false}
                                                        preventScroll={true}
                                                        style={customStyles}
                                                        contentLabel="Payments">
                                                        <div style={{ float: "right" }}>
                                                            <FontAwesomeIcon onClick={() => setModalIsOpen(false)} icon={faTimesCircle}></FontAwesomeIcon>
                                                        </div>
                                                     <div className="payment-wrapper mt-2">
                                                            <div className="payment-tabs">
                                                                <a className="active">
                                                                    Payment <span></span>
                                                                </a>

                                                            </div>
                                                            <div className="clear"></div>

                                                            <div className="payment-tabs-content">
                                                                <div className="payment-tab">
                                                                    <div className="payment-alert">
                                                                        <span>
                                                                            You will be redirected to website
                                                                            to securely complete your payment using
                                                                            credit or debit cards.
                                                                        </span>
                                                                    </div>

                                                                    <PayPalScriptProvider
                                                                        style={{ maxWidth: "80px" }}
                                                                        options={{ "client-id": PP_ID }}
                                                                    >
                                                                        <PayPalButtons
                                                                            style={{ height: 25 }}
                                                                            createOrder={(data, actions) => {
                                                                                return actions.order
                                                                                    .create({
                                                                                        purchase_units: [
                                                                                            {
                                                                                                description: `Date book ${queryParam.get('checkInDate')}-${queryParam.get('checkOutDate')}`,
                                                                                                amount: {
                                                                                                    currency: "USD",
                                                                                                    value:`${calculatePrice()}`,
                                                                                                },
                                                                                            },
                                                                                        ],
                                                                                    })
                                                                                    .then((orderID) => {
                                                                                        console.log(orderID);
                                                                                        return orderID;
                                                                                    });
                                                                            }}
                                                                            onApprove={onApprove}
                                                                            onError={onError}
                                                                        />
                                                                    </PayPalScriptProvider>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </ReactModal>
                                                </form>
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
                                            <a href="#"><img style={{maxWidth:94,maxHeight:75}} alt="" src={props.hotel?.data?.images[0]?.imagePath} /></a>
                                        </div>
                                        <div className="checkout-headr">
                                            <div className="checkout-headrb">
                                                <div className="checkout-headrp">
                                                    <div className="chk-left">
                                                        <div className="chk-lbl"><a href="#">{props.hotel?.data?.hotelName}</a></div>
                                                        <div className="chk-lbl-a">{props.hotel?.data?.location?.street}
                                                            ,{props.hotel?.data?.location?.province?.name}
                                                            ,{props.hotel?.data?.location?.district?.name}</div>
                                                        <nav className="chk-stars">
                                                            <ul>
                                                                {[...Array(5)].map(
                                                                    (item, index) =>
                                                                        // {
                                                                        index + 1 >
                                                                            Math.ceil(
                                                                                props.hotel?.data?.hotelRating?.rating
                                                                            ) ? (
                                                                            <li key={index}>
                                                                                <a>
                                                                                    <img
                                                                                        alt=""
                                                                                        src="img/star-a.png"
                                                                                    />
                                                                                </a>
                                                                            </li>
                                                                        ) : (
                                                                            <li key={index}>
                                                                                <a>
                                                                                    <img
                                                                                        alt=""
                                                                                        src="img/star-b.png"
                                                                                    />
                                                                                </a>
                                                                            </li>
                                                                        )
                                                                    // }
                                                                )}
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
                                            <span className="chk-nights">{date} Nights</span>
                                            <span className="chk-dates">{queryParam.get("checkInDate")}  -  {queryParam.get("checkOutDate")}</span>
                                        </div>
                                        {
                                            props.rooms?.data?.map(
                                                room =>
                                                    <div className="chk-line">
                                                        1 {room.roomType} ROOM FOR <span className="chk-persons"> {room.maxAdult + room.maxChildren} PERSONS</span>
                                                    </div>
                                            )
                                        }
                                    </div>

                                    <div className="chk-details">
                                        <h2>Details</h2>
                                        <div className="chk-detais-row">
                                            {
                                                props.rooms?.data?.map(
                                                    room =>
                                                        <>
                                                            <h3>Detail Room</h3>
                                                            <div className="chk-line">
                                                                <span className="chk-l">Room type</span>
                                                                {/* <span className="chk-r" >{`${allRoomTypeString()}`}</span> */}
                                                                <span className="chk-r" >{room.roomType}</span>
                                                                <div className="clear"></div>
                                                            </div>
                                                            <div className="chk-line">
                                                                <span className="chk-l">price</span>
                                                                <span className="chk-r">{room.price}$</span>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </>
                                                )
                                            }
                                            <h3>Calculate price</h3>
                                            <div className="chk-line">
                                                <span className="chk-l">{date} nights stay</span>
                                                <span className="chk-r">{`${calculatePrice()}`}$</span>
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
                                            <div className="chk-total-r">{`${calculatePrice()}`}$</div>
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
        user: state.user,
        rooms: state.room,
        bookRoomData:state.bookRoom,
    };
};
const mapDispatchToProps = (dispatch) => {

    return {
        getHotel: (id) => dispatch(fetchHotelById(id)),
        getRooms: (data) => dispatch(getRooms(data)),
        getUser: (id) => dispatch(getUser(id)),
        bookRoom: (data) => dispatch(bookRoom(data)),
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(HotelBookingPage);
