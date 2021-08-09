import React, { Component } from 'react';

const Footer = () => {
    return (<>
        <footer className="footer-a">
            <div className="wrapper-padding">
                <div className="section">
                    <div className="footer-lbl">Get In Touch</div>
                    <div className="footer-adress">590 Cách Mạng Tháng Tám, Phường 11, Quận 3, Thành phố Hồ Chí Minh, Việt Nam, 723564</div>
                    <div className="footer-phones">Telephones: +1 777 55-32-21</div>
                    <div className="footer-email">E-mail: sparrow.travel@mail.com</div>
                    <div className="footer-skype">Skype: sparrowtravel</div>
                </div>
                <div className="section">
                    <div className="footer-lbl">Featured deals</div>
                    <div className="footer-tours">

                        <div className="footer-tour">
                            <div className="footer-tour-l"><a><img alt="" src="img/f-tour-01.jpg" /></a></div>
                            <div className="footer-tour-r">
                                <div className="footer-tour-a">SGN - DLI</div>
                                <div className="footer-tour-b">location: Da Lat</div>
                                <div className="footer-tour-c">max: 44$</div>
                            </div>
                            <div className="clear"></div>
                        </div>


                        <div className="footer-tour">
                            <div className="footer-tour-l"><a><img alt="" src="img/f-tour-02.jpg" /></a></div>
                            <div className="footer-tour-r">
                                <div className="footer-tour-a">SGN - HNA / HNA - SGN</div>
                                <div className="footer-tour-b">location: TP.HCM / Ha Noi</div>
                                <div className="footer-tour-c">max: 72$</div>
                            </div>
                            <div className="clear"></div>
                        </div>


                        <div className="footer-tour">
                            <div className="footer-tour-l"><a><img alt="" src="img/info-c-01-danang.png" /></a></div>
                            <div className="footer-tour-r">
                                <div className="footer-tour-a">SGN - DAD / DAD - SGN</div>
                                <div className="footer-tour-b">location: TP.HCM / Da Nang</div>
                                <div className="footer-tour-c">max: 48$</div>
                            </div>
                            <div className="clear"></div>
                        </div>

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
                <div className="section">
                    <div className="footer-lbl">Others</div>
                    <div className="footer-line">Privacy Policy</div>
                    <div className="footer-line">Terms & Conditions</div>
                    <div className="footer-line">Operational Regulations </div>
                    <div className="footer-line">Register your hotel as our partner</div>
                    <div className="footer-line">Register as our airline partner</div>
                    <div className="footer-line">Privacy Policy</div>
                </div>
            </div>
            <div className="clear"></div>
        </footer>

        <footer className="footer-b">
            <div className="wrapper-padding">
                <div className="footer-left">© Copyright 2021 by FPT Aptech Team. All rights reserved.</div>
                <div className="footer-social">
                    <a className="footer-twitter"></a>
                    <a className="footer-facebook"></a>
                    <a className="footer-vimeo"></a>
                    <a className="footer-pinterest"></a>
                    <a className="footer-instagram"></a>
                </div>
                <div className="clear"></div>
            </div>
        </footer>
    </>);
};

export default Footer;