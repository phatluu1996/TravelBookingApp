import React, { useEffect } from 'react';
import { importAll } from '../../utils/JqueryImport';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";

function getFormattedDate(date) {
    let year = date.getFullYear();
    let month = (1 + date.getMonth()).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}


const FlightBookingCompletePage = (props) => {
    const location = useLocation();
  const booking = useSelector((state) => state.bookFlight);

    useEffect(() => {
        let mount = false;
        window.scrollTo(0, 0);
        importAll();
       ;
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
                            <div className="page-title">Flight - <span>Booking confirmation</span></div>
                            <div className="breadcrumbs">
                                <a href="#">Home</a> / <a href="#">Flight</a> / <span>Flight booking</span>
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

                                                <div className="comlete-alert">
                                                    <div className="comlete-alert-a">
                                                        <b>Thank You. Your Booking is Confirmed.</b>
                                                        <span> *** Please check email for your Ticket Information!</span>
                                                    </div>
                                                </div>

                                                <div className="complete-info">
                                                    <h2>Your Personal Information</h2>
                                                    <div className="complete-info-table">
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">First Name</div>
                                                            <div className="complete-info-r">{booking?.data.flightBookingDetails[0].passenger.firstname}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Last Name</div>
                                                            <div className="complete-info-r">{booking?.data.flightBookingDetails[0].passenger.lastname}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Gender</div>
                                                        <div className="complete-info-r">{booking?.data.flightBookingDetails[0].passenger.gender ? "Male" : "Female"}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Birthday</div>
                                                            <div className="complete-info-r">{getFormattedDate(booking?.data.flightBookingDetails[0].passenger.birthday)}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Document Id:</div>
                                                            <div className="complete-info-r">{booking?.data.flightBookingDetails[0].passenger.cardIdNumber}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Expired Date:</div>
                                                            <div className="complete-info-r">{booking?.data.flightBookingDetails[0].passenger.cardExpired}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>

                                                    <div className="complete-devider"></div>

                                                    <div className="complete-info-table">
                                                        <h2>Flight Detail</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Flight Code</div>
                                                            <div className="complete-info-r">{booking?.data.flightBookingDetails[0].flight.flightCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Airline</div>
                                                            <div className="complete-info-r">{booking?.data.flightBookingDetails[0].flight.airline.airlineName}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Departure Date</div>
                                                            <div className="complete-info-r">{booking?.data.flightBookingDetails[0].dateOfDeparture}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Departure Time</div>
                                                            <div className="complete-info-r">{booking?.data.flightBookingDetails[0].flight.departureTime}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Destination</div>
                                                            <div className="complete-info-r">{booking?.data.flightBookingDetails[0].flight.departureCity} - {booking?.data.flightBookingDetails[0].flight.arrivalCity}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <p>Passengers must show valid identification at the airport checkpoint in order to travel.</p>
                                                        <div className="complete-txt-link"><a href="#">** Check-in counters closes 60 minutes prior to scheduled departure time..</a></div>
                                                    </div>

                                                    <div className="complete-devider"></div>

                                                    <div className="complete-txt final">
                                                        <h2>Ticket Detail</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Reservation Code</div>
                                                            <div className="complete-info-r">{booking?.data.reservationCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <p>Qoluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui voluptatem sequi nesciunt. Que porro quisqua. Sed ut perspiciatis unde omnis ste natus error.</p>
                                                        <div className="complete-txt-link"><a href="#">Your Hotel Info</a></div>
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
                                                            <p>Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequunt.</p>
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
                                                            <div className="reasons-i-lbl">carefylly handcrafted</div>
                                                            <p>Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequunt.</p>
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
                                                            <div className="reasons-i-lbl">sustomer support</div>
                                                            <p>Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequunt.</p>
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

export default FlightBookingCompletePage
