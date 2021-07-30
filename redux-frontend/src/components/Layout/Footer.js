import React, { Component } from 'react';

const Footer = () => {
    return (<>
        <footer className="footer-a">
            <div className="wrapper-padding">
                <div className="section">
                    <div className="footer-lbl">Get In Touch</div>
                    <div className="footer-adress">Address: 58911 Lepzig Hore,<br />85000 Vienna, Austria</div>
                    <div className="footer-phones">Telephones: +1 777 55-32-21</div>
                    <div className="footer-email">E-mail: contacts@miracle.com</div>
                    <div className="footer-skype">Skype: angelotours</div>
                </div>
                <div className="section">
                    <div className="footer-lbl">Featured deals</div>
                    <div className="footer-tours">

                        <div className="footer-tour">
                            <div className="footer-tour-l"><a href="#"><img alt="" src="img/f-tour-01.jpg" /></a></div>
                            <div className="footer-tour-r">
                                <div className="footer-tour-a">amsterdam tour</div>
                                <div className="footer-tour-b">location: netherlands</div>
                                <div className="footer-tour-c">800$</div>
                            </div>
                            <div className="clear"></div>
                        </div>


                        <div className="footer-tour">
                            <div className="footer-tour-l"><a href="#"><img alt="" src="img/f-tour-02.jpg" /></a></div>
                            <div className="footer-tour-r">
                                <div className="footer-tour-a">Kiev tour</div>
                                <div className="footer-tour-b">location: ukraine</div>
                                <div className="footer-tour-c">550$</div>
                            </div>
                            <div className="clear"></div>
                        </div>


                        <div className="footer-tour">
                            <div className="footer-tour-l"><a href="#"><img alt="" src="img/f-tour-03.jpg" /></a></div>
                            <div className="footer-tour-r">
                                <div className="footer-tour-a">vienna tour</div>
                                <div className="footer-tour-b">location: austria</div>
                                <div className="footer-tour-c">940$</div>
                            </div>
                            <div className="clear"></div>
                        </div>

                    </div>
                </div>
                <div className="section">
                    <div className="footer-lbl">Twitter widget</div>
                    <div className="twitter-wiget">
                        <div id="twitter-feed"></div>
                    </div>
                </div>
                <div className="section">
                    <div className="footer-lbl">newsletter sign up</div>
                    <div className="footer-subscribe">
                        <div className="footer-subscribe-a">
                            <input type="text" placeholder="you email" />
                        </div>
                    </div>
                    <button className="footer-subscribe-btn">Sign up</button>
                </div>
            </div>
            <div className="clear"></div>
        </footer>

        <footer className="footer-b">
            <div className="wrapper-padding">
                <div className="footer-left">© Copyright 2015 by Weblionmedia. All rights reserved.</div>
                <div className="footer-social">
                    <a href="#" className="footer-twitter"></a>
                    <a href="#" className="footer-facebook"></a>
                    <a href="#" className="footer-vimeo"></a>
                    <a href="#" className="footer-pinterest"></a>
                    <a href="#" className="footer-instagram"></a>
                </div>
                <div className="clear"></div>
            </div>
        </footer>
    </>);
};

export default Footer;