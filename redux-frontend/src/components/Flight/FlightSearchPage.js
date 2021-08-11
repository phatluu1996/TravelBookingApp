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
import { clearBookingCached } from "../../actions/actionBookingFlight";
import { getRole, ROLE_USER } from "../../utils";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const FlightSearchPage = (props) => {
    const history = useHistory();
    let queryParam = useQuery();
    const [queryFilter, setQueryFilter] = useState();
    const [seatClassType, setSeatClassType] = useState("ECONOMY");
    const [isListView, setIsListView] = useState(true);
    const [includePriceRange, setIncludePriceRange] = useState(false);
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
        importAll();
        document.getElementById("scroll-top").click();

        if (!queryParam.get("from") && !queryParam.get("to") && !queryParam.get("departureDate") && !queryParam.get("returnDate") && !queryParam.get("seatClass") && !queryParam.get("adult") && !queryParam.get("child") && !queryParam.get("infant") && !queryParam.get("page") && !queryParam.get("sortDir") && !queryParam.get("sortBy") && !queryParam.get("priceFrom") && !queryParam.get("priceTo")) {
            document.location.href = "/";
        } else {
            if (!props.flight) {
                props.getFlight(queryParam.get("from"), queryParam.get("to"), queryParam.get("adult"), queryParam.get("child"), queryParam.get("infant"), queryParam.get("departureDate"), queryParam.get("returnDate"), queryParam.get("seatClass"), queryParam.get("priceFrom"), queryParam.get("priceTo"), 1, queryParam.get("sortBy"), queryParam.get("sortDir"));
                console.log(props.flights);
            }
            let filter = {
                from: queryParam.get("from"),
                to: queryParam.get("to"),
                departureDate: queryParam.get("departureDate"),
                returnDate: queryParam.get("returnDate"),
                seatClass: queryParam.get("seatClass"),
                adult: queryParam.get("adult"),
                child: queryParam.get("child"),
                infant: queryParam.get("infant"),
                priceFrom: queryParam.get("priceFrom"),
                priceTo: queryParam.get("priceTo"),
                page: 1,
                sortBy: queryParam.get("sortBy"),
                sortDir: queryParam.get("sortDir")
            }
            setQueryFilter(filter);
            setSeatClassType(queryParam.get("seatClass"));
        }

        return () => {
            mount = true;
        }
    }, [])


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.flights);
        var form = e.target;


        document.getElementById("page").value = "1";
        document.getElementById("sortBy").value = "id";
        document.getElementById("sortDir").value = "asc";

        var minPrice = 0;
        var maxPrice = 3000;

        if (includePriceRange) {
            minPrice = getAmount(form.priceFrom.value);
            maxPrice = getAmount(form.priceTo.value);
        }


        var filter = {
            from: form.from.value,
            to: form.to.value,
            departureDate: form.departureDate.value,
            returnDate: form.returnDate.value,
            seatClass: form.seatClass.value,
            adult: form.adult.value,
            child: form.child.value,
            infant: form.infant.value,
            priceFrom: minPrice,
            priceTo: maxPrice,
            page: 1,
            sortBy: "id",//queryParam.get("sortBy"),
            sortDir: "asc"//queryParam.get("sortDir")
        };
        setQueryFilter(filter);
        setSeatClassType(form.seatClass.value);
        if(form.returnDate.value){
            history.push(`/flight-round-list?from=${filter.from}&to=${filter.to}&adult=${filter.adult}&child=${filter.child}&infant=${filter.infant}&departureDate=${filter.departureDate}&returnDate=${filter.returnDate}&seatClass=${filter.seatClass}&priceFrom=${filter.priceFrom}&priceTo=${filter.priceTo}&page=${filter.page}&sortBy=${filter.sortBy}&sortDir=${filter.sortDir}`); 
        }else{props.getFlight(filter.from, filter.to, filter.adult, filter.child, filter.infant, filter.departureDate, filter.returnDate, filter.seatClass, filter.priceFrom, filter.priceTo, filter.page, filter.sortBy, filter.sortDir);
            window.history.pushState({}, null, `/flight-list?from=${filter.from}&to=${filter.to}&adult=${filter.adult}&child=${filter.child}&infant=${filter.infant}&departureDate=${filter.departureDate}&returnDate=${filter.returnDate}&seatClass=${filter.seatClass}&priceFrom=${filter.priceFrom}&priceTo=${filter.priceTo}&page=${filter.page}&sortBy=${filter.sortBy}&sortDir=${filter.sortDir}`)
        }
    }

    const setPage = (e) => {
        var index = e.target.value;
        if(!index){
            index = e.currentTarget.text;            
            document.getElementById("scroll-top").click();
            document.getElementById("page").value = index;
        }
        var filter = { ...queryFilter };
        filter.page = parseInt(index);
        setQueryFilter(filter);
        props.getFlight(queryFilter.from, queryFilter.to, queryFilter.adult, queryFilter.child, queryFilter.infant, queryFilter.departureDate, queryFilter.returnDate, queryFilter.seatClass, queryFilter.priceFrom, queryFilter.priceTo, parseInt(index), queryFilter.sortBy, queryFilter.sortDir);
        window.history.pushState({}, null, `/flight-list?from=${queryFilter.from}&to=${queryFilter.to}&adult=${queryFilter.adult}&child=${queryFilter.child}&infant=${queryFilter.infant}&departureDate=${queryFilter.departureDate}&returnDate=${queryFilter.returnDate}&seatClass=${queryFilter.seatClass}&priceFrom=${queryFilter.priceFrom}&priceTo=${queryFilter.priceTo}&page=${parseInt(index)}&sortBy=${queryFilter.sortBy}&sortDir=${queryFilter.sortDir}`)
    }

    const setNextPage = (index) => {
        document.getElementById("scroll-top").click();
        var filter = { ...queryFilter };
        filter.page = parseInt(index);
        setQueryFilter(filter);
        props.getFlight(queryFilter.from, queryFilter.to, queryFilter.adult, queryFilter.child, queryFilter.infant, queryFilter.departureDate, queryFilter.returnDate, queryFilter.seatClass, queryFilter.priceFrom, queryFilter.priceTo, parseInt(index), queryFilter.sortBy, queryFilter.sortDir);
        window.history.pushState({}, null, `/flight-list?from=${queryFilter.from}&to=${queryFilter.to}&adult=${queryFilter.adult}&child=${queryFilter.child}&infant=${queryFilter.infant}&departureDate=${queryFilter.departureDate}&returnDate=${queryFilter.returnDate}&seatClass=${queryFilter.seatClass}&priceFrom=${queryFilter.priceFrom}&priceTo=${queryFilter.priceTo}&page=${parseInt(index)}&sortBy=${queryFilter.sortBy}&sortDir=${queryFilter.sortDir}`)
    }

    const onChangeSortBy = (e) => {
        var filter = { ...queryFilter };
        filter.sortBy = e.target.value;
        filter.page = 1;
        setQueryFilter(filter);
        props.getFlight(filter.from, filter.to, filter.adult, filter.child, filter.infant, filter.departureDate, filter.returnDate, filter.seatClass, filter.priceFrom, filter.priceTo, filter.page, filter.sortBy, filter.sortDir);
        window.history.pushState({}, null, `/flight-list?from=${filter.from}&to=${filter.to}&adult=${filter.adult}&child=${filter.child}&infant=${filter.infant}&departureDate=${filter.departureDate}&returnDate=${filter.returnDate}&seatClass=${filter.seatClass}&priceFrom=${filter.priceFrom}&priceTo=${filter.priceTo}&page=${filter.page}&sortBy=${filter.sortBy}&sortDir=${filter.sortDir}`)
    }

    const onChangeSortDir = (e) => {
        var filter = { ...queryFilter };
        filter.sortDir = e.target.value;
        filter.page = 1;
        setQueryFilter(filter);
        props.getFlight(filter.from, filter.to, filter.adult, filter.child, filter.infant, filter.departureDate, filter.returnDate, filter.seatClass, filter.priceFrom, filter.priceTo, filter.page, filter.sortBy, filter.sortDir);
        window.history.pushState({}, null, `/flight-list?from=${filter.from}&to=${filter.to}&adult=${filter.adult}&child=${filter.child}&infant=${filter.infant}&departureDate=${filter.departureDate}&returnDate=${filter.returnDate}&seatClass=${filter.seatClass}&priceFrom=${filter.priceFrom}&priceTo=${filter.priceTo}&page=${filter.page}&sortBy=${filter.sortBy}&sortDir=${filter.sortDir}`)
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
            return seatClassType === "ECONOMY" ? flight.economyCapacity : flight.businessCapacity;
        }
        var bookingByType = [];
        if (seatClassType === "ECONOMY") {
            bookingByType = flight.flightBookingDetails.filter(item => item.priceType === 0);
            return flight.economyCapacity - bookingByType.length;
        } else {
            bookingByType = flight.flightBookingDetails.filter(item => item.priceType === 1);
            return flight.businessCapacity - bookingByType.length;
        }
    }

    const flightPrice = (flight) => {
        var price = seatClassType === "ECONOMY" ? flight.economyPrice : flight.businessPrice;
        return price;
    }
    
    const handleGoToBooking = (flight) =>  {
        props.clearBooking();
        if(getRole() == ROLE_USER){
            history.push("/flight-booking?departureDate="+queryParam.get("departureDate")+
            "&adult="+queryParam.get("adult")+"&child="+queryParam.get("child")+
            "&seatClass="+queryParam.get("seatClass")+"&price="+flightPrice(flight)+"&fid="+flight.id
            );
        }else{
            $('.header-account a').click();
        }        
    }

    const includePriceRangeToQuery = () => {
        setIncludePriceRange(!includePriceRange);
    }

    return (<>
        <Header></Header>
        <div className="main-cont">
            <div className="body-wrapper">
                <div className="wrapper-padding">
                    <div className="page-head">
                        <div className="page-title">Flights - <span>one way trip</span></div>
                        <div className="breadcrumbs">
                            <Link to="/">Home</Link> / <span>Flight Search Result</span>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <form className="two-colls" onSubmit={handleSubmit}>
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
                                                    <span>{queryFilter?.departureDate}</span>
                                                </div>
                                            </div>
                                            <div className="srch-tab-3c transformed mt-1">
                                                <div className="alt-data-i">
                                                    <b>Route</b>
                                                    <label><strong>{queryFilter?.from + " -> " + queryFilter?.to}</strong></label>
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
                                                <div className="input-a"><input name="departureDate" type="text" className="date-inpt" placeholder="mm/dd/yy" defaultValue={queryParam.get("departureDate")} /> <span className="date-icon"></span></div>
                                            </div>
                                            <div className="srch-tab-right">
                                                <label>Return</label>
                                                <div className="input-a"><input name="returnDate" type="text" className="date-inpt" placeholder="mm/dd/yy" defaultValue={queryParam.get("returnDate")} /> <span className="date-icon"></span></div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>


                                        <div className="srch-tab-line">
                                            <div className="srch-tab-left transformed">
                                                <label>Seat Class</label>
                                                <div className="select-wrapper">
                                                    <select className="custom-select" name="seatClass" id="seatClass" defaultValue={queryParam.get("seatClass")}>
                                                        {seatClass.properties.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>Adult</label>
                                                <div className="input-a"><input name="adult" type="number" defaultValue={1} min="1" max="7" /></div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>
                                        <div className="srch-tab-line">
                                            <div className="srch-tab-left transformed">
                                                <label>Child</label>
                                                <div className="input-a"><input name="child" type="number" defaultValue={0} min="0" max="6" /></div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>Infant</label>
                                                <div className="input-a"><input name="infant" type="number" defaultValue={0} max="6" /></div>
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
                                                <div className="input-a"><input name="priceFrom" type="number" defaultValue={queryParam.get("priceFrom") ? queryParam.get("priceFrom") : 0} min="0" max="3000" /></div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>To Price</label>
                                                <div className="input-a"><input name="priceTo" type="number" defaultValue={queryParam.get("priceTo") ? queryParam.get("priceTo") : 3000} min="0" max="3000" /></div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>

                                        <button type="submit" className="srch-btn">Search</button>
                                    </div>
                                </div>
                            </div>


                            {/* <div className="side-block fly-in">
                                <div className="side-block-search">
                                    <div className="page-search-p">
                                        <div className="srch-tab-line">
                                            <div className="srch-tab-left transformed">
                                                <input type='checkbox' onChange={(e) => setIncludePriceRange(!includePriceRange)} title="Apply price range into search criteria" />
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                        <div className="srch-tab-line no-margin-bottom">
                                            <div className="clear"></div>
                                            <div className="srch-tab-left transformed">
                                                <label>From Price</label>
                                                <div className="input-a"><input name="priceFrom" type="number" defaultValue={queryParam.get("priceFrom") ? queryParam.get("priceFrom") : 0} min="0" max="3000" /></div>
                                            </div>
                                            <div className="srch-tab-right transformed">
                                                <label>To Price</label>
                                                <div className="input-a"><input name="priceTo" type="number" defaultValue={queryParam.get("priceTo") ? queryParam.get("priceTo") : 3000} min="0" max="3000" /></div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="side-padding">
                                        <div className="side-lbl">Price</div>
                                        <div className="price-ranger">
                                            <div id="slider-range"></div>
                                        </div>
                                        <div className="price-ammounts">
                                            <input type="text" id="ammount-from" defaultValue={queryParam.get("priceFrom") ? queryParam.get("priceFrom") : 0} name="priceFrom" readOnly />
                                            <input type="text" id="ammount-to" defaultValue={queryParam.get("priceTo") ? queryParam.get("priceTo") : 1500} name="priceTo" readOnly />
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}


                            {/* <div className="side-block fly-in">
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
                            </div> */}


                            {/* <div className="side-block fly-in">
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
                            </div> */}


                        </div>
                        <div className="two-colls-right">
                            <div className="two-colls-right-b">
                                <div className="padding">

                                    <div className="catalog-head fly-in">
                                        <label>Sort results by:</label>
                                        <div className="search-select">
                                            <select id="sortBy" defaultValue={queryFilter?.sortBy} onChange={onChangeSortBy}>
                                                <option value="id">Index</option>
                                                <option value={seatClassType === "ECONOMY" ? "economyPrice" : "businessPrice"}>Price</option>
                                                <option value="departureTime">Depart Time</option>
                                                <option value="arrivalTime">Arrive Time</option>
                                            </select>
                                        </div>
                                        <label>Direction:</label>
                                        <div className="search-select">
                                            <select id="sortDir" defaultValue={queryFilter?.sortDir} onChange={onChangeSortDir}>
                                                <option value="asc">ASC</option>
                                                <option value="desc">DESC</option>
                                            </select>
                                        </div>
                                        <label>Page:</label>
                                        <div className="search-select">
                                            <select id="page" onChange={setPage} defaultValue={queryFilter?.page}>
                                                {[...Array(props?.flights?.data?.totalPages)].map((item, index) => (<option key={index + 1} value={index + 1}>{index + 1}</option>))}
                                            </select>
                                        </div>
                                        <label >Page:</label>
                                        <a title={isListView ? "Grid View" : "List View"} className={isListView ? "show-list chosen" : "show-list"} onClick={(e) => setIsListView(!isListView)}></a>
                                        <div className="clear"></div>
                                    </div>
                                    {/* List Flight here */}

                                    {!isListView ? (<div className="catalog-row">
                                        {props.flights?.data?.content?.map(flight =>
                                            <div className="alt-fligt-table fly-in" key={flight.id}>
                                                <div className="alt-fligt-table-a">
                                                    <div className="alt-fligt-table-img">
                                                        <a><img alt="" src="img/fl-transp-01.png" /></a>
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
                                                <div className="alt-flight fly-in" key={flight.id}>
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
                                                            <a  className="cat-list-btn" 
                                                                onClick={(e) => 
                                                                    handleGoToBooking(flight)}
                                                            >
                                                                SELECT NOW
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
                                                            <FontAwesomeIcon color="#4a90a4" title={(seatClassType == 'ECONOMY' ? ("Economy Baggage: " + flight.economyBaggage) : ("Business Baggage: " + flight.businessBaggage)) + "kg"} icon={faSuitcase} size='2x'></FontAwesomeIcon>
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

                                    {props.flights.data && (<div className="pagination">
                                        <a >{"<"}</a>
                                        {
                                            props?.flights?.data?.first ? (<>
                                                <a className="active">1</a>
                                                {props?.flights?.data?.totalPages >= 2 && <a onClick={setPage}>2</a>}
                                                {props?.flights?.data?.totalPages >= 3 && <a onClick={setPage}>3</a>}</>)
                                                : props?.flights?.data?.last ? (<>
                                                    {props?.flights?.data?.totalPages >= 3 && <a onClick={setPage}>{props?.flights?.data?.totalPages-2}</a>}
                                                    {props?.flights?.data?.totalPages >= 2 && <a onClick={setPage}>{props?.flights?.data?.totalPages-1}</a>}
                                                    <a className="active">{props?.flights?.data?.totalPages}</a></>)
                                                    : (<>
                                                        <a onClick={setPage}>{props?.flights?.data?.number}</a>
                                                        <a className="active">{props?.flights?.data?.number+1}</a>
                                                        <a onClick={setPage}>{props?.flights?.data?.number + 2}</a></>)
                                        }
                                        <a >{">"}</a>
                                        <div className="clear"></div>
                                    </div>)}
                                </div>
                            </div>
                            <br className="clear" />
                        </div>
                    </form>
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
        getFlight: (from, to, adult, child, infant, ddate, rdate, seatclass, priceFrom, priceTo, page, sortBy, sortDir) => {
            dispatch(fetchFlight(from, to, adult, child, infant, ddate, rdate, seatclass, priceFrom, priceTo, page, sortBy, sortDir))
        },
        clearBooking: () => {dispatch(clearBookingCached)}
        // getAirline: () => {
        //     dispatch()
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchPage);