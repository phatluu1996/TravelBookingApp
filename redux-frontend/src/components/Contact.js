import React, { useEffect } from 'react'
import { importAll } from '../utils/JqueryImport';
import Footer from './Layout/Footer'
import Header from './Layout/Header'
import $ from 'jquery';

const Contact = () => {

    useEffect(() => {
        importAll();
        console.log(document);
    }, [])

    return (
        <>
            <Header></Header>
            <div className="main-cont">
                <div className="contacts-map">
                    <div id="map"></div>
                </div>

                <div className="contacts-page-holder">
                    <div className="contacts-page">
                        <header className="page-lbl">
                            <div className="offer-slider-lbl">GET IN TOUCH WITH US</div>
                            <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit</p>
                        </header>

                        <div className="contacts-colls">
                            <div className="contacts-colls-l">
                                <div className="contact-colls-lbl">OUR OFFICE</div>
                                <div className="contacts-colls-txt">
                                    <p>Address: 590 Cách Mạng Tháng Tám, Phường 11, Quận 3<br />Thành phố Hồ Chí Minh, Việt Name, 723564</p>
                                    <p>Telephones: +1 777 55-32-21</p>
                                    <p>E-mail: contacts@miracle.com</p>
                                    <p>Skype: sparrow</p>
                                    <div className="side-social">
                                        <a className="side-social-twitter" ></a>
                                        <a className="side-social-facebook" ></a>
                                        <a className="side-social-vimeo" ></a>
                                        <a className="side-social-pinterest" ></a>
                                        <a className="side-social-instagram" ></a>
                                    </div>
                                </div>
                            </div>
                            <div className="contacts-colls-r">
                                <div className="contacts-colls-rb">
                                    <div className="contact-colls-lbl">Contact Us</div>
                                    <div className="booking-form">
                                        <form id="contact_form">
                                            <div className="booking-form-i">
                                                <label>First Name:</label>
                                                <div className="input is-invalid"><input type="text" name="FirstName" /></div>
                                                <div className="booking-error-input"></div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="booking-form-i">
                                                <label>Last Name:</label>
                                                <div className="input"><input type="text" name="lastName" /></div>
                                                <div className="booking-error-input"></div>
                                                <div className="clear"></div>
                                            </div>

                                            <div className="booking-form-i">
                                                <label>Email Adress:</label>
                                                <div className="input"><input type="text" name="Email" /></div>
                                                <div className="booking-error-input"></div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="booking-form-i">
                                                <label>Website:</label>
                                                <div className="input"><input type="text" name="Website" /></div>
                                                <div className="booking-error-input"></div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="booking-form-i textarea">
                                                <label>Message:</label>
                                                <div className="textarea-wrapper">
                                                    <textarea name="Message"></textarea>
                                                </div>
                                                <div className="booking-error-input"></div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <button className="contacts-send">Send message</button>
                                        </form>
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Contact
