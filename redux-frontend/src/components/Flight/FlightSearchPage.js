import { useEffect, setState, useState, Component } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";
import { fetchFlight } from "../../actions/actionFlight";
// import { useQuery } from "../../utils/QueryParam";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const FlightSearchPage = (props) => {
    const history = useHistory();
    let queryParam = useQuery();

    const province = {
        properties: [
            {
                value: '',
                label: '--'
            },
            {
                value: 'SGN',
                label: 'TP.HCM'
            }, {
                value: 'HAN',
                label: 'Hà Nội'
            }, {
                value: 'DAD',
                label: 'Đà Nẵng'
            }, {
                value: 'CXR',
                label: 'Nha Trang'
            }, {
                value: 'DLI',
                label: 'Đà Lạt'
            }, {
                value: 'PQC',
                label: 'Phú Quốc'
            }, {
                value: 'VCA',
                label: 'Cần Thơ'
            }, {
                value: 'VCS',
                label: 'Côn Đảo'
            }, {
                value: 'VKG',
                label: 'Rạch Giá'
            }, {
                value: 'CAH',
                label: 'Cà Mau'
            }, {
                value: 'BMV',
                label: 'Buôn Ma Thuộc'
            }, {
                value: 'UIH',
                label: 'Quy Nhơn'
            }, {
                value: 'THD',
                label: 'Thanh Hóa'
            }, {
                value: 'VII',
                label: 'Vinh'
            }, {
                value: 'HUI',
                label: 'Huế'
            }, {
                value: 'VDH',
                label: 'Đồng Hới'
            }, {
                value: 'TBB',
                label: 'Tuy Hòa'
            }, {
                value: 'VCL',
                label: 'Chu Lai'
            }, {
                value: 'PXU',
                label: 'Pleiku'
            }, {
                value: 'HPH',
                label: 'Hải Phòng'
            }, {
                value: 'DIN',
                label: 'Điện Biên'
            }, {
                value: 'VDO',
                label: 'Vân Đồn'
            }
        ]
    }

    const seatClass = {
        properties: [
            {
                value: 'ECONOMY',
                label: 'Economy'
            },
            {
                value: 'BUSINESS',
                label: 'Business'
            }
        ]
    }

    const provinceLabel = (code) => {
        return province.properties.find(item => item.value === code)?.label;
    }

    useEffect(() => {
        let mount = false;

        if (!queryParam.get("from") && !queryParam.get("to") && !queryParam.get("departureDate") && !queryParam.get("returnDate") && !queryParam.get("seatClass") && !queryParam.get("adult") && !queryParam.get("child") && !queryParam.get("infant")) {
            history.push("/");
        } else {
            if (!props.flight) {
                props.getFlight(queryParam.get("from"), queryParam.get("to"), queryParam.get("adult"), queryParam.get("child"), queryParam.get("infant"), queryParam.get("departureDate"), queryParam.get("returnDate"), queryParam.get("seatClass"));
            }
        }

        return () => {
            mount = true;
        }
    }, [])

    return (<>
        <Header></Header>
        <div className="main-cont">
            <div className="body-wrapper">
                <div className="wrapper-padding">
                    <div className="page-head">
                        <div className="page-title">Flights - <span>Alternative</span></div>
                        <div className="breadcrumbs">
                            <a >Home</a> / <span>Flight Alternative page</span>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div className="two-colls">
                        <div className="two-colls-left">

                            <div className="srch-results-lbl fly-in">
                                <span>{props.flights?.data?.length} results found.</span>
                            </div>

                            <div className="side-block fly-in">
                                <div className="side-block-search">
                                    <div className="page-search-p">


                                        <div className="srch-tab-line">
                                            <div className="srch-tab-left transformed">
                                                <label>From</label>
                                                <div className="select-wrapper">
                                                    <select className="custom-select" name="from" id="departure-city" defaultValue={queryParam.get("from")}>
                                                        {province.properties.map(province => <option key={province.value} value={province.value}>{province.label} {province.value ? "(" + province.value + ")" : ""}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>To</label>
                                                <div className="select-wrapper">
                                                    <select className="custom-select" name="to" id="arrival-city" defaultValue={queryParam.get("to")}>
                                                        {province.properties.map(province => <option key={province.value} value={province.value}>{province.label} {province.value ? "(" + province.value + ")" : ""}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>


                                        <div className="srch-tab-line">
                                            <div className="srch-tab-left">
                                                <label>Departure</label>
                                                <div className="input-a"><input type="text" className="date-inpt" placeholder="mm/dd/yy" defaultValue={queryParam.get("departureDate")} /> <span className="date-icon"></span></div>
                                            </div>
                                            <div className="srch-tab-right">
                                                <label>Return</label>
                                                <div className="input-a"><input type="text" className="date-inpt" placeholder="mm/dd/yy" defaultValue={queryParam.get("returnDate")} /> <span className="date-icon"></span></div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>


                                        <div className="srch-tab-line no-margin-bottom">
                                            <div className="srch-tab-left transformed">
                                                <label>Seat Class</label>
                                                <div className="select-wrapper">
                                                    <select className="custom-select" name="seatClass" id="seatClass">
                                                        {seatClass.properties.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>Passengers</label>
                                                <div className="select-wrapper">
                                                    <select className="custom-select">
                                                        <option>--</option>
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>

                                        <button className="srch-btn">Search</button>
                                    </div>

                                </div>
                            </div>


                            <div className="side-block fly-in">
                                <div className="side-price">
                                    <div className="side-padding">
                                        <div className="side-lbl">Price</div>
                                        <div className="price-ranger">
                                            <div id="slider-range"></div>
                                        </div>
                                        <div className="price-ammounts">
                                            <input type="text" id="ammount-from" readOnly />
                                            <input type="text" id="ammount-to" readOnly />
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="side-block fly-in">
                                <div className="side-stars">
                                    <div className="side-padding">
                                        <div className="side-lbl">Airlines</div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                Lufthansa (30)
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                United Airlines (18)
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                Air berlin (8)
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                Swiss (2)
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                Turkish Airlines (1)
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                Air france (1)
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="side-block fly-in">
                                <div className="side-stars">
                                    <div className="side-padding">
                                        <div className="side-lbl">Flight type</div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                Business
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                First className
                                            </label>
                                        </div>
                                        <div className="checkbox">
                                            <label>
                                                <input type="checkbox" />
                                                Economy
                                            </label>
                                        </div>

                                    </div>
                                </div>
                            </div>


                            <div className="side-block fly-in">
                                <div className="side-stars">
                                    <div className="side-padding">
                                        <div className="side-lbl">Flight times</div>

                                        <div className="side-time-holder">
                                            <div className="side-lbl-a">Departure flight</div>
                                            <div className="side-time">
                                                <div className="time-ammounts">
                                                    departure time <span className="time-from">0</span>:00 up to <span className="time-to">0</span>:00
                                                </div>
                                                <div className="time-ranger">
                                                    <div className="time-range"></div>
                                                </div>
                                            </div>
                                            <div className="side-time">
                                                <div className="time-ammounts">
                                                    arrival time <span className="time-from">0</span>:00 up to <span className="time-to">0</span>:00
                                                </div>
                                                <div className="time-ranger">
                                                    <div className="time-range"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="side-time-holder">
                                            <div className="side-lbl-a">return flight</div>
                                            <div className="side-time">
                                                <div className="time-ammounts">
                                                    departure time <span className="time-from">0</span>:00 up to <span className="time-to">0</span>:00
                                                </div>
                                                <div className="time-ranger">
                                                    <div className="time-range"></div>
                                                </div>
                                            </div>
                                            <div className="side-time">
                                                <div className="time-ammounts">
                                                    arrival time <span className="time-from">0</span>:00 up to <span className="time-to">0</span>:00
                                                </div>
                                                <div className="time-ranger">
                                                    <div className="time-range"></div>
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

                                    <div className="catalog-head fly-in">
                                        <label>Sort results by:</label>
                                        <div className="search-select">
                                            <select>
                                                <option>Name</option>
                                                <option>Name</option>
                                                <option>Name</option>
                                                <option>Name</option>
                                                <option>Name</option>
                                            </select>
                                        </div>
                                        <div className="search-select">
                                            <select>
                                                <option>Price</option>
                                                <option>Price</option>
                                                <option>Price</option>
                                                <option>Price</option>
                                                <option>Price</option>
                                            </select>
                                        </div>
                                        <div className="search-select">
                                            <select>
                                                <option>Duration</option>
                                                <option>Duration</option>
                                                <option>Duration</option>
                                                <option>Duration</option>
                                                <option>Duration</option>
                                            </select>
                                        </div>
                                        <a className="show-list"></a>
                                        <a className="show-thumbs chosen" ></a>
                                        <div className="clear"></div>
                                    </div>

                                    <div className="catalog-row alternative">


                                        <div className="alt-flight fly-in">
                                            <div className="alt-flight-a">
                                                <div className="alt-flight-l">
                                                    <div className="alt-flight-lb">
                                                        <div className="alt-center">
                                                            <div className="alt-center-l">
                                                                <div className="alt-center-lp">
                                                                    <div className="alt-logo">
                                                                        <a ><img alt="" src="img/fl-transp-01.png" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="alt-center-c">
                                                                <div className="alt-center-cb">
                                                                    <div className="alt-center-cp">
                                                                        <div className="alt-lbl">New York - Vienna</div>
                                                                        <div className="alt-info"><b>06.01.15</b> One way trip</div>
                                                                        <div className="alt-devider"></div>
                                                                        <div className="flight-line-b">
                                                                            <b>details</b>
                                                                            <span>Only 2 seats!</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-departure">
                                                                            <b>Departure</b>
                                                                            <span>14:12</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-arrival">
                                                                            <b>Arrival</b>
                                                                            <span>17:50</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-time">
                                                                            <b>time</b>
                                                                            <span>14H 50M</span>
                                                                        </div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="alt-flight-lr">
                                                <div className="padding">
                                                    <div className="flt-i-price">634.24$</div>
                                                    <div className="flt-i-price-b">avg/person</div>
                                                    <a className="cat-list-btn" >select now</a>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <div className="alt-details">
                                                <div className="alt-details-i">
                                                    <b>Connections</b>
                                                    <span>Berlin, Germany</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>14:20 John F Kennedy (JFK)</b>
                                                    <span>USA</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>Flight LO-98 Boeing 787-8 (Jet) Economy</b>
                                                    <span>Operated by Austrian Airlines</span>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                        </div>


                                        <div className="alt-flight fly-in">
                                            <div className="alt-flight-a">
                                                <div className="alt-flight-l">
                                                    <div className="alt-flight-lb">
                                                        <div className="alt-center">
                                                            <div className="alt-center-l">
                                                                <div className="alt-center-lp">
                                                                    <div className="alt-logo">
                                                                        <a ><img alt="" src="img/fl-transp-02.png" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="alt-center-c">
                                                                <div className="alt-center-cb">
                                                                    <div className="alt-center-cp">
                                                                        <div className="alt-lbl">New York - Vienna</div>
                                                                        <div className="alt-info"><b>06.01.15</b> One way trip</div>
                                                                        <div className="alt-devider"></div>
                                                                        <div className="flight-line-b">
                                                                            <b>details</b>
                                                                            <span>Only 2 seats!</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-departure">
                                                                            <b>Departure</b>
                                                                            <span>14:12</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-arrival">
                                                                            <b>Arrival</b>
                                                                            <span>17:50</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-time">
                                                                            <b>time</b>
                                                                            <span>14H 50M</span>
                                                                        </div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="alt-flight-lr">
                                                <div className="padding">
                                                    <div className="flt-i-price">950.50$</div>
                                                    <div className="flt-i-price-b">avg/person</div>
                                                    <a className="cat-list-btn" >select now</a>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <div className="alt-details">
                                                <div className="alt-details-i">
                                                    <b>Connections</b>
                                                    <span>Berlin, Germany</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>14:20 John F Kennedy (JFK)</b>
                                                    <span>USA</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>Flight LO-98 Boeing 787-8 (Jet) Economy</b>
                                                    <span>Operated by Austrian Airlines</span>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                        </div>


                                        <div className="alt-flight fly-in">
                                            <div className="alt-flight-a">
                                                <div className="alt-flight-l">
                                                    <div className="alt-flight-lb">
                                                        <div className="alt-center">
                                                            <div className="alt-center-l">
                                                                <div className="alt-center-lp">
                                                                    <div className="alt-logo">
                                                                        <a ><img alt="" src="img/fl-transp-03.png" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="alt-center-c">
                                                                <div className="alt-center-cb">
                                                                    <div className="alt-center-cp">
                                                                        <div className="alt-lbl">New York - Vienna</div>
                                                                        <div className="alt-info"><b>06.01.15</b> One way trip</div>
                                                                        <div className="alt-devider"></div>
                                                                        <div className="flight-line-b">
                                                                            <b>details</b>
                                                                            <span>Only 2 seats!</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-departure">
                                                                            <b>Departure</b>
                                                                            <span>14:12</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-arrival">
                                                                            <b>Arrival</b>
                                                                            <span>17:50</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-time">
                                                                            <b>time</b>
                                                                            <span>14H 50M</span>
                                                                        </div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="alt-flight-lr">
                                                <div className="padding">
                                                    <div className="flt-i-price">620.00$</div>
                                                    <div className="flt-i-price-b">avg/person</div>
                                                    <a className="cat-list-btn" >select now</a>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <div className="alt-details">
                                                <div className="alt-details-i">
                                                    <b>Connections</b>
                                                    <span>Berlin, Germany</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>14:20 John F Kennedy (JFK)</b>
                                                    <span>USA</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>Flight LO-98 Boeing 787-8 (Jet) Economy</b>
                                                    <span>Operated by Austrian Airlines</span>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                        </div>


                                        <div className="alt-flight fly-in">
                                            <div className="alt-flight-a">
                                                <div className="alt-flight-l">
                                                    <div className="alt-flight-lb">
                                                        <div className="alt-center">
                                                            <div className="alt-center-l">
                                                                <div className="alt-center-lp">
                                                                    <div className="alt-logo">
                                                                        <a ><img alt="" src="img/fl-transp-04.png" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="alt-center-c">
                                                                <div className="alt-center-cb">
                                                                    <div className="alt-center-cp">
                                                                        <div className="alt-lbl">New York - Vienna</div>
                                                                        <div className="alt-info"><b>06.01.15</b> One way trip</div>
                                                                        <div className="alt-devider"></div>
                                                                        <div className="flight-line-b">
                                                                            <b>details</b>
                                                                            <span>Only 2 seats!</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-departure">
                                                                            <b>Departure</b>
                                                                            <span>14:12</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-arrival">
                                                                            <b>Arrival</b>
                                                                            <span>17:50</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-time">
                                                                            <b>time</b>
                                                                            <span>14H 50M</span>
                                                                        </div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="alt-flight-lr">
                                                <div className="padding">
                                                    <div className="flt-i-price">995.14$</div>
                                                    <div className="flt-i-price-b">avg/person</div>
                                                    <a className="cat-list-btn" >select now</a>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <div className="alt-details">
                                                <div className="alt-details-i">
                                                    <b>Connections</b>
                                                    <span>Berlin, Germany</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>14:20 John F Kennedy (JFK)</b>
                                                    <span>USA</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>Flight LO-98 Boeing 787-8 (Jet) Economy</b>
                                                    <span>Operated by Austrian Airlines</span>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                        </div>


                                        <div className="alt-flight fly-in">
                                            <div className="alt-flight-a">
                                                <div className="alt-flight-l">
                                                    <div className="alt-flight-lb">
                                                        <div className="alt-center">
                                                            <div className="alt-center-l">
                                                                <div className="alt-center-lp">
                                                                    <div className="alt-logo">
                                                                        <a ><img alt="" src="img/fl-transp-05.png" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="alt-center-c">
                                                                <div className="alt-center-cb">
                                                                    <div className="alt-center-cp">
                                                                        <div className="alt-lbl">New York - Vienna</div>
                                                                        <div className="alt-info"><b>06.01.15</b> One way trip</div>
                                                                        <div className="alt-devider"></div>
                                                                        <div className="flight-line-b">
                                                                            <b>details</b>
                                                                            <span>Only 2 seats!</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-departure">
                                                                            <b>Departure</b>
                                                                            <span>14:12</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-arrival">
                                                                            <b>Arrival</b>
                                                                            <span>17:50</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-time">
                                                                            <b>time</b>
                                                                            <span>14H 50M</span>
                                                                        </div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="alt-flight-lr">
                                                <div className="padding">
                                                    <div className="flt-i-price">634.24$</div>
                                                    <div className="flt-i-price-b">avg/person</div>
                                                    <a className="cat-list-btn" >select now</a>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <div className="alt-details">
                                                <div className="alt-details-i">
                                                    <b>Connections</b>
                                                    <span>Berlin, Germany</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>14:20 John F Kennedy (JFK)</b>
                                                    <span>USA</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>Flight LO-98 Boeing 787-8 (Jet) Economy</b>
                                                    <span>Operated by Austrian Airlines</span>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                        </div>


                                        <div className="alt-flight fly-in">
                                            <div className="alt-flight-a">
                                                <div className="alt-flight-l">
                                                    <div className="alt-flight-lb">
                                                        <div className="alt-center">
                                                            <div className="alt-center-l">
                                                                <div className="alt-center-lp">
                                                                    <div className="alt-logo">
                                                                        <a ><img alt="" src="img/fl-transp-01.png" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="alt-center-c">
                                                                <div className="alt-center-cb">
                                                                    <div className="alt-center-cp">
                                                                        <div className="alt-lbl">New York - Vienna</div>
                                                                        <div className="alt-info"><b>06.01.15</b> One way trip</div>
                                                                        <div className="alt-devider"></div>
                                                                        <div className="flight-line-b">
                                                                            <b>details</b>
                                                                            <span>Only 2 seats!</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-departure">
                                                                            <b>Departure</b>
                                                                            <span>14:12</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-arrival">
                                                                            <b>Arrival</b>
                                                                            <span>17:50</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-time">
                                                                            <b>time</b>
                                                                            <span>14H 50M</span>
                                                                        </div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="alt-flight-lr">
                                                <div className="padding">
                                                    <div className="flt-i-price">700.50$</div>
                                                    <div className="flt-i-price-b">avg/person</div>
                                                    <a className="cat-list-btn" >select now</a>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <div className="alt-details">
                                                <div className="alt-details-i">
                                                    <b>Connections</b>
                                                    <span>Berlin, Germany</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>14:20 John F Kennedy (JFK)</b>
                                                    <span>USA</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>Flight LO-98 Boeing 787-8 (Jet) Economy</b>
                                                    <span>Operated by Austrian Airlines</span>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                        </div>


                                        <div className="alt-flight fly-in">
                                            <div className="alt-flight-a">
                                                <div className="alt-flight-l">
                                                    <div className="alt-flight-lb">
                                                        <div className="alt-center">
                                                            <div className="alt-center-l">
                                                                <div className="alt-center-lp">
                                                                    <div className="alt-logo">
                                                                        <a ><img alt="" src="img/fl-transp-02.png" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="alt-center-c">
                                                                <div className="alt-center-cb">
                                                                    <div className="alt-center-cp">
                                                                        <div className="alt-lbl">New York - Vienna</div>
                                                                        <div className="alt-info"><b>06.01.15</b> One way trip</div>
                                                                        <div className="alt-devider"></div>
                                                                        <div className="flight-line-b">
                                                                            <b>details</b>
                                                                            <span>Only 2 seats!</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-departure">
                                                                            <b>Departure</b>
                                                                            <span>14:12</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-arrival">
                                                                            <b>Arrival</b>
                                                                            <span>17:50</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-time">
                                                                            <b>time</b>
                                                                            <span>14H 50M</span>
                                                                        </div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="alt-flight-lr">
                                                <div className="padding">
                                                    <div className="flt-i-price">620.00$</div>
                                                    <div className="flt-i-price-b">avg/person</div>
                                                    <a className="cat-list-btn" >select now</a>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <div className="alt-details">
                                                <div className="alt-details-i">
                                                    <b>Connections</b>
                                                    <span>Berlin, Germany</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>14:20 John F Kennedy (JFK)</b>
                                                    <span>USA</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>Flight LO-98 Boeing 787-8 (Jet) Economy</b>
                                                    <span>Operated by Austrian Airlines</span>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                        </div>


                                        <div className="alt-flight fly-in">
                                            <div className="alt-flight-a">
                                                <div className="alt-flight-l">
                                                    <div className="alt-flight-lb">
                                                        <div className="alt-center">
                                                            <div className="alt-center-l">
                                                                <div className="alt-center-lp">
                                                                    <div className="alt-logo">
                                                                        <a ><img alt="" src="img/fl-transp-03.png" /></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="alt-center-c">
                                                                <div className="alt-center-cb">
                                                                    <div className="alt-center-cp">
                                                                        <div className="alt-lbl">New York - Vienna</div>
                                                                        <div className="alt-info"><b>06.01.15</b> One way trip</div>
                                                                        <div className="alt-devider"></div>
                                                                        <div className="flight-line-b">
                                                                            <b>details</b>
                                                                            <span>Only 2 seats!</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-departure">
                                                                            <b>Departure</b>
                                                                            <span>14:12</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-arrival">
                                                                            <b>Arrival</b>
                                                                            <span>17:50</span>
                                                                        </div>
                                                                        <div className="alt-data-i alt-time">
                                                                            <b>time</b>
                                                                            <span>14H 50M</span>
                                                                        </div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="alt-flight-lr">
                                                <div className="padding">
                                                    <div className="flt-i-price">980.24$</div>
                                                    <div className="flt-i-price-b">avg/person</div>
                                                    <a className="cat-list-btn" >select now</a>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <div className="alt-details">
                                                <div className="alt-details-i">
                                                    <b>Connections</b>
                                                    <span>Berlin, Germany</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>14:20 John F Kennedy (JFK)</b>
                                                    <span>USA</span>
                                                </div>
                                                <div className="alt-details-i">
                                                    <b>Flight LO-98 Boeing 787-8 (Jet) Economy</b>
                                                    <span>Operated by Austrian Airlines</span>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                        </div>


                                    </div>

                                    <div className="clear"></div>

                                    <div className="pagination">
                                        <a className="active" >1</a>
                                        <a >2</a>
                                        <a >3</a>
                                        <div className="clear"></div>
                                    </div>
                                </div>
                            </div>
                            <br className="clear" />
                        </div>
                    </div>
                    <div className="clear"></div>

                </div>
            </div>
        </div>
        <Footer></Footer>
    </>);

}

const mapStateToProps = (state, ownProps) => {
    return {
        flights: state.flight,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFlight: (from, to, adult, child, infant, ddate, rdate, seatclassName) => {
            dispatch(fetchFlight(from, to, adult, child, infant, ddate, rdate, seatclassName))
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchPage);