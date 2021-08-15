import React, { useEffect, useState } from 'react'
import { importAll } from '../../utils/JqueryImport'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import { fetchHotelById, getHotel } from "../../actions/actionHotel";
import { getRooms } from "../../actions/actionRoom";
import { getBooking } from "../../actions/actionBookingRoom";
import { useHistory, useLocation } from 'react-router-dom';
import { getUser } from "../../actions/actionUser";
import { connect, useSelector } from 'react-redux';
import { data } from 'jquery';
import { keys } from '@material-ui/core/styles/createBreakpoints';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
const HotelBookingCompletePage = (props) => {
    const classes = useStyle();
    // const user = bookRoom?.data?.user;
    // const hotelBookingRooms = [...props.bookRoom?.data?.hotelBookingDetail?.hotelBookingRooms];

    const booking = useSelector((state) => state.bookRoom);
    const hotel = useSelector((state) => state.hotels);
    const rooms = useSelector((state) => state.room)
    const [user, setUser] = useState(booking.data?.user);

    const history = useHistory();

    useEffect(() => {
        let mount = false;

        importAll();

        if (!sessionStorage.getItem("isRoomBooking") || sessionStorage.getItem("userId") && hotel?.data == null) {
            history.push(`/`);
        } else {
            sessionStorage.removeItem("isRoomBooking");
        }
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
                            <div className="page-title">Hotels - <span>booking complete</span></div>
                            <div className="breadcrumbs">
                                <a href="#">Home</a> / <a href="#">Hotel</a> / <span>hotel booking</span>
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
                                                <a
                                                    onClick={(e) => history.push(`/`)}
                                                    className="book-btn"

                                                >
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
                                                        <b>Thank You. Your Order is Confirmed.</b>
                                                        <span>Hope you have a great time with your friends and family </span>
                                                    </div>
                                                </div>

                                                <div className="complete-info">
                                                    <h2>Your Personal Information</h2>
                                                    <div className="complete-info-table">
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">First Name:</div>
                                                            <div className="complete-info-r">{user?.firstName}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Last Name:</div>
                                                            <div className="complete-info-r">{user?.lastName}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">E-Mail Adress:</div>
                                                            <div className="complete-info-r">{user?.email}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Country:</div>
                                                            <div className="complete-info-r">{user?.location?.province?.name}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Phone Number:</div>
                                                            <div className="complete-info-r">{user?.phoneNumber}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>

                                                    <div className="complete-devider"></div>

                                                    <div className="complete-info-table">
                                                        <h2>Hotel Information</h2>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Hotel Name:</div>
                                                            <div className="complete-info-r">{hotel?.data?.hotelName}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Contact Name:</div>
                                                            <div className="complete-info-r">{hotel?.data?.contactName}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Phone Number:</div>
                                                            <div className="complete-info-r">{hotel?.data?.phone}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Email Address:</div>
                                                            <div className="complete-info-r">{hotel?.data?.email}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>
                                                    <div className="complete-info-table">
                                                        <h2>Room Information</h2>

                                                        {
                                                            rooms?.data?.map((room, index) =>

                                                                <React.Fragment key={room?.id}>
                                                                    <div className="complete-info-i">
                                                                        <div className="complete-info-l">Room Type:</div>
                                                                        <div className="complete-info-r">{room?.roomType}</div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                    <div className="complete-info-i">
                                                                        <div className="complete-info-l">Room Number:</div>
                                                                        <div className="complete-info-r">{room?.roomNumber}</div>
                                                                        <div className="clear"></div>
                                                                    </div>
                                                                    <div className="complete-info-i">
                                                                        <div className="complete-info-l">Room Price:</div>
                                                                        <div className="complete-info-r">{room?.price}$</div>
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
                                                            <div className="complete-info-r">{booking.data?.bookingCode}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Number of guest:</div>
                                                            <div className="complete-info-r">{booking.data?.numOfGuest}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Check in date:</div>
                                                            <div className="complete-info-r">{booking.data?.checkInDate}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Check out date:</div>
                                                            <div className="complete-info-r">{booking.data?.checkOutDate}</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Total Price:</div>
                                                            <div className="complete-info-r">{booking.data?.totalPrice}$</div>
                                                            <div className="clear"></div>
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

const mapStateToProps = (state, ownProps) => {
    return {
        // booking: state.bookRoom,
        // hotel: state.hotels,
        // rooms:state.room
    };
};
const mapDispatchToProps = (dispatch) => {

    return {
        // getBooking: (id) => dispatch(getBooking(id)),
        getHotel: (data) => dispatch(getHotel(data)),
        getRooms: (data) => dispatch(getRooms(data)),
    };

};

export default connect(mapStateToProps, mapDispatchToProps)(HotelBookingCompletePage);
