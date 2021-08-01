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
} from "@fortawesome/free-solid-svg-icons";
import { retrieveProvince } from "../actions/actionLocation";
import $ from 'jquery';
import { importAll } from "../utils/JqueryImport";
// import { Swiper, SwiperSlide } from "swiper/react";
import Swiper from 'swiper';



const Home = (props) => {
    const [selectProvince, setSelectProvince] = useState(null);
    const [selectDistrict, setSelectDistrict] = useState(null);
    const [selectWard, setSelectWard] = useState(null);
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

    const swapCity = () => { };

    useEffect(() => {
        let mount = false;
        window.scrollTo(0, 100);
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

        // history.push()
        document.location.href = `/hotel-list?province=${selectProvince != null ? selectProvince.id : 0
            }&district=${selectDistrict != null ? selectDistrict.id : 0}&ward=${selectWard != null ? selectWard.id : 0
            }&numberAdult=${form.adultHotel.value}&numberChildren=${form.childRenHotel.value
            }&checkInDate=${form.checkInDate.value === ""
                ? getNextDate(today)
                : form.checkInDate.value
            }&checkOutDate=${form.checkOutDate.value === ""
                ? form.checkInDate.value === "" ? getNextDate(getNextDate(today)) : getNextDate(form.checkInDate.value)
                : form.checkOutDate.value
            }&numRoom=${form.roomHotel.value}`;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(props);
        var form = e.target;
        // props.getFlight(form.from.value, form.to.value, form.adult.value, form.child.value, form.infant.value, form.departureDate.value, form.returnDate.value, form.seatClass.value);
        // history.push(`/flight-list?from=${form.from.value}&to=${form.to.value}&adult=${form.adult.value}&child=${form.child.value}&infant=${form.infant.value}&departureDate=${form.departureDate.value}&returnDate=${form.returnDate.value}&seatClass=${form.seatClass.value}`);
        // document.location.href = `/flight-list?from=${form.from.value}&to=${form.to.value}&adult=${form.adult.value}&child=${form.child.value}&infant=${form.infant.value}&departureDate=${form.departureDate.value}&returnDate=${form.returnDate.value}&seatClass=${form.seatClass.value}&page=1&sortBy=id&sortDir=asc`;
        history.push(`/flight-list?from=${form.from.value}&to=${form.to.value}&adult=${form.adult.value}&child=${form.child.value}&infant=${form.infant.value}&departureDate=${form.departureDate.value}&returnDate=${form.returnDate.value}&seatClass=${form.seatClass.value}&priceFrom=1&priceTo=3000&page=1&sortBy=id&sortDir=asc`);
    };

    return (
        <>
            <Header></Header>
            <div className="main-cont">
                <div className="mp-slider search-only">
                    <div className="mp-slider-row slim-slider">

                        <div class="swiper-container my-swiper">

                            <div class="swiper-wrapper">

                                <div class="swiper-slide">
                                    <div className="slide-section" style={{ background: "url(img/sider-01.jpg) center center no-repeat", }}>
                                        <div className="mp-slider-lbl">
                                            Great journey begins with a small step
                                        </div>
                                        <div className="mp-slider-lbl-a">
                                            Make Your Life Better and Bright! You must trip with Us!
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
                                    <div className="slide-section" style={{ background: "url(img/sider-02.jpg) center center no-repeat" }}>
                                        <div className="mp-slider-lbl">
                                            Relax with us. we love our clients
                                        </div>
                                        <div className="mp-slider-lbl-a">
                                            Make Your Life Better and Bright! You must trip with Us!
                                        </div>
                                    </div>
                                </div>
                                <div class="swiper-slide">
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
                            <div class="swiper-pagination"></div>
                        </div>
                    </div>
                </div>

                <div className="wrapper-a-holder full-width-search">
                    <div className="wrapper-a">
                        <div className="page-search full-width-search search-type-b">
                            <div className="search-type-padding">
                                <nav className="page-search-tabs">
                                    <div className="search-tab active">Hotels</div>
                                    <div className="search-tab ">FLights</div>
                                    <div className="clear"></div>
                                </nav>
                                <div className="page-search-content">
                                    <form
                                        onSubmit={handleSubmitHotel}
                                        className=" search-tab-content"
                                    >
                                        <div className="page-search-p">
                                            <div className="search-large-i">
                                                <div className="srch-tab-line no-margin-bottom">
                                                    <div className="srch-tab-3c">
                                                        <label>Province</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                onChange={onChangeProvince}
                                                                className="custom-select"
                                                                name="seatClass"
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
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-3c">
                                                        <label>District</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                onChange={onChangeDistrict}
                                                                className="custom-select"
                                                                name="seatClass"
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
                                                                name="seatClass"
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
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
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
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
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
                                            <span className="srch-lbl">Advanced Search options</span>
                                            <div className="clear"></div>
                                        </footer>
                                    </form>

                                    <form onSubmit={handleSubmit} className="search-tab-content">
                                        <div className="page-search-p">
                                            <div className="search-large-i">
                                                <div className="srch-tab-line">
                                                    <div className="srch-tab-left transformed">
                                                        <label>From</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                className="custom-select"
                                                                name="from"
                                                                id="departure-city"
                                                            >
                                                                {province.properties.map((province) => (
                                                                    <option
                                                                        key={province.value}
                                                                        value={province.value}
                                                                    >
                                                                        {province.label}{" "}
                                                                        {province.value
                                                                            ? "(" + province.value + ")"
                                                                            : ""}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-right transformed">
                                                        <label>To</label>
                                                        <div className="select-wrapper">
                                                            <select
                                                                className="custom-select"
                                                                name="to"
                                                                id="arrival-city"
                                                            >
                                                                {province.properties.map((province) => (
                                                                    <option
                                                                        key={province.value}
                                                                        value={province.value}
                                                                    >
                                                                        {province.label}{" "}
                                                                        {province.value
                                                                            ? "(" + province.value + ")"
                                                                            : ""}
                                                                    </option>
                                                                ))}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="search-large-i">
                                                <div className="srch-tab-line">
                                                    <div className="srch-tab-left">
                                                        <label>Departure</label>
                                                        <div className="input-a">
                                                            <input
                                                                type="text"
                                                                className="date-inpt"
                                                                name="departureDate"
                                                                id="departureDate"
                                                                placeholder="mm/dd/yy"
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                    </div>
                                                    <div className="srch-tab-right">
                                                        <label>arrivals</label>
                                                        <div className="input-a">
                                                            <input
                                                                type="text"
                                                                className="date-inpt"
                                                                name="returnDate"
                                                                id="returnDate"
                                                                placeholder="mm/dd/yy"
                                                            />{" "}
                                                            <span className="date-icon"></span>
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>

                                            <div className="search-large-i">
                                                <div className="srch-tab-line">
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

                                            <div className="search-large-i">
                                                <div className="srch-tab-line">
                                                    <div className="srch-tab-left">
                                                        <label>className </label>
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
                                                </div>
                                                <div className="clear"></div>
                                            </div>

                                            <div className="clear"></div>

                                            <div className="search-asvanced">
                                                <div className="search-large-i">
                                                    <div className="srch-tab-line no-margin-bottom">
                                                        <label>Price</label>
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
                                                </div>

                                                <div className="search-large-i">
                                                    <div className="srch-tab-line no-margin-bottom">
                                                        <label>Air company</label>
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
                                                </div>

                                                <div className="search-large-i">
                                                    <div className="srch-tab-line no-margin-bottom">
                                                        <label>Rating</label>
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
                                                </div>

                                                <div className="clear"></div>
                                            </div>
                                        </div>
                                        <footer className="search-footer">
                                            {/* <button onClick={swapCity} className="btn btn-circle rotate"><FontAwesomeIcon icon={faRetweet} color="#FFFFFF" /></button> */}
                                            <button type="submit" className="srch-btn">
                                                Search
                                            </button>
                                            <span className="srch-lbl">Advanced Search options</span>
                                            <div className="clear"></div>
                                        </footer>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>

                <div className="mp-pop">
                    <div className="wrapper-padding-a">
                        <div className="popular-slider">
                            <header className="fly-in page-lbl">
                                <b>We are Offering the hottest offers</b>
                                <p>
                                    Voluptatem quia voluptas sit aspernatur aut odit aut fugit,
                                    sed quia consequuntur magni
                                    <br />
                                    dolores eos qui.
                                </p>
                            </header>
                            <div className="fly-in offer-slider-c">
                                <div id="offers" className="owl-slider">
                                    <div className="offer-slider-i">
                                        <a className="offer-slider-img">
                                            <img alt="" src="img/slide-01.jpg" />
                                            <span className="offer-slider-overlay">
                                                <span className="offer-slider-btn">view details</span>
                                            </span>
                                        </a>
                                        <div className="offer-slider-txt">
                                            <div className="offer-slider-link">
                                                <a>Andrassy Thai Hotel</a>
                                            </div>
                                            <div className="offer-slider-l">
                                                <div className="offer-slider-location">
                                                    Location: Thailand{" "}
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
                                            <div className="offer-slider-r">
                                                <b>756$</b>
                                                <span>avg/night</span>
                                            </div>
                                            <div className="offer-slider-devider"></div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="offer-slider-i">
                                        <a className="offer-slider-img">
                                            <img alt="" src="img/slide-02.jpg" />
                                            <span className="offer-slider-overlay">
                                                <span className="offer-slider-btn">view details</span>
                                            </span>
                                        </a>
                                        <div className="offer-slider-txt">
                                            <div className="offer-slider-link">
                                                <a>Campanile Cracovie</a>
                                            </div>
                                            <div className="offer-slider-l">
                                                <div className="offer-slider-location">
                                                    location: poland
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
                                            <div className="offer-slider-r">
                                                <b>900$</b>
                                                <span>avg/night</span>
                                            </div>
                                            <div className="offer-slider-devider"></div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="offer-slider-i">
                                        <a className="offer-slider-img">
                                            <img alt="" src="img/slide-03.jpg" />
                                            <span className="offer-slider-overlay">
                                                <span className="offer-slider-btn">view details</span>
                                            </span>
                                        </a>
                                        <div className="offer-slider-txt">
                                            <div className="offer-slider-link">
                                                <a>Park Plaza Westminster</a>
                                            </div>
                                            <div className="offer-slider-l">
                                                <div className="offer-slider-location">
                                                    Location: Thailand{" "}
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
                                                                <img alt="" src="img/star-b.png" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div className="clear"></div>
                                                </nav>
                                            </div>
                                            <div className="offer-slider-r">
                                                <b>850$</b>
                                                <span>avg/night</span>
                                            </div>
                                            <div className="offer-slider-devider"></div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="offer-slider-i">
                                        <a className="offer-slider-img">
                                            <img alt="" src="img/slide-04.jpg" />
                                            <span className="offer-slider-overlay">
                                                <span className="offer-slider-btn">view details</span>
                                            </span>
                                        </a>
                                        <div className="offer-slider-txt">
                                            <div className="offer-slider-link">
                                                <a>Ermin's Hotel</a>
                                            </div>
                                            <div className="offer-slider-l">
                                                <div className="offer-slider-location">
                                                    location: england
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
                                            <div className="offer-slider-r">
                                                <b>630$</b>
                                                <span>avg/night</span>
                                            </div>
                                            <div className="offer-slider-devider"></div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="offer-slider-i">
                                        <a className="offer-slider-img">
                                            <img alt="" src="img/slide-01.jpg" />
                                            <span className="offer-slider-overlay">
                                                <span className="offer-slider-btn">view details</span>
                                            </span>
                                        </a>
                                        <div className="offer-slider-txt">
                                            <div className="offer-slider-link">
                                                <a>Andrassy Thai Hotel</a>
                                            </div>
                                            <div className="offer-slider-l">
                                                <div className="offer-slider-location">
                                                    Location: Thailand{" "}
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
                                            <div className="offer-slider-r">
                                                <b>756$</b>
                                                <span>avg/night</span>
                                            </div>
                                            <div className="offer-slider-devider"></div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="offer-slider-i">
                                        <a className="offer-slider-img">
                                            <img alt="" src="img/slide-02.jpg" />
                                            <span className="offer-slider-overlay">
                                                <span className="offer-slider-btn">view details</span>
                                            </span>
                                        </a>
                                        <div className="offer-slider-txt">
                                            <div className="offer-slider-link">
                                                <a>Campanile Cracovie</a>
                                            </div>
                                            <div className="offer-slider-l">
                                                <div className="offer-slider-location">
                                                    location: poland
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
                                            <div className="offer-slider-r">
                                                <b>900$</b>
                                                <span>avg/night</span>
                                            </div>
                                            <div className="offer-slider-devider"></div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="offer-slider-i">
                                        <a className="offer-slider-img">
                                            <img alt="" src="img/slide-03.jpg" />
                                            <span className="offer-slider-overlay">
                                                <span className="offer-slider-btn">view details</span>
                                            </span>
                                        </a>
                                        <div className="offer-slider-txt">
                                            <div className="offer-slider-link">
                                                <a>Park Plaza Westminster</a>
                                            </div>
                                            <div className="offer-slider-l">
                                                <div className="offer-slider-location">
                                                    Location: Thailand{" "}
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
                                                                <img alt="" src="img/star-b.png" />
                                                            </a>
                                                        </li>
                                                    </ul>
                                                    <div className="clear"></div>
                                                </nav>
                                            </div>
                                            <div className="offer-slider-r">
                                                <b>850$</b>
                                                <span>avg/night</span>
                                            </div>
                                            <div className="offer-slider-devider"></div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>

                                    <div className="offer-slider-i">
                                        <a className="offer-slider-img">
                                            <img alt="" src="img/slide-04.jpg" />
                                            <span className="offer-slider-overlay">
                                                <span className="offer-slider-btn">view details</span>
                                            </span>
                                        </a>
                                        <div className="offer-slider-txt">
                                            <div className="offer-slider-link">
                                                <a>Ermin's Hotel</a>
                                            </div>
                                            <div className="offer-slider-l">
                                                <div className="offer-slider-location">
                                                    location: england
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
                                            <div className="offer-slider-r">
                                                <b>630$</b>
                                                <span>avg/night</span>
                                            </div>
                                            <div className="offer-slider-devider"></div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mp-popular">
                            <header className="fly-in">
                                <b>Our travel Agency</b>
                                <p>
                                    Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                                    odit aut fugit.
                                </p>
                            </header>
                            <div className="fly-in advantages-row flat">
                                <div className="flat-adv">
                                    <div className="flat-adv-a">
                                        <div className="flat-adv-l">
                                            <img alt="" src="img/adv-a-01.png" />
                                        </div>
                                        <div className="flat-adv-r">
                                            <div className="flat-adv-rb">
                                                <div className="flat-adv-b">Awesome design</div>
                                                <div className="flat-adv-c">
                                                    Perspiciatis unde omnis iste natus doxes sit
                                                    voluptatem accusantium doloremque la dantiumeaque
                                                    ipsa.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flat-adv">
                                    <div className="flat-adv-a">
                                        <div className="flat-adv-l">
                                            <img alt="" src="img/adv-a-02.png" />
                                        </div>
                                        <div className="flat-adv-r">
                                            <div className="flat-adv-rb">
                                                <div className="flat-adv-b">carefully handcrafted</div>
                                                <div className="flat-adv-c">
                                                    Perspiciatis unde omnis iste natus doxes sit
                                                    voluptatem accusantium doloremque la dantiumeaque
                                                    ipsa.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flat-adv">
                                    <div className="flat-adv-a">
                                        <div className="flat-adv-l">
                                            <img alt="" src="img/adv-a-03.png" />
                                        </div>
                                        <div className="flat-adv-r">
                                            <div className="flat-adv-rb">
                                                <div className="flat-adv-b">fully responsive</div>
                                                <div className="flat-adv-c">
                                                    Perspiciatis unde omnis iste natus doxes sit
                                                    voluptatem accusantium doloremque la dantiumeaque
                                                    ipsa.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flat-adv">
                                    <div className="flat-adv-a">
                                        <div className="flat-adv-l">
                                            <img alt="" src="img/adv-a-04.png" />
                                        </div>
                                        <div className="flat-adv-r">
                                            <div className="flat-adv-rb">
                                                <div className="flat-adv-b">customer support</div>
                                                <div className="flat-adv-c">
                                                    Perspiciatis unde omnis iste natus doxes sit
                                                    voluptatem accusantium doloremque la dantiumeaque
                                                    ipsa.
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>

                <div className="testimonials-flat">
                    <div className="testimonials-holder fly-in">
                        <div id="testimonials-slider">
                            <div className="testimonials-i">
                                <div className="testimonials-a">
                                    <img alt="" src="img/testimonials-02.png" />
                                </div>
                                <div className="testimonials-b">
                                    "Qerspeciatis unde omnis iste natus doxes sit voluptatem
                                    accusantium doloremque laudantium, totam aperiam
                                    <br />
                                    eaque ipsa quae ab illo inventore veritatis et quasi
                                    architecto"
                                </div>
                                <div className="testimonials-c">
                                    <nav>
                                        <ul>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="testimonials-d">
                                    Albert Dowson, Company Director
                                </div>
                            </div>

                            <div className="testimonials-i">
                                <div className="testimonials-a">
                                    <img alt="" src="img/testimonials-02.png" />
                                </div>
                                <div className="testimonials-b">
                                    "Qerspeciatis unde omnis iste natus doxes sit voluptatem
                                    accusantium doloremque laudantium, totam aperiam
                                    <br />
                                    eaque ipsa quae ab illo inventore veritatis et quasi
                                    architecto"
                                </div>
                                <div className="testimonials-c">
                                    <nav>
                                        <ul>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                            <li>
                                                <a>
                                                    <img alt="" src="img/ts-star-a.png" />
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                                <div className="testimonials-d">
                                    Albert Dowson, Company Director
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="inform-block">
                    <div className="wrapper-padding">
                        <header className="fly-in page-lbl">
                            <b>helpful information</b>
                            <p>
                                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                                aut fugit.
                            </p>
                        </header>
                        <div className="fly-in advantages-row flat">
                            <div className="flat-adv large">
                                <div className="flat-adv-a">
                                    <div className="flat-adv-l">
                                        <img alt="" src="img/info-c-01.png" />
                                    </div>
                                    <div className="flat-adv-r">
                                        <div className="flat-adv-rb">
                                            <div className="flat-adv-b">how to choose a tour</div>
                                            <div className="flat-adv-c">
                                                Perspiciatis unde omnis iste natus doxes sit voluptatem
                                                accusantium doloremque la dantiumeaque ipsa.
                                            </div>
                                            <a className="flat-adv-btn">Read more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flat-adv large">
                                <div className="flat-adv-a">
                                    <div className="flat-adv-l">
                                        <img alt="" src="img/info-c-02.png" />
                                    </div>
                                    <div className="flat-adv-r">
                                        <div className="flat-adv-rb">
                                            <div className="flat-adv-b">booking of tickets</div>
                                            <div className="flat-adv-c">
                                                Perspiciatis unde omnis iste natus doxes sit voluptatem
                                                accusantium doloremque la dantiumeaque ipsa.
                                            </div>
                                            <a className="flat-adv-btn">Read more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flat-adv large">
                                <div className="flat-adv-a">
                                    <div className="flat-adv-l">
                                        <img alt="" src="img/info-c-03.png" />
                                    </div>
                                    <div className="flat-adv-r">
                                        <div className="flat-adv-rb">
                                            <div className="flat-adv-b">weekend getaway</div>
                                            <div className="flat-adv-c">
                                                Perspiciatis unde omnis iste natus doxes sit voluptatem
                                                accusantium doloremque la dantiumeaque ipsa.
                                            </div>
                                            <a className="flat-adv-btn">Read more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flat-adv large">
                                <div className="flat-adv-a">
                                    <div className="flat-adv-l">
                                        <img alt="" src="img/info-c-04.png" />
                                    </div>
                                    <div className="flat-adv-r">
                                        <div className="flat-adv-rb">
                                            <div className="flat-adv-b">Traveling with family</div>
                                            <div className="flat-adv-c">
                                                Perspiciatis unde omnis iste natus doxes sit voluptatem
                                                accusantium doloremque la dantiumeaque ipsa.
                                            </div>
                                            <a className="flat-adv-btn">Read more</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>

                <div className="pop-destinations">
                    <header className="fly-in page-lbl">
                        <b>Popular Destinations</b>
                        <p>
                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                            aut fugit.
                        </p>
                    </header>
                    <div className="mp-popular-row popular-flat">
                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-04.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>The Hotel 1060 Vienna</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 NOV 2014 - 22 NOV 2014
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
                                    <b>1200$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-05.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Pension Dr. Geissler</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 NOV 2014 - 22 NOV 2014
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
                                    <b>1400$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-06.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Hotel Mailberger Hof</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 NOV 2014 - 22 NOV 2014
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
                                    <b>2200$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-07.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Hotel Bellevue Wien</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 NOV 2014 - 22 NOV 2014
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
                                    <b>3500$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-08.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>Manesol Boutique Lamartine </a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 NOV 2014 - 22 NOV 2014
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
                                    <b>1700$</b>
                                    <span>price</span>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>

                        <div className="fly-in offer-slider-i">
                            <a className="offer-slider-img">
                                <img alt="" src="img/offer-big-09.jpg" />
                                <span className="offer-slider-overlay">
                                    <span className="offer-slider-btn">view details</span>
                                </span>
                            </a>
                            <div className="offer-slider-txt">
                                <div className="offer-slider-link">
                                    <a>The Empress Theodora Hotel</a>
                                </div>
                                <div className="offer-slider-l">
                                    <div className="offer-slider-location">
                                        11 NOV 2014 - 22 NOV 2014
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
                                    <b>1400$</b>
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
                        <b>Our parthners</b>
                        <p>
                            Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                            quia consequuntur magni
                            <br />
                            dolores eos qui.
                        </p>
                    </header>
                    <div className="partners fly-in">
                        <a>
                            <img alt="" src="img/partner-01.png" />
                        </a>
                        <a>
                            <img alt="" src="img/partner-02.png" />
                        </a>
                        <a>
                            <img alt="" src="img/partner-03.png" />
                        </a>
                        <a>
                            <img alt="" src="img/partner-04.png" />
                        </a>
                        <a>
                            <img alt="" src="img/partner-05.png" />
                        </a>
                        <a>
                            <img alt="" src="img/partner-06.png" />
                        </a>
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
