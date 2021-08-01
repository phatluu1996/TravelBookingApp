import React, { useEffect, useState } from "react";
import { importAll } from "../../../utils/JqueryImport";
import { useSelector, useDispatch } from "react-redux";
import {
  retrieveFlight,
  updateFlight,
} from "../../../actions/actionFlightByAirline";
import { useHistory } from 'react-router-dom';


const province = {
  properties: [
    {
      value: "SGN",
      label: "TP.HCM",
    },
    {
      value: "HAN",
      label: "Hà Nội",
    },
    {
      value: "DAD",
      label: "Đà Nẵng",
    },
    {
      value: "CXR",
      label: "Nha Trang",
    },
    {
      value: "DLI",
      label: "Đà Lạt",
    },
    {
      value: "PQC",
      label: "Phú Quốc",
    },
    {
      value: "VCA",
      label: "Cần Thơ",
    },
    {
      value: "VCS",
      label: "Côn Đảo",
    },
    {
      value: "VKG",
      label: "Rạch Giá",
    },
    {
      value: "CAH",
      label: "Cà Mau",
    },
    {
      value: "BMV",
      label: "Buôn Ma Thuộc",
    },
    {
      value: "UIH",
      label: "Quy Nhơn",
    },
    {
      value: "THD",
      label: "Thanh Hóa",
    },
    {
      value: "VII",
      label: "Vinh",
    },
    {
      value: "HUI",
      label: "Huế",
    },
    {
      value: "VDH",
      label: "Đồng Hới",
    },
    {
      value: "TBB",
      label: "Tuy Hòa",
    },
    {
      value: "VCL",
      label: "Chu Lai",
    },
    {
      value: "PXU",
      label: "Pleiku",
    },
    {
      value: "HPH",
      label: "Hải Phòng",
    },
    {
      value: "DIN",
      label: "Điện Biên",
    },
    {
      value: "VDO",
      label: "Vân Đồn",
    },
  ],
};
const status = {
  properties: [
    {
      value: "Available",
      label: "AVAILABLE",
    },
    {
      value: "codeshare",
      label: "CODESHARE",
    },
  ],
};

