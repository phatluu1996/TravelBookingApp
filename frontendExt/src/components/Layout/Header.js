import React, { Component } from 'react';
import HeaderViewed from './Header/HeaderViewed';

const Header = () => {
    return (<>
        <div className="overlay"></div>
        <div className="autorize-popup">
            <div className="autorize-tabs">
                <a href="#" className="autorize-tab-a current">Sign in</a>
                <a href="#" className="autorize-tab-b">Register</a>
                <a href="#" className="autorize-close"></a>
                <div className="clear"></div>
            </div>
            <section className="autorize-tab-content">
                <div className="autorize-padding">
                    <h6 className="autorize-lbl">Welocome! Login in to Your Accont</h6>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Password" />
                    <footer className="autorize-bottom">
                        <button className="authorize-btn">Login</button>
                        <a href="#" className="authorize-forget-pass">Forgot your password?</a>
                        <div className="clear"></div>
                    </footer>
                </div>
            </section>
            <section className="autorize-tab-content">
                <div className="autorize-padding">
                    <h6 className="autorize-lbl">Register for Your Account</h6>
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Password" />
                    <footer className="autorize-bottom">
                        <button className="authorize-btn">Registration</button>
                        <div className="clear"></div>
                    </footer>
                </div>
            </section>
        </div>


        <header id="top">
            <div className="header-a">
                <div className="wrapper-padding">
                    <div className="header-phone"><span>1 - 555 - 555 - 555</span></div>
                    <div className="header-account">
                        <a href="#">My account</a>
                    </div>
                    <div className="header-social">
                        <a href="#" className="social-twitter"></a>
                        <a href="#" className="social-facebook"></a>
                        <a href="#" className="social-vimeo"></a>
                        <a href="#" className="social-pinterest"></a>
                        <a href="#" className="social-instagram"></a>
                    </div>
                    <HeaderViewed/>
                    <div className="header-lang">
                        <a href="#"><img alt="" src="img/en.gif" /></a>
                        <div className="langs-drop">
                            <div><a href="#" className="langs-item en">english</a></div>
                            <div><a href="#" className="langs-item fr">francais</a></div>
                            <div><a href="#" className="langs-item de">deutsch</a></div>
                            <div><a href="#" className="langs-item it">italiano</a></div>
                        </div>
                    </div>
                    <div className="header-curency">
                        <a href="#">USD</a>
                        <div className="curency-drop">
                            <div><a href="#">usd</a></div>
                            <div><a href="#">Eur</a></div>
                            <div><a href="#">GBR</a></div>
                        </div>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
            <div className="header-b">

                <div className="mobile-menu">
                    <nav>
                        <ul>
                            <li><a className="has-child" href="#">HOME</a>
                                <ul>
                                    <li><a href="index.html">Home style one</a></li>
                                    <li><a href="index_02.html">Home style two</a></li>
                                    <li><a href="index_03.html">Home style three</a></li>
                                    <li><a href="index_04.html">Home style four</a></li>
                                </ul>
                            </li>
                            <li><a className="has-child" href="#">Hotels</a>
                                <ul>
                                    <li><a href="hotel_list.html">Hotels standard list</a></li>
                                    <li><a href="hotel_simple_style.html">Hotels simple style</a></li>
                                    <li><a href="hotel_detail_style.html">Hotels detail style</a></li>
                                    <li><a href="hotel_detail.html">Hotel item page</a></li>
                                    <li><a href="hotel_booking.html">Hotel booking page</a></li>
                                    <li><a href="#">booking complete page</a></li>
                                </ul>
                            </li>
                            <li><a className="has-child" href="#">Flights</a>
                                <ul>
                                    <li><a href="flight_round_trip.html">Flights round trip</a></li>
                                    <li><a href="flight_one_way.html">flights one way trip</a></li>
                                    <li><a href="flight_alternative.html">flights alternative style</a></li>
                                    <li><a href="flight_detail.html">Flights detail page</a></li>
                                    <li><a href="flight_booking.html">Flights booking page</a></li>
                                    <li><a href="booking_complete.html">booking complete</a></li>
                                </ul>
                            </li>
                            <li><a className="has-child" href="#">Tours</a>
                                <ul>
                                    <li><a href="tour_alternative.html">Tours list style</a></li>
                                    <li><a href="tour_grid.html">tours grid style</a></li>
                                    <li><a href="tour_simple.html">Tours simple style</a></li>
                                    <li><a href="tour_detail.html">Tour detail page</a></li>
                                    <li><a href="tour_booking.html">tour booking page</a></li>
                                    <li><a href="booking_complete.html">booking complete</a></li>
                                </ul>
                            </li>
                            <li><a className="has-child" href="#">Pages</a>
                                <ul>
                                    <li><a href="about_us.html">about us style one</a></li>

                                    <li><a href="services.html">services</a></li>
                                    <li><a href="contacts.html">contact us</a></li>
                                </ul>
                            </li>
                            <li><a className="has-child" href="#">Portfolio</a>
                                <ul>
                                    <li><a href="portfolio_three_collumns.html">Portfolio three columns</a></li>
                                    <li><a href="portfolio_four_collumns.html">portfolio four columns</a></li>
                                    <li><a href="item_page.html">item page</a></li>
                                    <li><a href="item_page_full_width.html">Item page full width style</a></li>
                                </ul>
                            </li>
                            <li><a className="has-child" href="#">Blog</a>
                                <ul>
                                    <li><a href="blog_with_sidebar.html">Blog with sidebar</a></li>
                                    <li><a href="blog_masonry.html">blog masonry style</a></li>
                                    <li><a href="standart_blog_post.html">Blog post example</a></li>
                                </ul>
                            </li>
                            <li><a className="has-child" href="#">Features</a>
                                <ul>
                                    <li><a href="typography.html">typography</a></li>
                                    <li><a href="shortcodes.html">shortcodes</a></li>
                                    <li><a href="interactive_elements.html">interactive elements</a></li>
                                    <li><a href="cover_galleries.html">cover galleries</a></li>
                                    <li><a href="columns.html">columns</a></li>
                                </ul>
                            </li>
                            <li><a href="contacts.html">CONTACS</a></li>
                        </ul>
                    </nav>
                </div>


                <div className="wrapper-padding">
                    <div className="header-logo"><a href="index.html"><img alt="" src="img/logo.png" /></a></div>
                    <div className="header-right">
                        <div className="hdr-srch">
                            <a href="#" className="hdr-srch-btn"></a>
                        </div>
                        <div className="hdr-srch-overlay">
                            <div className="hdr-srch-overlay-a">
                                <input type="text" placeholder="Start typing..." />
                                <a href="#" className="srch-close"></a>
                                <div className="clear"></div>
                            </div>
                        </div>
                        <div className="hdr-srch-devider"></div>
                        <a href="#" className="menu-btn"></a>
                        <nav className="header-nav">
                            <ul>
                                <li><a href="#">Home</a>
                                    <ul>
                                        <li><a href="index.html">Home style one</a></li>
                                        <li><a href="index_02.html">Home style two</a></li>
                                        <li><a href="index_03.html">Home style three</a></li>
                                        <li><a href="index_04.html">Home style four</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Hotels</a>
                                    <ul>
                                        <li><a href="hotel_list.html">Hotels standard list</a></li>
                                        <li><a href="hotel_simple_style.html">Hotels simple style</a></li>
                                        <li><a href="hotel_detail_style.html">Hotels detail style</a></li>
                                        <li><a href="hotel_detail.html">Hotel item page</a></li>
                                        <li><a href="hotel_booking.html">Hotel booking page</a></li>
                                        <li><a href="booking_complete.html">booking complete page</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Flights</a>
                                    <ul>
                                        <li><a href="flight_round_trip.html">Flights round trip</a></li>
                                        <li><a href="flight_one_way.html">flights one way trip</a></li>
                                        <li><a href="flight_alternative.html">flights alternative style</a></li>
                                        <li><a href="flight_detail.html">Flights detail page</a></li>
                                        <li><a href="flight_booking.html">Flights booking page</a></li>
                                        <li><a href="booking_complete.html">booking complete</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Tours</a>
                                    <ul>
                                        <li><a href="tour_alternative.html">Tours list style</a></li>
                                        <li><a href="tour_grid.html">tours grid style</a></li>
                                        <li><a href="tour_simple.html">Tours simple style</a></li>
                                        <li><a href="tour_detail.html">Tour detail page</a></li>
                                        <li><a href="tour_booking.html">tour booking page</a></li>
                                        <li><a href="booking_complete.html">booking complete</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Pages</a>
                                    <ul>
                                        <li><a href="about_us.html">about us style one</a></li>

                                        <li><a href="services.html">services</a></li>
                                        <li><a href="contacts.html">contact us</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Portfolio</a>
                                    <ul>
                                        <li><a href="portfolio_three_collumns.html">Portfolio three columns</a></li>
                                        <li><a href="portfolio_four_collumns.html">portfolio four columns</a></li>
                                        <li><a href="item_page.html">item page</a></li>
                                        <li><a href="item_page_full_width.html">Item page full width style</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Blog</a>
                                    <ul>
                                        <li><a href="blog_with_sidebar.html">Blog with sidebar</a></li>
                                        <li><a href="blog_masonry.html">blog masonry style</a></li>
                                        <li><a href="standart_blog_post.html">Blog post example</a></li>
                                    </ul>
                                </li>
                                <li><a href="#">Features</a>
                                    <ul>
                                        <li><a href="typography.html">typography</a></li>
                                        <li><a href="shortcodes.html">shortcodes</a></li>
                                        <li><a href="interactive_elements.html">interactive elements</a></li>
                                        <li><a href="cover_galleries.html">cover galleries</a></li>
                                        <li><a href="columns.html">columns</a></li>
                                    </ul>
                                </li>
                                <li><a href="contacts.html">Contacts</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className="clear"></div>
                </div>
            </div>
        </header>
    </>);
}

export default Header;

