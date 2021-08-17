import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { retrieveProvince } from "../../../actions/actionLocation";
import AdminFooter from "../Layout/AdminFooter";
import AdminNavbar from "../Layout/AdminNavbar";
import AdminSidebar from "../Layout/AdminSidebar";
import { useQuery } from "../../../utils/QueryParam";
import { getAirline } from "../../../actions/actionAirline";
import { Link } from "react-router-dom";
import {
  retrieveFlight,
  updateFlight,
} from "../../../actions/actionFlightByAirline";

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
const AirlineUpdateFlight = (props) => {
  let queryParam = useQuery();
  let history = useHistory();
  const [isChecked, setIsChecked] = useState({
    hasEntertainment: false,
  });
  const [error, setError] = useState({
    departureCity: "",
    arrivalCity: "",
    flightCode: "",
    status: "",
    description: "",
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
      err.flightCode = "Required.";
    } else {
      err.flightCode = "";
    }

    if (!form.status.value) {
      err.status = "Required.";
    } else {
      err.status = "";
    }

    if (!form.description.value) {
      err.description = "Required.";
    } else {
      err.description = "";
    }

    if (!form.departureTime.value) {
      err.departureTime = "Required.";
    } else {
      err.departureTime = "";
    }

    if (!form.arrivalTime.value) {
      err.arrivalTime = "Required.";
    } else {
      err.arrivalTime = "";
    }

    if (!form.aircraftType.value) {
      err.aircraftType = "Required.";
    } else {
      err.aircraftType = "";
    }

    if (!form.businessCapacity.value) {
      err.businessCapacity = "Required.";
    } else {
      err.businessCapacity = "";
    }

    if (!form.economyCabinBaggage.value) {
      err.economyCabinBaggage = "Required.";
    } else {
      err.economyCabinBaggage = "";
    }

    if (!form.businessCabinBaggage.value) {
      err.businessCabinBaggage = "Required.";
    } else {
      err.businessCabinBaggage = "";
    }

    if (!form.economyBaggage.value) {
      err.economyBaggage = "Required.";
    } else {
      err.economyBaggage = "";
    }

    if (!form.businessBaggage.value) {
      err.businessBaggage = "Required.";
    } else {
      err.businessBaggage = "";
    }

    if (!form.economyCapacity.value) {
      err.economyCapacity = "Required.";
    } else {
      err.economyCapacity = "";
    }

    if (!form.infant_price.value) {
      err.infant_price = "Required.";
    } else {
      err.infant_price = "";
    }

    if (!form.child_price.value) {
      err.child_price = "Required.";
    } else {
      err.child_price = "";
    }

    if (!form.economyPrice.value) {
      err.economyPrice = "Required.";
    } else {
      err.economyPrice = "";
    }

    if (!form.businessPrice.value) {
      err.businessPrice = "Required.";
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
  const handleCheckboxChange = (e) => {
    const checkbox = isChecked;
    checkbox.hasEntertainment = !checkbox.hasEntertainment;
    setIsChecked(checkbox);
  };
  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    var form = e.target;
    if (validateForm(e)) {
      var data = props.flight.single;
      props.flight.single.departureCity = form.departureCity.value;
      props.flight.single.arrivalCity = form.arrivalCity.value;
      props.flight.single.flightCode = form.flightCode.value;
      props.flight.single.status = form.status.value;
      props.flight.single.description = form.description.value;
      props.flight.single.hasEntertainment = isChecked.hasEntertainment;
      props.flight.single.departureTime = form.departureTime.value;
      props.flight.single.arrivalTime = form.arrivalTime.value;
      props.flight.single.aircraftType = form.aircraftType.value;
      props.flight.single.businessCapacity = form.businessCapacity.value;
      props.flight.single.economyCabinBaggage = form.economyCabinBaggage.value;
      props.flight.single.businessCabinBaggage = form.businessCabinBaggage.value;
      props.flight.single.economyBaggage = form.economyBaggage.value;
      props.flight.single.businessBaggage = form.businessBaggage.value;
      props.flight.single.economyCapacity = form.economyCapacity.value;
      props.flight.single.infant_price = form.infant_price.value;
      props.flight.single.child_price = form.child_price.value;
      props.flight.single.economyPrice = form.economyPrice.value;
      props.flight.single.businessPrice = form.businessPrice.value;
      // props.flight.single.airline= { id: parseInt(form.airline.value) };
      props.editFlight(queryParam.get("fid"), data);
      history.push(`/airline-flight-data?id=${queryParam.get("id")}`);
    }
  };

  useEffect(() => {
    let mount = false;

    props.getAirline(queryParam.get("id"));
    props.getProvince();
    props.getFlight(queryParam.get("fid"));

    return () => {
      mount = true;
    };
  }, []);
  const getAddress = () => {
    let province = props.airline.single?.location.province.name;
    let district =
      props.airline.single?.location.district.prefix +
      " " +
      props.airline.single?.location.district.name;
    let ward =
      props.airline.single?.location.ward.prefix +
      " " +
      props.airline.single?.location.ward.name;
    return (
      props.airline.single?.location.street +
      ", " +
      ward +
      ", " +
      district +
      ", " +
      province
    );
  };

  return (
    <div className="bootstrap-scope">
      <div className="container-scroller">
        <AdminSidebar />
        <div className="container-fluid page-body-wrapper">
          <AdminNavbar />
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row">
                <div className="col-sm-3"></div>
                <div className="col-sm-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-2 col-xl-2">
                          <div className="card-box text-center">
                            <img
                              src={props.airline.single?.image}
                              className="rounded-circle avatar-xl img-thumbnail"
                              alt="profile-image"
                              style={{ height: "6rem", width: "6rem" }}
                            />

                            <h4
                              className="mb-0 mt-2"
                              style={{ color: "#fc9003" }}
                            >
                              {props.airline.single?.airlineName}
                            </h4>
                            <div className="text-left mt-3">
                              <h6 className="font-13 text-uppercase mt-1 mb-1">
                                {" "}
                                General{" "}
                              </h6>
                              <p className="text-muted mb-1 font-13">
                                <strong style={{ color: "#fc9003" }}>
                                  Home Page :
                                </strong>{" "}
                                <a className="ml-2">
                                  {props.airline.single?.homepage}
                                </a>
                              </p>
                              <p className="text-muted mb-2 font-13">
                                <strong style={{ color: "#fc9003" }}>
                                  Phone :
                                </strong>{" "}
                                <span className="ml-2 ">
                                  {props.airline.single?.phone}
                                </span>
                              </p>
                              <p className="text-muted mb-2 font-13">
                                <strong style={{ color: "#fc9003" }}>
                                  Fax :
                                </strong>{" "}
                                <span className="ml-2 ">
                                  {props.airline.single?.fax}
                                </span>
                              </p>
                              <p className="text-muted mb-1 font-13">
                                <strong style={{ color: "#fc9003" }}>
                                  Address :
                                </strong>{" "}
                                <span className="ml-2">{getAddress()}</span>
                              </p>
                              <h6 className="font-13 text-uppercase mt-3 mb-1">
                                {" "}
                                Contact Information{" "}
                              </h6>
                              <p className="text-muted mb-2 font-13">
                                <strong style={{ color: "#fc9003" }}>
                                  Contact Name :
                                </strong>{" "}
                                <span className="ml-2">
                                  {props.airline.single?.contactName}
                                </span>
                              </p>
                              <p className="text-muted mb-2 font-13">
                                <strong style={{ color: "#fc9003" }}>
                                  Contact title :
                                </strong>
                                <span className="ml-2">
                                  {props.airline.single?.contactTitle}
                                </span>
                              </p>
                              <p className="text-muted mb-2 font-13">
                                <strong style={{ color: "#fc9003" }}>
                                  Mobile :
                                </strong>{" "}
                                <span className="ml-2 ">
                                  {props.airline.single?.mobile}
                                </span>
                              </p>
                              <p className="text-muted mb-2 font-13">
                                <strong style={{ color: "#fc9003" }}>
                                  Email :
                                </strong>
                                <span className="ml-2"></span>
                                {props.airline.single?.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-10 col-xl-10">
                          <div className="card-box">
                            <div className="tab-content bg-dark ">
                              <div className="tab-pane show active">
                                <div className="card-body">
                                  <h3 className="card-title mb-3">
                                    Edit Flight
                                  </h3>

                                  <form
                                    onSubmit={handleUpdateSubmit}
                                    className="form-sample"
                                    autoComplete="false"
                                    id="form"
                                  >
                                    <div className="row">
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label className="col-form-label">
                                            Departure City
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <select
                                            className="form-control"
                                            defaultValue={
                                              props.flight?.single?.departureCity
                                            }
                                            name="departureCity"
                                            id="departureCity"
                                          >
                                            {province.properties.map(
                                              (province) => (
                                                <option
                                                  key={province.value}
                                                  value={province.value}
                                                >
                                                  {province.label}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label className="col-form-label">
                                            Arrival City
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.arrivalCity}
                                          </div>
                                          <select
                                            defaultValue={
                                              props.flight?.single?.arrivalCity
                                            }
                                            className="form-control"
                                            name="arrivalCity"
                                            id="arrivalCity"
                                          >
                                            {province.properties.map(
                                              (province) => (
                                                <option
                                                  key={province.value}
                                                  value={province.value}
                                                >
                                                  {province.label}
                                                </option>
                                              )
                                            )}
                                          </select>
                                        </div>
                                      </div>
                                      <div className="col-md-4">
                                        <div className="form-group">
                                          <label className="col-form-label">
                                            Aircraft
                                            <span style={{ color: "red" }}>
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {" "}
                                            {error.aircraftType}
                                          </div>
                                          <input
                                            defaultValue={
                                              props.flight?.single?.aircraftType
                                            }
                                            onChange={handleChange}
                                            className="form-control"
                                            type="text"
                                            name="aircraftType"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Flight Code
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.flightCode}
                                          </div>
                                          <div className="input">
                                            <input
                                              defaultValue={
                                                props.flight?.single?.flightCode
                                              }
                                              className="form-control"
                                              name="flightCode"
                                              type="text"
                                              onChange={handleChange}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Status
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <select
                                            className="form-control"
                                            name="status"
                                            id="status"
                                            defaultValue={props.flight?.single?.status}
                                          >
                                            {status.properties.map((status) => (
                                              <option
                                                key={status.value}
                                                value={status.value}
                                              >
                                                {status.label}
                                              </option>
                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                      <div className="col-md-6">
                                        <div className="form-check pt-3">
                                          <input
                                            id="flexCheckDefault"
                                            className="form-check-input"
                                            type="checkbox"
                                            onChange={handleCheckboxChange}
                                            name="hasEntertainment"
                                            defaultValue={
                                              props.flight?.single?.hasEntertainment
                                                ? "checked"
                                                : ""
                                            }
                                          />
                                          <label
                                            className="form-check-label pl-0"
                                            for="flexCheckDefault"
                                          >
                                            Inflight Entertainment
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Departure time
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error" s>
                                            {"  "}
                                            {error.departureTime}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="text"
                                            defaultValue={
                                              props.flight?.single?.departureTime
                                            }
                                            name="departureTime"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Arrival time
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.arrivalTime}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="text"
                                            defaultValue={
                                              props.flight?.single?.arrivalTime
                                            }
                                            name="arrivalTime"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Business Capacity
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error" s>
                                            {"  "}
                                            {error.businessCapacity}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="number"
                                            defaultValue={
                                              props.flight?.single?.businessCapacity
                                            }
                                            min="0"
                                            name="businessCapacity"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Economy Capacity
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.economyCapacity}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="number"
                                            defaultValue={
                                              props.flight?.single?.economyCapacity
                                            }
                                            min="1"
                                            max="600"
                                            name="economyCapacity"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-12"></div>
                                      <div className="col-md-12">
                                        <div className="form-floating">
                                          <label for="floatingTextarea2">
                                            Descriptions
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.description}
                                          </div>
                                          <textarea
                                            defaultValue={
                                              props.flight?.single?.description
                                            }
                                            className="form-control"
                                            id="floatingTextarea2"
                                            style={{ height: "100px" }}
                                            name="description"
                                            onChange={handleChange}
                                          ></textarea>
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <h4 className="my-3">
                                          Baggage Information
                                        </h4>
                                      </div>

                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Business Baggage
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.businessBaggage}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="number"
                                            placeholder="0"
                                            min="0"
                                            max="100"
                                            defaultValue={
                                              props.flight?.single?.businessBaggage
                                            }
                                            name="businessBaggage"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Economy Baggage
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.economyBaggage}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="number"
                                            defaultValue={
                                              props.flight?.single?.economyBaggage
                                            }
                                            min="0"
                                            max="100"
                                            name="economyBaggage"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Business Cabin-Bag
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.businessCabinBaggage}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="number"
                                            defaultValue={
                                              props.flight?.single?.businessCabinBaggage
                                            }
                                            min="0"
                                            max="40"
                                            name="businessCabinBaggage"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Economy Cabin-Bag
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.economyCabinBaggage}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="number"
                                            defaultValue={
                                              props.flight?.single?.economyCabinBaggage
                                            }
                                            min="0"
                                            max="40"
                                            name="economyCabinBaggage"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-12">
                                        <h4 className="my-3">
                                          Ticket Information
                                        </h4>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Business Ticket
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.businessPrice}
                                          </div>
                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="number"
                                            defaultValue={
                                              props.flight?.single?.businessPrice
                                            }
                                            min="0"
                                            max="10000"
                                            step="0.1"
                                            name="businessPrice"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Economy Ticket
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.economyPrice}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="number"
                                            defaultValue={
                                              props.flight?.single?.economyPrice
                                            }
                                            min="0"
                                            max="1000"
                                            step="0.1"
                                            name="economyPrice"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Child Ticket
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.child_price}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            type="number"
                                            defaultValue={
                                              props.flight?.single?.economyPrice
                                            }
                                            min="0"
                                            max="1000"
                                            step="0.1"
                                            name="child_price"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="form-group">
                                          <label>
                                            Infant Ticket
                                            <span
                                              style={{
                                                color: "red",
                                                fontSize: "12px",
                                              }}
                                            >
                                              *
                                            </span>
                                          </label>
                                          <div className="validate-error">
                                            {error.infant_price}
                                          </div>

                                          <input
                                            onChange={handleChange}
                                            className="form-control"
                                            defaultValue={
                                              props.flight?.single?.infant_price
                                            }
                                            type="number"
                                            min="0"
                                            max="1000"
                                            step="0.1"
                                            name="infant_price"
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-3">
                                        <div className="col-md-3">
                                          <input
                                            readOnly
                                            className="form-control"
                                            type="number"
                                            name="airline"
                                            value={props.airline?.single?.id}
                                            hidden
                                          />
                                        </div>
                                        <button
                                          className="btn btn-outline-success mr-3"
                                          type="submit"
                                        >
                                          Update
                                        </button>
                                        <Link
                                          to={`/airline-flight-data?id=${queryParam.get(
                                            "id"
                                          )}`}
                                          className="btn btn-outline-primary"
                                        >
                                          Back
                                        </Link>
                                      </div>
                                      <div className="col-md-3"></div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <AdminFooter />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    flight: state.flights,
    airline: state.airline,
    province: state.province,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAirline: (id) => {
      dispatch(getAirline(id));
    },
    getProvince: () => {
      dispatch(retrieveProvince());
    },
    getFlight: (id) => {
      dispatch(retrieveFlight(id));
    },
    editFlight: (id, data) => {
      dispatch(updateFlight(id, data));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AirlineUpdateFlight);
