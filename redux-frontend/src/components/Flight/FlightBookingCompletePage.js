import React, { useEffect } from 'react';
import { importAll } from '../../utils/JqueryImport';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

function getFormattedDate(date) {;
    var result =new Date(date);
    let year = result.getFullYear();
    let month = (1 + result.getMonth()).toString().padStart(2, '0');
    let day = result.getDate().toString().padStart(2, '0');
  
    return month + '/' + day + '/' + year;
}


const FlightBookingCompletePage = (props) => {
    const history = useHistory();
  const booking = useSelector((state) => state.bookFlight);

    useEffect(() => {
        let mount = false;
        if(!booking.data){
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
                                                        <span>Wish you a pleasant journey!</span>
                                                        <hr style={{width:"20%",textAlign:"left",marginLeft:"0"}}></hr>                                                        
                                                    </div>
                                                </div>

                                                <div className="complete-info">
                                    
                                                    <h2>Passenger Information</h2>
                                                    { 
                                                        booking?.data?.flightBookingDetails?.map((psg,i)=>
                                                        <div key={i} className="complete-info-table">
                                                            <h4>Passenger {i+1}</h4>
                                                            <div className="complete-info-i">
                                                                <div className="complete-info-l">Passenger's Name</div>
                                                                <div className="complete-info-r">{psg?.passenger?.firstname} {psg?.passenger?.lastname}</div>
                                                                <div className="clear"></div>
                                                            </div>
                                                            <div className="complete-info-i">
                                                                <div className="complete-info-l">Gender</div>
                                                                <div className="complete-info-r">{psg?.passenger?.gender ? "Male" : "Female"}</div>
                                                                <div className="clear"></div>
                                                            </div>
                                                            <div className="complete-info-i">
                                                                <div className="complete-info-l">Birthday</div>
                                                                <div className="complete-info-r">{getFormattedDate(psg?.passenger?.birthday)}</div>
                                                                <div className="clear"></div>
                                                            </div>
                                                            
    
                                                        </div>)
                                                    }
                                                   
                                                    <div className="complete-txt-link"><a href="#">*** Passengers must show valid identification at the airport checkpoint in order to travel..</a></div>

                                                    <div className="complete-devider"></div>

                                                    <div className="complete-info-table">
                                                        <h2>Flight Detail</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Flight Code</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[0]?.flight.airline.airlineName} {booking?.data?.flightBookingDetails[0]?.flight.flightCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Departure Date</div>
                                                            <div className="complete-info-r">{getFormattedDate(booking?.data?.flightBookingDetails[0]?.dateOfDeparture)}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Departure Time</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[0]?.flight.departureTime}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Destination</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[0]?.flight.departureCity} - {booking?.data?.flightBookingDetails[0]?.flight.arrivalCity}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Reservation Code</div>
                                                            <div className="complete-info-r">{booking?.data?.flightBookingDetails[0]?.airlineReservationCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-txt-link"><a href="#">*** Check-in counters closes 60 minutes prior to scheduled departure time..</a></div>
                                                    </div>

                                                    <div className="complete-devider"></div>

                                                    <div className="complete-txt final">
                                                        <h2>Contact Information</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Sparrow code</div>
                                                            <div className="complete-info-r">{booking?.data?.bookingCode}</div>
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
                                                        <p>** Tips: <br/>
                                                        1. Mobile Check-in is a convenient way to check-in using your mobile device. Passengers can select their preferred seat, email or print their e-Boarding pass. 
                                                    Please don’t forget to carry a printout of your boarding card.
                                                    If you're carrying check-in baggage, please go straight to our bag drop counter.
                                                        <br/>2. Hand Baggage - One personal item like small laptop bag, ladies’ purse, infant bag etc., only if it fits under the seat in front of you.
                                                        <br/>3. Additional charges will apply for excess baggage.
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

export default FlightBookingCompletePage
