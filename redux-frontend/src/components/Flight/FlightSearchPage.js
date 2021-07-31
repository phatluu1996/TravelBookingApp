import { useEffect, setState, useState, Component } from "react";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";
import { fetchFlight } from "../../actions/actionFlight";
import { miniSerializeError } from "@reduxjs/toolkit";
import { faHourglass } from "@fortawesome/free-solid-svg-icons";
import $ from 'jquery';
import query from "esquery";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const FlightSearchPage = (props) => {
    // const history = useHistory();
    let queryParam = useQuery();
    const [queryFilter, setQueryFilter] = useState();
    const [seatClassType, setSeatClassType] = useState("ECONOMY");
    const [isListView, setIsListView] = useState(true);
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

        if (!queryParam.get("from") && !queryParam.get("to") && !queryParam.get("departureDate") && !queryParam.get("returnDate") && !queryParam.get("seatClass") && !queryParam.get("adult") && !queryParam.get("child") && !queryParam.get("infant") && !queryParam.get("page") && !queryParam.get("sortDir") && !queryParam.get("sortBy")) {
            document.location.href = "/";
        } else {
            if (!props.flight) {
                props.getFlight(queryParam.get("from"), queryParam.get("to"), queryParam.get("adult"), queryParam.get("child"), queryParam.get("infant"), queryParam.get("departureDate"), queryParam.get("returnDate"), queryParam.get("seatClass"), 1, queryParam.get("sortBy"), queryParam.get("sortDir"));
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
        props.getFlight(form.from.value, form.to.value, form.adult.value, form.child.value, form.infant.value, form.departureDate.value, form.returnDate.value, form.seatClass.value, 1, "id", "asc");//queryFilter.sortBy //queryFilter.sortDir
        window.history.pushState({}, null, `/flight-list?from=${form.from.value}&to=${form.to.value}&adult=${form.adult.value}&child=${form.child.value}&infant=${form.infant.value}&departureDate=${form.departureDate.value}&returnDate=${form.returnDate.value}&seatclassName=${form.seatClass.value}&page${1}&sortBy=id&sortDir=asc`)

        document.getElementById("page").value = "1";
        document.getElementById("sortBy").value = "id";
        document.getElementById("sortDir").value = "asc";

        var filter = {
            from: form.from.value,
            to: form.to.value,
            departureDate: form.departureDate.value,
            returnDate: form.returnDate.value,
            seatClass: form.seatClass.value,
            adult: form.adult.value,
            child: form.child.value,
            infant: form.infant.value,
            page: 1,
            sortBy: "id",//queryParam.get("sortBy"),
            sortDir: "asc"//queryParam.get("sortDir")
        };
        setQueryFilter(filter);
        setSeatClassType(form.seatClass.value);

    }

    const setPage = (e) => {
        var index = e.target.value;
        props.getFlight(queryFilter.from, queryFilter.to, queryFilter.adult, queryFilter.child, queryFilter.infant, queryFilter.departureDate, queryFilter.returnDate, queryFilter.seatClass, parseInt(index), queryFilter.sortBy, queryFilter.sortDir);
        window.history.pushState({}, null, `/flight-list?from=${queryFilter.from}&to=${queryFilter.to}&adult=${queryFilter.adult}&child=${queryFilter.child}&infant=${queryFilter.infant}&departureDate=${queryFilter.departureDate}&returnDate=${queryFilter.returnDate}&seatclassName=${queryFilter.seatClass}&page${parseInt(index)}&sortBy=${queryFilter.sortBy}&sortDir=${queryFilter.sortDir}`)
        var filter = { ...queryFilter };
        filter.page = parseInt(index);
        setQueryFilter(filter);
    }

    const onChangeSortBy = (e) => {
        var filter = { ...queryFilter };
        filter.sortBy = e.target.value;
        filter.page = 1;
        setQueryFilter(filter);
        props.getFlight(filter.from, filter.to, filter.adult, filter.child, filter.infant, filter.departureDate, filter.returnDate, filter.seatClass, filter.page, filter.sortBy, filter.sortDir);
        window.history.pushState({}, null, `/flight-list?from=${filter.from}&to=${filter.to}&adult=${filter.adult}&child=${filter.child}&infant=${filter.infant}&departureDate=${filter.departureDate}&returnDate=${filter.returnDate}&seatclassName=${filter.seatClass}&page${filter.page}&sortBy=${filter.sortBy}&sortDir=${filter.sortDir}`)
    }

    const onChangeSortDir = (e) => {
        var filter = { ...queryFilter };
        filter.sortDir = e.target.value;
        filter.page = 1;
        setQueryFilter(filter);
        props.getFlight(filter.from, filter.to, filter.adult, filter.child, filter.infant, filter.departureDate, filter.returnDate, filter.seatClass, filter.page, filter.sortBy, filter.sortDir);
        window.history.pushState({}, null, `/flight-list?from=${filter.from}&to=${filter.to}&adult=${filter.adult}&child=${filter.child}&infant=${filter.infant}&departureDate=${filter.departureDate}&returnDate=${filter.returnDate}&seatclassName=${filter.seatClass}&page${filter.page}&sortBy=${filter.sortBy}&sortDir=${filter.sortDir}`)
    }

    const toggleDetails = (e) => {

    }

    const flightPrice = (flight) => {
        var price = seatClassType === "ECONOMY" ? flight.economyPrice : flight.businessPrice;
        return price;
    }


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
                    <form className="two-colls" onSubmit={handleSubmit}>
                        <div className="two-colls-left">

                            <div className="srch-results-lbl fly-in">
                                <span>{props.flights?.data?.totalElements} results found.</span>
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
                                        <div className="srch-tab-line no-margin-bottom">
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

                                        <button type="submit" className="srch-btn">Search</button>
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
                                            <input type="text" id="priceFrom" readOnly />
                                            <input type="text" id="priceTo" readOnly />
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
                                                        <a href="#"><img alt="" src="img/fl-transp-01.png" /></a>
                                                    </div>
                                                    <div className="alt-fligt-table-content">
                                                        <div className="alt-lbl">{provinceLabel(flight.departureCity)} - {provinceLabel(flight.arrivalCity)}</div>
                                                        <div className="alt-info"><b>#{flight.id} </b>One way trip</div>
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
                                                                <a href="#" className="cat-list-btn">select</a>
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
                                                                                <div className="alt-info"><b>#{flight.id} </b>One way trip</div>
                                                                                <div className="alt-devider"></div>
                                                                                <div className="flight-line-b" onClick={toggleDetails}>
                                                                                    <b>details</b>
                                                                                    <span>Only 2 seats!</span>
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
                                            )}
                                        </div>)}

                                    <div className="clear"></div>

                                    <div className="pagination">
                                        <a >{"<"}</a>
                                        <a className="active" >1</a>
                                        <a >2</a>
                                        <a >3</a>
                                        <a >{">"}</a>
                                        <div className="clear"></div>
                                    </div>
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
        flights: state.flight
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getFlight: (from, to, adult, child, infant, ddate, rdate, seatclassName, page, sortBy, sortDir) => {
            dispatch(fetchFlight(from, to, adult, child, infant, ddate, rdate, seatclassName, page, sortBy, sortDir))
        },
        // getAirline: () => {
        //     dispatch()
        // }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FlightSearchPage);