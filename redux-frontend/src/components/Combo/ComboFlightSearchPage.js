import { useEffect, useState, Component } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";
import { fetchFlight } from "../../actions/actionFlight";
import { faHourglass, faSearch, faSuitcase, faTv } from "@fortawesome/free-solid-svg-icons";
import $ from 'jquery';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { importAll } from "../../utils/JqueryImport";
import { clearFlightBookingCached } from "../../actions/actionBookingFlight";
import { getRole, ROLE_USER } from "../../utils";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ComboFlightSearchPage = (props) => {
    const history = useHistory();
    let queryParam = useQuery();
    const [seatClassType, setSeatClassType] = useState("ECONOMY");
    const [isListView, setIsListView] = useState(true);
    const [includePriceRange, setIncludePriceRange] = useState(false);    
    const [errFlt, setErrFlt] = useState({
        from: '',
        to: '',
        departureDate: '',
        returnDate: ''
    })
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

    const toQueryString = (obj) => {
        return new URLSearchParams(obj).toString();
    }

    const provinceLabel = (code) => {
        return province.properties.find(item => item.value === code)?.label;
    }

    const getTimeDiff = (_startTime, _endTime, type) => {
        let startTime = new Date(_startTime.replace(/-/g, '/'));
        let endTime = new Date(_endTime.replace(/-/g, '/'));
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
            default:
                return minute;
        }
    }

    const timeDiff = (time1, time2) => {
        let valuestart = time1 + ":00";
        let valuestop = time2 + ":00";
        let hours;
        let minutes;

        if (new Date("01/01/2007 " + valuestart) < new Date("01/01/2007 " + valuestop)) {
            var diff = getTimeDiff("01/01/2007 " + valuestart, "01/01/2007 " + valuestop, 'm');
            // hours = Math.floor((diff / 60));
            hours = getTimeDiff("01/01/2007 " + valuestart, "01/01/2007 " + valuestop, 'h');
            minutes = (diff % 60);
        } else {
            var diff1 = getTimeDiff("01/01/2007 " + '24:00', "01/01/2007 " + valuestart, 'm');
            var diff2 = getTimeDiff("01/01/2007 " + valuestop, "01/01/2007 " + '00:00', 'm');
            var totalDiff = diff1 + diff2;
            hours = Math.floor((totalDiff / 60));
            minutes = (totalDiff % 60);
        };

        return hours + "H " + minutes + "M";
    }

    useEffect(() => {
        let mount = false;
        // importAll();
        document.getElementById("scroll-top").click();
        if (queryParam.toString().length == 0) {
            history.push("/");
        } else {
            var filter = props.filter;
            if (!props.flight) {
                //props.getFlight(filter.from, filter.to, filter.adult, filter.child, filter.infant, filter.departureDate, filter.returnDate, filter.seatClassName, filter.priceFrom, filter.priceTo, filter.page, filter.sortBy, filter.sortDir);
                performSearch(filter);
            }

            setSeatClassType(filter?.seatclassName);
        }

        return () => {
            mount = true;
        }
    }, [])

    const performSearch = (filter, shouldSetState = false) => {
        if (shouldSetState) {
            props.setFilter(filter)
        }
        props.getFlight(filter.from, filter.to, filter.adult, filter.child, filter.infant, filter.departureDate, filter.returnDate, filter.seatClassName, filter.priceFrom, filter.priceTo, filter.page, filter.sortBy, filter.sortDir);
        window.history.pushState({}, null, `/combo-list?${toQueryString(filter)}`);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.flights);
        var form = e.target;

        if (validateFlt(form, "hotel-flight-search")) {

            document.getElementById("page").value = "1";
            document.getElementById("sortBy").value = "id";
            document.getElementById("sortDir").value = "asc";

            var minPrice = 0;
            var maxPrice = 3000;

            if (includePriceRange) {
                minPrice = getAmount(form.priceFrom.value);
                maxPrice = getAmount(form.priceTo.value);
            }


            var filter = { ...props.filter };
            filter.from = form.from.value
            filter.to = form.to.value
            filter.departureDate = form.departureDate.value
            filter.returnDate = form.returnDate.value
            filter.seatclassName = form.seatClass.value
            filter.adult = form.adult.value
            filter.child = form.child.value
            filter.infant = form.infant.value
            filter.priceFrom = minPrice
            filter.priceTo = maxPrice
            filter.page = 1
            filter.sortBy = "id"
            filter.sortDir = "asc"
            //setQueryFilter(filter);
            props.setFilter(filter);
            setSeatClassType(form.seatClass.value);
            performSearch(filter, true);
        }
    }

    const setPage = (e) => {
        var index = e.target.value;
        if (!index) {
            index = e.currentTarget.text;
            document.getElementById("page").value = index;
        }
        var filter = { ...props.filter };
        filter.page = parseInt(index);
        performSearch(filter, true);
    }

    const setPageByIndex = (index) => {
        document.getElementById("page").value = index;
        var filter = { ...props.filter };
        filter.page = parseInt(index);
        performSearch(filter, true);
    }

    const setNextPage = (index) => {
        var filter = { ...props.filter };
        filter.page = parseInt(index);
        performSearch(filter, true);
    }

    const onChangeSortBy = (e) => {
        var filter = { ...props.filter };
        filter.sortBy = e.target.value;
        filter.page = 1;
        performSearch(filter, true);
    }

    const onChangeSortDir = (e) => {
        var filter = { ...props.filter };
        filter.sortDir = e.target.value;
        filter.page = 1;
        performSearch(filter, true);
    }

    const toggleDetails = (e) => {
        if ($(e.currentTarget).is('.open')) {
            $(e.currentTarget).removeClass('open');
            $(e.currentTarget).closest('.alt-flight').find('.alt-details').slideUp();
        } else {
            $(e.currentTarget).addClass('open');
            $(e.currentTarget).closest('.alt-flight').find('.alt-details').slideDown();
        }
    }


    const getAmount = (money) => {
        return money ? money.replace("$", "") : 0;
    }

    const getSeatAmount = (flight) => {
        if (flight.flightBookingDetails.length == 0) {
            return props.filter.seatClassName === "ECONOMY" ? flight.economyCapacity : flight.businessCapacity;
        }
        var bookingByType = [];
        if (props.filter.seatClassName === "ECONOMY") {
            bookingByType = flight.flightBookingDetails.filter(item => item.priceType === 0);
            return flight.economyCapacity - bookingByType.length;
        } else {
            bookingByType = flight.flightBookingDetails.filter(item => item.priceType === 1);
            return flight.businessCapacity - bookingByType.length;
        }
    }

    const flightPrice = (flight) => {
        var price = props.filter.seatClassName === "ECONOMY" ? flight.economyPrice : flight.businessPrice;
        return price;
    }

    const handleSelectFlight = (flight) => {
        props.clearBooking();
        if (getRole() == ROLE_USER) {
            sessionStorage.setItem("isBooking", true);
            props.setDepartFlight(flight);
        } else {
            $('.header-account a').click();
        }
    }

    const includePriceRangeToQuery = () => {
        setIncludePriceRange(!includePriceRange);
    }

    const validateFlt = (form, formSelector) => {
        var err = { ...errFlt };
        if (!form.from.value) {
            err.from = 'Departure City cannot be empty';
            form.from.parentElement.getElementsByTagName("span")[0].classList.add("is-invalid");
            $(`.${formSelector} #from-error`)[0].innerText = err.from;
        } else {
            err.from = '';
            form.from.parentElement.getElementsByTagName("span")[0].classList.remove("is-invalid")
            $(`.${formSelector} #from-error`)[0].innerText = err.from;
        }

        if (!form.to.value) {
            err.to = 'Arrival City cannot be empty';
            form.to.parentElement.getElementsByTagName("span")[0].classList.add("is-invalid");
            $(`.${formSelector} #to-error`)[0].innerText = err.to;
        } else {
            err.to = '';
            form.to.parentElement.getElementsByTagName("span")[0].classList.remove("is-invalid");
            $(`.${formSelector} #to-error`)[0].innerText = err.to;
        }

        if (form.from.value && form.to.value) {
            if (form.from.value === form.to.value) {
                err.to = 'Arrival City must be different then Departure City';
                form.to.parentElement.getElementsByTagName("span")[0].classList.add("is-invalid");
                $(`.${formSelector} #to-error`)[0].innerText = err.to;

                err.from = 'Departure City must be different then Arrival City';
                form.from.parentElement.getElementsByTagName("span")[0].classList.add("is-invalid");
                $(`.${formSelector} #from-error`)[0].innerText = err.from;
            } else {
                err.from = '';
                form.to.parentElement.getElementsByTagName("span")[0].classList.remove("is-invalid");
                $(`.${formSelector} #to-error`)[0].innerText = err.to;
                err.to = '';
                form.to.parentElement.getElementsByTagName("span")[0].classList.remove("is-invalid");
                $(`.${formSelector} #from-error`)[0].innerText = err.from;
            }
        }

        if (!form.departureDate.value) {
            err.departureDate = 'Departure Date cannot be empty';
            form.departureDate.parentElement.classList.add("is-invalid");
            $(`.${formSelector} #departureDate-error`)[0].innerText = err.departureDate;
        } else {
            err.departureDate = '';
            form.departureDate.parentElement.classList.remove("is-invalid");
            $(`.${formSelector} #departureDate-error`)[0].innerText = err.departureDate;
        }

        if (form.departureDate.value && form.returnDate.value) {
            if (form.departureDate.value >= form.returnDate.value) {
                err.departureDate = 'Departure Date must be smaller than return date';
                form.departureDate.parentElement.classList.add("is-invalid");
                $(`.${formSelector} #departureDate-error`)[0].innerText = err.departureDate;

                err.returnDate = 'Return Date must be larger than departure date';
                form.returnDate.parentElement.classList.add("is-invalid");
                $(`.${formSelector} #returnDate-error`)[0].innerText = err.returnDate;
            } else {
                err.returnDate = '';
                form.departureDate.parentElement.classList.remove("is-invalid");
                $(`.${formSelector} #departureDate-error`)[0].innerText = err.departureDate;
                form.returnDate.parentElement.classList.remove("is-invalid");
                $(`.${formSelector} #returnDate-error`)[0].innerText = err.returnDate;
            }
        }

        if (err.from || err.to || err.departureDate) {
            setErrFlt(err);
            return false;
        }
        return true;
    }


    return (<>
        <div className="main-cont">
            <div className="body-wrapper">
                <div className="wrapper-padding">
                    <div className="page-head">
                        <div className="page-title">Step 1 - <span>Flight Select</span></div>
                    </div>
                    <div className="page-head">
                        <Link className="wizard-btn mr-1" to="/">Cancel</Link>
                        <button className={props.departFlight ? "wizard-btn" : "wizard-btn disable"} disabled={!props.departFlight} onClick={() => props.goToStep(2)}>Next</button>
                        <div className="breadcrumbs">
                            <Link to="/">Home</Link> / <span>Flight + Hotel</span>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <form className="hotel-flight-search two-colls" onSubmit={handleSubmit}>
                        <div className="two-colls-left">
                            <div className="srch-results-lbl fly-in">
                                One way Flight
                            </div>

                            <div className="side-block fly-in">
                                <div className="srch-tab-line">
                                    <div className="side-block-search">
                                        <div className="page-search-p">
                                            <div className="srch-tab-3c">
                                                <div className="alt-data-i">
                                                </div>
                                                <div className="clear"></div>
                                            </div>

                                            <div className="srch-tab-3c transformed mt-1">
                                                <div className="alt-data-i alt-departure">
                                                    <b>Departure</b>
                                                    <span>{props.filter?.departureDate}</span>
                                                </div>
                                            </div>
                                            <div className="srch-tab-3c transformed mt-1">
                                                <div className="alt-data-i">
                                                    <b>Route</b>
                                                    <label><strong>{props.filter?.from + " - " + props.filter?.to}</strong></label>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="side-block fly-in">
                                <div className="side-block-search">
                                    <div className="page-search-p">

                                        <div className="srch-tab-line">
                                            <div className="srch-tab-left transformed">
                                                <label>From</label>
                                                <div className="select-wrapper">
                                                    <select className="custom-select" name="from" id="departure-city" defaultValue={props.filter?.from}>
                                                        {province.properties.map(province => <option key={province.value} value={province.value}>{province.label} {province.value ? "(" + province.value + ")" : ""}</option>)}
                                                    </select>
                                                    <div className="booking-error-input" id="from-error"></div>
                                                </div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>To</label>
                                                <div className="select-wrapper">
                                                    <select className="custom-select" name="to" id="arrival-city" defaultValue={props.filter?.to}>
                                                        {province.properties.map(province => <option key={province.value} value={province.value}>{province.label} {province.value ? "(" + province.value + ")" : ""}</option>)}
                                                    </select>
                                                    <div className="booking-error-input" id="to-error"></div>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>

                                        <div className="srch-tab-line">
                                            <div className="srch-tab-line">
                                                <label>Departure</label>
                                                <div className="input-a"><input name="departureDate" type="text" className="date-departure-flight-inpt" placeholder="mm/dd/yy" defaultValue={props.filter?.departureDate} /> <span className="date-icon"></span></div>
                                                <div className="booking-error-input" id="departureDate-error"></div>
                                            </div>
                                            <div className="srch-tab-right" hidden>
                                                <label>Return</label>
                                                <div className="input-a"><input name="returnDate" type="text" className="date-departure-flight-inpt" placeholder="mm/dd/yy" defaultValue={props.filter?.returnDate} /> <span className="date-icon"></span></div>
                                                <div className="booking-error-input" id="returnDate-error"></div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>


                                        <div className="srch-tab-line">
                                            <div className="srch-tab-left transformed">
                                                <label>Seat Class</label>
                                                <div className="select-wrapper">
                                                    <select className="custom-select" name="seatClass" id="seatClass" defaultValue={props.filter?.seatClass} onChange={(e) => setSeatClassType(e.target.value)}>
                                                        {seatClass.properties.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>Adult</label>
                                                <div className="input-a"><input name="adult" type="number" defaultValue={1} min="1" max="7" onKeyPress={(e) => e.preventDefault()} /></div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>
                                        <div className="srch-tab-line">
                                            <div className="srch-tab-left transformed">
                                                <label>Child</label>
                                                <div className="input-a"><input name="child" type="number" defaultValue={0} min="0" max="7" onKeyPress={(e) => e.preventDefault()} /></div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>Infant</label>
                                                <div className="input-a"><input name="infant" type="number" defaultValue={0} min="0" max="7" onKeyPress={(e) => e.preventDefault()} /></div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>

                                        <div className="srch-tab-line">
                                            <div className="srch-tab-left transformed">
                                                <label>Apply Price Range</label>
                                                <input type='checkbox' onChange={includePriceRangeToQuery} title="Apply price range into search criteria" />
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className="srch-tab-line no-margin-bottom" hidden={!includePriceRange}>
                                            <div className="clear"></div>
                                            <div className="srch-tab-left transformed">
                                                <label>From Price</label>
                                                <div className="input-a"><input name="priceFrom" type="number" defaultValue={props.filter?.priceFrom ? props.filter?.priceFrom : 0} min="0" max="3000" /></div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>To Price</label>
                                                <div className="input-a"><input name="priceTo" type="number" defaultValue={props.filter?.priceTo ? props.filter?.priceTo : 3000} min="0" max="3000" /></div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>

                                        <button type="submit" className="srch-btn">Search</button>
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
                                            <select id="sortBy" defaultValue={props.filter?.sortBy} onChange={onChangeSortBy}>
                                                <option value="id">Index</option>
                                                <option value={seatClassType === "ECONOMY" ? "economyPrice" : "businessPrice"}>Price</option>
                                                <option value="departureTime">Depart Time</option>
                                                <option value="arrivalTime">Arrive Time</option>
                                            </select>
                                        </div>
                                        <div className="search-select">
                                            <select id="sortDir" defaultValue={props.filter?.sortDir} onChange={onChangeSortDir}>
                                                <option value="asc">ASC</option>
                                                <option value="desc">DESC</option>
                                            </select>
                                        </div>
                                        <label>Page:</label>
                                        <div className="search-select">
                                            <select id="page" onChange={setPage} defaultValue={props.filter?.page}>
                                                {[...Array(props?.flights?.data?.totalPages)].map((item, index) => (<option key={index + 1} value={index + 1}>{index + 1}</option>))}
                                            </select>
                                        </div>
                                        <a title={isListView ? "Grid View" : "List View"} className={isListView ? "show-list chosen" : "show-list"} onClick={(e) => setIsListView(!isListView)}></a>
                                        <div className="clear"></div>
                                    </div>
                                    {/* List Flight here */}

                                    {!isListView ? (<div className="catalog-row">
                                        {props.flights?.data?.content?.map(flight =>
                                            <div className="alt-fligt-table fly-in" key={flight.id}>
                                                <div className="alt-fligt-table-a">
                                                    <div className="alt-fligt-table-img">
                                                        <a><img width="142" alt="" src={flight.airline.image} /></a>
                                                    </div>
                                                    <div className="alt-fligt-table-content">
                                                        <div className="alt-lbl">{provinceLabel(flight.departureCity)} - {provinceLabel(flight.arrivalCity)}</div>
                                                        <div className="alt-info"><b>{flight.flightCode} </b></div>
                                                        <div className="alt-fligt-table-info">
                                                            <div className="alt-data-i alt-departure">
                                                                <b>Departure</b>
                                                                <span>{flight.departureTime}</span>
                                                            </div>
                                                            <div className="alt-data-i alt-arrival">
                                                                <b>Arrival</b>
                                                                <span>{flight.arrivalTime}</span>
                                                            </div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="alt-fligt-table-foot">
                                                            <div className="alt-fligt-table-foot-l">
                                                                <div className="flt-i-price">{flightPrice(flight)}$</div>
                                                                <div className="flt-i-price-b">avg/person</div>
                                                            </div>
                                                            <div className="alt-fligt-table-foot-r">
                                                                <a className="cat-list-btn">select</a>
                                                            </div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}
                                    </div>)
                                        : (<div className="catalog-row alternative">
                                            {props.flights?.data?.content?.map(flight =>
                                                <div className={props.departFlight?.id == flight.id ? "alt-flight fly-in selected" : "alt-flight fly-in"} key={flight.id}>
                                                    <div className="alt-flight-a">
                                                        <div className="alt-flight-l">
                                                            <div className="alt-flight-lb">
                                                                <div className="alt-center">
                                                                    <div className="alt-center-l">
                                                                        <div className="alt-center-lp">
                                                                            <div className="alt-logo">
                                                                                <a ><img width="142" alt="" src={flight.airline.image} /></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="alt-center-c">
                                                                        <div className="alt-center-cb">
                                                                            <div className="alt-center-cp">
                                                                                <div className="alt-lbl">{provinceLabel(flight.departureCity)} - {provinceLabel(flight.arrivalCity)}</div>
                                                                                <div className="alt-info"><b>#{flight.flightCode} </b></div>
                                                                                <div className="alt-devider"></div>
                                                                                <div className="flight-line-b">
                                                                                    <b onClick={toggleDetails}>details</b>
                                                                                    <span>{getSeatAmount(flight)} seats left!</span>
                                                                                </div>
                                                                                <div className="alt-data-i alt-departure">
                                                                                    <b>Departure</b>
                                                                                    <span>{flight.departureTime}</span>
                                                                                </div>
                                                                                <div className="alt-data-i alt-arrival">
                                                                                    <b>Arrival</b>
                                                                                    <span>{flight.arrivalTime}</span>
                                                                                </div>
                                                                                <div className="alt-data-i alt-time">
                                                                                    <b>time</b>
                                                                                    <span>{timeDiff(flight.departureTime, flight.arrivalTime)}</span>
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
                                                            <div className="flt-i-price">{flightPrice(flight)}$</div>
                                                            <div className="flt-i-price-b">avg/person</div>
                                                            <a className="cat-list-btn"
                                                                onClick={(e) =>
                                                                    handleSelectFlight(flight)}
                                                            >
                                                                SELECT
                                                            </a>
                                                        </div>
                                                        <div className="clear"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                    <div className="alt-details">
                                                        <div className="alt-details-i">
                                                            <b>Status</b>
                                                            <span>{flight.status}</span>
                                                        </div>
                                                        <div className="alt-details-i">
                                                            <b>Flight {flight.aircraftType}</b>
                                                            <span>Operated by {flight.airline.airlineName}</span>
                                                        </div>
                                                        <div className="alt-details-i">
                                                            <b>Description</b>
                                                            <span>
                                                                {(flight.hasEntertainment || true) && <FontAwesomeIcon className="mr-1" title="Has Entertainment" color="#ff7200" icon={faTv} size='2x'></FontAwesomeIcon>}
                                                                <FontAwesomeIcon color="#4a90a4" title={(props.filter?.seatClassName == 'ECONOMY' ? ("Economy Baggage: " + flight.economyBaggage) : ("Business Baggage: " + flight.businessBaggage)) + "kg"} icon={faSuitcase} size='2x'></FontAwesomeIcon>
                                                            </span>
                                                        </div>
                                                        <div>
                                                            <b></b>
                                                        </div>

                                                        <div className="clear"></div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>)}

                                    <div className="clear"></div>

                                    {props.flights.data?.content.length > 0 ? (<div className="pagination">
                                        
                                        {
                                            props?.flights?.data?.first ? (<>                                                
                                                <a className="active">1</a>
                                                {props?.flights?.data?.totalPages >= 2 && <a onClick={setPage}>2</a>}
                                                {props?.flights?.data?.totalPages >= 3 && <a onClick={setPage}>3</a>}
                                                {props?.flights?.data?.totalPages >= 2 && <a >{">"}</a>}</>)
                                                : props?.flights?.data?.last ? (<><a >{"<"}</a>
                                                    {props?.flights?.data?.totalPages >= 3 && <a onClick={setPage}>{props?.flights?.data?.totalPages - 2}</a>}
                                                    {props?.flights?.data?.totalPages >= 2 && <a onClick={setPage}>{props?.flights?.data?.totalPages - 1}</a>}
                                                    <a className="active">{props?.flights?.data?.totalPages}</a>
                                                    </>)
                                                    : (<>
                                                        <a >{"<"}</a>
                                                        <a onClick={setPage}>{props?.flights?.data?.number}</a>
                                                        <a className="active">{props?.flights?.data?.number + 1}</a>
                                                        <a onClick={setPage}>{props?.flights?.data?.number + 2}</a>
                                                        <a >{">"}</a>
                                                        </>)
                                        }
                                        
                                        <div className="clear"></div>
                                    </div>) : (
                                        <h1 className="text-center">NO RESULTS FOUND</h1>
                                    )}
                                </div>
                            </div>
                            <br className="clear" />
                        </div>
                    </form>
                    <div className="clear"></div>

                </div>
            </div>
        </div>
    </>);

}

const mapStateToProps = (state, ownProps) => {
    return {
        flights: state.flight,

    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFlight: (from, to, adult, child, infant, ddate, rdate, seatclass, priceFrom, priceTo, page, sortBy, sortDir) => {
            dispatch(fetchFlight(from, to, adult, child, infant, ddate, rdate, seatclass, priceFrom, priceTo, page, sortBy, sortDir))
        },
        clearBooking: () => { dispatch(clearFlightBookingCached) }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboFlightSearchPage);