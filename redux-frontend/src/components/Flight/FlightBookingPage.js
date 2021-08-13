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
import { retrieveFlight } from "../../actions/actionFlightByAirline";

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

const FlightBookingPage = (props) => {
  const history = useHistory();
  let queryParam = useQuery();
  const dispatch = useDispatch();
  const flight = useSelector((state) => state.flights);
  const user = useSelector((state) => state.user);
  const completeBooking = useSelector(state => state.bookFlight);
  const [isComplete, setIsComplete] = useState(false)

  const [type, setType] = useState(0);
  const [dateOfDeparture, setDateOfDeparture] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [extraService, setExtraService] = useState(0);
  const [totalPassenger, setTotalPassenger] = useState(0);
  const [flightBooking, setflightBooking] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
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
      hasInfant: "false",
      baggageExtra: 0,
      seatNumber: "",
      price: 0,
    },
    ]);
  const [flightDataOrder, setFlightDataOrder] = useState({
    purchase_units: [
      {
        description: `One way Flight`,
        amount: {
          currency: "USD",
          value: 1,
        },
      },
    ],
  })
  const userId = parseInt(getUserId());
  const paymentMethod = "Credit Card";
  // return flight
  const returnFlightId = 0;
  const dateOfReturn = "";
  const returnType = 0;


  const getFlight = (id) => {
    dispatch(retrieveFlight(id));
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
      // if (Object.is(Date.parse(list[index]["birthday"]), NaN)) {
      //   err[index]["birthday"] = "Wrong format of birthday";
      // } else {
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
    checkinfant[index].infant = !checkinfant[index].infant;
    setHasInfant(checkinfant);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (validateForm(e)) {
      var data = {
        userId: userId,
        flightId: flight.id,
        dateBooking: dateOfDeparture,
        type: type,
        returnFlightId: returnFlightId,
        dateReturnBooking: dateOfReturn,
        returnType: returnType,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        passengers: [...inputListPassenger]
      };
      setflightBooking(data);
      setModalIsOpen(true);
    }
  };

  useEffect(() => {
    let mount = false;
    if (!sessionStorage.getItem("isBooking")) {
      history.push("/");
    }
    window.scrollTo(0, 0);
    importAll();
    getFlight(queryParam.get("fid"));
    if (queryParam.get("seatClass") === "ECONOMY") {
      setType(0);
      setTotalPassenger(parseInt(queryParam.get("adult")) + parseInt(queryParam.get("child")));
    } else {
      setType(1);
      setTotalPassenger(parseInt(queryParam.get("adult")) + parseInt(queryParam.get("child")));
    }
    getUserBooking(parseInt(getUserId()));
    console.log(queryParam.get("departureDate").split("/").reverse().join("-"));
    setDateOfDeparture(queryParam.get("departureDate").split("/").reverse().join("-"));

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
        hasInfant: "false",
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
      history.push({ pathname: "/flight-booking-complete" });
    }
    if (flight) {
      reCalculateTotalPrice(inputListPassenger, hasInfant);
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
        hasInfant: "false",
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
      var tempPaxList = [...inputListPassenger];
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
          var flightPrice = flight.child_price;
        } else {
          var flightPrice = flight.economyPrice;
        }
      } else {
        var flightPrice = flight.businessPrice;
      }
      var infantPrice = listInfant[index].infant ? flight.infant_price : 0;
      newTotalPrice = newTotalPrice + flightPrice + infantPrice;
    })
    setTotalPrice(newTotalPrice);
    setTotalPassenger(listPax.length);
  }

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
                                <input type="checkbox" value="" />I want to
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
                                        placeholder="YYYY-MM-DD"
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
                                    id = "removePassengerbutton"
                                    onClick={() => {inputListPassenger.length === 1 ? document.getElementById("removePassengerbutton").disabled=true : handleAddClick(-1)}}
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
                              CONFIRM INFORMATION
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
                                                description: `One way Flight ${flight.departureCity}-${flight.arrivalCity}`,
                                                amount: {
                                                  currency: "USD",
                                                  value: totalPrice,
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
                        <img alt="" src={flight?.airline?.image} style={{width:"93px",height:"65px"}}/>
                      </a>
                    </div>
                    <div className="checkout-headr">
                      <div className="checkout-headrb">
                        <div className="checkout-headrp">
                          <div className="chk-left">
                            <div className="chk-lbl">
                              <a href="#">
                                {flight?.departureCity} - {flight?.arrivalCity}
                              </a>
                            </div>
                            <div className="chk-lbl-a">ONEWAY FLIGHT</div>
                            <div className="chk-logo">
                              <p>{flight?.airline?.airlineName}</p>
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
                      <div className="chk-departure" style={{float:"none",display:"inline"}}>
                        <span style={{float:"none",display:"inline"}}>Schedule Time</span>
                        <b style={{float:"none",display:"inline"}}>
                          {flight?.departureTime} - {flight?.arrivalTime}
                          <br />
                        </b>
                      </div>
    
                      <div className="chk-arrival"  style={{float:"left",display:"inline"}}>
                        <span style={{float:"none",display:"inline"}}>Day of Departure  </span>
                        <b style={{float:"none",display:"inline"}}>                 
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
                          {flight?.flightCode}
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
