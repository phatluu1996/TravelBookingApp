import React, { Component, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import { connect } from "react-redux";
import { fetchFlight } from "../actions/actionFlight";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlaneArrival,
    faPlaneDeparture,
    faCalendar,
    faRetweet,
    faSearch,
    faUserFriends,
    faChild,
    faBaby,
    faMale,
    faChair,
    faHotel,
    faPlane,
} from "@fortawesome/free-solid-svg-icons";
import { retrieveProvince } from "../actions/actionLocation";
import $ from 'jquery';
import { importAll } from "../utils/JqueryImport";
import Swiper from 'swiper';



const Home = (props) => {
    const [selectProvince, setSelectProvince] = useState(null);
    const [selectDistrict, setSelectDistrict] = useState(null);
    const [selectWard, setSelectWard] = useState(null);
    const [errFlt, setErrFlt] = useState({
        from: '',
        to: '',
        departureDate: ''
    })
    const [errHlt, setErrHlt] = useState({
        province: '',
        checkin: '',
        checkout: ''
    })
    const history = useHistory();

    const province = {
        properties: [
            {
                value: "",
                label: "--",
            },
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

    const seatClass = {
        properties: [
            {
                value: "ECONOMY",
                label: "Economy",
            },
            {
                value: "BUSINESS",
                label: "Business",
            },
        ],
    };

    useEffect(() => {
        let mount = false;
        window.scrollTo(0, 0);
        importAll();
        props.getProvince();
        return () => {
            mount = true;
        };
    }, []);

    const onChangeProvince = (e) => {
        document
            .querySelector("#districts")
            .parentElement.querySelector(".customSelectInner").innerHTML = "--";
        document
            .querySelector("#wards")
            .parentElement.querySelector(".customSelectInner").innerHTML = "--";
        if (e.currentTarget.id === "0") {
            setSelectDistrict(null);
            setSelectProvince(null);
            setSelectWard(null);
        } else {
            setSelectProvince(
                props.provinces.data.find(
                    (item) => item.id === parseInt(e.currentTarget.value)
                )
            );
        }
    };
    const onChangeDistrict = (e) => {
        document
            .querySelector("#wards")
            .parentElement.querySelector(".customSelectInner").innerHTML = "--";
        if (e.currentTarget.id === "0") {
            setSelectDistrict(null);
            setSelectWard(null);
        } else {
            setSelectDistrict(
                selectProvince.districts.find(
                    (item) => item.id === parseInt(e.currentTarget.value)
                )
            );
        }
    };
    const onChangeWard = (e) => {
        setSelectWard(
            selectDistrict.wards.find(
                (item) => item.id === parseInt(e.currentTarget.value)
            )
        );
    };

    const getNextDate = (e) => {
        const tomorrow = new Date(e);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
        }).format(tomorrow);
        return date;
    };

    const handleSubmitHotel = (e) => {
        e.preventDefault();
        var form = e.target;
        const today = new Date();
       
        if (validateHtl(form, "hotel-search")) {
            history.push(`/hotel-list?province=${selectProvince != null ? selectProvince.id : 0
                }&district=${selectDistrict != null ? selectDistrict.id : 0}&ward=${selectWard != null ? selectWard.id : 0
                }&numberAdult=${form.adultHotel.value}&numberChildren=${form.childRenHotel.value
                }&checkInDate=${form.checkInDate.value === ""? getNextDate(today):form.checkInDate.value
                }&checkOutDate=${form.checkOutDate.value === ""?form.checkInDate.value === ""?getNextDate(getNextDate(today)):getNextDate(form.checkInDate.value):form.checkOutDate.value
                }&numRoom=${form.roomHotel.value}`);
        }
    };

    // const dateConvert = (date) => {
    //     var st = date.replace("/", ".");
    //     var pattern = /(\d{2}).(\d{2}).(\d{4})/;
    //     var dt = new Date(st.replace(pattern, '$3-$2-$1'));
    //     return dt;
    // }
  
    const handleSubmitFlight = (e) => {
        e.preventDefault();
        // console.log(props);

        var form = e.target;

        if (validateFlt(form, "flight-search")) {
            if (form.returnDate.value) {
                history.push(`/flight-round-list?from=${form.from.value}&to=${form.to.value}&adult=${form.adult.value}&child=${form.child.value}&infant=${form.infant.value}&departureDate=${form.departureDate.value}&returnDate=${form.returnDate.value}&seatclassName=${form.seatClass.value}&priceFrom=1&priceTo=3000&page=1&sortBy=id&sortDir=asc`);
            } else {
                history.push(`/flight-list?from=${form.from.value}&to=${form.to.value}&adult=${form.adult.value}&child=${form.child.value}&infant=${form.infant.value}&departureDate=${form.departureDate.value}&returnDate=${form.returnDate.value}&seatclassName=${form.seatClass.value}&priceFrom=1&priceTo=3000&page=1&sortBy=id&sortDir=asc`);
            }

        }
    };

    const handleSubmitBoth = (e) => {
        e.preventDefault();
        var form = e.target;
        if(validateFlt(form, "hotel-flight-search")//Validate form with classname "hotel-flight-search"
        && validateHtl(form, "hotel-flight-search")){//Validate form with classname "hotel-flight-search"
            history.push("/combo-list?"
            +"from="+form.from.value
            +"&to="+form.to.value
            +"&adult="+form.adult.value
            +"&child="+form.child.value
            +"&infant="+form.infant.value
            +"&departureDate="+form.departureDate.value
            +"&returnDate="+form.returnDate.value
            +"&seatclassName="+form.seatClass.value
            +"&priceFrom=1&priceTo=3000&page=1&sortBy=id&sortDir=asc"
            +"&province="+form.province.value
            +"&district="+form.districts.value
            +"&ward="+form.wards.value
            +"&numberAdult="+form.adultHotel.value
            +"&numberChildren="+form.childRenHotel.value
            +"&checkInDate="+form.checkOutDate.value
            +"&checkOutDate="+form.checkOutDate.value
            +"&numRoom="+form.roomHotel.value
            );
        }


    }

    const validateFlt = (form, formSelector) => {
        var err = { ...errFlt };
        if (!form.from.value) {
            err.from = 'Departure City cannot be empty';
            form.from.parentElement.getElementsByTagName("span")[0].classList.add("is-invalid");
            $(`.${formSelector} #from-error`)[0].innerText = err.from;
        } else {
            err.from = '';
        }

        if (!form.to.value) {
            err.to = 'Arrival City cannot be empty';
            form.to.parentElement.getElementsByTagName("span")[0].classList.add("is-invalid");
            $(`.${formSelector} #to-error`)[0].innerText = err.to;
        } else {
            err.to = '';
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
                err.to = '';
            }
        }

        if (!form.departureDate.value) {
            err.departureDate = 'Departure Date City cannot be empty';
            form.departureDate.parentElement.classList.add("is-invalid");
            $(`.${formSelector} #departureDate-error`)[0].innerText = err.departureDate;
        } else {
            err.departureDate = '';
        }

        if (err.from || err.to || err.departureDate) {
            setErrFlt(err);
            return false;
        }
        return true;
    }

    const validateHtl = (form, formSelector) => {
        var err = { ...errHlt }
        if (form.province.value === "0") {
            err.province = 'Province cannot be empty';
            form.province.parentElement.getElementsByTagName("span")[0].classList.add("is-invalid");
            $(`.${formSelector} #province-error`)[0].innerText = err.province;
        } else {
            err.province = '';
        }

        if (!form.checkInDate.value) {
            err.checkin = 'Checkin date cannot be empty';
            form.checkInDate.parentElement.classList.add("is-invalid");
            $(`.${formSelector} #checkin-error`)[0].innerText = err.checkin;
        } else {
            err.checkin = '';
        }

        if (!form.checkOutDate.value) {
            err.checkout = 'Checkout date cannot be empty';
            form.checkOutDate.parentElement.classList.add("is-invalid");
            $(`.${formSelector} #checkout-error`)[0].innerText = err.checkout;
        } else {
            err.checkout = '';
        }

        if (err.province || err.checkin || err.checkout) {
            setErrHlt(err);
            return false;
        }
        return true;
    }

    return (
        <>
            <Header></Header>
            <div className="main-cont">
                <div className="mp-slider search-only">
                    <div className="mp-slider-row slim-slider">

                        <div className="swiper-container">
                            <div className="swiper-wrapper">

                                <div className="swiper-slide">
                                    <div className="slide-section" style={{ background: "url(img/sider-01.jpg) center center no-repeat", }}>
                                        <div className="mp-slider-lbl">
                                            Great journey begins with a small step
                                        </div>
                                        <div className="mp-slider-lbl-a">
                                            Make Your Life Better and Bright! You must trip with Us!
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="slide-section" style={{ background: "url(img/sider-02.jpg) center center no-repeat" }}>
                                        <div className="mp-slider-lbl">
                                            Relax with us. we love our clients
                                        </div>
                                        <div className="mp-slider-lbl-a">
                                            Make Your Life Better and Bright! You must trip with Us!
                                        </div>
                                    </div>
                                </div>
                                <div className="swiper-slide">
                                    <div className="slide-section slide-b" style={{ background: "url(img/sider-03.jpg) center no-repeat" }}>
                                        <div className="mp-slider-lbl">
                                            Booking flight with your friends
                                        </div>
                                        <div className="mp-slider-lbl-a">
                                            Make Your Life Better and Bright! You must trip with Us!
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="swiper-pagination"></div>
                        </div>
                    </div>
                </div>

                <div className="wrapper-a-holder full-width-search mb-4">
                    <div className="wrapper-a">
                        <div className="page-search full-width-search search-type-b">
                            <div className="search-type-padding">
                                <nav className="page-search-tabs">
                                    <div className="search-tab active" title="Hotel Booking"><FontAwesomeIcon icon={faHotel} color="#fac807"></FontAwesomeIcon></div>
                                    <div className="search-tab" title="Flight Booking"><FontAwesomeIcon icon={faPlane} color="#007bff"></FontAwesomeIcon></div>
                                    <div className="search-tab" title="Hotel + Flight"><FontAwesomeIcon icon={faHotel} color="#fac807"></FontAwesomeIcon> + <FontAwesomeIcon icon={faPlane} color="#007bff"></FontAwesomeIcon></div>
                                    <div className="clear"></div>
                                </nav>
                                <div className="page-search-content">
                                    <form onSubmit={handleSubmitHotel} className="hotel-search search-tab-content" autoComplete="off">
                                        <div className="page-search-p">
                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-3c">
                                                        <label>Province</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                onChange={onChangeProvince}
                                                                className="custom-select"
                                                                name="province"
                                                                id="provinces"
                                                            >
                                                                <option key={0} value={0}>
                                                                    --
                                                                </option>
                                                                {props.provinces?.data?.map((item) => (
                                                                    <option key={item.id} value={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="booking-error-input" id="province-error"></div>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>District</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                onChange={onChangeDistrict}
                                                                className="custom-select"
                                                                name="district"
                                                                id="districts"
                                                            >
                                                                <option key={0} value={0}>
                                                                    --
                                                                </option>
                                                                {selectProvince?.districts?.map((item) => (
                                                                    <option key={item.id} value={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>Ward</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                className="custom-select"
                                                                name="ward"
                                                                id="wards"
                                                                onChange={onChangeWard}
                                                            >
                                                                <option key={0} value={0}>
                                                                    --
                                                                </option>
                                                                {selectDistrict?.wards?.map((item) => (
                                                                    <option key={item.id} value={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-left">
                                                        <label>Check in</label>
                                                        <div className="input-a">
                                                            <input
                                                                name="checkInDate"
                                                                id="checkInDate"
                                                                type="text"
                                                                className="date-inpt"
                                                                placeholder="mm/dd/yy"
                                                                autoComplete={"off"}
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                        <div className="booking-error-input" id="checkin-error"></div>
                                                    </div>
                                                    <div className="srch-tab-right">
                                                        <label>Check out</label>
                                                        <div className="input-a">
                                                            <input
                                                                name="checkOutDate"
                                                                id="checkOutDate"
                                                                type="text"
                                                                className="date-inpt"
                                                                placeholder="mm/dd/yy"
                                                                autoComplete={"off"}
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                        <div className="booking-error-input" id="checkout-error"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-3c">
                                                        <label>Rooms</label>

                                                        <div className="input-a">
                                                            <input
                                                                id="roomHotel"
                                                                name="roomHotel"
                                                                type="number"
                                                                defaultValue={1}
                                                                min="1"
                                                                max="30"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>adult</label>
                                                        <div className="input-a">
                                                            <input
                                                                id="adultHotel"
                                                                name="adultHotel"
                                                                type="number"
                                                                defaultValue={1}
                                                                min="1"
                                                                max="7"
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="srch-tab-3c">
                                                        <label>Child</label>
                                                        <div className="input-a">
                                                            <input
                                                                id="childRenHotel"
                                                                name="childRenHotel"
                                                                type="number"
                                                                defaultValue={0}
                                                                min="0"
                                                                max="7"
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>
                                        <footer className="search-footer">
                                            <button className="srch-btn">Search</button>
                                            <div className="clear"></div>
                                        </footer>
                                    </form>

                                    <form onSubmit={handleSubmitFlight} className="flight-search search-tab-content" autoComplete="off">
                                        <div className="page-search-p">
                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-left transformed">
                                                        <label>From</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                className="custom-select"
                                                                name="from"
                                                                id="departure-city"
                                                            >
                                                                {province.properties.map((province) => (
                                                                    <option key={province.value} value={province.value} >
                                                                        {province.label}{" "}
                                                                        {province.value
                                                                            ? "(" + province.value + ")"
                                                                            : ""}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="booking-error-input" id="from-error"></div>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-right transformed">
                                                        <label>To</label>
                                                        <div className="select-wrapper">
                                                            <select className="custom-select" name="to" id="arrival-city" >
                                                                {province.properties.map((province) => (
                                                                    <option key={province.value} value={province.value} >
                                                                        {province.label}{" "}
                                                                        {province.value
                                                                            ? "(" + province.value + ")"
                                                                            : ""}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="booking-error-input" id="to-error"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-3c">
                                                        <label>Departure</label>
                                                        <div className="input-a">
                                                            <input
                                                                type="text"
                                                                className="date-departure-flight-inpt"
                                                                name="departureDate"
                                                                id="departureDate"
                                                                placeholder="mm/dd/yy"
                                                                autoComplete={"off"}
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                        <div className="booking-error-input" id="departureDate-error"></div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>Return</label>
                                                        <div className="input-a">
                                                            <input
                                                                type="text"
                                                                className="date-departure-flight-inpt"
                                                                name="returnDate"
                                                                id="returnDate"
                                                                placeholder="mm/dd/yy"
                                                                autoComplete={"off"}
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>seat class </label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                className="custom-select"
                                                                name="seatClass"
                                                                id="seatClass"
                                                            >
                                                                {seatClass.properties.map((item) => (
                                                                    <option key={item.value} value={item.value}>
                                                                        {item.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-3c">
                                                        <label>Adult</label>
                                                        <div className="input-a">
                                                            <input
                                                                name="adult"
                                                                type="number"
                                                                defaultValue={1}
                                                                min="1"
                                                                max="7"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>Child</label>

                                                        <div className="input-a">
                                                            <input
                                                                name="child"
                                                                type="number"
                                                                defaultValue={0}
                                                                min="0"
                                                                max="6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>Infant</label>

                                                        <div className="input-a">
                                                            <input
                                                                name="infant"
                                                                type="number"
                                                                defaultValue={0}
                                                                max="6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>
                                        <footer className="search-footer">
                                            <button type="submit" className="srch-btn">
                                                Search
                                            </button>
                                            <div className="clear"></div>
                                        </footer>
                                    </form>

                                    <form onSubmit={handleSubmitBoth} className="hotel-flight-search search-tab-content" autoComplete="off">
                                        <div className="page-search-p">
                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-left transformed">
                                                        <label>From</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                className="custom-select"
                                                                name="from"
                                                                id="departure-city"
                                                            >
                                                                {province.properties.map((province) => (
                                                                    <option key={province.value} value={province.value} >
                                                                        {province.label}{" "}
                                                                        {province.value
                                                                            ? "(" + province.value + ")"
                                                                            : ""}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="booking-error-input" id="from-error"></div>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-right transformed">
                                                        <label>To</label>
                                                        <div className="select-wrapper">
                                                            <select className="custom-select" name="to" id="arrival-city" >
                                                                {province.properties.map((province) => (
                                                                    <option key={province.value} value={province.value} >
                                                                        {province.label}{" "}
                                                                        {province.value
                                                                            ? "(" + province.value + ")"
                                                                            : ""}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                        <div className="booking-error-input" id="to-error"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-3c">
                                                        <label>Departure</label>
                                                        <div className="input-a">
                                                            <input
                                                                type="text"
                                                                className="date-inpt"
                                                                name="departureDate"
                                                                // id="departureDate"
                                                                placeholder="mm/dd/yy"
                                                                autoComplete={"off"}
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                        <div className="booking-error-input" id="departureDate-error"></div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>Return</label>
                                                        <div className="input-a">
                                                            <input
                                                                type="text"
                                                                className="date-inpt"
                                                                name="returnDate"
                                                                // id="returnDate"
                                                                placeholder="mm/dd/yy"
                                                                autoComplete={"off"}
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>seat class </label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                className="custom-select"
                                                                name="seatClass"
                                                                id="seatClass"
                                                            >
                                                                {seatClass.properties.map((item) => (
                                                                    <option key={item.value} value={item.value}>
                                                                        {item.label}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-3c">
                                                        <label>Adult</label>
                                                        <div className="input-a">
                                                            <input
                                                                name="adult"
                                                                type="number"
                                                                defaultValue={1}
                                                                min="1"
                                                                max="7"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>Child</label>

                                                        <div className="input-a">
                                                            <input
                                                                name="child"
                                                                type="number"
                                                                defaultValue={0}
                                                                min="0"
                                                                max="6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>Infant</label>

                                                        <div className="input-a">
                                                            <input
                                                                name="infant"
                                                                type="number"
                                                                defaultValue={0}
                                                                max="6"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>
                                        <div className="page-search-p">
                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-3c">
                                                        <label>Province</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                onChange={onChangeProvince}
                                                                className="custom-select"
                                                                name="province"
                                                                id="provinces"
                                                            >
                                                                <option key={0} value={0}>
                                                                    --
                                                                </option>
                                                                {props.provinces?.data?.map((item) => (
                                                                    <option key={item.id} value={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                            <div className="booking-error-input" id="province-error"></div>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>District</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                onChange={onChangeDistrict}
                                                                className="custom-select"
                                                                name="district"
                                                                id="districts"
                                                            >
                                                                <option key={0} value={0}>
                                                                    --
                                                                </option>
                                                                {selectProvince?.districts?.map((item) => (
                                                                    <option key={item.id} value={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>Ward</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                className="custom-select"
                                                                name="ward"
                                                                id="wards"
                                                                onChange={onChangeWard}
                                                            >
                                                                <option key={0} value={0}>
                                                                    --
                                                                </option>
                                                                {selectDistrict?.wards?.map((item) => (
                                                                    <option key={item.id} value={item.id}>
                                                                        {item.name}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-left">
                                                        <label>Check in</label>
                                                        <div className="input-a">
                                                            <input
                                                                name="checkInDate"
                                                                // id="checkInDate"
                                                                type="text"
                                                                className="date-inpt"
                                                                placeholder="mm/dd/yy"
                                                                autoComplete={"off"}
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                        <div className="booking-error-input" id="checkin-error"></div>
                                                    </div>
                                                    <div className="srch-tab-right">
                                                        <label>Check out</label>
                                                        <div className="input-a">
                                                            <input
                                                                name="checkOutDate"
                                                                // id="checkOutDate"
                                                                type="text"
                                                                className="date-inpt"
                                                                placeholder="mm/dd/yy"
                                                                autoComplete={"off"}
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                        <div className="booking-error-input" id="checkout-error"></div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-3c">
                                                        <label>Rooms</label>

                                                        <div className="input-a">
                                                            <input
                                                                id="roomHotel"
                                                                name="roomHotel"
                                                                type="number"
                                                                defaultValue={1}
                                                                min="1"
                                                                max="30"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>adult</label>
                                                        <div className="input-a">
                                                            <input
                                                                id="adultHotel"
                                                                name="adultHotel"
                                                                type="number"
                                                                defaultValue={1}
                                                                min="1"
                                                                max="7"
                                                            />
                                                        </div>

                                                    </div>

                                                    <div className="srch-tab-3c">
                                                        <label>Child</label>
                                                        <div className="input-a">
                                                            <input
                                                                id="childRenHotel"
                                                                name="childRenHotel"
                                                                type="number"
                                                                defaultValue={0}
                                                                min="0"
                                                                max="7"
                                                            />
                                                        </div>

                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="clear"></div>
                                        </div>
                                        <footer className="search-footer">
                                            <button className="srch-btn">Search</button>
                                            <div className="clear"></div>
                                        </footer>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>

                <div className="pop-destinations">
                    <header className="fly-in page-lbl">
                        <b>Popular Hotel</b>
                        <p>
                            Special offer for Sparrow members
                        </p>
                    </header>
                    <div className="mp-popular-row popular-flat">
                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-hotel-01.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Intercontinental Danang Sun Penisula</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 AUG 2020 - 22 NOV 2021
                                    </div>
                                    <nav className="stars">
                                        <ul>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-a.png" />
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="clear"></div>
                                    </nav>
                                </div>
                                <div className="offer-slider-r align-right">
                                    <b>380$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-hotel-02.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Metropole Ha Noi</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 AUG 2020 - 22 NOV 2021
                                    </div>
                                    <nav className="stars">
                                        <ul>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-a.png" />
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="clear"></div>
                                    </nav>
                                </div>
                                <div className="offer-slider-r align-right">
                                    <b>173$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-hotel-03.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Four Seasons The Nam Hai Resort</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 AUG 2020 - 22 NOV 2021
                                    </div>
                                    <nav className="stars">
                                        <ul>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-a.png" />
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="clear"></div>
                                    </nav>
                                </div>
                                <div className="offer-slider-r align-right">
                                    <b>800$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-hotel-04.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Laguna Lăng Cô</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 AUG 2020 - 22 NOV 2021
                                    </div>
                                    <nav className="stars">
                                        <ul>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-a.png" />
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="clear"></div>
                                    </nav>
                                </div>
                                <div className="offer-slider-r align-right">
                                    <b>260$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-hotel-05.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Dalat Palace</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 AUG 2020 - 22 NOV 2021
                                    </div>
                                    <nav className="stars">
                                        <ul>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-a.png" />
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="clear"></div>
                                    </nav>
                                </div>
                                <div className="offer-slider-r align-right">
                                    <b>117$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-hotel-06.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Vinpearl Resort & Spa Halong</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 AUG 2020 - 22 NOV 2021
                                    </div>
                                    <nav className="stars">
                                        <ul>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-b.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/star-a.png" />
                                                </a>
                                            </li>
                                        </ul>
                                        <div className="clear"></div>
                                    </nav>
                                </div>
                                <div className="offer-slider-r align-right">
                                    <b>130$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>

                <div className="partners-wrapper">
                    <header className="fly-in page-lbl">
                        <b>Our Airline partner</b>
                        <p>
                            Global airline partners will take you to any destination in the world.
                            <br />
                        </p>
                    </header>
                    <div className="partners fly-in">
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2019/09/11/1568212919133-2482812716f8f0532738cb4518387a0d.png?tr=q-75,w-82" />
                        </a>
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2020/02/21/1582260108949-09348d284bb3fd1675614f43ab22a6d8.png?tr=q-75,w-82" />
                        </a>
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2019/09/11/1568213402893-2a4ed3c760d1f8c92fd95efa17a60377.png?tr=q-75,w-82" />
                        </a>
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2021/05/04/1620136036133-d74f19434de12f627b593e49a144ff6c.png?tr=q-75,w-82" />
                        </a>
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2020/09/29/1601371217702-a33be2e4dcf4e85af9a3739912cc17d5.png?tr=q-75,w-82" />
                        </a>
                    </div>
                </div>
                <div className="partners-wrapper">
                    <header className="fly-in page-lbl">
                        <b>Our Hotel partner</b>
                        <p>
                            We partner with hotel chains all over the world to ensure the best stay in every destination of your dreams!
                            <br />
                        </p>
                    </header>
                    <div className="partners fly-in">
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2017/08/08/1502200776552-f852b752ae88e7e0902fb0d3bfc41a00.png?tr=q-75,w-82" />
                        </a>
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2017/08/08/1502200782803-92cd85419dd6440bbc1c7b8d5a061249.png?tr=q-75,w-82" />
                        </a>
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2017/08/08/1502200819165-5bd89b99597e581e6917c18eb32695ca.png?tr=q-50,w-82" />
                        </a>
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2017/08/08/1502200805093-7f22b69691bac8cee0ef4b3f0988fd78.png?tr=q-75,w-82" />
                        </a>
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2017/08/08/1502200796134-3e687ae7c1e145253ef72691f5f18318.png?tr=q-75,w-82" />
                        </a>
                        <a>
                            <img alt="" src="https://ik.imagekit.io/tvlk/image/imageResource/2017/08/08/1502200809743-5dde6f77b2b13ac38a752953eb78e692.png?tr=q-75,w-82" />
                        </a>
                    </div>
                </div>

                <div className="pop-destinations">
                    <div className="wrapper-padding">
                        <header className="fly-in page-lbl">
                            <b className="offer-slider-lbl">What do you want to discover? </b>
                        </header>
                        <div className="mp-popular-row popular-flat">
                            <div className="tabs-type-a tabs-block">
                                <nav className="tabs-nav">
                                    <ul>
                                        <li><a className="active">Top flight routes</a></li>
                                        <li><a>top hotels </a></li>
                                    </ul>
                                    <div className="clear"></div>
                                </nav>
                                <div className="tabs-content">
                                    <div className="tabs-content-i">
                                        <div className="columns-block">
                                            <div className="columns-row">
                                                <div className="column mm-3">
                                                    <p>Vé máy bay Sài Gòn - Hà Nội</p>
                                                    <p>Vé máy bay Sài Gòn - Đà Nẵng</p>
                                                    <p>Vé máy bay Sài Gòn - Phú Quốc</p>
                                                    <p>Vé máy bay Sài Gòn - Nha Trang</p>
                                                    <p>Vé máy bay Sài Gòn - Đà Lạt</p>
                                                </div>
                                                <div className="column mm-3">
                                                    <p>Vé máy bay Hà Nội - Sài Gòn</p>
                                                    <p>Vé máy bay Hà Nội - Phú Quốc</p>
                                                    <p>Vé máy bay Hà Nội - Đà Nẵng</p>
                                                    <p>Vé máy bay Hà Nội - Nha Trang</p>
                                                    <p>Vé máy bay Hà Nội - Đà Lạt</p>
                                                </div>
                                                <div className="column mm-3">
                                                    <p>Vé máy bay Đà Nẵng - Sài Gòn</p>
                                                    <p>Vé máy bay Đà Nẵng - Hà Nội</p>
                                                    <p>Vé máy bay Đà Lạt - Sài Gòn</p>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>

                                    </div>
                                    <div className="tabs-content-i">
                                        <div className="columns-block">
                                            <div className="columns-row">
                                                <div className="column mm-3">
                                                    <p>Khách sạn Vũng Tàu</p>
                                                    <p>Khách sạn Đà Lạt</p>
                                                    <p>Khách sạn Đà Nẵng</p>
                                                    <p>Khách sạn Hồ Chí Minh</p>
                                                </div>
                                                <div className="column mm-3">
                                                    <p>Khách sạn Nha Trang</p>
                                                    <p>Khách sạn Hội An</p>
                                                    <p>Khách sạn Sa Pa</p>
                                                    <p>Khách sạn Hà Nội</p>
                                                </div>
                                                <div className="column mm-3">
                                                    <p>Khách sạn Phan Thiết</p>
                                                    <p>Khách sạn Phú Quốc</p>
                                                    <p>Khách sạn Quy Nhơn</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>
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
        provinces: state.province,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getProvince: () => {
            dispatch(retrieveProvince());
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
