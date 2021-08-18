import React, { useEffect, useState } from 'react';
import { importAll } from '../../utils/JqueryImport';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { Button, makeStyles } from "@material-ui/core";

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

function getFormattedDate(date) {
    ;
    var result = new Date(date);
    let year = result.getFullYear();
    let month = (1 + result.getMonth()).toString().padStart(2, '0');
    let day = result.getDate().toString().padStart(2, '0');

    return month + '/' + day + '/' + year;
}


const ComboBookingCompletePage = (props) => {
    const classes = useStyle();
    const history = useHistory();
    const booking = useSelector((state) => state.bookFlight);
    const bookingHotel = useSelector((state) => state.bookRoom);


    useEffect(() => {
        let mount = false;
        if (!booking.data && !bookingHotel.data) {
            history.push("/");
        }
        window.scrollTo(0, 0);
        importAll();
        return () => {
            mount = true;
        }
    }, [])

    return (
        <>
            <Header></Header>
            <div className="main-cont">
                <div className="body-wrapper">
                    <div className="wrapper-padding">
                        <div className="page-head">
                            <div className="page-title">Combo - <span>Booking confirmation</span></div>
                            <div className="breadcrumbs">
                                <a href="#">Home</a> / <a href="#">Combo</a> / <span>Combo booking</span>
                            </div>
                            <div className="clear"></div>
                        </div>

                        <div className="sp-page">
                            <div className="sp-page-a">
                                <div className="sp-page-l">
                                    <div className="sp-page-lb">
                                        <div className="sp-page-p">
                                            <div className="booking-left">
                                                <h2>Booking Complete</h2>
                                                <a onClick={(e) => history.push(`/`)} className="book-btn">
                                                    <span className="book-btn-l">
                                                        <FontAwesomeIcon
                                                            icon={faBackward}
                                                            className={classes.icon} />
                                                    </span>
                                                    <span className="book-btn-r">Back to homepage</span>
                                                    <div className="clear"></div>
                                                </a>
                                                <div className="comlete-alert">
                                                    <div className="comlete-alert-a">
                                                        <b>Thank You. Your Booking is Confirmed.</b>
                                                        <span>Wish you a pleasant journey!</span>
                                                        <hr style={{ width: "20%", textAlign: "left", marginLeft: "0" }}></hr>
                                                    </div>
                                                </div>

                                                <div className="complete-info">

                                                    <h2>Passenger Information</h2>
                                                    {
                                                        booking?.data?.flightBookingDetails?.slice(0, booking?.data?.flightBookingDetails?.length / 2)?.map((psg, index) =>
                                                            <div className="complete-info-table">
                                                                <h4>Passenger {index + 1}</h4>
                                                                <div className="complete-info-i">
                                                                    <div className="complete-info-l">Passenger's Name</div>
                                                                    <div className="complete-info-r">{psg?.passenger?.firstname} {psg?.passenger?.lastname} <span style={{ marginLeft: "30px" }}>|| {psg?.passenger?.gender ? "Male" : "Female"}</span> </div>
                                                                    <div className="clear"></div>
                                                                </div>
                                                                <div className="complete-info-i">
                                                                    <div className="complete-info-l">Birthday</div>
                                                                    <div className="complete-info-r">{getFormattedDate(psg?.passenger?.birthday)}</div>
                                                                    <div className="clear"></div>
                                                                </div>
                                                            </div>
                                                        )
                                                    }

                                                    <div className="complete-txt-link"><a href="#">*** Passengers must show valid identification at the airport checkpoint in order to travel..</a></div>

                                                    <div className="complete-devider"></div>

                                                    <div className="complete-info-table">
                                                        <h2>Departure Flight Detail</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Destination</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[0]?.flight.departureCity} - {booking?.data?.flightBookingDetails[0]?.flight.arrivalCity} </div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Departure Flight Code</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[0]?.flight.airline.airlineName} {booking?.data?.flightBookingDetails[0]?.flight.flightCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Departure Date</div>
                                                            <div className="complete-info-r">{getFormattedDate(booking?.data?.flightBookingDetails[0]?.dateOfDeparture)} {booking?.data?.flightBookingDetails[0]?.flight.departureTime}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Reservation Code</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[0]?.airlineReservationCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>

                                                    <div className="complete-devider"></div>

                                                    <div className="complete-info-table">
                                                        <h2>Return Flight Detail</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Destination</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[booking?.data?.flightBookingDetails.length - 1]?.flight.departureCity} - {booking?.data?.flightBookingDetails[booking?.data?.flightBookingDetails.length - 1]?.flight.arrivalCity}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Return Flight Code</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[booking?.data?.flightBookingDetails.length - 1]?.flight.airline.airlineName} {booking?.data?.flightBookingDetails[booking?.data?.flightBookingDetails.length - 1]?.flight.flightCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Departure Date</div>
                                                            <div className="complete-info-r">{getFormattedDate(booking?.data?.flightBookingDetails[booking?.data?.flightBookingDetails.length - 1]?.dateOfDeparture)}{"  "}{booking?.data?.flightBookingDetails[booking?.data?.flightBookingDetails.length - 1]?.flight.departureTime}</div>
                                                            <div className="clear"></div>
                                                        </div>

                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Reservation Code</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[booking?.data?.flightBookingDetails.length - 1]?.airlineReservationCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-txt-link"><a href="#">*** Check-in counters closes 60 minutes prior to scheduled departure time..</a></div>
                                                    </div>
                                                    <div className="complete-devider"></div>
                                                    <div className="complete-info-table">
                                                        <h2>Hotel Information</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Hotel Name:</div>
                                                            <div className="complete-info-r">{bookingHotel.data?.hotelBookingDetail?.hotelBookingRooms[0]?.room?.hotel?.hotelName}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Contact Name:</div>
                                                            <div className="complete-info-r">{bookingHotel.data?.hotelBookingDetail?.hotelBookingRooms[0]?.room?.hotel?.contactName}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Phone Number:</div>
                                                            <div className="complete-info-r">{bookingHotel.data?.hotelBookingDetail?.hotelBookingRooms[0]?.room?.hotel?.phone}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Email Address:</div>
                                                            <div className="complete-info-r">{bookingHotel.data?.hotelBookingDetail?.hotelBookingRooms[0]?.room?.hotel?.email}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>
                                                    <div className="complete-devider"></div>
                                                    <div className="complete-info-table">
                                                        <h2>Room Information</h2>

                                                        {
                                                            bookingHotel.data?.hotelBookingDetail?.hotelBookingRooms?.map((bkRoom, index) =>

                                                                <React.Fragment key={bkRoom?.room?.id}>
                                                                    <div className="complete-info-i">
                                                                        <div className="complete-info-l">Room Type:</div>
                                                                        <div className="complete-info-r">{bkRoom?.room?.roomType}</div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                    <div className="complete-info-i">
                                                                        <div className="complete-info-l">Room Number:</div>
                                                                        <div className="complete-info-r">{bkRoom?.room?.roomNumber}</div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                    <div className="complete-info-i">
                                                                        <div className="complete-info-l">Room Price:</div>
                                                                        <div className="complete-info-r">{bkRoom?.room?.price}$</div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                    <div className="complete-devider"></div>
                                                                </React.Fragment>

                                                            )
                                                        }

                                                    </div>

                                                    <div className="complete-info-table">
                                                        <h2>Booking Information</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Booking code:</div>
                                                            <div className="complete-info-r">{bookingHotel.data?.bookingCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Number of guest:</div>
                                                            <div className="complete-info-r">{bookingHotel.data?.numOfGuest}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Check in date:</div>
                                                            <div className="complete-info-r">{bookingHotel.data?.checkInDate}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Check out date:</div>
                                                            <div className="complete-info-r">{bookingHotel.data?.checkOutDate}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Total Price:</div>
                                                            <div className="complete-info-r">{bookingHotel.data?.totalPrice}$</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>
                                                    <div className="complete-devider"></div>
                                                    <div className="complete-txt final">
                                                        <h2>Contact Information</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Sparrow Flight code:  </div>
                                                            <div className="complete-info-r">{booking?.data?.bookingCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Sparrow Hotel code:  </div>
                                                            <div className="complete-info-r">{bookingHotel?.data?.bookingCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Contact Name</div>
                                                            <div className="complete-info-r">{booking?.data?.user?.lastName} {booking?.data?.user?.firstName}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Phone Number</div>
                                                            <div className="complete-info-r">{booking?.data?.user?.phoneNumber}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Email</div>
                                                            <div className="complete-info-r">{booking?.data?.user.email}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-devider"></div>
                                                        <p>** Tips: <br />
                                                            1. Mobile Check-in is a convenient way to check-in using your mobile device. Passengers can select their preferred seat, email or print their e-Boarding pass.
                                                            Please don’t forget to carry a printout of your boarding card.
                                                            If you're carrying check-in baggage, please go straight to our bag drop counter.
                                                            <br />2. Hand Baggage - One personal item like small laptop bag, ladies’ purse, infant bag etc., only if it fits under the seat in front of you.
                                                            <br />3. Additional charges will apply for excess baggage.
                                                        </p>
                                                        <div className="complete-txt-link"><a href="#"> *** Please check email for your Ticket Information!</a></div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                            </div>

                            <div className="sp-page-r">

                                <div className="h-help">
                                    <div className="h-help-lbl">Need Sparrow Help?</div>
                                    <div className="h-help-lbl-a">We would be happy to help you!</div>
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
                                                            <div className="reasons-i-lbl">Awesome design</div>
                                                            <p>We always tried our best to provide you with the best services.</p>
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
                                                            <div className="reasons-i-lbl">Easy Booking</div>
                                                            <p>Search and compare flights from dosmetic airlines with many routes in Viet Nam.</p>
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
                                                            <div className="reasons-i-lbl">Customer support</div>
                                                            <p>We are now carving our path to be the best Lifestyle WebApp for our users.</p>
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
    )
}

export default ComboBookingCompletePage