const EditScheduleFlight = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const flights = useSelector((state) => state.flights);

  const getFlightToEdit = (id) => {
    dispatch(retrieveFlight(id));
  };

  const editFlight = (id, data) => {
    dispatch(updateFlight(id, data));
  };
  const [error, setError] = useState({
    departureCity: "",
    arrivalCity: "",
    flightCode: "",
    status: "",
    description: "",
    hasEntertainment: "",
    departureTime: "",
    arrivalTime: "",
    aircraftType: "",
    businessCapacity: "",
    economyCabinBaggage: "",
    businessCabinBaggage: "",
    economyBaggage: "",
    businessBaggage: "",
    economyCapacity: "",
    infant_price: "",
    child_price: "",
    economyPrice: "",
    businessPrice: "",
    airline: "",
  });
  const validateForm = (e) => {
    var form = e.target;
    const err = { ...error };

    if (!form.flightCode.value) {
      err.flightCode = "Flight Code is required.";
    } else {
      err.flightCode = "";
    }

    if (!form.status.value) {
      err.status = "Status is required.";
    } else {
      err.status = "";
    }

    if (!form.description.value) {
      err.description = "Description is required.";
    } else {
      err.description = "";
    }

    if (!form.departureTime.value) {
      err.departureTime = "Departure Time is required.";
    } else {
      err.departureTime = "";
    }

    if (!form.arrivalTime.value) {
      err.arrivalTime = "Arrival Time is required.";
    } else {
      err.arrivalTime = "";
    }

    if (!form.aircraftType.value) {
      err.aircraftType = "Aircraft Type is required.";
    } else {
      err.aircraftType = "";
    }

    if (!form.businessCapacity.value) {
      err.businessCapacity = "Business Capacity is required.";
    } else {
      err.businessCapacity = "";
    }

    if (!form.economyCabinBaggage.value) {
      err.economyCabinBaggage = "Economy CabinBaggage is required.";
    } else {
      err.economyCabinBaggage = "";
    }

    if (!form.businessCabinBaggage.value) {
      err.businessCabinBaggage = "Business CabinBaggage is required.";
    } else {
      err.businessCabinBaggage = "";
    }

    if (!form.economyBaggage.value) {
      err.economyBaggage = "Economy Baggage is required.";
    } else {
      err.economyBaggage = "";
    }

    if (!form.businessBaggage.value) {
      err.businessBaggage = "Business Baggage is required.";
    } else {
      err.businessBaggage = "";
    }

    if (!form.economyCapacity.value) {
      err.economyCapacity = "Economy Capacity is required.";
    } else {
      err.economyCapacity = "";
    }

    if (!form.infant_price.value) {
      err.infant_price = "Infant Price is required.";
    } else {
      err.infant_price = "";
    }

    if (!form.child_price.value) {
      err.child_price = "Child Price is required.";
    } else {
      err.child_price = "";
    }

    if (!form.economyPrice.value) {
      err.economyPrice = "Economy Price is required.";
    } else {
      err.economyPrice = "";
    }

    if (!form.businessPrice.value) {
      err.businessPrice = "Business Price is required.";
    } else {
      err.businessPrice = "";
    }

    if (form.departureCity.value === form.arrivalCity.value) {
      err.arrivalCity = "City cannot be same.";
    } else {
      err.arrivalCity = "";
    }

    if (
      err.flightCode ||
      err.status ||
      err.description ||
      err.departureTime ||
      err.arrivalCity ||
      err.arrivalTime ||
      err.aircraftType ||
      err.businessCapacity ||
      err.economyCabinBaggage ||
      err.businessCabinBaggage ||
      err.economyBaggage ||
      err.businessBaggage ||
      err.economyCapacity ||
      err.infant_price ||
      err.child_price ||
      err.economyPrice ||
      err.businessPrice
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

  const handleSubmit = (e) => {
    e.preventDefault();
    var form = e.target;
    if (validateForm(e)) {
      var data = flights;
      flights.departureCity = form.departureCity.value;
      flights.arrivalCity = form.arrivalCity.value;
      flights.flightCode = form.flightCode.value;
      flights.status = form.status.value;
      flights.description = form.description.value;
      flights.hasEntertainment = form.hasEntertainment.value;
      flights.departureTime = form.departureTime.value;
      flights.arrivalTime = form.arrivalTime.value;
      flights.aircraftType = form.aircraftType.value;
      flights.businessCapacity = form.businessCapacity.value;
      flights.economyCabinBaggage = form.economyCabinBaggage.value;
      flights.businessCabinBaggage = form.businessCabinBaggage.value;
      flights.economyBaggage = form.economyBaggage.value;
      flights.businessBaggage = form.businessBaggage.value;
      flights.economyCapacity = form.economyCapacity.value;
      flights.infant_price = form.infant_price.value;
      flights.child_price = form.child_price.value;
      flights.economyPrice = form.economyPrice.value;
      flights.businessPrice = form.businessPrice.value;
      // flights.airline: { id: parseInt(form.airline.value)
      editFlight(parseInt(props.fltId), data);
      history.push(`\list-flight`);
    }
  };

  useEffect(() => {
    var mount = false;
    window.scrollTo(0, 0);
    importAll(); 
    getFlightToEdit(props.fltId);
    return () => {
      mount = true;
    };
  }, []);

  return (
    <>
      <div className="sp-page">
        <div className="sp-page-a">
          <div className="sp-page-l">
            <div className="sp-page-lb">
              <div className="sp-page-p">
                <div className="booking-left">
                  <h2>Edit Flight Form</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="booking-form">
                      <div className="booking-form-i">
                        <label>Departure City</label>

                        <div className="form-group select-wrapper srch-tab-line">
                          <select
                            className="custom-select form-control"
                            name="departureCity"
                            id="departureCity"
                            defaultValue={flights.departureCity}
                          >
                            {province.properties.map((province) => (
                              <option
                                key={province.value}
                                value={province.value}
                              >
                                {province.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <div className="validate-error" style={{}}>
                          {error.arrivalCity}
                        </div>
                        <label>Arrival City</label>

                        <div className="form-group select-wrapper srch-tab-line">
                          <select
                            className="custom-select form-control"
                            name="arrivalCity"
                            id="arrivalCity"
                            defaultValue={flights.arrivalCity}
                          >
                            {province.properties.map((province) => (
                              <option
                                key={province.value}
                                value={province.value}
                              >
                                {province.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <label>Flight Code</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.flightCode}
                        </div>

                        <div className="input form-group">
                          <input
                            defaultValue={flights.flightCode}
                            className="form-control"
                            name="flightCode"
                            type="text"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <div className="booking-form-i form-group srch-tab-line">
                          <label>Status</label>
                          <select
                            className="form-control custom-select"
                            name="status"
                            id="status"
                            defaultValue={flights.status}
                          >
                            {status.properties.map((status) => (
                              <option key={status.value} value={status.value}>
                                {status.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="clear"></div>
                      </div>

                      <div className="booking-form-i">
                        <label>Description</label>

                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.description}
                        </div>

                        <div className="input form-group">
                          <input
                            defaultValue={flights.description}
                            onChange={handleChange}
                            className="form-control"
                            name="description"
                            type="text"
                          />
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <div className="checkbox form-group">
                          <label>
                            <input
                              className="form-control"
                              type="checkbox"
                              name="hasEntertainment"
                              defaultValue={flights.hasEntertainment ? "checked" : ""}
                            />
                            Inflight Entertainment
                          </label>
                        </div>
                      </div>
                      <div className="clear"></div>

                      <div className="bookin-three-coll">
                        <div className="booking-form-i">
                          <label>Departure time</label>
                          <div
                            className="validate-error"
                            style={{ float: "none" }}
                          >
                            {error.departureTime}
                          </div>

                          <div className="input form-group">
                            <input
                              onChange={handleChange}
                              className="form-control"
                              type="text"
                              name="departureTime"
                              defaultValue={flights.departureTime}
                            />
                          </div>
                        </div>
                        <div className="booking-form-i">
                          <label>Arrival time</label>
                          <div
                            className="validate-error"
                            style={{ float: "none" }}
                          >
                            {error.arrivalTime}
                          </div>

                          <div className="input">
                            <input
                              defaultValue={flights.arrivalTime}
                              onChange={handleChange}
                              type="text"
                              className="form-control"
                              name="arrivalTime"
                            />
                          </div>
                        </div>
                        <div className="booking-form-i">
                          <label>Aircraft</label>
                          <div
                            className="validate-error"
                            style={{ float: "none" }}
                          >
                            {error.aircraftType}
                          </div>

                          <div className="input">
                            <input
                              defaultValue={flights.aircraftType}
                              onChange={handleChange}
                              className="form-control"
                              type="text"
                              name="aircraftType"
                            />
                          </div>

                          <div className="clear"></div>
                        </div>
                        <div className="clear"></div>
                      </div>
                      <div className="booking-form-i">
                        <label>Business Capacity</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.businessCapacity}
                        </div>

                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="number"
                            defaultValue={flights.businessCapacity}
                            min="0"
                            max="40"
                            name="businessCapacity"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <label>Economy Capacity</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.economyCapacity}
                        </div>

                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="number"
                            defaultValue={flights.economyCapacity}
                            min="1"
                            max="500"
                            name="economyCapacity"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <h2>Baggage Information</h2>

                    <div className="booking-form">
                      <div className="booking-form-i">
                        <label>Business Baggage Allowance</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.businessBaggage}
                        </div>

                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="number"
                            defaultValue={flights.businessBaggage}
                            min="0"
                            max="100"
                            name="businessBaggage"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <label>Economy Baggage Allowance</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.economyBaggage}
                        </div>

                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="number"
                            defaultValue={flights.economyBaggage}
                            min="0"
                            max="100"
                            name="economyBaggage"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <label>Business Cabin-Baggage Allowance</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.businessCabinBaggage}
                        </div>

                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="number"
                            defaultValue={flights.businessCabinBaggage}
                            min="0"
                            max="40"
                            name="businessCabinBaggage"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <label>Economy Cabin-Baggage Allowance</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.economyCabinBaggage}
                        </div>

                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="number"
                            defaultValue={flights.economyCabinBaggage}
                            min="0"
                            max="40"
                            name="economyCabinBaggage"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    <h2>Ticket Price</h2>

                    <div className="booking-form">
                      <div className="booking-form-i">
                        <label>Business Ticket Price</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.businessPrice}
                        </div>
                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="number"
                            defaultValue={flights.businessPrice}
                            min="0"
                            max="10000"
                            step="0.1"
                            name="businessPrice"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <label>Economy Ticket Price</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.economyPrice}
                        </div>

                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="number"
                            defaultValue={flights.economyPrice}
                            min="0"
                            max="1000"
                            step="0.1"
                            name="economyPrice"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <label>Child Price</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.economyPrice}
                        </div>

                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            type="number"
                            defaultValue={flights.economyPrice}
                            min="0"
                            max="1000"
                            step="0.1"
                            name="child_price"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>
                      <div className="booking-form-i">
                        <label>Infant price</label>
                        <div
                          className="validate-error"
                          style={{ float: "none" }}
                        >
                          {error.infant_price}
                        </div>

                        <div className="input">
                          <input
                            onChange={handleChange}
                            className="form-control"
                            defaultValue={flights.infant_price}
                            type="number"
                            min="0"
                            max="1000"
                            step="0.1"
                            name="infant_price"
                            style={{
                              border: "0px",
                              width: "100%",
                              fontSize: "14px",
                              fontFamily: "Raleway",
                            }}
                          />
                        </div>
                      </div>

                      <div className="clear"></div>
                    </div>
                    <div className="booking-devider no-margin"></div>

                    <div className="booking-complete">
                      
                      <h2>Review and create new flight</h2>
                      <p>
                        Voluptatem quia voluptas sit aspernatur aut odit aut
                        fugit, sed quia consequuntur magni dolores eos qui
                        voluptatem sequi nesciunt.{" "}
                      </p>
                      <button className="booking-complete-btn" type="submit">
                        Confirm Data Edited!
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
                  <img
                    alt=""
                    src="img/airplane.jpg"
                    style={{
                      background: "center center no-repeat",
                      width: "97px",
                      height: "60px",
                    }}
                  />
                </a>
              </div>
              <div className="checkout-headr">
                <div className="checkout-headrb">
                  <div className="checkout-headrp">
                    <div className="chk-left">
                      <div className="chk-lbl">
                        <a href="#">Total Bookings</a>
                      </div>
                      <div className="chk-lbl-a">Need to advertise?</div>
                      <div className="chk-logo">
                        <img
                          alt=""
                          src="img/call-us.png"
                          style={{
                            background: "center center no-repeat",
                            width: "150px",
                            height: "70px",
                          }}
                        />
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
                  <span>Last month</span>
                  <b>
                    4336
                    <br />
                    2021.07.31
                  </b>
                </div>
                <div className="chk-fligth-devider"></div>
                <div className="chk-fligth-time">
                  <img alt="" src="img/icon-nights.png" />
                </div>
                <div className="chk-fligth-devider"></div>
                <div className="chk-arrival">
                  <span>NOW</span>
                  <b>
                    2786
                    <br />
                    2021.08.15
                  </b>
                </div>
                <div className="clear"></div>
              </div>
            </div>

            <div className="chk-details">
              <h2>Details</h2>
              <div className="chk-detais-row">
                <div className="chk-line">
                  <span className="chk-l">Total Bookings</span>
                  <span className="chk-r">130</span>
                  <div className="clear"></div>
                </div>
                <div className="chk-line">
                  <span className="chk-l">Total Passengers</span>
                  <span className="chk-r">242</span>
                  <div className="clear"></div>
                </div>
                <div className="chk-line">
                  <span className="chk-l">Sales</span>
                  <span className="chk-r">2786$</span>
                  <div className="clear"></div>
                </div>
                <div className="chk-line">
                  <span className="chk-l">Fees</span>
                  <span className="chk-r">393$</span>
                  <div className="clear"></div>
                </div>
              </div>
              <div className="chk-total">
                <div className="chk-total-l">Total Interest</div>
                <div className="chk-total-r">2393$</div>
                <div className="clear"></div>
              </div>
            </div>
          </div>

          <div className="h-help">
            <div className="h-help-lbl">Need Us Help?</div>
            <div className="h-help-lbl-a">We would be happy to help you!</div>
            <div className="h-help-phone">0-888-555-552 23</div>
            <div className="h-help-email">helpteam@travelbooking.com</div>
          </div>
        </div>
        <div className="clear"></div>
      </div>
    </>
  );
};

export default EditScheduleFlight;
