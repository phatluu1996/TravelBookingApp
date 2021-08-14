import React, { useEffect, useState } from 'react'
import { importAll } from '../utils/JqueryImport';
import Footer from './Layout/Footer'
import Header from './Layout/Header'
import $ from 'jquery';
import { createFeedback } from '../actions/actionFeedback';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Contact = (props) => {
    const [err, setErr] = useState({
        fname: '',
        subtitle: '',
        email: '',
        message: '',
    })
    const [modalIsOpen, setModalIsOpen] = useState(false);
    useEffect(() => {
        importAll();
        console.log(document);
    }, [])

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-40%, -40%)',
        },
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        if (validate(form)) {
            var feedback = {
                name: form.fname.value + " " + form.lname.value,
                email: form.email.value,
                subTitle: form.subtitle.value,
                message: form.message.value
            }
            props.sendFeedback(feedback);
            setModalIsOpen(true);
            form.reset();
        }
    }

    const validate = (form) => {
        var er = { ...err };
        if (!form.fname.value) {
            er.fname = 'First name cannot be empty';
        } else {
            er.fname = '';
        }
        if (!form.subtitle.value) {
            er.subtitle = 'Subtitle cannot be empty';
        } else {
            er.subtitle = '';
        }
        if (!form.email.value) {
            er.email = 'First name cannot be empty';
        } else {
            er.email = '';
        }
        if (!form.message.value) {
            er.message = 'Message cannot be empty';
        } else {
            er.message = '';
        }

        setErr(er);
        if (er.email || er.fname || er.subtitle || er.message) {
            return false;
        }
        return true;
    }


    return (
        <>
            <Header></Header>
            <div className="main-cont">
                <div className="contacts-map">
                    <div id="map">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15677.2773997461!2d106.6662743!3d10.7868348!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xd2ecb62e0d050fe9!2sFPT-Aptech%20Computer%20Education%20HCM!5e0!3m2!1sen!2s!4v1628935856408!5m2!1sen!2s" height="450" style={{ width: "100%", border: "0" }} allowfullscreen="" loading="lazy"></iframe>
                    </div>
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
                                        <form id="contact_form" onSubmit={handleSubmit}>
                                            <div className="booking-form-i">
                                                <label>First Name*:</label>
                                                <div className={!err.fname ? "input" : "input is-invalid"}><input type="text" name="fname" /></div>
                                                <div className="booking-error-input">{err.fname}</div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="booking-form-i">
                                                <label>Last Name:</label>
                                                <div className="input"><input type="text" name="lname" /></div>
                                                <div className="booking-error-input"></div>
                                                <div className="clear"></div>
                                            </div>

                                            <div className="booking-form-i">
                                                <label>Subtitle*:</label>
                                                <div className={!err.subtitle ? "input" : "input is-invalid"}><input type="text" name="subtitle" /></div>
                                                <div className="booking-error-input">{err.subtitle}</div>
                                                <div className="clear"></div>
                                            </div>

                                            <div className="booking-form-i">
                                                <label>Email Adress*:</label>
                                                <div className={!err.email ? "input" : "input is-invalid"}><input type="text" name="email" /></div>
                                                <div className="booking-error-input">{err.email}</div>
                                                <div className="clear"></div>
                                            </div>

                                            <div className="booking-form-i textarea">
                                                <label>Message*:</label>
                                                <div className={!err.message ? "textarea-wrapper" : "textarea-wrapper is-invalid"}>
                                                    <textarea name="message"></textarea>
                                                </div>
                                                <div className="booking-error-input">{err.message}</div>
                                                <div className="clear"></div>
                                            </div>
                                            <div className="clear"></div>
                                            <button className="contacts-send">Send</button>
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
            <ReactModal
                isOpen={modalIsOpen}
                ariaHideApp={false}
                preventScroll={true}
                style={customStyles}
                contentLabel="Notification">
                <div className="contacts-colls-txt">
                    <div style={{ float: "right" }}>
                        <FontAwesomeIcon onClick={() => setModalIsOpen(false)} icon={faTimesCircle}></FontAwesomeIcon>
                    </div>
                    <p>Thank you for your feed back !We will reply as soon as possible.</p>
                    <button onClick={() => setModalIsOpen(false)} className="wizard-btn">OK</button>
                </div>
            </ReactModal>
            <Footer></Footer>
        </>
    )
}

const mapStateToProps = (state, ownProps) => {
    return {
        feedback: state.feedback
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendFeedback: (feedback) => {
            dispatch(createFeedback(feedback));
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Contact);
