import React from "react";
import Header from "../Layout/Header";
import Footer from "../Layout/Footer";
import { connect } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useEffect, setState, useState, Component } from "react";
import { importAll } from "../../utils/JqueryImport";
import DataTable from "react-data-table-component";
import { fetchHotelById } from "../../actions/actionHotel";
import { createHotelFeedBack } from "../../actions/actionHotel";
import { getUser } from "../../actions/actionUser";
import $ from "jquery";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const HotelDetailPage = (props) => {
    // const location = useLocation();

    const history = useHistory();
    let queryParam = useQuery();
    const [currentImage, setCurrentImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [jquery, setJquery] = useState(false);
    const [areaText,setAreaText] = useState('');
    const [countReview, setCountReview] = useState(0);
    const user = sessionStorage.getItem("userId")

    const customStyles = {
        table: {
            style: {
                // paddingTop: '-50px'
            },
        },
        rows: {
            style: {
                // minHeight: '72px', // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: "8px", // override the cell padding for head cells
                // paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingTop: "15px",
                // paddingLeft: '8px', // override the cell padding for data cells
                // paddingRight: '8px',
            },
        },
    };

    const changeCurrentImgSrc = (e) => {
        console.log(e.target);
    };

    const roomDetail = [
        {
            name: "",
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
                                                        Max Adult: {room?.maxAdult} persons
                                                    </div>
                                                    <p>
                                                        Voluptatem quia voluptas sit aspernatur aut odit aut
                                                        fugit, sed quia consequuntur magni dolores eos.
                                                    </p>
                                                    {/* <div className="cat-icons">
                                                        <span className="cat-icon-01 active"></span>
                                                        <span className="cat-icon-02"></span>
                                                        <span className="cat-icon-03"></span>
                                                        <span className="cat-icon-04"></span>
                                                        <span className="cat-icon-05"></span>
                                                        <span className="cat-icon-06"></span>
                                                        <div className="clear"></div>
                                                    </div> */}
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
                                                {room?.roomStatus ? "Available" : "Unavailable"}
                                            </div>  
                                            <a 
                                            onClick={e => history.push(`/hotel-booking?id=${props?.hotel?.data?.id}
                                                                        &checkInDate=${queryParam.get("checkInDate")}
                                                                        &checkOutDate=${queryParam.get("checkOutDate")}
                                                                        &roomId=${room?.id}
                                                                        &userId=${props?.user?.data?.id}`)
                                            } className="available-btn">
                                                Book now
                                            </a>
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
    const feedbackList = [
        {
            name: "",
            width: "200",
            cell: (feedback) => (
                <div className="guest-reviews-i">
                    <div className="guest-reviews-a">
                        <div className="guest-reviews-l">
                            <div className="guest-reviews-img">
                                <span>{feedback?.rating}</span>
                                <img alt="" src="img/guest-01.png" />
                            </div>
                        </div>
                        <div className="guest-reviews-r">
                            <div className="guest-reviews-rb">
                                <div className="guest-reviews-b">
                                    <div className="guest-reviews-bl">
                                        <div className="guest-reviews-blb">
                                            <div className="guest-reviews-lbl">
                                                {feedback?.user?.lastName} {feedback?.user?.firstName}
                                            </div>
                                            <div className="guest-reviews-lbl-a">
                                                from {feedback?.user?.location?.province?.name}
                                            </div>
                                            <div className="guest-reviews-txt">
                                                {feedback?.feedback}
                                            </div>
                                        </div>
                                        {/* <br className="clear" /> */}
                                    </div>
                                </div>
                                <div className="guest-reviews-br">
                                    <div className="guest-reviews-padding">
                                        <nav>
                                            <ul>
                                                {[...Array(5)].map(
                                                    (item, index) =>
                                                        // {
                                                        index + 1 > Math.ceil(feedback?.rating) ? (
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
                                        </nav>
                                        <div className="guest-rating">{feedback?.rating}/5.0</div>
                                        <div className="clear"></div>
                                        <div className="guest-rating-txt">Recomended</div>
                                    </div>
                                </div>
                            </div>
                            {/* <br className="clear" /> */}
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            ),
        },
    ];

    const addNewReview = (e) => {
        var reviews = [];
        var avg = 0;
        $('.review-ranger').each(function () {
            var $this = $(this);
            // var $index = $(this).index();
            reviews.push(parseFloat($this.find('.slider-range-min')[0].children[1].innerText));
        });

        for (let index = 0; index < reviews.length; index++) {
            avg += reviews[index];
        }
        // if(areaText){
            const data = {
                rating: avg / 5,
                feedback: areaText,
                retired:false,
                user: props?.user?.data,
                hotel: props?.hotel?.data
            }
            
             console.log(data)
             props.addFeedBack(data)
             setLoading(true);
        // }
    }

    useEffect(() => {
        let mount = false;

        props.getUser(user);
        props.getHotel(queryParam.get("id"));

        return () => {
            mount = true;
        };
    }, [isLoading]);

    useEffect(() => {
        let mount = false;
        if (props.hotel.data) {
            setJquery(true);

        }
        if (jquery) {
            importAll();
            let count = 0;
            for (let index = 0; index < props.hotel?.data?.feedbackList?.length; index++) {
                count++;
            }
            setCountReview(count);
        }

        return () => {
            mount = true;
        };
    });
    return (
        <>
            <Header></Header>
            <div className="main-cont">
                <div className="body-wrapper">
                    <div className="wrapper-padding">
                        <div className="page-head">
                            <div className="page-title">
                                Hotels - <span>Detail</span>
                            </div>
                            <div className="breadcrumbs">
                                <a href="#">Home</a> / <a href="#">Hotel</a> /{" "}
                                <span>Detail</span>
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
                                                    {/* <div className="h-tab-i">
                                                        <a href="#" className="h-tab-item-02">
                                                            <i></i>
                                                            <span>map</span>
                                                            <span className="clear"></span>
                                                        </a>
                                                    </div> */}
                                                    {/* <div className="h-tab-i">
                                                        <a href="#" className="h-tab-item-03">
                                                            <i></i>
                                                            <span>calendar</span>
                                                            <span className="clear"></span>
                                                        </a>
                                                    </div> */}
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
                                                    <div className="tab-gallery-big">
                                                        <img alt="" src="img/tab-photo-01.jpg" />
                                                    </div>
                                                    <div
                                                        onClick={changeCurrentImgSrc}
                                                        className="tab-gallery-preview"
                                                    >
                                                        <div id="gallery">
                                                            {props.hotel.data?.rooms?.map((room, index) => (
                                                                <div key={index} className="gallery-i">
                                                                    <a>
                                                                        <img
                                                                            alt={room.images[0]?.imageAlt}
                                                                            src={room.images[0]?.imagePath}
                                                                        />
                                                                        {/* <span></span> */}
                                                                    </a>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="tab-item">
                                                    <div id="preloader">
                                                        <div id="spinner"></div>
                                                    </div>
                                                    <div className="tab-map">
                                                        <div className="contact-map">
                                                            <div id="map"></div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="tab-item">
                                                    <div className="calendar-tab">
                                                        <div className="calendar-tab-select">
                                                            <label>Select month</label>
                                                            <select className="custom-select">
                                                                <option>january 2015</option>
                                                                <option>january 2015</option>
                                                                <option>january 2015</option>
                                                            </select>
                                                        </div>

                                                        <div className="tab-calendar-colls">
                                                            <div className="tab-calendar-collsl">
                                                                <div className="tab-calendar-collslb">
                                                                    <table>
                                                                        <thead>
                                                                            <tr>
                                                                                <td>sun</td>
                                                                                <td>mon</td>
                                                                                <td>tue</td>
                                                                                <td>wed</td>
                                                                                <td>thu</td>
                                                                                <td>fri</td>
                                                                                <td>sat</td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            <tr>
                                                                                <td className="date-passed">
                                                                                    <span>
                                                                                        <label></label>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="date-passed">
                                                                                    <span>
                                                                                        <label></label>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="date-passed">
                                                                                    <span>
                                                                                        <label></label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>1</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>2</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>3</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>4</label>
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>5</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>6</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>7</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>8</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>9</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>10</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>11</label>
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>12</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>13</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>14</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>15</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>16</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>17</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>18</label>
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>19</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>20</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>21</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>22</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>23</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>24</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>25</label>
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                            <tr>
                                                                                <td>
                                                                                    <span>
                                                                                        <label>26</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="date-available">
                                                                                    <span>
                                                                                        <label>27</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="date-available">
                                                                                    <span>
                                                                                        <label>28</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="date-available">
                                                                                    <span>
                                                                                        <label>29</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="date-unavailable">
                                                                                    <span>
                                                                                        <label>30</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="date-unavailable">
                                                                                    <span>
                                                                                        <label>31</label>
                                                                                    </span>
                                                                                </td>
                                                                                <td className="date-passed">
                                                                                    <span>
                                                                                        <label></label>
                                                                                    </span>
                                                                                </td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </div>
                                                                <div className="clear"></div>
                                                            </div>
                                                        </div>
                                                        <div className="tab-calendar-collsr">
                                                            <div className="tab-calendar-s">
                                                                <div className="map-symbol passed">
                                                                    <div className="map-symbol-l"></div>
                                                                    <div className="map-symbol-r">Date past</div>
                                                                    <div className="clear"></div>
                                                                </div>
                                                                <div className="map-symbol available">
                                                                    <div className="map-symbol-l"></div>
                                                                    <div className="map-symbol-r">available</div>
                                                                    <div className="clear"></div>
                                                                </div>
                                                                <div className="map-symbol unavailable">
                                                                    <div className="map-symbol-l"></div>
                                                                    <div className="map-symbol-r">
                                                                        unavailable
                                                                    </div>
                                                                    <div className="clear"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="clear"></div>
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
                                                                <a href="#">AVAILABILITY</a>
                                                            </li>
                                                            {/* <li><a href="#">Preferences</a></li> */}
                                                            <li>
                                                                <a href="#">reviews</a>
                                                            </li>
                                                            {/* <li><a href="#">THINGS TO DO</a></li> */}
                                                            <li>
                                                                <a href="#" className="tabs-lamp"></a>
                                                            </li>
                                                        </ul>
                                                    </nav>

                                                    <div className="clear"></div>
                                                </div>
                                                <div className="content-tabs-body">
                                                    <div className="content-tabs-i">
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
                                                            {/* <div className="facilities"> */}
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
                                                                {/* <li className="conf-room" hidden={props.hotel.data.highSpeedInternet?true:false}>Conference room</li> */}
                                                                <li
                                                                    className="play-place"
                                                                    hidden={
                                                                        props.hotel.data?.freeParking ? true : false
                                                                    }
                                                                >
                                                                    Play Place
                                                                </li>
                                                                {/* <li className="restourant" hidden={props.hotel.data.highSpeedInternet?true:false}>Restourant</li> */}
                                                                {/* <li className="bar" hidden={props.hotel.data.highSpeedInternet?true:false}>Bar</li> */}
                                                                {/* <li className="doorman" hidden={props.hotel.data.highSpeedInternet?true:false}>Doorman</li> */}
                                                                {/* <li className="kitchen" hidden={props.hotel.data.highSpeedInternet?true:false}>Kitchen</li> */}
                                                                {/* <li className="spa" hidden={props.hotel.data.highSpeedInternet?true:false}>Spa services</li> */}
                                                                {/* <li className="bike" hidden={props.hotel.data.highSpeedInternet?true:false}>Bike Rental</li> */}
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
                                                                {/* <li className="handicap" hidden={props.hotel.data.highSpeedInternet?true:false}>Handicap</li> */}
                                                                {/* <li className="secure" hidden={props.hotel.data.highSpeedInternet?true:false}>Secure </li> */}
                                                            </ul>
                                                            <div className="clear"></div>
                                                            <div className="preferences-devider"></div>
                                                            {/* <table>
                                                                    <tr>
                                                                        <td className="facilities-a">Food & Drink</td>
                                                                        <td className="facilities-b">Breakfast in the Room</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="facilities-a">Internet</td>
                                                                        <td className="facilities-b"><span className="facility-label">Free! WiFi is available in all areas and is free of charge.</span></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="facilities-a">Parking</td>
                                                                        <td className="facilities-b">Vending Machine (drinks), 24-Hour Front Desk, Express Check-in/Check-out</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <td className="facilities-a">Languages</td>
                                                                        <td className="facilities-b">Italian, French, Spanish, English, Arabic</td>
                                                                    </tr>
                                                                </table> */}
                                                            {/* </div> */}
                                                        </div>
                                                    </div>

                                                    <div className="content-tabs-i">
                                                        {/* <h2>Your Travel Rates</h2> */}
                                                        <div className="rates-search">
                                                            <h2>List Room Active</h2>

                                                            <div className="available-row">
                                                                <DataTable
                                                                    // striped="false"
                                                                    className=""
                                                                    columns={roomDetail}
                                                                    data={props?.hotel?.data?.rooms}
                                                                    // style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}
                                                                    customStyles={customStyles}
                                                                    pagination
                                                                    paginationPerPage={3}
                                                                />
                                                                {/* <a href="#" className="availabe-more">load more results</a> */}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div className="content-tabs-i">
                                                        <h2>Hotel Facilities</h2>
                                                        <p>Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui voluptatem sequi nesciunt. </p>
                                                        <ul className="preferences-list">
                                                            <li className="internet">High-speed Internet</li>
                                                            <li className="conf-room">Conference room</li>
                                                            <li className="play-place">Play Place</li>
                                                            <li className="restourant">Restourant</li>
                                                            <li className="bar">Bar</li>
                                                            <li className="doorman">Doorman</li>
                                                            <li className="kitchen">Kitchen</li>
                                                            <li className="spa">Spa services</li>
                                                            <li className="bike">Bike Rental</li>
                                                            <li className="entertaiment">Entertaiment</li>
                                                            <li className="hot-tub">Hot Tub</li>
                                                            <li className="pool">Swimming Pool</li>
                                                            <li className="parking">Free parking</li>
                                                            <li className="gym">Gym</li>
                                                            <li className="tv">TV</li>
                                                            <li className="pets">Pets allowed</li>
                                                            <li className="handicap">Handicap</li>
                                                            <li className="secure">Secure </li>
                                                        </ul>
                                                        <div className="clear"></div>
                                                        <div className="preferences-devider"></div>
                                                        <h2>Alternative Style</h2>
                                                        <p>Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui voluptatem sequi nesciunt eque porro quisqua.</p>
                                                        <ul className="preferences-list-alt">
                                                            <li className="internet">High-speed Internet</li>
                                                            <li className="parking">Free parking</li>
                                                            <li className="gym">Gym</li>
                                                            <li className="restourant">Restourant</li>
                                                            <li className="pets">Pets allowed</li>
                                                            <li className="pool">Swimming Pool</li>
                                                            <li className="kitchen">Kitchen</li>
                                                            <li className="conf-room">Conference room</li>
                                                            <li className="bike">Bike Rental</li>
                                                            <li className="entertaiment">Entertaiment</li>
                                                            <li className="bar">Bar</li>
                                                            <li className="secure">Secure</li>
                                                        </ul>
                                                        <div className="clear"></div>
                                                    </div> */}

                                                    <div className="content-tabs-i">
                                                        <div className="reviews-a">
                                                            <div className="reviews-c">
                                                                <div className="reviews-l">
                                                                    <div className="reviews-total">
                                                                        {props.hotel.data?.hotelRating}/5.0
                                                                    </div>
                                                                    <nav className="reviews-total-stars">
                                                                        <ul>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="img/r-stars-total-b.png"
                                                                                    />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="img/r-stars-total-b.png"
                                                                                    />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="img/r-stars-total-b.png"
                                                                                    />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="img/r-stars-total-b.png"
                                                                                    />
                                                                                </a>
                                                                            </li>
                                                                            <li>
                                                                                <a href="#">
                                                                                    <img
                                                                                        alt=""
                                                                                        src="img/r-stars-total-a.png"
                                                                                    />
                                                                                </a>
                                                                            </li>
                                                                        </ul>
                                                                        <div className="clear"></div>
                                                                    </nav>
                                                                </div>
                                                                <div className="reviews-r">
                                                                    <div className="reviews-rb">
                                                                        <div className="reviews-percents">
                                                                            <label>4.7 out of 5 stars</label>
                                                                            <div className="reviews-percents-i">
                                                                                <span
                                                                                    style={{
                                                                                        width: `${(props.hotel.data?.hotelRating *
                                                                                                100) /
                                                                                            5
                                                                                            }%`,
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

                                                            {/* <div className="reviews-devider"></div> */}
                                                            {/* 
                                                            <div className="hotel-reviews">
                                                                <h2>Hotel Facilities</h2>
                                                                <div className="hotel-reviews-row">

                                                                    <div className="hotel-reviews-i">
                                                                        <div className="hotel-reviews-left">Cleanlines</div>
                                                                        <nav className="hotel-reviews-right">
                                                                            <ul>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                            </ul>
                                                                        </nav>
                                                                        <div className="clear"></div>
                                                                    </div>


                                                                    <div className="hotel-reviews-i">
                                                                        <div className="hotel-reviews-left">Price</div>
                                                                        <nav className="hotel-reviews-right">
                                                                            <ul>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-a.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-a.png" /></a></li>
                                                                            </ul>
                                                                        </nav>
                                                                        <div className="clear"></div>
                                                                    </div>


                                                                    <div className="hotel-reviews-i">
                                                                        <div className="hotel-reviews-left">Sleep Quality</div>
                                                                        <nav className="hotel-reviews-right">
                                                                            <ul>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-a.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-a.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-a.png" /></a></li>
                                                                            </ul>
                                                                        </nav>
                                                                        <div className="clear"></div>
                                                                    </div>


                                                                    <div className="hotel-reviews-i">
                                                                        <div className="hotel-reviews-left">Service & Stuff</div>
                                                                        <nav className="hotel-reviews-right">
                                                                            <ul>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-a.png" /></a></li>
                                                                            </ul>
                                                                        </nav>
                                                                        <div className="clear"></div>
                                                                    </div>


                                                                    <div className="hotel-reviews-i">
                                                                        <div className="hotel-reviews-left">Location</div>
                                                                        <nav className="hotel-reviews-right">
                                                                            <ul>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                            </ul>
                                                                        </nav>
                                                                        <div className="clear"></div>
                                                                    </div>


                                                                    <div className="hotel-reviews-i">
                                                                        <div className="hotel-reviews-left">Comfort</div>
                                                                        <nav className="hotel-reviews-right">
                                                                            <ul>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-b.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-a.png" /></a></li>
                                                                                <li><a href="#"><img alt="" src="img/sstar-a.png" /></a></li>
                                                                            </ul>
                                                                        </nav>
                                                                        <div className="clear"></div>
                                                                    </div>

                                                                </div>
                                                                <div className="clear"></div>
                                                            </div> */}

                                                            <div className="hotel-reviews-devider"></div>

                                                            <div className="guest-reviews">
                                                                <h2>Guest Reviews</h2>
                                                                {/* <div className="guest-reviews-row"> */}
                                                                <DataTable
                                                                    // striped="false"
                                                                    columns={feedbackList}
                                                                    data={props?.hotel?.data?.hotelFeedBacks}
                                                                    // style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}
                                                                    customStyles={customStyles}
                                                                    pagination
                                                                    paginationPerPage={3}
                                                                />

                                                                {/* </div> */}
                                                                {/* <a href="#" className="guest-reviews-more">load more reviews</a> */}
                                                                {/* <form onSubmit={addNewReview}> */}
                                                                    <div hidden={user ? false : true} className="review-form">
                                                                        <h2>Live Review</h2>
                                                                        {/* <label>User Name:</label>
                                  <div className="input-a">
                                    <input type="text" placeholder="" />
                                  </div> */}
                                                                        <label>Your Review:</label>
                                                                        <div className="textarea-a">
                                                                            <textarea id="feedbackTxt" value={areaText} onChange={e =>setAreaText(e.target.value)} name="feedbackTxt" defaultValue="Write some thing...."></textarea>
                                                                        </div>

                                                                        <div className="review-rangers-row">
                                                                            <div className="review-ranger">
                                                                                <label>Cleanlines</label>
                                                                                <div className="review-ranger-r">
                                                                                    <div className="slider-range-min">
                                                                                    </div>
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

                                                                        {/* <label>Evaluation</label>
                                                                    <select className="custom-select">
                                                                        <option>&nbsp;</option>
                                                                        <option>1</option>
                                                                        <option>2</option>
                                                                        <option>3</option>
                                                                        <option>4</option>
                                                                    </select>
                                                                    <label>When did you travel?</label>
                                                                    <div className="input-a"><input type="text" value="" /></div> */}
                                                                        <button className="review-send" onClick={addNewReview} >
                                                                            Submit Review
                                                                        </button>
                                                                    </div>

                                                                {/* </form> */}

                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* <div className="content-tabs-i">
                                                        <h2>Things to do</h2>
                                                        <p className="small">Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui voluptatem sequi nesciunt. </p>
                                                        <div className="todo-devider"></div>
                                                        <div className="todo-row">

                                                            <div className="cat-list-item">
                                                                <div className="cat-list-item-l">
                                                                    <a href="#"><img alt="" src="img/todo-01.jpg" /></a>
                                                                </div>
                                                                <div className="cat-list-item-r">
                                                                    <div className="cat-list-item-rb">
                                                                        <div className="cat-list-item-p">
                                                                            <div className="cat-list-content">
                                                                                <div className="cat-list-content-a">
                                                                                    <div className="cat-list-content-l">
                                                                                        <div className="cat-list-content-lb">
                                                                                            <div className="cat-list-content-lpadding">
                                                                                                <div className="offer-slider-link"><a href="#">Totam rem aperiam, eaque ipsa quae</a></div>
                                                                                                <div className="offer-rate">Exelent</div>
                                                                                                <p>Voluptatem quia voluptas sit aspernatur aut odit  aut figut, sed quia consequuntur magni dolores eos qui  voluptatem sequi nescuint. Neque porro quisqua. Sed ut perspiciatis  unde omnis ste.</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <br className="clear" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="cat-list-content-r">
                                                                                    <div className="cat-list-content-p">
                                                                                        <nav className="stars">
                                                                                            <ul>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                            </ul>
                                                                                            <div className="clear"></div>
                                                                                        </nav>
                                                                                        <div className="cat-list-review">31 reviews</div>
                                                                                        <a href="#" className="todo-btn">Read more</a>
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


                                                            <div className="cat-list-item">
                                                                <div className="cat-list-item-l">
                                                                    <a href="#"><img alt="" src="img/todo-02.jpg" /></a>
                                                                </div>
                                                                <div className="cat-list-item-r">
                                                                    <div className="cat-list-item-rb">
                                                                        <div className="cat-list-item-p">
                                                                            <div className="cat-list-content">
                                                                                <div className="cat-list-content-a">
                                                                                    <div className="cat-list-content-l">
                                                                                        <div className="cat-list-content-lb">
                                                                                            <div className="cat-list-content-lpadding">
                                                                                                <div className="offer-slider-link"><a href="#">Invertore veitatis et quasi architecto</a></div>
                                                                                                <div className="offer-rate">Exelent</div>
                                                                                                <p>Voluptatem quia voluptas sit aspernatur aut odit  aut figut, sed quia consequuntur magni dolores eos qui  voluptatem sequi nescuint. Neque porro quisqua. Sed ut perspiciatis  unde omnis ste.</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <br className="clear" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="cat-list-content-r">
                                                                                    <div className="cat-list-content-p">
                                                                                        <nav className="stars">
                                                                                            <ul>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                            </ul>
                                                                                            <div className="clear"></div>
                                                                                        </nav>
                                                                                        <div className="cat-list-review">31 reviews</div>
                                                                                        <a href="#" className="todo-btn">Read more</a>
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


                                                            <div className="cat-list-item">
                                                                <div className="cat-list-item-l">
                                                                    <a href="#"><img alt="" src="img/todo-03.jpg" /></a>
                                                                </div>
                                                                <div className="cat-list-item-r">
                                                                    <div className="cat-list-item-rb">
                                                                        <div className="cat-list-item-p">
                                                                            <div className="cat-list-content">
                                                                                <div className="cat-list-content-a">
                                                                                    <div className="cat-list-content-l">
                                                                                        <div className="cat-list-content-lb">
                                                                                            <div className="cat-list-content-lpadding">
                                                                                                <div className="offer-slider-link"><a href="#">Dolores eos qui ratione voluptatem</a></div>
                                                                                                <div className="offer-rate">Exelent</div>
                                                                                                <p>Voluptatem quia voluptas sit aspernatur aut odit  aut figut, sed quia consequuntur magni dolores eos qui  voluptatem sequi nescuint. Neque porro quisqua. Sed ut perspiciatis  unde omnis ste.</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <br className="clear" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="cat-list-content-r">
                                                                                    <div className="cat-list-content-p">
                                                                                        <nav className="stars">
                                                                                            <ul>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                            </ul>
                                                                                            <div className="clear"></div>
                                                                                        </nav>
                                                                                        <div className="cat-list-review">31 reviews</div>
                                                                                        <a href="#" className="todo-btn">Read more</a>
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


                                                            <div className="cat-list-item">
                                                                <div className="cat-list-item-l">
                                                                    <a href="#"><img alt="" src="img/todo-04.jpg" /></a>
                                                                </div>
                                                                <div className="cat-list-item-r">
                                                                    <div className="cat-list-item-rb">
                                                                        <div className="cat-list-item-p">
                                                                            <div className="cat-list-content">
                                                                                <div className="cat-list-content-a">
                                                                                    <div className="cat-list-content-l">
                                                                                        <div className="cat-list-content-lb">
                                                                                            <div className="cat-list-content-lpadding">
                                                                                                <div className="offer-slider-link"><a href="#">Neque porro quisquaem est qui dolorem</a></div>
                                                                                                <div className="offer-rate">Exelent</div>
                                                                                                <p>Voluptatem quia voluptas sit aspernatur aut odit  aut figut, sed quia consequuntur magni dolores eos qui  voluptatem sequi nescuint. Neque porro quisqua. Sed ut perspiciatis  unde omnis ste.</p>
                                                                                            </div>
                                                                                        </div>
                                                                                        <br className="clear" />
                                                                                    </div>
                                                                                </div>
                                                                                <div className="cat-list-content-r">
                                                                                    <div className="cat-list-content-p">
                                                                                        <nav className="stars">
                                                                                            <ul>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                               <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                                <li><a href="#"><img alt="" src="img/todostar-a.png" /></a></li>
                                                                                            </ul>
                                                                                            <div className="clear"></div>
                                                                                        </nav>
                                                                                        <div className="cat-list-review">31 reviews</div>
                                                                                        <a href="#" className="todo-btn">Read more</a>
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

                                                        </div>
                                                        <a href="#" className="guest-reviews-more">Load more reviews</a>
                                                    </div> */}

                                                    {/* <div className="content-tabs-i">
                                                        <h2>FAQ</h2>
                                                        <p className="small">Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui voluptatem sequi nesciunt. </p>
                                                        <div className="todo-devider"></div>
                                                        <div className="faq-row">

                                                            <div className="faq-item">
                                                                <div className="faq-item-a">
                                                                    <span className="faq-item-left">Totam rem aperiam, eaquie ipsa quae?</span>
                                                                    <span className="faq-item-i"></span>
                                                                    <div className="clear"></div>
                                                                </div>
                                                                <div className="faq-item-b">
                                                                    <div className="faq-item-p">
                                                                        Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia aspernatur aut odit aut fugit consequuntur magni dolores eos qui voluptatem sequi nesciunt. aspernatur aut odit aut fugit
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="faq-item">
                                                                <div className="faq-item-a">
                                                                    <span className="faq-item-left">Dolores eos qui ratione voluptatem sequi nescuin?</span>
                                                                    <span className="faq-item-i"></span>
                                                                    <div className="clear"></div>
                                                                </div>
                                                                <div className="faq-item-b">
                                                                    <div className="faq-item-p">
                                                                        Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia aspernatur aut odit aut fugit consequuntur magni dolores eos qui voluptatem sequi nesciunt. aspernatur aut odit aut fugit
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="faq-item">
                                                                <div className="faq-item-a">
                                                                    <span className="faq-item-left">Neque porro quisquam est, qui dolorem ipsum?</span>
                                                                    <span className="faq-item-i"></span>
                                                                    <div className="clear"></div>
                                                                </div>
                                                                <div className="faq-item-b">
                                                                    <div className="faq-item-p">
                                                                        Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia aspernatur aut odit aut fugit consequuntur magni dolores eos qui voluptatem sequi nesciunt. aspernatur aut odit aut fugit
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="faq-item">
                                                                <div className="faq-item-a">
                                                                    <span className="faq-item-left">Dolor sit amet consectutur adipisci velit, sed?</span>
                                                                    <span className="faq-item-i"></span>
                                                                    <div className="clear"></div>
                                                                </div>
                                                                <div className="faq-item-b">
                                                                    <div className="faq-item-p">
                                                                        Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia aspernatur aut odit aut fugit consequuntur magni dolores eos qui voluptatem sequi nesciunt. aspernatur aut odit aut fugit
                                                                    </div>
                                                                </div>
                                                            </div>


                                                            <div className="faq-item">
                                                                <div className="faq-item-a">
                                                                    <span className="faq-item-left">Consectetur, adipisci velit, sed quia non numquam?</span>
                                                                    <span className="faq-item-i"></span>
                                                                    <div className="clear"></div>
                                                                </div>
                                                                <div className="faq-item-b">
                                                                    <div className="faq-item-p">
                                                                        Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia aspernatur aut odit aut fugit consequuntur magni dolores eos qui voluptatem sequi nesciunt. aspernatur aut odit aut fugit
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div> */}
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
                                        <div className="h-detail-lbl-a">{props.hotel?.data?.hotelName}</div>
                                        <div className="h-detail-lbl-b">{props.hotel?.data?.location?.street},{props.hotel?.data?.location?.province?.name}</div>
                                    </div>
                                    <div className="h-detail-stars">
                                        <ul className="h-stars-list">
                                            {[...Array(5)].map(
                                                (item, index) =>
                                                    // {
                                                    index + 1 > Math.ceil(props.hotel?.data?.hotelRating) ? (
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
                                        <div className="h-stars-lbl">{countReview} reviews</div>
                                        <a hidden={user ? false : true} href="#" className="h-add-review">
                                            add review
                                        </a>
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
                                    {/* <a href="#" className="wishlist-btn">
                    <span className="wishlist-btn-l">
                      <i></i>
                    </span>
                    <span className="wishlist-btn-r">Select Room</span>
                    <div className="clear"></div>
                  </a> */}
                                    {/* <a href="#" className="book-btn">
                                        <span className="book-btn-l"><i></i></span>
                                        <span className="book-btn-r">ADD TO wish list</span>
                                        <div className="clear"></div>
                                    </a> */}
                                </div>

                                <div className="h-help">
                                    <div className="h-help-lbl">Need Sparrow Help?</div>
                                    <div className="h-help-lbl-a">
                                        We would be happy to help you!
                                    </div>
                                    <div className="h-help-phone">2-800-256-124 23</div>
                                    <div className="h-help-email">sparrow@mail.com</div>
                                </div>

                                <div className="reasons-rating">
                                    <div id="reasons-slider">
                                        {
                                            props?.hotel?.data?.hotelFeedBacks?.slice(0, 4)?.map(
                                                feedback =>
                                                    <div className="reasons-rating-i">
                                                        <div className="reasons-rating-txt">{feedback?.feedback}</div>
                                                        <div className="reasons-rating-user">
                                                            <div className="reasons-rating-user-l">
                                                                <img alt="" src="img/r-user.png" />
                                                                <span>{feedback?.rating}</span>
                                                            </div>
                                                            <div className="reasons-rating-user-r">
                                                                <b>{feedback?.user?.lastName} {feedback?.user?.firstName}</b>
                                                                <span>{feedback?.user?.location?.province.name}</span>
                                                            </div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>
                                            )
                                        }

                                        {/* 
                    <div className="reasons-rating-i">
                      <div className="reasons-rating-txt">
                        Sed ut perspiciatis unde omnis iste natus sit voluptatem
                        accusantium doloremque laudantium, totam.
                      </div>
                      <div className="reasons-rating-user">
                        <div className="reasons-rating-user-l">
                          <img alt="" src="img/r-user.png" />
                          <span>5.0</span>
                        </div>
                        <div className="reasons-rating-user-r">
                          <b>Robert Dowson</b>
                          <span>from Austria</span>
                        </div>
                        <div className="clear"></div>
                      </div>
                    </div>

                    <div className="reasons-rating-i">
                      <div className="reasons-rating-txt">
                        Sed ut perspiciatis unde omnis iste natus sit voluptatem
                        accusantium doloremque laudantium, totam.
                      </div>
                      <div className="reasons-rating-user">
                        <div className="reasons-rating-user-l">
                          <img alt="" src="img/r-user.png" />
                          <span>5.0</span>
                        </div>
                        <div className="reasons-rating-user-r">
                          <b>Mike Tyson</b>
                          <span>from France</span>
                        </div>
                        <div className="clear"></div>
                      </div>
                    </div>  
                            */}
                                    </div>

                                </div>

                                <div className="h-liked">
                                    <div className="h-liked-lbl">You May Also Like</div>
                                    <div className="h-liked-row">
                                        <div className="h-liked-item">
                                            <div className="h-liked-item-i">
                                                <div className="h-liked-item-l">
                                                    <a href="#">
                                                        <img alt="" src="img/like-01.jpg" />
                                                    </a>
                                                </div>
                                                <div className="h-liked-item-c">
                                                    <div className="h-liked-item-cb">
                                                        <div className="h-liked-item-p">
                                                            <div className="h-liked-title">
                                                                <a href="#">Andrassy Thai Hotel</a>
                                                            </div>
                                                            <div className="h-liked-rating">
                                                                <nav className="stars">
                                                                    <ul>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-a.png" />
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="clear"></div>
                                                                </nav>
                                                            </div>
                                                            <div className="h-liked-foot">
                                                                <span className="h-liked-price">850$</span>
                                                                <span className="h-liked-comment">
                                                                    avg/night
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>

                                        <div className="h-liked-item">
                                            <div className="h-liked-item-i">
                                                <div className="h-liked-item-l">
                                                    <a href="#">
                                                        <img alt="" src="img/like-02.jpg" />
                                                    </a>
                                                </div>
                                                <div className="h-liked-item-c">
                                                    <div className="h-liked-item-cb">
                                                        <div className="h-liked-item-p">
                                                            <div className="h-liked-title">
                                                                <a href="#">Campanile Cracovie</a>
                                                            </div>
                                                            <div className="h-liked-rating">
                                                                <nav className="stars">
                                                                    <ul>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-a.png" />
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="clear"></div>
                                                                </nav>
                                                            </div>
                                                            <div className="h-liked-foot">
                                                                <span className="h-liked-price">964$</span>
                                                                <span className="h-liked-comment">
                                                                    avg/night
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>

                                        <div className="h-liked-item">
                                            <div className="h-liked-item-i">
                                                <div className="h-liked-item-l">
                                                    <a href="#">
                                                        <img alt="" src="img/like-03.jpg" />
                                                    </a>
                                                </div>
                                                <div className="h-liked-item-c">
                                                    <div className="h-liked-item-cb">
                                                        <div className="h-liked-item-p">
                                                            <div className="h-liked-title">
                                                                <a href="#">Ermin's Hotel</a>
                                                            </div>
                                                            <div className="h-liked-rating">
                                                                <nav className="stars">
                                                                    <ul>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-b.png" />
                                                                            </a>
                                                                        </li>
                                                                        <li>
                                                                            <a href="#">
                                                                                <img alt="" src="img/star-a.png" />
                                                                            </a>
                                                                        </li>
                                                                    </ul>
                                                                    <div className="clear"></div>
                                                                </nav>
                                                            </div>
                                                            <div className="h-liked-foot">
                                                                <span className="h-liked-price">500$</span>
                                                                <span className="h-liked-comment">
                                                                    avg/night
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="clear"></div>
                                                </div>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </div>
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
                                                                Awesome design
                                                            </div>
                                                            <p>
                                                                Voluptatem quia voluptas sit aspernatur aut odit
                                                                aut fugit, sed quia consequunt.
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
                                                                carefylly handcrafted
                                                            </div>
                                                            <p>
                                                                Voluptatem quia voluptas sit aspernatur aut odit
                                                                aut fugit, sed quia consequunt.
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
                                                                sustomer support
                                                            </div>
                                                            <p>
                                                                Voluptatem quia voluptas sit aspernatur aut odit
                                                                aut fugit, sed quia consequunt.
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
            <Footer></Footer>
        </>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {
        hotel: state.hotels,
        user:state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getHotel: (id) => dispatch(fetchHotelById(id)),
        addFeedBack: (data) => dispatch(createHotelFeedBack(data)),
           getUser: (id) => {
            dispatch(getUser(id));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HotelDetailPage);
