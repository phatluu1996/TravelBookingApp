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
import { retrieveFlight} from "../../actions/actionFlightByAirline";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PP_ID } from "../../config/api";


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const getAge = (travelDate,birthday) => Math.floor((new Date(travelDate).getTime() - new Date(birthday).getTime()) / 3.15576e+10)

const FlightBookingPage = (props) => {
  const history = useHistory();
  let queryParam = useQuery();
  const dispatch = useDispatch();
  const flight = useSelector((state) => state.flights);
  const user = useSelector((state) => state.user);
  const completeBooking = useSelector(state => state.bookFlight);
  const [isSubmit, setIsSubmit] = useState(false)

  const [type, setType] = useState(0);
  const [dateOfDeparture, setDateOfDeparture] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkout, setCheckout] = useState(false);
  const [extraService, setExtraService]= useState(0);
  const [totalPassenger, setTotalPassenger] = useState(0);
  const [price,setPrice]=useState(0);
  const [hasInfant, setHasInfant] = useState([{
    infant:"false"
  }]);

  const [isMale, setIsMale] = useState([{
    gender:"true"
  }]);

  const [error, setError] = useState([{
    firstname: "",
    lastname: "",
    birthday: "",
  }]);

  const [inputListPassenger, setInputListPassenger] = useState([
    {
      firstname: "",
      lastname: "",
      gender: "true",
      birthday: "",
      hasInfant: "false",
      baggageExtra: 0,
      seatNumber: "",
      price:0,
    },
  ]);
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
      .create({
        purchase_units: [
          {
            description: "Testing booking function",
            amount: {
              currency: "USD",
              value: 1,
            },
          },
        ],
      })
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
    const err = [...error ];
    const list = [...inputListPassenger];
 
    for (var index=0;index<list.length;index++){
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

    for (var index=0;index<list.length;index++){
      if (err[index]["firstname"] || err[index]["lastname"] || err[index]["birthday"]) {
        setError(err); 
        return false;
      }
    }
    return true;
  };

  const handleChange = (e,index) => {
    e.preventDefault();
    const err = [ ...error ];
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

  const handleBirthdayChange = (e,index) => {
    e.preventDefault();
    const err = [ ...error ];
    const { name,value } = e.target;
    const list = [...inputListPassenger];
    list[index]["birthday"] = value;
    setInputListPassenger(list);
    if (!list[index]["birthday"]){
    
      err[index]["birthday"] = "Required!";
    } else {
      err[index]["birthday"] = "";
      if (type == 0){
        let age = getAge(dateOfDeparture,list[index]["birthday"])

        if (age<18) {
          setTotalPrice(parseInt(totalPrice) - parseInt(price)+parseInt(flight.child_price));
        };
      }
    }
    setError(err);
  };

  const handleGenderClick = (e,index) => {
    e.preventDefault();
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

  const handleInfantChange = (e,index) => {
    e.preventDefault();
    const checkinfant = [...hasInfant];
    const list = [...inputListPassenger];
    if (e.currentTarget.checked) {
      list[index]["hasInfant"] = "true";
      checkinfant[index]["infant"]="true";
      setTotalPrice(parseInt(totalPrice) + parseInt(flight.infant_price));
    } else {
      list[index]["hasInfant"] = "false";
      setTotalPrice(parseInt(totalPrice) - parseInt(flight.infant_price));
      checkinfant[index]["infant"]="false";
    }
    setInputListPassenger(list);
    setHasInfant(checkinfant)
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
      bookFlt(data);   
      setIsSubmit(true); 
    }
  };

  useEffect(() => {
    let mount = false;
    window.scrollTo(0, 0);
    importAll();
    getFlight(queryParam.get("fid"));
    if (queryParam.get("seatClass") === "ECONOMY") {
      setType(0);
      setTotalPassenger(parseInt(queryParam.get("adult"))+parseInt(queryParam.get("child")));
      setTotalPrice((parseInt(queryParam.get("adult"))+parseInt(queryParam.get("child")))*queryParam.get("price"));
      setPrice(queryParam.get("price"));
    } else {
      setType(1);
      setTotalPassenger(parseInt(queryParam.get("adult"))+parseInt(queryParam.get("child")));
      setTotalPrice((parseInt(queryParam.get("adult"))+parseInt(queryParam.get("child")))*queryParam.get("price"));
      setPrice(queryParam.get("price"));
    }
    getUserBooking(parseInt(getUserId()));
    setDateOfDeparture(queryParam.get("departureDate").split("/").reverse().join("-"));
    
    return () => {
      mount = true;
    };
  }, []);

  useEffect(() => {
    if(completeBooking.data && checkout){
      history.push({ pathname: "/flight-booking-complete" });
    }
  })


  const handleAddClick = (e) => {
    e.preventDefault();
   
    setInputListPassenger([...inputListPassenger, {
      firstname: "",
      lastname: "",
      gender: "true",
      birthday: "",
      hasInfant: "false",
      baggageExtra: 0,
      seatNumber: "",
      price:0
    }]);
    setError([...error,{
      firstname: "",
      lastname: "",
      birthday: "",
    }]);
    setIsMale([...isMale,{
      gender:"true"
    }]);
    setHasInfant([...hasInfant,{
      infant:"false"
    }])
    if(inputListPassenger.length == totalPassenger){
      setTotalPassenger(parseInt(totalPassenger)+1);
      setTotalPrice(parseInt(totalPrice) + parseInt(price));
    } else {
    }
  
  };
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
                                <h4>Passenger {i+1}</h4>
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
                                      className={`form-control sex-type ${
                                        isMale[i].gender === "true" ? "chosen" : ""
                                      }`}
                                      onClick={(e) => handleGenderClick(e, i)}
                                    >
                                      M
                                    </div>
                                    <div name="gender"
                                      className={`form-control sex-type ${
                                        isMale[i].gender === "false" ? "chosen" : ""
                                      }`}
                                      onClick={(e)=>handleGenderClick(e,i)}
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

                                {inputListPassenger.length - 1 === i && (
                                  <a
                                    href="#"
                                    onClick={handleAddClick}
                                    className="add-passanger"
                                  >
                                    Add Passenger
                                  </a>
                                )}
                                <div className="checkbox">
                                  <label>
                                    <input type="checkbox" />
                                    Save Personal Info ????
                                  </label>
                                </div>
                                <div className="booking-devider"></div>
                              </div>
                            );
                          })}

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
                                <div className="payment-alert">
                                  <span>
                                    You will be redirected to PayPal's website
                                    to securely complete your payment using
                                    credit or debit cards.
                                  </span>
                                  {/* <div className="payment-alert-close">
                                    <a>
                                      <img alt="" src="img/alert-close.png" />
                                    </a>
                                  </div> */}
                                </div>

                                {/* <a className="paypal-btn">proceed to paypall</a> */}

                                <PayPalScriptProvider
                                  style={{ maxWidth: "80px" }}
                                  options={{ "client-id": PP_ID }}
                                >
                                  <PayPalButtons
                                    style={{ height: 25 }}
                                    fundingSource={"card"}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}
                                  />
                                </PayPalScriptProvider>
                              </div>

                              <div className="payment-tab">
                                <div className="payment-alert">
                                  <span>
                                    You will be redirected to PayPal's website
                                    to securely complete your payment using
                                    paypal account.
                                  </span>
                                  {/* <div className="payment-alert-close">
                                    <a>
                                      <img alt="" src="img/alert-close.png" />
                                    </a>
                                  </div> */}
                                </div>

                                {/* <a className="paypal-btn">proceed to paypall</a> */}

                                <PayPalScriptProvider
                                  style={{ maxWidth: "80px" }}
                                  options={{ "client-id": PP_ID }}
                                >
                                  <PayPalButtons
                                    style={{ height: 25 }}
                                    fundingSource={"paypal"}
                                    createOrder={createOrder}
                                    onApprove={onApprove}
                                    onError={onError}
                                  />
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
                              className={
                                checkout
                                  ? "booking-complete-btn"
                                  : "booking-complete-btn disable"
                              }
                              disabled={checkout ? "" : "disable"}
                            >
                              COMPLETE BOOKING
                            </button>
                            {isSubmit && <div className="loading" delay-hide="10"></div>}
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
                                {flight?.departureCity} - {flight?.arrivalCity}
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
                          {flight?.departureTime}
                          <br />
                          {dateOfDeparture}
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
                          {flight?.arrivalTime}
                          <br />
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
                        <span className="chk-l">AIRLINE:</span>
                        <span className="chk-r">
                          {flight?.airline?.airlineName}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">FLIGHT TYPE:</span>
                        <span className="chk-r">
                          {queryParam.get("seatClass")}
                        </span>
                        <div className="clear"></div>
                      </div>
                      {/* <div className="chk-line">
                        <span className="chk-l">Extra Services</span>
                        <span className="chk-r">
                          {extraService}
                        </span>
                        <div className="clear"></div>
                      </div> */}
                      <div className="chk-line">
                        <span className="chk-l">taxes and fees</span>
                        <span className="chk-r">
                          { (parseInt(totalPrice) * 0.1).toPrecision(3)}
                        </span>
                        <div className="clear"></div>
                      </div>
                    </div>
                    <div className="chk-total">
                      <div className="chk-total-l">Total Price</div>
                      <div className="chk-total-r add-more-price-flight">
                        {totalPrice}
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
