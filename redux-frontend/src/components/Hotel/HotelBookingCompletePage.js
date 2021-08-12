import React, { useEffect } from 'react'
import { importAll } from '../../utils/JqueryImport'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'

const HotelBookingCompletePage = () => {

    useEffect(() => {
        let mount = false;

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

                                                <div className="comlete-alert">
                                                    <div className="comlete-alert-a">
                                                        <b>Thank You. Your Order is Confirmed.</b>
                                                        <span>Quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur</span>
                                                    </div>
                                                </div>

                                                <div className="complete-info">
                                                    <h2>Your Personal Information</h2>
                                                    <div className="complete-info-table">
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Number:</div>
                                                            <div className="complete-info-r">521-645-6</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">First Name:</div>
                                                            <div className="complete-info-r">Roman</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Last Name:</div>
                                                            <div className="complete-info-r">Polyarush</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">E-Mail Adress:</div>
                                                            <div className="complete-info-r">weblionmedia@gmail.com</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Country:</div>
                                                            <div className="complete-info-r">Austria</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                        <div className="complete-info-i">
                                                            <div className="complete-info-l">Phone Number:</div>
                                                            <div className="complete-info-r">+8 256 254 25 625</div>
                                                            <div className="clear"></div>
                                                        </div>
                                                    </div>

                                                    <div className="complete-devider"></div>

                                                    <div className="complete-txt">
                                                        <h2>Payment Info</h2>
                                                        <p>Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui voluptatem sequi nesciunt. Que porro quisqua. Sed ut perspiciatis unde omnis ste natus error sit voluptatem.</p>
                                                        <div className="complete-txt-link"><a href="#">Payment is made by Via Paypal.</a></div>
                                                    </div>

                                                    <div className="complete-devider"></div>

                                                    <div className="complete-txt final">
                                                        <h2>Booking Details</h2>
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

export default HotelBookingCompletePage
