import React from "react";
import { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { connect } from "react-redux";

import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { importAll } from "../../utils/JqueryImport";

import { getUserId } from "../../utils";
import { getUser } from "../../actions/actionUser";
import { bookFlight } from "../../actions/actionBookingFlight";
import { getRoundFlight } from "../../actions/actionFlight";

import { fetchHotelById } from "../../actions/actionHotel";
import { getRooms } from "../../actions/actionRoom";
import { bookRoom } from "../../actions/actionBookingRoom";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PP_ID } from "../../config/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMinusCircle,
  faPlusCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import ReactModal from "react-modal";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const getAge = (travelDate, birthday) => {
  return Math.floor(
    (new Date(travelDate).getTime() - new Date(birthday).getTime()) / 3.15576e10
  );
};

const ComboBookingPage = (props) => {
  const history = useHistory();
  let queryParam = useQuery();
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flight);
  const user = useSelector((state) => state.user);
  const completeBooking = useSelector((state) => state.bookFlight);
  const [isComplete, setIsComplete] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [type, setType] = useState(0);
  const [dateOfDeparture, setDateOfDeparture] = useState("");
  const [dateOfReturn, setDateOfReturn] = useState("");

  const [totalPrice, setTotalPrice] = useState(0);
  const [returnTotalPrice, setReturnTotalPrice] = useState(0);
  const [totalInfantPrice, setTotalInfantPrice] = useState(0);
  const [totalFlightPrice, setTotalFlightPrice] = useState(0);

  const [checkout, setCheckout] = useState(false);
  const [extraService, setExtraService] = useState(0);
  const [totalPassenger, setTotalPassenger] = useState(0);
  const [flightBooking, setFlightBooking] = useState(null);

  const [date, setDateCalculate] = useState(0);
  const [dataConfirm, setDataConfirm] = useState(null);

  const [hasInfant, setHasInfant] = useState([
    {
      infant: false,
    },
  ]);

  const [isMale, setIsMale] = useState([
    {
      gender: "true",
    },
  ]);

  const [error, setError] = useState([
    {
      firstname: "",
      lastname: "",
      birthday: "",
    },
  ]);

  const [inputListPassenger, setInputListPassenger] = useState([
    {
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
        description: `Round Trip Flight`,
        amount: {
          currency: "USD",
          value: 1,
        },
      },
    ],
  });
  const userId = parseInt(getUserId());
  const paymentMethod = "Combo 10%";

  const getFlights = (dId, rId) => {
    dispatch(getRoundFlight(dId, rId));
  };

  const bookFlt = (data) => {
    dispatch(bookFlight(data));
  };

  const getUserBooking = (id) => {
    dispatch(getUser(id));
  };

  const dateCalculate = () => {
    // console.log(Date.parse());;
    var co = queryParam.get("checkOutDate");
    var ci = queryParam.get("checkInDate");
    // console.log(getTimeDiff(dateConvert(ci),dateConvert(co),"d"));
    setDateCalculate(getTimeDiff(dateConvert(ci), dateConvert(co), "d"));
  };

  const getTimeDiff = (startTime, endTime, type) => {
    // let startTime = new Date(_startTime.replace(/-/g, '/'));
    // let endTime = new Date(_endTime.replace(/-/g, '/'));
    let diff = endTime.getTime() - startTime.getTime(); //Time difference in milliseconds
    let day = Math.floor(diff / (24 * 60 * 60 * 1000)); //day
    let hour = Math.floor(diff / (60 * 60 * 1000)) - day * 24; //Time
    let minute = Math.floor(diff / (60 * 1000)) - day * 24 * 60 - hour * 60; //Minute
    let second =
      Math.floor(diff / 1000) -
      day * 24 * 60 * 60 -
      hour * 60 * 60 -
      minute * 60; //second
    // console.log(day, hour, minute, second);
    switch (type) {
      case "h":
        return hour;
      case "m":
        return minute;
      case "d":
        return day;
      default:
        return minute;
    }
  };
  const calculatePrice = () => {
    let dateNumber = date;
    var totalHotelPrice = 0;
    props.rooms?.data?.map(
      (room) => (totalHotelPrice = totalHotelPrice + room.price)
    );
    return totalHotelPrice * dateNumber;
  };

  const dateConvert = (date) => {
    var st = date.replace("/", ".");
    var pattern = /(\d{2}).(\d{2}).(\d{4})/;
    var dt = new Date(st.replace(pattern, "$3-$2-$1"));
    return dt;
  };

  const createOrder = (data, actions) => {
    return actions.order.create(flightDataOrder).then((orderID) => {
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
      }

      if (!list[index]["lastname"]) {
        err[index]["lastname"] = "Lastname required.";
      } else {
        err[index]["lastname"] = "";
      }

      if (!list[index]["birthday"]) {
        err[index]["birthday"] = "Birthday required.";
      } else {
        err[index]["birthday"] = "";
      }
    }

    for (var index = 0; index < list.length; index++) {
      if (
        err[index]["firstname"] ||
        err[index]["lastname"] ||
        err[index]["birthday"]
      ) {
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
    }
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
      list[index]["gender"] = "true";
      checkgender[index]["gender"] = "true";
    }
    setIsMale(checkgender);
    setInputListPassenger(list);
  };

  const handleInfantChange = (e, index) => {
    // e.preventDefault();
    const checkinfant = [...hasInfant];
    checkinfant[index].infant = !checkinfant[index].infant;
    var totalInfant = 0;
    checkinfant?.map(item => {totalInfant = totalInfant + parseInt(item.infant ? flights.data?.infant_price : 0)});
    setHasInfant(checkinfant);    
    setTotalInfantPrice(totalInfant*2);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    var totalHotelPrice = calculatePrice() * 0.9;
    var newArr = [];
    props.rooms?.data.map((room, index) => newArr.push({ id: room.id }));
    if (validateForm(e)) {
      var dataFlight = {
        userId: userId,
        flightId: flights.data.id,
        dateBooking: dateOfDeparture,
        type: type,
        returnFlightId: flights.returnData.id,
        dateReturnBooking: dateOfReturn,
        returnType: type,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice + returnTotalPrice,
        passengers: [...inputListPassenger],
      };
      var dataHotel = {
        user: user.data,
        // hotel:props.hotel?.data,
        rooms: newArr,
        dateBooking: new Date(),
        checkInDate: new Date(dateConvert(queryParam.get("checkInDate"))),
        checkOutDate: new Date(dateConvert(queryParam.get("checkOutDate"))),
        numberOfGuests:
          parseInt(queryParam.get("numberAdult")) +
          parseInt(queryParam.get("numberChildren")),
        totalPrice: totalHotelPrice,
        paymentMethod: "PaymentCombo",
      };
      setFlightBooking(dataFlight);
      setDataConfirm(dataHotel);
      setModalIsOpen(true);
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  useEffect(() => {
    let mount = false;
    // if (!sessionStorage.getItem("isBooking")) {
    //   history.push("/");
    // }
    window.scrollTo(0, 0);
    importAll();
    getFlights(queryParam.get("fid"), queryParam.get("rfid"));
    if (queryParam.get("seatClass") === "ECONOMY") {
      setType(0);
    } else {
      setType(1);
    }
    setTotalPassenger(
      parseInt(queryParam.get("adult")) + parseInt(queryParam.get("child"))
    );
    getUserBooking(parseInt(getUserId()));
    setDateOfDeparture(
      queryParam.get("departureDate").split("/").reverse().join("-")
    );
    setDateOfReturn(
      queryParam.get("returnDate").split("/").reverse().join("-")
    );
    var newListPax = [];
    var newListError = [];
    var newListHasInfant = [];
    var newListIsMale = [];
    [
      ...Array(
        parseInt(queryParam.get("adult")) + parseInt(queryParam.get("child"))
      ),
    ].map((item, index) => {
      newListPax.push({
        firstname: "",
        lastname: "",
        gender: "true",
        birthday: "",
        hasInfant: "false",
        baggageExtra: 0,
        seatNumber: "",
        price: 0,
      });

      newListError.push({
        firstname: "",
        lastname: "",
        birthday: "",
      });

      newListHasInfant.push({
        infant: false,
      });

      newListIsMale.push({
        gender: "true",
      });
    });
    setInputListPassenger(newListPax);
    setError(newListError);
    setHasInfant(newListHasInfant);
    setIsMale(newListIsMale);

    var listIds = queryParam
      .get("roomIds")
      .split(".")
      .map((x) => +x);

    if (user) {
      props.getHotel(queryParam.get("id"));
      props.getRooms(listIds);
      dateCalculate();
    }
    return () => {
      mount = true;
    };
  }, []);

  useEffect(() => {
    if (completeBooking.data && props.bookRoomData.data && checkout) {
      sessionStorage.removeItem("isComboBooking");
      history.push({ pathname: "/combo-booking-complete" });
    }
    if (flights.data) {
      reCalculateTotalPrice(inputListPassenger, hasInfant);
    }
    if (flights.returnData) {
      reCalculateReturnTotalPrice(inputListPassenger, hasInfant);
    }

    setTotalFlightPrice((totalPrice + returnTotalPrice) * 0.9);
    if (checkout && !isComplete) {
      bookFlt(flightBooking);
      props.bookRoom(dataConfirm);
      setIsComplete(true);
    }

  });

  const handleAddClick = (amount) => {
    // e.preventDefault();
    if (amount > 0) {
      var tempPaxList = [
        ...inputListPassenger,
        {
          firstname: "",
          lastname: "",
          gender: "true",
          birthday: "",
          hasInfant: "false",
          baggageExtra: 0,
          seatNumber: "",
          price: 0,
        },
      ];
      setInputListPassenger(tempPaxList);

      setError([
        ...error,
        {
          firstname: "",
          lastname: "",
          birthday: "",
        },
      ]);
      setIsMale([
        ...isMale,
        {
          gender: "true",
        },
      ]);
      var tempListHasInfant = [
        ...hasInfant,
        {
          infant: false,
        },
      ];
      setHasInfant(tempListHasInfant);
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
          var flightPrice = flights.data.child_price;
        } else {
          var flightPrice = flights.data.economyPrice;
        }
      } else {
        var flightPrice = flights.data.businessPrice;
      }
      var infantPrice = listInfant[index].infant
        ? flights.data.infant_price
        : 0;
      newTotalPrice = newTotalPrice + flightPrice + infantPrice;
    });
    setTotalPassenger(listPax.length);
    setTotalPrice(newTotalPrice);
  };
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
      var infantPrice = listInfant[index].infant
        ? flights.returnData.infant_price
        : 0;
      newTotalPrice = newTotalPrice + flightPrice + infantPrice;
    });
    setTotalPassenger(listPax.length);
    setReturnTotalPrice(newTotalPrice);
  };

  return (
    <>
      <Header></Header>
      <div className="main-cont">
        <div className="body-wrapper">
          <div className="wrapper-padding">
            <div className="page-head">
              <div className="page-title">
                COMBO - <span>BOOKING</span>
              </div>
              <div className="breadcrumbs">
                <Link to="/">Home</Link> /{" "}
                <a onClick={(e) => history.goBack()} to="">
                  Combo Search Result
                </a>{" "}
                / <span>Combo Booking</span>
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
                                <input
                                  type="text"
                                  readOnly
                                  defaultValue={user?.data?.email}
                                />
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
                                      :{" "}
                                      <span className="booking-error-input">
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
                                      :{" "}
                                      <span className="booking-error-input">
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
                                        onChange={(e) =>
                                          handleInfantChange(e, i)
                                        }
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
                                    <div
                                      name="gender"
                                      className={`form-control sex-type ${isMale[i].gender === "true"
                                        ? "chosen"
                                        : ""
                                        }`}
                                      onClick={(e) => handleGenderClick(e, i)}
                                    >
                                      M
                                    </div>
                                    <div
                                      name="gender"
                                      className={`form-control sex-type ${isMale[i].gender === "false"
                                        ? "chosen"
                                        : ""
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
                                      :{" "}
                                      <span className="booking-error-input">
                                        {error[i].birthday}
                                      </span>
                                    </label>

                                    <div className="input-a">
                                      <input
                                        name="birthday"
                                        type="text"
                                        className="form-control date-booking-inpt"
                                        placeholder="YYYY-MM-DD"
                                        onChange={(e) =>
                                          handleBirthdayChange(e, i)
                                        }
                                      />
                                      <span className="date-icon"></span>
                                    </div>
                                  </div>
                                  <div className="clear"></div>
                                </div>

                                <div className="clear"></div>

                                {inputListPassenger.length - 1 === i && (
                                  <div hidden={true}>
                                    <a
                                      id="removePassengerbutton"
                                      onClick={() => {
                                        handleAddClick(-1);
                                      }}
                                      hidden={inputListPassenger.length === 1}
                                      className="add-passanger"
                                      s
                                    >
                                      <FontAwesomeIcon
                                        color="red"
                                        icon={faMinusCircle}
                                      ></FontAwesomeIcon>
                                      Remove Passenger
                                    </a>
                                    <a
                                      onClick={() => handleAddClick(1)}
                                      className="add-passanger"
                                    >
                                      <FontAwesomeIcon
                                        color="green"
                                        icon={faPlusCircle}
                                      ></FontAwesomeIcon>
                                      Add Passenger
                                    </a>
                                  </div>
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

                          <div className="booking-complete">
                            <h2>Review and book your trip</h2>
                            <p>
                              Please make sure to check flight's detail right
                              and insert correctly passenger information!{" "}
                            </p>
                            <button
                              type="submit"
                              className="booking-complete-btn"
                            >
                              COMPLETE BOOKING
                            </button>
                            {checkout && (
                              <div className="loading" delay-hide="10"></div>
                            )}
                          </div>
                          <ReactModal
                            isOpen={modalIsOpen}
                            // onAfterOpen={afterOpenModal}
                            // onRequestClose={closeModal}
                            ariaHideApp={false}
                            preventScroll={true}
                            style={customStyles}
                            contentLabel="Payments"
                          >
                            <div style={{ float: "right" }}>
                              <FontAwesomeIcon
                                onClick={() => setModalIsOpen(false)}
                                icon={faTimesCircle}
                              ></FontAwesomeIcon>
                            </div>
                            {flightBooking && (
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
                                        You will be redirected to website to
                                        securely complete your payment using
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
                                                  description: "Combo Flight Hotel",
                                                  amount: {
                                                    currency: "USD",
                                                    value:
                                                      totalFlightPrice + calculatePrice() * 0.9,
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
                            )}
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
                      <a >
                        <img
                          alt=""
                          src={flights?.data?.airline?.image}
                          style={{ width: "95px", height: "60px" }}
                        />
                      </a>
                    </div>
                    <div className="checkout-headr">
                      <div className="checkout-headrb">
                        <div className="checkout-headrp">
                          <div className="chk-left">
                            <div className="chk-lbl">
                              <a >
                                {flights?.data?.departureCity} -{" "}
                                {flights?.data?.arrivalCity} -{" "}
                                {flights?.data?.flightCode}
                              </a>
                            </div>
                            <div className="chk-lbl-a">DEPARTURE FLIGHT</div>
                            <div className="chk-lines">
                              <div className="chk-line chk-fligth-info">
                                <div
                                  className="chk-departure"
                                  style={{ float: "none", display: "inline" }}
                                >
                                  <span
                                    style={{ float: "none", display: "inline" }}
                                  >
                                    Schedule Time
                                  </span>
                                  <b
                                    style={{ float: "none", display: "inline" }}
                                  >
                                    {flights?.data?.departureTime} -{" "}
                                    {flights?.data?.arrivalTime}
                                    <br />
                                  </b>
                                </div>

                                <div
                                  className="chk-arrival"
                                  style={{ float: "left", display: "inline" }}
                                >
                                  <span
                                    style={{ float: "none", display: "inline" }}
                                  >
                                    Date of Departure{" "}
                                  </span>
                                  <b
                                    style={{ float: "none", display: "inline" }}
                                  >
                                    {dateOfDeparture}
                                  </b>
                                  <div className="clear"></div>
                                  <span style={{ float: "none", display: "inline" }}>
                                    Flight Price{" "}
                                  </span>
                                  <b style={{ float: "none", display: "inline" }}>
                                    {queryParam.get("seatClass") === "ECONOMY" ? flights.data?.economyPrice : flights.data?.businessPrice}$
                                  </b>
                                </div>
                                <div className="clear"></div>
                              </div>
                            </div>
                          </div>
                          <div className="chk-right">
                            <a ></a>
                          </div>
                          <div className="clear"></div>
                        </div>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                  <div className="checkout-head">
                    <div className="checkout-headl">
                      <a >
                        <img
                          alt=""
                          src={flights?.returnData?.airline?.image}
                          style={{ width: "95px", height: "60px" }}
                        />
                      </a>
                    </div>
                    <div className="checkout-headr">
                      <div className="checkout-headrb">
                        <div className="checkout-headrp">
                          <div className="chk-left">
                            <div className="chk-lbl">
                              <a >
                                {flights?.returnData?.departureCity} -{" "}
                                {flights?.returnData?.arrivalCity} -{"  "}
                                {flights?.returnData?.flightCode}
                              </a>
                            </div>
                            <div className="chk-lbl-a">RETURN FLIGHT</div>
                            <div className="chk-lines">
                              <div className="chk-line chk-fligth-info">
                                <div
                                  className="chk-departure"
                                  style={{ float: "none", display: "inline" }}
                                >
                                  <span
                                    style={{ float: "none", display: "inline" }}
                                  >
                                    Schedule Time
                                  </span>
                                  <b
                                    style={{ float: "none", display: "inline" }}
                                  >
                                    {flights?.returnData?.departureTime} -{" "}
                                    {flights?.returnData?.arrivalTime}
                                    <br />
                                  </b>
                                </div>

                                <div
                                  className="chk-arrival"
                                  style={{ float: "left", display: "inline" }}
                                >
                                  <span style={{ float: "none", display: "inline" }}>
                                    Date of Return{" "}
                                  </span>
                                  <b style={{ float: "none", display: "inline" }}>
                                    {dateOfReturn}
                                  </b>
                                  <div className="clear"></div>
                                  <span style={{ float: "none", display: "inline" }}>
                                    Flight Price{" "}
                                  </span>
                                  <b style={{ float: "none", display: "inline" }}>
                                    {queryParam.get("seatClass") === "ECONOMY" ? flights.returnData?.economyPrice : flights.returnData?.businessPrice}$
                                  </b>
                                </div>
                                <div className="clear"></div>
                              </div>
                            </div>
                          </div>
                          <div className="chk-right">
                            <a ></a>
                          </div>
                          <div className="clear"></div>
                        </div>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>

                  <div className="chk-details">
                    <h2>Details Flights</h2>
                    <div className="chk-detais-row">
                      <div className="chk-line">
                        <span className="chk-l">FLIGHT CLASS</span>
                        <span className="chk-r">
                          {queryParam.get("seatClass")}
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">Total Passenger</span>
                        <span className="chk-r">{totalPassenger}</span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">TOTAL DEPARTURE FLIGHT PRICE</span>
                        <span className="chk-r">
                          {queryParam.get("seatClass") === "ECONOMY" ? flights.data?.economyPrice : flights.data?.businessPrice}$
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">TOTAL RETURN FLIGHT PRICE</span>
                        <span className="chk-r">
                          {queryParam.get("seatClass") === "ECONOMY" ? flights.returnData?.economyPrice : flights.returnData?.businessPrice}$
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">TOTAL INFANT FLIGHT PRICE</span>
                        <span className="chk-r">
                          {totalInfantPrice}$
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">Combo Discount</span>
                        <span className="chk-r" style={{ color: "green" }}>
                          10%
                        </span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">Taxes and fees</span>
                        <span className="chk-r">
                          {(parseInt(totalFlightPrice) * 0.1).toPrecision(3)}$
                        </span>
                        <div className="clear"></div>
                      </div>
                    </div>
                    <div className="chk-total">
                      <div className="chk-total-l">Total Price</div>
                      <div className="chk-total-r add-more-price-flight">
                        {totalFlightPrice.toFixed(1)}${" "}
                        <del style={{ color: "green" }}>
                          {(totalPrice + returnTotalPrice).toFixed(1)}$
                        </del>
                      </div>
                      <div className="clear"></div>
                    </div>
                  </div>
                </div>


                <div className="checkout-coll">
                  <div className="checkout-head">
                    <div className="checkout-headl">
                      <a >
                        <img alt="" src={props.hotel?.data?.images?.length > 0 ? props.hotel?.data?.images[0]?.imagePath : ""} style={{ width: "95px", height: "60px" }} />
                      </a>
                    </div>
                    <div className="checkout-headr">
                      <div className="checkout-headrb">
                        <div className="checkout-headrp">
                          <div className="chk-left">
                            <div className="chk-lbl">
                              <a >{props.hotel?.data?.hotelName}</a>
                            </div>
                            <div className="chk-lbl-a">
                              {props.hotel?.data?.location?.street},
                              {props.hotel?.data?.location?.province?.name},
                              {props.hotel?.data?.location?.district?.name}
                            </div>
                            <nav className="chk-stars">
                              <ul>
                                {[...Array(5)].map(
                                  (index) =>
                                    // {
                                    index + 1 >
                                      Math.ceil(
                                        props.hotel?.data?.hotelRating?.rating
                                      ) ? (
                                      <li key={index}>
                                        <a>
                                          <img alt="" src="img/star-a.png" />
                                        </a>
                                      </li>
                                    ) : (
                                      <li key={index}>
                                        <a>
                                          <img alt="" src="img/star-b.png" />
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
                            <a >

                            </a>
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
                      <span className="chk-dates">
                        {queryParam.get("checkInDate")} -{" "}
                        {queryParam.get("checkOutDate")}
                      </span>
                    </div>
                    {props.rooms?.data?.map((room) => (
                      <div className="chk-line">
                        1 {room.roomType} ROOM FOR{" "}
                        <span className="chk-persons">
                          {" "}
                          {room.maxAdult + room.maxChildren} PERSONS
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="chk-details">
                    <h2>Details</h2>
                    <div className="chk-detais-row">
                      {props.rooms?.data?.map((room) => (
                        <>
                          <h3>Detail Room</h3>
                          <div className="chk-line">
                            <span className="chk-l">Room type</span>
                            {/* <span className="chk-r" >{`${allRoomTypeString()}`}</span> */}
                            <span className="chk-r">{room.roomType}</span>
                            <div className="clear"></div>
                          </div>
                          <div className="chk-line">
                            <span className="chk-l">price</span>
                            <span className="chk-r">{room.price}$</span>
                            <div className="clear"></div>
                          </div>
                        </>
                      ))}
                      <h3>Total Price </h3>
                      <div className="chk-line">
                        <span className="chk-l">{date} nights stay</span>
                        <span className="chk-r">{`${calculatePrice()}`}$</span>
                        <div className="clear"></div>
                      </div>
                      <div className="chk-line">
                        <span className="chk-l">Combo discount</span>
                        <span className="chk-r">10%</span>
                        <div className="clear"></div>
                      </div>
                    </div>
                    <div className="chk-total">
                      <div className="chk-total-l">Final Price</div>
                      <div className="chk-total-r">
                        {`${calculatePrice() * 0.9}`}$
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

const mapStateToProps = (state, ownProps) => {
  return {
    hotel: state.hotels,
    rooms: state.room,
    bookRoomData: state.bookRoom,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getHotel: (id) => dispatch(fetchHotelById(id)),
    getRooms: (data) => dispatch(getRooms(data)),
    bookRoom: (data) => dispatch(bookRoom(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboBookingPage);
