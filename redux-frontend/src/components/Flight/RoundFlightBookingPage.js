import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { importAll } from "../../utils/JqueryImport";

import { getUserId } from "../../utils";
import { getUser } from "../../actions/actionUser";
import { bookFlight } from "../../actions/actionBookingFlight";
import { getRoundFlight } from "../../actions/actionFlight";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PP_ID } from "../../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const getAge = (travelDate, birthday) => {
  return Math.floor((new Date(travelDate).getTime() - new Date(birthday).getTime()) / 3.15576e+10)
}

const RoundFlightBookingPage = (props) => {
  const history = useHistory();
  let queryParam = useQuery();
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flight);
  const user = useSelector((state) => state.user);
  const completeBooking = useSelector(state => state.bookFlight);
  const [isComplete, setIsComplete] = useState(false)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [type, setType] = useState(0);
  const [dateOfDeparture, setDateOfDeparture] = useState("");
  const [dateOfReturn, setDateOfReturn] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const [returnTotalPrice, setReturnTotalPrice] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [extraService, setExtraService] = useState(0);
  const [totalPassenger, setTotalPassenger] = useState(0);
  const [flightBooking, setFlightBooking] = useState(null);
  const [hasInfant, setHasInfant] = useState([{
    infant: false
  }]);

  const [isMale, setIsMale] = useState([{
    gender: "true"
  }]);

  const [error, setError] = useState([{
    firstname: "",
    lastname: "",
    birthday: "",
  }]);

  const [inputListPassenger, setInputListPassenger] = useState(
    [{
      firstname: "",
      lastname: "",
      gender: "true",
      birthday: "",
      hasInfant: false,
      baggageExtra: 0,
      seatNumber: "",
      price: 0,
    },
    ]);
  const [flightDataOrder, setFlightDataOrder] = useState({
    purchase_units: [
      {
        description: `Round Trip Flight`,
        amount: {
          currency: "USD",
          value: 1,
        },
      },
    ],
  })
  const userId = parseInt(getUserId());
  const paymentMethod = "Credit Card";

  const getFlights = (dId, rId) => {
    dispatch(getRoundFlight(dId, rId));
  };

  const bookFlt = (data) => {
    dispatch(bookFlight(data));
  };

  const getUserBooking = (id) => {
    dispatch(getUser(id));
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create(flightDataOrder)
      .then((orderID) => {
        console.log(orderID);
        return orderID;
      });
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

  const validateForm = (e) => {
    const err = [...error];
    const list = [...inputListPassenger];

    for (var index = 0; index < list.length; index++) {
      if (!list[index]["firstname"]) {
        err[index]["firstname"] = "Firstname required.";
      } else {
        err[index]["firstname"] = "";
      };

      if (!list[index]["lastname"]) {
        err[index]["lastname"] = "Lastname required.";
      } else {
        err[index]["lastname"] = "";
      };

      if (!list[index]["birthday"]) {
        err[index]["birthday"] = "Birthday required.";
      } else {
        err[index]["birthday"] = "";
      };
    };

    for (var index = 0; index < list.length; index++) {
      if (err[index]["firstname"] || err[index]["lastname"] || err[index]["birthday"]) {
        setError(err);
        return false;
      }
    }
    return true;
  };

  const handleChange = (e, index) => {
    e.preventDefault();
    const err = [...error];
    const { name, value } = e.target;
    const list = [...inputListPassenger];
    list[index][name] = value;
    setInputListPassenger(list);
    if (!list[index][name]) {
      err[index][name] = "Required!";
    } else {
      err[index][name] = "";
    };
    setError(err);
  };

  const handleBirthdayChange = (e, index) => {
    const err = [...error];
    var list = [...inputListPassenger];

    if (!e.target.value) {
      err[index]["birthday"] = "Required!";
    } else {
      err[index]["birthday"] = "";

      list[index]["birthday"] = e.target.value.replaceAll("/", "-");
      setInputListPassenger(list);
      // }

    }
    setError(err);
  };

  const handleGenderClick = (e, index) => {
    // e.preventDefault();
    const checkgender = [...isMale];
    const list = [...inputListPassenger];
    if (e.currentTarget.innerHTML === "F") {
      list[index]["gender"] = "false";
      checkgender[index]["gender"] = "false";
    } else {
      list[index]["gender"] = "true"
      checkgender[index]["gender"] = "true";
    }
    setIsMale(checkgender);
    setInputListPassenger(list);
  };

  const handleInfantChange = (e, index) => {
    // e.preventDefault();
    const checkinfant = [...hasInfant];
    const list = [...inputListPassenger];
    list[index]["hasInfant"] = !list[index]["hasInfant"];
    checkinfant[index].infant = !checkinfant[index].infant;
    setHasInfant(checkinfant);
    setInputListPassenger(list);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (validateForm(e)) {
      var data = {
        userId: userId,
        flightId: flights.data.id,
        dateBooking: dateOfDeparture,
        type: type,
        returnFlightId: flights.returnData.id,
        dateReturnBooking: dateOfReturn,
        returnType: type,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice + returnTotalPrice,
        passengers: [...inputListPassenger]
      };
      setFlightBooking(data);
      setModalIsOpen(true);
    }
  };

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

  useEffect(() => {
    let mount = false;
    if (!sessionStorage.getItem("isBooking")) {
      history.push("/");
    }
    window.scrollTo(0, 0);
    importAll();
    getFlights(queryParam.get("fid"), queryParam.get("rfid"));
    if (queryParam.get("seatClass") === "ECONOMY") {
      setType(0);
    } else {
      setType(1);
    }
    setTotalPassenger(parseInt(queryParam.get("adult")) + parseInt(queryParam.get("child")));
    getUserBooking(parseInt(getUserId()));
    setDateOfDeparture(queryParam.get("departureDate").split("/").reverse().join("-"));
    setDateOfReturn(queryParam.get("returnDate").split("/").reverse().join("-"))
    var newListPax = [];
    var newListError = [];
    var newListHasInfant = [];
    var newListIsMale = [];
    [...Array(parseInt(queryParam.get("adult")) + parseInt(queryParam.get("child")))].map((item, index) => {
      newListPax.push({
        firstname: "",
        lastname: "",
        gender: "true",
        birthday: "",
        hasInfant: false,
        baggageExtra: 0,
        seatNumber: "",
        price: 0,
      })

      newListError.push({
        firstname: "",
        lastname: "",
        birthday: "",
      })

      newListHasInfant.push({
        infant: false
      })

      newListIsMale.push({
        gender: "true"
      })
    });
    setInputListPassenger(newListPax);
    setError(newListError);
    setHasInfant(newListHasInfant);
    setIsMale(newListIsMale);
    return () => {
      mount = true;
    };
  }, []);

  useEffect(() => {
    if (completeBooking.data && checkout) {
      sessionStorage.removeItem("isBooking")
      history.push({ pathname: "/round-flight-booking-complete" });
    }
    if (flights.data) {
      reCalculateTotalPrice(inputListPassenger, hasInfant);
    }
    if (flights.returnData) {
      reCalculateReturnTotalPrice(inputListPassenger, hasInfant);
    }

    if (checkout && !isComplete) {
      bookFlt(flightBooking);
      setIsComplete(true);
    }
  })


  const handleAddClick = (amount) => {
    // e.preventDefault();
    if (amount > 0) {
      var tempPaxList = [...inputListPassenger, {
        firstname: "",
        lastname: "",
        gender: "true",
        birthday: "",
        hasInfant: false,
        baggageExtra: 0,
        seatNumber: "",
        price: 0
      }];
      setInputListPassenger(tempPaxList);

      setError([...error, {
        firstname: "",
        lastname: "",
        birthday: "",
      }]);
      setIsMale([...isMale, {
        gender: "true"
      }]);
      var tempListHasInfant = [...hasInfant, {
        infant: false
      }]
      setHasInfant(tempListHasInfant)
      // reCalculateTotalPrice(tempPaxList, tempListHasInfant);
    } else if (amount < 0) {
      var tempPaxList = [...inputListPassenger]
      tempPaxList.pop();
      var tempListHasInfant = [...hasInfant];
      tempListHasInfant.pop();
      var tempErr = [...error];
      tempErr.pop();
      var tempIsMale = [...isMale];
      [...isMale].pop();
      setInputListPassenger(tempPaxList);
      setHasInfant(tempListHasInfant);
      setError(tempErr);
      setIsMale(tempIsMale);
      // reCalculateTotalPrice(tempPaxList, tempListHasInfant);
    }

  };

  const reCalculateTotalPrice = (listPax, listInfant) => {
    var newTotalPrice = 0;
    listPax.map((pax, index) => {
      var paxAge = getAge(dateOfDeparture, pax.birthday);
      if (queryParam.get("seatClass") === "ECONOMY") {
        if (paxAge <= 12 && paxAge >= 0) {
          var flightPrice = flights.data.child_price;
        } else {
          var flightPrice = flights.data.economyPrice;
        }
      } else {
        var flightPrice = flights.data.businessPrice;
      }
      var infantPrice = listInfant[index].infant ? flights.data.infant_price : 0;
      newTotalPrice = newTotalPrice + flightPrice + infantPrice;
    })
    setTotalPassenger(listPax.length);
    setTotalPrice(newTotalPrice);
  }
  const reCalculateReturnTotalPrice = (listPax, listInfant) => {
    var newTotalPrice = 0;
    listPax.map((pax, index) => {
      var paxAge = getAge(dateOfReturn, pax.birthday);
      if (queryParam.get("seatClass") === "ECONOMY") {
        if (paxAge <= 12 && paxAge >= 0) {
          var flightPrice = flights.returnData.child_price;
        } else {
          var flightPrice = flights.returnData.economyPrice;
        }
      } else {
        var flightPrice = flights.returnData.businessPrice;
      }
      var infantPrice = listInfant[index].infant ? flights.returnData.infant_price : 0;
      newTotalPrice = newTotalPrice + flightPrice + infantPrice;
    })
    setTotalPassenger(listPax.length);
    setReturnTotalPrice(newTotalPrice);
  }

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
                          <h2>Your Contact Information</h2>
                          <div className="booking-form">
                            <div className="booking-form-i">
                              <label>First Name:</label>
                              <div className="input">
                                <input
                                  type="text"
                                  defaultValue={user?.data?.firstName}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="booking-form-i">
                              <label>Last Name:</label>
                              <div className="input">
                                <input
                                  type="text"
                                  defaultValue={user?.data?.lastName}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="booking-form-i">
                              <label>Email Adress:</label>
                              <div className="input">
                                <input type="text" readOnly defaultValue={user?.data?.email} />
                              </div>
                            </div>
                            <div className="booking-form-i">
                              <label>Phone Number:</label>
                              <div className="input">
                                <input
                                  type="text"
                                  defaultValue={user?.data?.phoneNumber}
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="clear"></div>
                            <div className="checkbox">
                              <label>
                                <input type="checkbox" value="false" />I want to
                                receive Sparrow news in the future
                              </label>
                            </div>
                            <div className="booking-devider"></div>
                          </div>
                          <h2>Passenger Information</h2>
                          {inputListPassenger.map((x, i) => {
                            return (
                              <div key={i} className="booking-form">
                                <h4>Passenger {i + 1}</h4>
                                <div>
                                  <div className="booking-form-i">
                                    <label className="custom-lbl">
                                      First Name
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        *
                                      </span>
                                      : <span className="booking-error-input">
                                        {error[i].firstname}
                                      </span>
                                    </label>
                                    <div className="form-control input">
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="firstname"
                                        placeholder="Enter First Name"
                                        onChange={(e) => handleChange(e, i)}
                                      />
                                    </div>

                                  </div>
                                  <div className="booking-form-i">
                                    <label className="custom-lbl">
                                      Last Name
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        *
                                      </span>
                                      : <span className="booking-error-input">
                                        {error[i].lastname}
                                      </span>
                                    </label>
                                    <div className="input">
                                      <input
                                        type="text"
                                        name="lastname"
                                        placeholder="Enter Last Name"
                                        className="form-control"
                                        onChange={(e) => handleChange(e, i)}
                                      />
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
                                        onChange={(e) => handleInfantChange(e, i)}
                                      />
                                      Travel with Infant
                                    </label>
                                  </div>
                                </div>
                                <div className="booking-form-i">
                                  <div className="form-sex">
                                    <label>
                                      Male/Female
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        *
                                      </span>
                                    </label>
                                    <div name="gender"
                                      className={`form-control sex-type ${isMale[i].gender === "true" ? "chosen" : ""
                                        }`}
                                      onClick={(e) => handleGenderClick(e, i)}
                                    >
                                      M
                                    </div>
                                    <div name="gender"
                                      className={`form-control sex-type ${isMale[i].gender === "false" ? "chosen" : ""
                                        }`}
                                      onClick={(e) => handleGenderClick(e, i)}
                                    >
                                      F
                                    </div>
                                    <div className="clear"></div>
                                  </div>
                                  <div className="form-calendar-booking-flight">
                                    <label>
                                      Date of birth
                                      <span
                                        style={{
                                          color: "red",
                                          fontSize: "12px",
                                        }}
                                      >
                                        *
                                      </span>
                                      : <span className="booking-error-input">
                                        {error[i].birthday}
                                      </span>
                                    </label>


                                    <div className="input-a">
                                      <input
                                        name="birthday"
                                        type="text"
                                        className="form-control date-booking-inpt"
                                        placeholder="YYYY/MM/DD"
                                        onChange={(e) => handleBirthdayChange(e, i)}
                                      />
                                      <span className="date-icon"></span>
                                    </div>
                                  </div>
                                  <div className="clear"></div>
                                </div>

                                <div className="clear"></div>

                                {inputListPassenger.length - 1 === i && (<>
                                  <a
                                    id="removePassengerbutton"
                                    onClick={() => { handleAddClick(-1) }}
                                    hidden={inputListPassenger.length === 1}
                                    className="add-passanger"
                                    
                                  >
                                    <FontAwesomeIcon color="red" icon={faMinusCircle}></FontAwesomeIcon>
                                    Remove Passenger
                                  </a>
                                  <a
                                    onClick={() => handleAddClick(1)}
                                    className="add-passanger"
                                  >
                                    <FontAwesomeIcon color="green" icon={faPlusCircle}></FontAwesomeIcon>
                                    Add Passenger
                                  </a>

                                </>)}
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" />
                                    Save Personal Info 
                                  </label>
                                </div>
                                <div className="booking-devider"></div>
                              </div>
                            );
                          })}


                          <div className="booking-complete">
                            <h2>Review and book your trip</h2>
                            <p>
                            Please make sure to check flight's detail right and insert correctly passenger information!{" "}
                            </p>
                            <button
                              type="submit"
                              className="booking-complete-btn"
                            >
                              PROCESS PAYMENT
                            </button>
                            {checkout && <div className="loading" delay-hide="10"></div>}
                          </div>
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
                            {flightBooking && <div className="payment-wrapper mt-2">
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
                                                description: `Round Flight ${flights.data.departureCity}-${flights.data.arrivalCity}, ${flights.returnData.departureCity}-${flights.returnData.arrivalCity}`,
                                                amount: {
                                                  currency: "USD",
                                                  value: totalPrice + returnTotalPrice,
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
                            </div>}
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
                      <a href="#">
                        <img alt="" src={flights?.data?.airline?.image} style={{ width: "95px", height: '60px' }} />
                      </a>
                    </div>
                    <div className="checkout-headr">
                      <div className="checkout-headrb">
                        <div className="checkout-headrp">
                          <div className="chk-left">
                            <div className="chk-lbl">
                              <a href="#">
                                {flights?.data?.departureCity} - {flights?.data?.arrivalCity}
                              </a>
                            </div>
                            <div className="chk-lbl-a">ROUND TRIP FLIGHT</div>
                            <div className="chk-logo">
                              <p>{flights?.data?.airline?.airlineName}</p>
                            </div>
                          </div>
                          <div className="chk-right">
                            <a href="#">

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
                      <div className="chk-departure" style={{ float: "none", display: "inline" }}>
                        <span style={{ float: "none", display: "inline" }}>Schedule Time</span>
                        <b style={{ float: "none", display: "inline" }}>
                          {flights?.data?.departureTime} - {flights?.data?.arrivalTime}
                          <br />
                        </b>
                      </div>

                      <div className="chk-arrival" style={{float:"left",display:"inline"}}>
                        <span style={{ float: "left", display: "inline" }}>Day of Departure  </span>
                        <b style={{ float: "none", display: "inline" }}>
                          {dateOfDeparture}
                        </b>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>

                  <div className="chk-details">
                    <h2>Details</h2>
                    <div className="chk-detais-row">
                      <div className="chk-line">
                        <span className="chk-l">FLIGHT</span>
                        <span className="chk-r">
                          {flights?.data?.flightCode}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">FLIGHT TYPE</span>
                        <span className="chk-r">
                          {queryParam.get("seatClass")}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">Total Passenger</span>
                        <span className="chk-r">
                          {totalPassenger}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">taxes and fees</span>
                        <span className="chk-r">
                          {(parseInt(totalPrice) * 0.1).toPrecision(3)}$
                        </span>
                        <div className="clear"></div>
                      </div>
                    </div>
                    <div className="chk-total">
                      <div className="chk-total-l">Total Price</div>
                      <div className="chk-total-r add-more-price-flight">
                        {totalPrice}$
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>
                <div className="checkout-coll">
                  <div className="checkout-head">
                    <div className="checkout-headl">
                      <a href="#">
                        <img alt="" src={flights?.returnData?.airline?.image} style={{ width: "95px", height: '60px' }} />
                      </a>
                    </div>
                    <div className="checkout-headr">
                      <div className="checkout-headrb">
                        <div className="checkout-headrp">
                          <div className="chk-left">
                            <div className="chk-lbl">
                              <a href="#">
                                {flights?.returnData?.departureCity} - {flights?.returnData?.arrivalCity}
                              </a>
                            </div>
                            <div className="chk-lbl-a">ROUND TRIP FLIGHT</div>
                            <div className="chk-logo">
                              <p>{flights?.returnData?.airline?.airlineName}</p>
                            </div>
                          </div>
                          <div className="chk-right">
                            <a href="#">
                             
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
                      <div className="chk-departure" style={{ float: "none", display: "inline" }}>
                        <span style={{ float: "none", display: "inline" }}>Schedule Time</span>
                        <b style={{ float: "none", display: "inline" }}>
                          {flights?.returnData?.departureTime} - {flights?.returnData?.arrivalTime}
                          <br />
                        </b>
                      </div>

                      <div className="chk-arrival" style={{float:"left",display:"inline"}}>
                        <span style={{ float: "none", display: "inline" }}>Day of Departure  </span>
                        <b style={{ float: "none", display: "inline" }}>
                          {dateOfReturn}
                        </b>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>

                  <div className="chk-details">
                    <h2>Details</h2>
                    <div className="chk-detais-row">
                      <div className="chk-line">
                        <span className="chk-l">RETURN FLIGHT</span>
                        <span className="chk-r">
                          {flights?.returnData?.flightCode}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">FLIGHT TYPE</span>
                        <span className="chk-r">
                          {queryParam.get("seatClass")}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">Total Passenger</span>
                        <span className="chk-r">
                          {totalPassenger}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">taxes and fees</span>
                        <span className="chk-r">
                          {(parseInt(returnTotalPrice) * 0.1).toPrecision(3)}$
                        </span>
                        <div className="clear"></div>
                      </div>
                    </div>
                    <div className="chk-total">
                      <div className="chk-total-l">Total Price</div>
                      <div className="chk-total-r add-more-price-flight">
                        {returnTotalPrice}$
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

export default RoundFlightBookingPage;
