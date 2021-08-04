import { useEffect, setState, useState, Component } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import $ from "jquery";
import { importAll } from "../../utils/JqueryImport";
import { useSelector, useDispatch } from "react-redux";
import { getUserId } from "../../utils/Common";
import { bookFlight } from "../../actions/actionBookingFlight";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PP_ID } from "../../config/api";
import Paypal from "../Paypal";

const cardType = {
  properties: [
    {
      value: 0,
      label: "National Id card",
    },
    {
      value: 1,
      label: "Driver licenses",
    },
    {
      value: 2,
      label: "Passport",
    },
  ],
};
const FlightBookingPage = (props) => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [isMale, setIsMale] = useState("true");
  const [type, setType] = useState(0);
  const [dateOfDeparture, setDateOfDeparture] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasInfant, setHasInfant] = useState("true");
  const booking = useSelector((state) => state.bookFlight);
  const [checkout, setCheckout] = useState(false);


  const bookFlt = (data) => {
    dispatch(bookFlight(data));
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "Testing booking function",
            amount: {
              currency: "USD",
              value: totalPrice
            }
          },
        ],
      })
      .then((orderID) => {
        console.log(orderID)
        return orderID;
      });
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log(`Transaction completed by ${details.payer.name.given_name}!`);
      setCheckout(true);
    });
  }

  const onError = (err) => {
    console.log(err.toString());
  }

  const userId = parseInt(getUserId());
  //   const flightId = 0;
  const returnFlightId = 0;
  // let dateOfDeparture;
  const dateOfReturn = "";

  const returnType = 0;
  const paymentMethod = "Credit Card";
  //   const flightId = 0;
  //   const type = 0;
  //  const totalPrice = 60;
  const totalPassenger = 1;
  const [error, setError] = useState({
    firstname: "",
    lastname: "",
    birthday: "",
    gender: "",
    cardId: "",
    cardType: "",
    cardExpired: "",
    hasInfant: "",
  });

  const handleGenderClick = (e) => {
    e.preventDefault();
    if (e.currentTarget.innerHTML === "F") {
      setIsMale("false");
    } else {
      setIsMale("true");
    }
  };
  const validateForm = (e) => {
    var form = e.target;
    const err = { ...error };

    if (!form.firstname.value) {
      err.firstname = "First name is required.";
    } else {
      err.firstname = "";
    }

    if (!form.lastname.value) {
      err.lastname = "Last name is required.";
    } else {
      err.lastname = "";
    }

    if (!form.birthday.value) {
      err.birthday = "Birthday is required.";
    } else {
      err.birthday = "";
    }

    if (!form.cardId.value) {
      err.cardId = "Card Id number is required.";
    } else {
      err.cardId = "";
    }

    if (!form.cardType.value) {
      err.cardType = "Card type is required.";
    } else {
      err.cardType = "";
    }

    if (!form.cardExpired.value) {
      err.cardExpired = "Expired date is required.";
    } else {
      err.cardExpired = "";
    }

    if (
      err.firstname ||
      err.lastname ||
      err.birthday ||
      err.gender ||
      err.cardId ||
      err.cardType ||
      err.cardExpired
    ) {
      setError(err);
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    e.preventDefault();
    const err = { ...error };
    if (e.target.value) {
      err[e.target.name] = "";
    } else {
      err[e.target.name] = "Required!";
    }

    setError(err);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();

    var form = e.target;
    if (validateForm(e)) {
      var data = {
        userId: userId,
        flightId: location.state.selectedFlight.id,
        returnFlightId: returnFlightId,
        dateBooking: dateOfDeparture,
        returnDateBooking: dateOfReturn,
        type: type,
        returnType: returnType,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        totalPassenger: totalPassenger,
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        birthday: form.birthday.value,
        gender: isMale,
        cardId: form.cardId.value,
        cardType: form.cardType.value,
        cardExpired: form.cardExpired.value,
        hasInfant: "false",
      };
      bookFlt(data);

      history.push({ pathname: "/flight-booking-complete" });
    }
  };
  useEffect(() => {
    let mount = false;
    window.scrollTo(0, 0);
    importAll();
    if (location.state.typeClass === "ECONOMY") {
      setTotalPrice(location.state.selectedFlight.economyPrice);
      setType(0);
    } else {
      setTotalPrice(location.state.selectedFlight.businessPrice);
      setType(1);
    }
    setDateOfDeparture(location.state.dateBook.split("/").reverse().join("-"));

    // const flight = location.state.selectedFlight;
    // const dateDeparture = location.state.dateBook;
    // const seatClass = location.state.typeClass;
    return () => {
      mount = true;
    };
  }, [location]);
  // useEffect(()=>{
  //     getSelectedFlight(selectFlightId);

  // },[])

  return (
    <>
      <Header></Header>
      <div className="main-cont">
        <div className="body-wrapper">
          <div className="wrapper-padding">
            <div className="page-head">
              <div className="page-title">
                Flights Ticket - <span>BOOKING</span>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link> /{" "}
                <a onClick={(e) => history.goBack()} to="">
                  Flight Search Result
                </a>{" "}
                / <span>Flight Booking</span>
              </div>
              <div className="clear"></div>
            </div>

            <div className="sp-page">
              <div className="sp-page-a">
                <div className="sp-page-l">
                  <div className="sp-page-lb">
                    <div className="sp-page-p">
                      <div className="booking-left">
                        <form onSubmit={handleBookingSubmit}>
                          <h2>Passenger Information</h2>
                          <div className="booking-form">
                            <div>
                              <div className="booking-form-i">
                                <label className="custom-lbl">
                                  First Name:
                                </label>
                                <div className="form-control input">
                                  <input
                                    className="form-control"
                                    type="text"
                                    name="firstname"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="booking-error-input">
                                  {error.firstname}
                                </div>
                              </div>
                              <div className="booking-form-i">
                                <label className="custom-lbl">Last Name:</label>
                                <div className="input">
                                  <input
                                    type="text"
                                    name="lastname"
                                    className="form-control"
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="booking-error-input">
                                  {error.lastname}
                                </div>
                              </div>
                              <div className="clear"></div>
                            </div>
                            <div className="booking-form-i">
                              <div
                                className="checkbox"
                                style={{ marginTop: "30px" }}
                              >
                                <label>
                                  <input
                                    className="form-control"
                                    name="hasInfant"
                                    type="checkbox"
                                  />
                                  Travel with Infant
                                </label>
                              </div>
                            </div>
                            <div className="booking-form-i">
                              <div className="form-sex">
                                <label>Male/Female</label>
                                <div
                                  className={`form-control sex-type ${isMale === "true" ? "chosen" : ""
                                    }`}
                                  onClick={handleGenderClick}
                                >
                                  M
                                </div>
                                <div
                                  className={`form-control sex-type ${isMale === "false" ? "chosen" : ""
                                    }`}
                                  onClick={handleGenderClick}
                                >
                                  F
                                </div>
                                <div className="clear"></div>
                              </div>
                              <div className="form-calendar-booking-flight">
                                <label>Date of birth:</label>
                                <div className="booking-error-input">
                                  {error.birthday}
                                </div>

                                <div className="input-a">
                                  <input
                                    name="birthday"
                                    type="text"
                                    className="form-control date-booking-inpt"
                                    placeholder="YYYY-MM-DD"
                                  />{" "}
                                  <span className="date-icon"></span>
                                </div>
                              </div>
                              <div className="clear"></div>
                            </div>

                            <div className="clear"></div>

                            <div className="bookin-three-coll">
                              <div className="booking-form-i">
                                <label>Card Id number:</label>
                                <div className="input">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="cardId"
                                  />
                                </div>
                                <div className="booking-error-input">
                                  {error.cardId}
                                </div>
                              </div>
                              <div
                                className="booking-form-i select-wrapper srch-tab-line"
                                style={{ padding: "0" }}
                              >
                                <label>Card Type:</label>
                                {/* <div className="booking-error-input">
                                  {error.cardType}
                                </div> */}

                                <select
                                  className="form-control custom-select"
                                  name="cardType"
                                >
                                  {cardType.properties.map((item) => (
                                    <option key={item.value} value={item.value}>
                                      {item.label}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <div className="booking-form-i">
                                <label>Expiry Date:</label>
                                <div className="input-a">
                                  <input
                                    name="cardExpired"
                                    type="text"
                                    className="form-control date-card-expired-inpt"
                                    placeholder="YYYY-MM-DD"
                                  />{" "}
                                  <span className="date-icon"></span>
                                </div>
                                <div className="booking-error-input">
                                  {error.cardExpired}
                                </div>
                              </div>
                              <div className="clear"></div>
                            </div>

                            <a href="#" className="add-passanger">
                              Add Passenger
                            </a>
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" />
                                Save Personal Info ????
                              </label>
                            </div>
                            <div className="booking-devider"></div>
                          </div>

                          {/* <h2>Customer Information</h2>

                                            <div className="booking-form">
                                                <div className="booking-form-i">
                                                    <label>First Name:</label>
                                                    <div className="input"><input type="text" /></div>
                                                </div>
                                                <div className="booking-form-i">
                                                    <label>Last Name:</label>
                                                    <div className="input"><input type="text" /></div>
                                                </div>
                                                <div className="booking-form-i">
                                                    <label>Email Adress:</label>
                                                    <div className="input"><input type="text" /></div>
                                                </div>
                                                <div className="booking-form-i">
                                                    <label>Confirm Email Adress:</label>
                                                    <div className="input"><input type="text" /></div>
                                                </div>
                                                <div className="booking-form-i">
                                                    <label>Country:</label>
                                                    <div className="input"><input type="text" /></div>
                                                </div>
                                                <div className="booking-form-i">
                                                    <label>Preferred Phone Number:</label>
                                                    <div className="input"><input type="text" /></div>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="booking-devider no-margin"></div> */}
                          <h2>How would you like to pay?</h2>

                          <div className="payment-wrapper">
                            <div className="payment-tabs">
                              <a href="#" className="active">
                                Credit Card <span></span>
                              </a>
                              <a href="#">
                                Paypal <span></span>
                              </a>
                            </div>
                            <div className="clear"></div>
                            <div className="payment-tabs-content">
                              <div className="payment-tab">
                                {/* <div className="payment-type">
                                  <label>Card Type:</label>
                                  <div className="card-type">
                                    <img alt="" src="img/paymentt-01.png" />
                                  </div>
                                  <div className="card-type">
                                    <img alt="" src="img/paymentt-02.png" />
                                  </div>
                                  <div className="card-type">
                                    <img alt="" src="img/paymentt-03.png" />
                                  </div>
                                  <div className="clear"></div>
                                </div>
                                <div className="booking-form">
                                  <div className="booking-form-i">
                                    <label>Card Number:</label>
                                    <div className="input">
                                      <input type="text" />
                                    </div>
                                  </div>
                                  <div className="booking-form-i">
                                    <label>Card Holder Name:</label>
                                    <div className="input">
                                      <input type="text" />
                                    </div>
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
                                          <div className="input">
                                            <input type="text" />
                                          </div>
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
                                    <input type="checkbox" />
                                    Im accept the rules{" "}
                                    <a href="#">Terms & Conditions</a>
                                  </label>
                                </div> */}
                                <div className="payment-alert">
                                  <span>
                                    You will be redirected to PayPal's website
                                    to securely complete your payment using credit or debit cards.
                                  </span>
                                  {/* <div className="payment-alert-close">
                                    <a>
                                      <img alt="" src="img/alert-close.png" />
                                    </a>
                                  </div> */}
                                </div>

                                {/* <a className="paypal-btn">proceed to paypall</a> */}

                                <PayPalScriptProvider style={{ maxWidth: "80px" }} options={{ "client-id": PP_ID }} >
                                  <PayPalButtons
                                    style={{ height: 25 }}
                                    fundingSource={"card"}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError} />
                                </PayPalScriptProvider>
                              </div>

                              <div className="payment-tab">
                                <div className="payment-alert">
                                  <span>
                                    You will be redirected to PayPal's website
                                    to securely complete your payment using paypal account.
                                  </span>
                                  {/* <div className="payment-alert-close">
                                    <a>
                                      <img alt="" src="img/alert-close.png" />
                                    </a>
                                  </div> */}
                                </div>

                                {/* <a className="paypal-btn">proceed to paypall</a> */}

                                <PayPalScriptProvider style={{ maxWidth: "80px" }} options={{ "client-id": PP_ID }} >
                                  <PayPalButtons
                                    style={{ height: 25 }}
                                    fundingSource={"paypal"}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError} />
                                </PayPalScriptProvider>
                              </div>
                            </div>
                          </div>
                          <div className="booking-complete">
                            <h2>Review and book your trip</h2>
                            <p>
                              Voluptatem quia voluptas sit aspernatur aut odit
                              aut fugit, sed quia consequuntur magni dolores eos
                              qui voluptatem sequi nesciunt.{" "}
                            </p>
                            <button
                              type="submit"
                              className={checkout ? "booking-complete-btn" : "booking-complete-btn disable"}
                              disabled={checkout ? "" : "disable"}
                            >
                              COMPLETE BOOKING
                            </button>
                          </div>
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
                      <a href="#">
                        <img alt="" src="img/check-img-01.jpg" />
                      </a>
                    </div>
                    <div className="checkout-headr">
                      <div className="checkout-headrb">
                        <div className="checkout-headrp">
                          <div className="chk-left">
                            <div className="chk-lbl">
                              <a href="#">
                                {location?.state.selectedFlight.departureCity} -{" "}
                                {location?.state.selectedFlight.arrivalCity}
                              </a>
                            </div>
                            <div className="chk-lbl-a">ONEWAY FLIGHT</div>
                            <div className="chk-logo">
                              <img alt="" src="img/lufthansa.png" />
                            </div>
                          </div>
                          <div className="chk-right">
                            <a href="#">
                              <img alt="" src="img/chk-edit.png" />
                            </a>
                          </div>
                          <div className="clear"></div>
                        </div>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>

                  <div className="chk-lines">
                    <div className="chk-line chk-fligth-info">
                      <div className="chk-departure">
                        <span>Departure</span>
                        <b>
                          {location?.state.selectedFlight.departureTime}
                          <br />
                          {location?.state.dateBook}
                        </b>
                      </div>
                      <div className="chk-fligth-devider"></div>
                      <div className="chk-fligth-time">
                        <img alt="" src="img/icon-nights.png" />
                      </div>
                      <div className="chk-fligth-devider"></div>
                      <div className="chk-arrival">
                        <span>Arrival</span>
                        <b>
                          {location?.state.selectedFlight.arrivalTime}
                          <br />
                          {location?.state.dateBook}
                        </b>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>

                  <div className="chk-details">
                    <h2>Details</h2>
                    <div className="chk-detais-row">
                      <div className="chk-line">
                        <span className="chk-l">AIRLINE:</span>
                        <span className="chk-r">
                          {location?.state.selectedFlight.airline.airlineName}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">FLIGHT TYPE:</span>
                        <span className="chk-r">
                          {location?.state.typeClass}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">Price</span>
                        <span className="chk-r">
                          {location?.state.typeClass === "ECONOMY" &&
                            location?.state.selectedFlight.economyPrice}
                          {location?.state.typeClass === "BUSINESS" &&
                            location?.state.selectedFlight.businessPrice}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">taxes and fees</span>
                        <span className="chk-r">
                          {location?.state.typeClass === "ECONOMY" &&
                            parseFloat(
                              parseInt(
                                location?.state.selectedFlight.economyPrice
                              ) * 0.1
                            ).toPrecision(3)}
                          {location?.state.typeClass === "BUSINESS" &&
                            location?.state.selectedFlight.businessPrice}
                        </span>
                        <div className="clear"></div>
                      </div>
                    </div>
                    <div className="chk-total">
                      <div className="chk-total-l">Total Price</div>
                      <div className="chk-total-r add-more-price-flight">
                        {location?.state.typeClass === "ECONOMY" &&
                          location?.state.selectedFlight.economyPrice}
                        {location?.state.typeClass === "BUSINESS" &&
                          location?.state.selectedFlight.businessPrice}
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>

                <div className="h-help">
                  <div className="h-help-lbl">Need Sparrow Help?</div>
                  <div className="h-help-lbl-a">
                    We would be happy to help you!
                  </div>
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
  );
};

export default FlightBookingPage;
