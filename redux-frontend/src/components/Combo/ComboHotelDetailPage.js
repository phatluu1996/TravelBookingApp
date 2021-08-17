import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useEffect, setState, useState, Component } from "react";
import { importAll } from "../../utils/JqueryImport";
import DataTable from "react-data-table-component";
import { fetchHotelById } from "../../actions/actionHotel";
import { createHotelFeedBack, getFeedbacks } from "../../actions/actionHotel";
import { getUser } from "../../actions/actionUser";
import $, { map } from "jquery";
import Pagination from "../Hotel/Pagination";
import CheckBox from "@material-ui/core/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight, faBaby, faCheck, faChild, faMale, faTimesCircle, faUserTimes } from "@fortawesome/free-solid-svg-icons";
import { red } from "@material-ui/core/colors";
import { getRole, getToken, ROLE_USER } from "../../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick'
import { clearRoomBookingCached } from "../../actions/actionBookingRoom";
import { Button, makeStyles } from "@material-ui/core";
import { getHotelById } from "../../actions/actionStepWizard";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}
const useStyle = makeStyles({
    icon: {
        display: "block",
        color: "white",
        float: "left",
        margin: "17px 0px 0px 14px",
        width: "20px",
        height: "12px"
    }
});

const ComboHotelDetailPage = (props) => {
    const history = useHistory();
    let queryParam = useQuery();
    const [currentImage, setCurrentImage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [jquery, setJquery] = useState(false);
    const [areaText, setAreaText] = useState(null);
    const [countReview, setCountReview] = useState(0);

    const [totalAdult, setTotalAdult] = useState(0);
    const [totalChild, setTotalChild] = useState(0);
    const [bookingList, setBookingList] = useState([]);
    const [mapCheck, setMapCheck] = useState(new Map());
    const [itemsPerPageFB, setItemPerPageFB] = useState(4);
    const [pageNumberFB, setPageNumberFB] = useState(1);
    const user = sessionStorage.getItem("userId");

    const customStyles = {
        table: {
            style: {
            },
        },
        rows: {
            style: {
            },
        },
        headCells: {
            style: {
                paddingLeft: "8px",
                fontSize: "20px",
            },
        },
        cells: {
            style: {
                paddingTop: "15px",
            },
        },
    };

    var settings = {
        prevArrow: <button className="slick-prev"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>,
        nextArrow: <button className="slick-next"><FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon></button>,
        slidesToShow: 5,
        slidesToScroll: 5
    };

    const changeCurrentImgSrc = (e) => {
        setCurrentImage(e.target.src);
    };

    const goToBooking = (e) => {
        if (getRole() != ROLE_USER) {
            $(".header-account a").click();
        } else if (totalAdult < parseInt(props.filter.numberAdult) || totalChild < parseInt(props.filter.numberChildren)) {
            // alert("Select the number of rooms suitable for the number of people");        
            return [];
        } else if (bookingList.length === 0 || !Array.isArray(bookingList)) {
            // alert("Please select your room");
            return [];
        } else {
            props.clearBookingCached();
            sessionStorage.setItem("isComboBooking", true);
            $("#trigger-confirmation").click();
        }

    };

    const confirmBooking = () => {
        console.log(props.filter);
        var filter = props.filter;
        var departureDate = filter.departureDate;
        var returnDate = filter.returnDate;
        var adult = filter.adult;
        var child = filter.child;
        var infant = filter.infant;
        var seatClass = filter.seatclassName;
        var fid = props.fid;
        var rfit = props.rid;
        var id = props.selectHotel.id;
        var numberChildren = filter.numberChildren;
        var numberAdult = filter.numberAdult;
        var checkin = filter.checkInDate;
        var checkout = filter.checkOutDate;
        var roomId = bookingList.join(".");
        history.push(`/combo-booking?departureDate=${departureDate}&adult=${adult}&child=${child}&infant=${infant}&seatClass=${seatClass}&fid=${fid}&rfid=${rfit}&returnDate=${returnDate}&id=${id}&numberChildren=${numberChildren}&numberAdult=${numberAdult}&checkInDate=${checkin}&checkOutDate=${checkout}&roomIds=${roomId}`)
    }

    const handleChange = (e) => {
        var totalA = 0;
        var totalC = 0;
        var ids = [];
        console.log(e);

        e.selectedRows.map((r) => {
            totalA = totalA + r.maxAdult;
            totalC = totalC + r.maxChildren;
            ids.push(r.id);
        });
        setTotalAdult(totalA);
        setTotalChild(totalC);
        setBookingList(ids);
    };

    const roomDetail = [
        {
            name: "List Room Active",
            cell: (room) => (
                <div className="cat-list-item">
                    <div className="cat-list-item-l">
                        <a href="#">
                            <img
                                alt=""
                                src={room?.images[0]?.imagePath ? room.images[0].imagePath : ""}
                            />
                        </a>
                    </div>
                    <div className="cat-list-item-r">
                        <div className="cat-list-item-rb">
                            <div className="cat-list-item-p">
                                <div className="cat-list-content">
                                    <div className="cat-list-content-a">
                                        <div className="cat-list-content-l">
                                            <div className="cat-list-content-lb">
                                                <div className="cat-list-content-lpadding">
                                                    <div className="offer-slider-link">
                                                        <a href="#">{room?.roomType}</a>
                                                    </div>
                                                    <div className="offer-slider-location">
                                                        Max Capacity: {room?.maxAdult} adult(s), {room?.maxChildren} children(s)
                                                    </div>
                                                    <p>
                                                        Voluptatem quia voluptas sit aspernatur aut odit aut
                                                        fugit, sed quia consequuntur magni dolores eos.
                                                    </p>
                                                </div>
                                            </div>
                                            {/* <br className="clear" /> */}
                                        </div>
                                    </div>
                                    <div className="cat-list-content-r">
                                        <div className="cat-list-content-p">
                                            <div className="available-price">{room.price}$</div>
                                            <div className="available-price-a">avg/night</div>
                                            <div className="available-price-c">
                                                {room?.roomStatus}
                                            </div>
                                            {/* <CheckBox checked={mapCheck?.get(room.id)} onChange={handleChange(room.id)} /> */}
                                            {/* <CheckBox checked={mapCheck?.get(room.id)} onClick={e=>handleChange(room.id)} /> */}
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>
                        </div>
                        <br className="clear" />
                    </div>
                    <div className="clear"></div>
                </div>
            ),
        },
    ];

    const getPagination = (list = [], page, itemsPerPage) => {
        if (!Array.isArray(list) || list.length === 0) {
            return [];
        }
        const startIdx = (page - 1) * itemsPerPage;
        const endIdx = (startIdx + itemsPerPage - 1) + 1;
        list.sort(function (a, b) { return b.id - a.id });
        return list.slice(startIdx, endIdx);
    };

    const addNewReview = (e) => {
        var reviews = [];
        var avg = 0;
        $(".review-ranger").each(function () {
            var $this = $(this);
            // var $index = $(this).index();
            reviews.push(
                parseFloat($this.find(".slider-range-min")[0].children[1].innerText)
            );
        });

        for (let index = 0; index < reviews.length; index++) {
            avg += reviews[index];
        }

        const data = {
            rating: (Math.round((avg / 6) * 100) / 100),
            feedback: areaText,
            retired: false,
            user: props?.user?.data,
            hotel: props?.hotel?.data,
        };
        if (areaText) {
            props.addFeedBack(data);
        } else {
            alert('Please input your feedback!')
        }
        setIsLoading(true);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        if (props.selectHotel) {
            props.getHotel(props.selectHotel.id);
            props.getFeedbacks(props.selectHotel.id);

        }
    }, [props.selectHotel])

    useEffect(() => {
        let mount = false;
        props.getUser(user);
        return () => {
            mount = true;
        };
    }, [isLoading], props.feedbacks);


    useEffect(() => {
        if (Array.isArray(props.hotel?.data?.rooms) &&
            props.hotel?.data?.rooms.length > 0 &&
            props.hotel?.data?.rooms[0]?.images[0]?.imagePath) {
            setCurrentImage(props.hotel.data.rooms[0].images[0].imagePath)
        }
    }, [props.hotel]);
    // useEffect(() => {
    //     let mount = false;

    //     if (jquery) {
    //         importAll();
    //         if (props.hotel.data) {
    //             setJquery(true);
    //             if (mapCheck.size === 0) {
    //                 var map = new Map();
    //                 props.hotel?.data?.rooms?.map((room) => map.set(room.id, false));
    //                 setMapCheck(map);
    //             }
    //         }
    //     }

    //     return () => {
    //         mount = true;
    //     };
    // });

    const getAddress = (location) => {
        if (location) return "";

        const province = location?.province;
        const district = location?.district;
        const ward = location?.ward;
        

        if (province && !district && !ward) {
            return province.name;
        } else if (province && district && !ward) {
            return district.prefix + " " + district.name + ", " + province.name;
        } else if (province && district && ward) {
            return ward.prefix + " " + ward.name + ", " + district.prefix + " " + district.name + ", " + province.name;
        } else { return ""; }

    }

    return (
        <>
            <div className="main-cont">
                <div className="body-wrapper">
                    <div className="wrapper-padding">
                        <div className="page-head">
                            <Link className="wizard-btn mr-1" to="/">Cancel</Link>
                            <button className="wizard-btn mr-1" onClick={() => props.goToStep(2)}>Back</button>
                            {/* <button className={props.selectRooms ? "wizard-btn" : "wizard-btn disable"} disabled={!props.selectRooms} onClick={() => props.goToStep(4)}>Next</button> */}
                            <div className="breadcrumbs">
                                <Link to="/">Home</Link> / <span>Flight + Hotel</span>
                            </div>
                            <div className="clear"></div>
                        </div>

                        <div className="sp-page">
                            <div className="sp-page-a">
                                <div className="sp-page-l">
                                    <div className="sp-page-lb">
                                        <div className="sp-page-p">
                                            <div className="h-tabs">
                                                <div className="h-tabs-left">
                                                    <div className="h-tab-i active">
                                                        <a href="#" className="h-tab-item-01">
                                                            <i></i>
                                                            <span>photos</span>
                                                            <span className="clear"></span>
                                                        </a>
                                                    </div>
                                                </div>
                                                <div className="h-tabs-right">
                                                    <a
                                                    //    onClick={
                                                    //       history.push("/hotel-list")}
                                                    >
                                                        <i></i>
                                                        <span>more hotels</span>
                                                        <div className="clear"></div>
                                                    </a>
                                                </div>
                                                <div className="clear"></div>
                                            </div>

                                            <div className="mm-tabs-wrapper">
                                                <div className="tab-item">
                                                    <div className="tab-gallery-big" style={{ overflow: "hidden" }}>
                                                        <img
                                                            style={{}}
                                                            src={currentImage}
                                                            alt="A house with two children standing in front of it"
                                                            onError={event => {
                                                                event.target.src = `${props.hotel.data?.rooms[0]?.images[0]?.imagePath}`
                                                                event.onerror = null
                                                            }}
                                                        // onLoad={onLoad}
                                                        />
                                                    </div>
                                                    <div className="tab-gallery-preview" >
                                                        <Slider {...settings}  >
                                                            {props.hotel.data?.rooms?.map((room, index) => <React.Fragment key={index}>
                                                                {room.images.length > 0 && room.images[0]?.imagePath && <div key={index} className="gallery-i">
                                                                    <a>
                                                                        <img onClick={changeCurrentImgSrc} alt={room.images[0]?.imageAlt} src={room.images[0]?.imagePath} />
                                                                    </a>
                                                                </div>}
                                                            </React.Fragment>)}
                                                        </Slider>
                                                    </div>
                                                </div>


                                            </div>

                                            <div className="content-tabs">
                                                <div className="content-tabs-head last-item">
                                                    <nav>
                                                        <ul>
                                                            <li>
                                                                <a className="active" href="#">
                                                                    DESCRIPTION
                                                                </a>
                                                            </li>
                                                            <li>
                                                                <a id="book-room">AVAILABILITY</a>
                                                            </li>
                                                            {/* <li><a href="#">Preferences</a></li> */}
                                                            <li>
                                                                <a >reviews</a>
                                                            </li>
                                                            {/* <li><a href="#">THINGS TO DO</a></li> */}
                                                            <li>
                                                                <a className="tabs-lamp"></a>
                                                            </li>
                                                        </ul>
                                                    </nav>

                                                    <div className="clear"></div>
                                                </div>
                                                <div className="content-tabs-body">
                                                    <div className="content-tabs-i">
                                                        <h2>Facilities of Hotel</h2>
                                                        <ul className="preferences-list">
                                                            <li
                                                                className="internet"
                                                                hidden={
                                                                    props.hotel.data?.highSpeedInternet
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                High-speed Internet
                                                            </li>
                                                            <li
                                                                className="play-place"
                                                                hidden={
                                                                    props.hotel.data?.freeParking ? true : false
                                                                }
                                                            >
                                                                Play Place
                                                            </li>
                                                            <li
                                                                className="entertaiment"
                                                                hidden={
                                                                    props.hotel.data?.entertaiment
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                Entertaiment
                                                            </li>
                                                            <li
                                                                className="hot-tub"
                                                                hidden={
                                                                    props.hotel.data?.hotTub ? true : false
                                                                }
                                                            >
                                                                Hot Tub
                                                            </li>
                                                            <li
                                                                className="pool"
                                                                hidden={
                                                                    props.hotel.data?.swimmingPool
                                                                        ? true
                                                                        : false
                                                                }
                                                            >
                                                                Swimming Pool
                                                            </li>
                                                            <li
                                                                className="parking"
                                                                hidden={
                                                                    props.hotel.data?.freeParking ? true : false
                                                                }
                                                            >
                                                                Free parking
                                                            </li>
                                                            <li
                                                                className="gym"
                                                                hidden={props.hotel.data?.gym ? true : false}
                                                            >
                                                                Gym
                                                            </li>
                                                            {/* <li className="tv" hidden={props.hotel.data.highSpeedInternet?true:false}>TV</li> */}
                                                            <li
                                                                className="pets"
                                                                hidden={
                                                                    props.hotel.data?.petsAllowed ? true : false
                                                                }
                                                            >
                                                                Pets allowed
                                                            </li>
                                                            <div className="clear"></div>
                                                        </ul>
                                                        <h2>Hotel Description</h2>
                                                        <p>
                                                            Voluptatem quia voluptas sit aspernatur aut odit
                                                            aut fugit, sed quia consequuntur magni dolores eos
                                                            qui. voluptatem sequi nesciunt. Neque porro
                                                            quisqua. Sed ut perspiciatis unde omnis iste natus
                                                            error sit voluptatem accusantium doloremque
                                                            laudantium, totam rem aperiam
                                                        </p>
                                                        <p>
                                                            Eaque ipsa quae ab illo inventore veritatis et
                                                            quasi architecto beatae vitae dicta sunt
                                                            explicabo. Nemo enim ipsam voluptatem quia
                                                            voluptas sit aspernatur aut odit aut fugit.
                                                        </p>
                                                        <div className="tab-reasons">
                                                            <h2>4 Reasons to Choose Andrassy Rhai Hotel</h2>
                                                            <div className="tab-reasons-h">
                                                                <div className="tab-reasons-i reasons-01">
                                                                    <b>fully responsive</b>
                                                                    <p>
                                                                        Voluptatem quia voluptas sit aspernatur aut
                                                                        odit aut fugit, sed quia.
                                                                    </p>
                                                                </div>

                                                                <div className="tab-reasons-i reasons-02">
                                                                    <b>757 verified reviews</b>
                                                                    <p>
                                                                        Voluptatem quia voluptas sit aspernatur aut
                                                                        odit aut fugit, sed quia.
                                                                    </p>
                                                                </div>

                                                                <div className="tab-reasons-i reasons-03">
                                                                    <b>Manage your bookings online</b>
                                                                    <p>
                                                                        Voluptatem quia voluptas sit aspernatur aut
                                                                        odit aut fugit, sed quia.
                                                                    </p>
                                                                </div>

                                                                <div className="tab-reasons-i reasons-04">
                                                                    <b>Booking is safe</b>
                                                                    <p>
                                                                        Voluptatem quia voluptas sit aspernatur aut
                                                                        odit aut fugit, sed quia.
                                                                    </p>
                                                                </div>

                                                                <div className="clear"></div>
                                                            </div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>

                                                    <div className="content-tabs-i">
                                                        {/* <h2>Your Travel Rates</h2> */}
                                                        <div className="rates-search">
                                                            <h2>
                                                                *Select the number of rooms suitable for the
                                                                number of people{" "}
                                                            </h2>
                                                            <Button style={totalAdult < parseInt(props.filter.numberAdult) ? { color: "white", backgroundColor: "red" } : { color: "white", backgroundColor: "green" }}
                                                                size="large" startIcon={<FontAwesomeIcon icon={faMale} ></FontAwesomeIcon>} >
                                                                {totalAdult}/{props.filter.numberAdult}
                                                            </Button>

                                                            {parseInt(props.filter.numberChildren) !== 0 &&
                                                                <Button style={totalChild < parseInt(props.filter.numberChildren) ? { color: "white", backgroundColor: "red" } : { color: "white", backgroundColor: "green" }}
                                                                    startIcon={<FontAwesomeIcon icon={faChild}></FontAwesomeIcon>} >
                                                                    {totalChild}/{props.filter.numberChildren}
                                                                </Button>}
                                                            <Button style={(totalAdult < parseInt(props.filter.numberAdult) || totalChild < parseInt(props.filter.numberChildren)) ? { color: "white", backgroundColor: "red" } : { color: "white", backgroundColor: "green" }}
                                                                size="large" onClick={goToBooking}>
                                                                BOOK NOW
                                                            </Button>
                                                            <div className="available-row">
                                                                <DataTable
                                                                    columns={roomDetail}
                                                                    data={props.hotel?.data?.rooms}
                                                                    customStyles={customStyles}
                                                                    pagination
                                                                    paginationPerPage={4}
                                                                    // selectableRowsComponent={CheckBox}
                                                                    selectableRows={true}
                                                                    // Clicked
                                                                    onSelectedRowsChange={handleChange}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="content-tabs-i">
                                                        <div className="reviews-a">
                                                            <div className="reviews-c">
                                                                <div className="reviews-l">
                                                                    <div className="reviews-total">
                                                                        {props.hotel?.data?.hotelRating}/5
                                                                    </div>
                                                                    <nav className="reviews-total-stars">
                                                                        <ul>

                                                                            {[...Array(5)].map(
                                                                                (item, index) =>
                                                                                    // {
                                                                                    index + 1 >
                                                                                        Math.ceil(
                                                                                            props.hotel?.data?.hotelRating
                                                                                        ) ? (
                                                                                        <li key={index}>
                                                                                            <a>
                                                                                                <img
                                                                                                    alt=""
                                                                                                    src="img/star-a.png"
                                                                                                />
                                                                                            </a>
                                                                                        </li>
                                                                                    ) : (
                                                                                        <li key={index}>
                                                                                            <a>
                                                                                                <img
                                                                                                    alt=""
                                                                                                    src="img/star-b.png"
                                                                                                />
                                                                                            </a>
                                                                                        </li>
                                                                                    )
                                                                                // }
                                                                            )}
                                                                        </ul>
                                                                        <div className="clear"></div>
                                                                    </nav>
                                                                </div>
                                                                <div className="reviews-r">
                                                                    <div className="reviews-rb">
                                                                        <div className="reviews-percents">
                                                                            <label>{props.hotel.data?.hotelRating}/5 stars</label>
                                                                            <div className="reviews-percents-i">
                                                                                <span
                                                                                    style={{
                                                                                        width: `${Math.ceil((props.hotel.data?.hotelRating * 100) / 5)}%`,
                                                                                    }}
                                                                                ></span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="reviews-percents">
                                                                            <label>100% clients recommeted</label>
                                                                            <div className="reviews-percents-i">
                                                                                <span></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <br className="clear" />
                                                                </div>
                                                            </div>
                                                            <div className="clear"></div>

                                                            <div className="hotel-reviews-devider"></div>

                                                            <div className="guest-reviews">
                                                                <h2>Guest Reviews</h2>
                                                                <div className="guest-reviews-row">
                                                                    {getPagination(
                                                                        props.feedbacks?.data,
                                                                        pageNumberFB,
                                                                        itemsPerPageFB
                                                                    ).map((feedback) => (
                                                                        <div className="guest-reviews-i" key={feedback.id}>
                                                                            <div className="guest-reviews-a">
                                                                                <div className="guest-reviews-l">
                                                                                    <div className="guest-reviews-img">
                                                                                        <span>{feedback?.rating}</span>
                                                                                        <img
                                                                                            alt=""
                                                                                            src="img/guest-01.png"
                                                                                        />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="guest-reviews-r">
                                                                                    <div className="guest-reviews-rb">
                                                                                        <div className="guest-reviews-b">
                                                                                            <div className="guest-reviews-bl">
                                                                                                <div className="guest-reviews-blb">
                                                                                                    <div className="guest-reviews-lbl">
                                                                                                        {feedback?.user?.lastName}{" "}
                                                                                                        {feedback?.user?.firstName}
                                                                                                    </div>
                                                                                                    <div className="guest-reviews-lbl-a">
                                                                                                        from{" "}
                                                                                                        {
                                                                                                            feedback?.user?.location
                                                                                                                ?.province?.name
                                                                                                        }
                                                                                                    </div>
                                                                                                    <div className="guest-reviews-txt">
                                                                                                        {feedback?.feedback}
                                                                                                    </div>
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="guest-reviews-br">
                                                                                            <div className="guest-reviews-padding">
                                                                                                <nav>
                                                                                                    <ul>
                                                                                                        {[...Array(5)].map(
                                                                                                            (item, index) =>
                                                                                                                // {
                                                                                                                index + 1 >
                                                                                                                    Math.ceil(
                                                                                                                        feedback?.rating
                                                                                                                    ) ? (
                                                                                                                    <li key={index}>
                                                                                                                        <a>
                                                                                                                            <img
                                                                                                                                alt=""
                                                                                                                                src="img/star-a.png"
                                                                                                                            />
                                                                                                                        </a>
                                                                                                                    </li>
                                                                                                                ) : (
                                                                                                                    <li key={index}>
                                                                                                                        <a>
                                                                                                                            <img
                                                                                                                                alt=""
                                                                                                                                src="img/star-b.png"
                                                                                                                            />
                                                                                                                        </a>
                                                                                                                    </li>
                                                                                                                )
                                                                                                            // }
                                                                                                        )}
                                                                                                    </ul>
                                                                                                </nav>
                                                                                                <div className="guest-rating">
                                                                                                    {feedback?.rating}/5.0
                                                                                                </div>
                                                                                                <div className="clear"></div>
                                                                                                <div className="guest-rating-txt">
                                                                                                    Recomended
                                                                                                </div>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    {/* <br className="clear" /> */}
                                                                                </div>
                                                                            </div>
                                                                            <div className="clear"></div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <Pagination
                                                                    itemsPerPage={itemsPerPageFB}
                                                                    listItem={Array.isArray(props?.hotel?.data?.hotelFeedBacks)
                                                                        && props?.hotel?.data?.hotelFeedBacks.length > 0 ?
                                                                        props?.hotel?.data?.hotelFeedBacks.length : ""}
                                                                    setPageNum={setPageNumberFB}
                                                                />
                                                                {getToken() && <div
                                                                    hidden={user || isLoading ? false : true}
                                                                    className="review-form"
                                                                >
                                                                    <h2>Live Review</h2>
                                                                    <label>Your Review:</label>
                                                                    <div className="textarea-a">
                                                                        <textarea
                                                                            id="feedbackTxt"
                                                                            defaultValue={areaText}
                                                                            onChange={(e) =>
                                                                                setAreaText(e.target.value)
                                                                            }
                                                                            name="feedbackTxt"
                                                                            placeholder="Write some thing...."
                                                                        ></textarea>
                                                                    </div>

                                                                    <div className="review-rangers-row">
                                                                        <div className="review-ranger">
                                                                            <label>Cleanlines</label>
                                                                            <div className="review-ranger-r">
                                                                                <div className="slider-range-min"></div>
                                                                            </div>
                                                                            <div className="clear"></div>
                                                                        </div>

                                                                        <div className="review-ranger">
                                                                            <label>Service & Stuff</label>
                                                                            <div className="review-ranger-r">
                                                                                <div className="slider-range-min"></div>
                                                                            </div>
                                                                            <div className="clear"></div>
                                                                        </div>
                                                                        <div className="review-ranger">
                                                                            <label>Price</label>
                                                                            <div className="review-ranger-r">
                                                                                <div className="slider-range-min"></div>
                                                                            </div>
                                                                            <div className="clear"></div>
                                                                        </div>
                                                                        <div className="review-ranger">
                                                                            <label>Location</label>
                                                                            <div className="review-ranger-r">
                                                                                <div className="slider-range-min"></div>
                                                                            </div>
                                                                            <div className="clear"></div>
                                                                        </div>
                                                                        <div className="review-ranger">
                                                                            <label>Sleep Quality</label>
                                                                            <div className="review-ranger-r">
                                                                                <div className="slider-range-min"></div>
                                                                            </div>
                                                                            <div className="clear"></div>
                                                                        </div>
                                                                        <div className="review-ranger">
                                                                            <label>Comfort</label>
                                                                            <div className="review-ranger-r">
                                                                                <div className="slider-range-min"></div>
                                                                            </div>
                                                                            <div className="clear"></div>
                                                                        </div>
                                                                    </div>
                                                                    <button
                                                                        className="review-send"
                                                                        onClick={addNewReview}
                                                                    >
                                                                        Submit Review
                                                                    </button>
                                                                </div>}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>

                            <div className="sp-page-r">
                                <div className="h-detail-r">
                                    <div className="h-detail-lbl">
                                        <div className="h-detail-lbl-a">
                                            {props.hotel?.data?.hotelName}
                                        </div>
                                        <div className="h-detail-lbl-b">
                                            {/* {props.hotel?.data?.location?.street},
                                            {props.hotel?.data?.location?.province?.name} */}
                                            {getAddress(props.hotel?.data?.location)}
                                        </div>
                                    </div>
                                    <div className="h-detail-stars">
                                        <ul className="h-stars-list">
                                            {[...Array(5)].map(
                                                (item, index) =>
                                                    // {
                                                    index + 1 >
                                                        Math.ceil(props.hotel?.data?.hotelRating) ? (
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
                                            )}
                                        </ul>
                                        <div className="h-stars-lbl">{props.feedbacks?.data?.length} reviews</div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="h-details-text">
                                        <p>
                                            Voluptatem quia voluptas sit aspernatur aut odit aut
                                            fugit, sed quia consequuntur magni dolores eos qui
                                            voluptatem sequi nesciunt.{" "}
                                        </p>
                                        <p>
                                            Neque porro quisqua. Sed ut perspiciatis unde omnis ste
                                            natus error sit voluptatem.
                                        </p>
                                    </div>
                                    <a href="#book-room" onClick={(e) => $("#book-room").click()} className="wishlist-btn">
                                        <span className="wishlist-btn-l"><i></i></span>
                                        <span className="wishlist-btn-r">Book Now</span>
                                        <div className="clear"></div>
                                    </a>
                                </div>

                                <div className="h-help">
                                    <div className="h-help-lbl">Need Sparrow Help?</div>
                                    <div className="h-help-lbl-a">
                                        We would be happy to help you!
                                    </div>
                                    <div className="h-help-phone">2-800-256-124 23</div>
                                    <div className="h-help-email">sparrow@mail.com</div>
                                </div>

                                <div className="h-reasons">
                                    <div className="h-liked-lbl">Reasons to Book with us</div>
                                    <div className="h-reasons-row">
                                        <div className="reasons-i">
                                            <div className="reasons-h">
                                                <div className="reasons-l">
                                                    <img alt="" src="img/reasons-a.png" />
                                                </div>
                                                <div className="reasons-r">
                                                    <div className="reasons-rb">
                                                        <div className="reasons-p">
                                                            <div className="reasons-i-lbl">
                                                                Awesome Price
                                                            </div>
                                                            <p>
                                                                Cheap price every day with special offer for members
                                                                Book through the app to get the best price with great promotions!
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <br className="clear" />
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>

                                        <div className="reasons-i">
                                            <div className="reasons-h">
                                                <div className="reasons-l">
                                                    <img alt="" src="img/reasons-b.png" />
                                                </div>
                                                <div className="reasons-r">
                                                    <div className="reasons-rb">
                                                        <div className="reasons-p">
                                                            <div className="reasons-i-lbl">
                                                                Safe and flexible payment methods
                                                            </div>
                                                            <p>
                                                                Safe online transactions with many options such as payment at convenience stores, bank transfer, credit card to Internet Banking. No transaction fees.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <br className="clear" />
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>

                                        <div className="reasons-i">
                                            <div className="reasons-h">
                                                <div className="reasons-l">
                                                    <img alt="" src="img/reasons-c.png" />
                                                </div>
                                                <div className="reasons-r">
                                                    <div className="reasons-rb">
                                                        <div className="reasons-p">
                                                            <div className="reasons-i-lbl">
                                                                Real guests, real reviews
                                                            </div>
                                                            <p>
                                                                Over 10,000,000 verified reviews and votes from visitors will help you make the right choice.
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <br className="clear" />
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="clear"></div>
                        </div>
                    </div>
                </div>
            </div>
            <button id="trigger-confirmation" type="button" className="btn btn-primary" data-toggle="modal" data-target="#confirmation" hidden>
                TriggerModal
            </button>
            <div className="bootstrap-scope">
                <div className="modal fade" id="confirmation" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content sparrow">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Final Confirm</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>You will be redirect to booking site , are you sure ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-success" onClick={confirmBooking}>Yes</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal">No</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {
        hotel: state.hotel,
        user: state.user,
        feedbacks: state.hotelFeedback,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotel: (id) => dispatch(getHotelById(id)),
        addFeedBack: (data) => dispatch(createHotelFeedBack(data)),
        getUser: (id) => { dispatch(getUser(id)); },
        getFeedbacks: (id) => { dispatch(getFeedbacks(id)) },
        clearBookingCached: () => dispatch(clearRoomBookingCached())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ComboHotelDetailPage);
