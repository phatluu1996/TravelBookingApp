import React, {  useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { connect } from 'react-redux';
import { signup } from '../../actions/actionAuth';
import { importAll } from '../../utils/JqueryImport';
import { useHistory } from 'react-router-dom';

function Register(props) {
    let history = useHistory();

    const [statusSignup, setStatuSignup] = useState(false);
    const [messageSignup, setMessageSignup] = useState("");
    const [isRequest, setIsRequest] = useState(false);
    const [validateError, setValidateError] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreePolicy: '',
        errLogic: ''
    });

    const getName = (name) => {
        switch (name) {
            case 'firstName':
                return "First name";
            case 'lastName':
                return "Last name";
            case 'userName':
                return "User name";
            case 'email':
                return "Email";
            case 'password':
                return "Password";
            case 'confirmPassword':
                return "Confirm Password";
            case 'agreePolicy':
                return "Privacy Policy & Terms Agreement"
            default:
                return "";
        }
    }
    const validateForm = (e) => {
        var form = e.target;
        const err = { ...validateError };

        if (!form.firstName.value) {
            err.firstName = "First name is required!";
        } else {
            err.firstName = "";
        }

        if (!form.lastName.value) {
            err.lastName = "Last name is required!";
        } else {
            err.lastName = "";
        }

        if (!form.userName.value) {
            err.userName = "Username is required!";
        } else {
            err.userName = "";
        }

        if (!form.email.value) {
            err.email = "Email is required!";
        } else {
            err.email = "";
        }

        if (!form.password.value) {
            err.password = "Password is required!";
        } else {
            err.password = "";
        }

        if (!form.confirmPassword.value) {
            err.confirmPassword = "Confirm password is required!";
        } else {
            err.confirmPassword = "";
        }

        // if (!form.agreePolicy.checked) {
        //     err.agreePolicy = "Privacy Policy & Terms Agreement is required !";
        // } else {
        //     err.agreePolicy = "";
        // }

        if (err.firstName || err.lastName || err.userName || err.email || err.password || err.confirmPassword) {
            setValidateError(err);
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        e.preventDefault();
        const err = { ...validateError };

        if (e.target.type !== "checkbox") {
            if (!e.target.value) {
                err[e.target.name] = `${getName(e.target.name)} is required !`;
            } else {
                err[e.target.name] = "";
            }
        } else {
            if (!e.target.checked) {
                err[e.target.name] = `${getName(e.target.name)} is required !`;
            } else {
                err[e.target.name] = "";
            }
        }


        if (e.target.name === "email" && e.target.value) {
            let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!regex.test(e.target.value)) {
                err.email = "Email is invalid.";
            } else { err.email = ""; }
        }

        if (e.target.name === "password" && e.target.value) {
            let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
            if (!regex.test(e.target.value)) {
                err.password = "Password is invalid. (Password must be 8 or more characters, at least one digit, at least one lowercase character and at least one uppercase character.)";
            } else { err.password = ""; }
        }

        if (e.target.name === "confirmPassword" && e.target.value) {
            if (e.target.value !== e.target.form.password.value) {
                err.confirmPassword = "Password must match!";
            } else {
                err.confirmPassword = "";
            }
        }
        setValidateError(err);
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        if (validateForm(e)) {
            props.doSignup(form.firstName.value, form.lastName.value, form.userName.value, form.email.value, form.password.value);
            setIsRequest(true);
        }
    }

    useEffect(() => {
        var mount = false;
        importAll();
        if (props.auth.form === 'signup') {
            if (props.auth.signupData && isRequest) {
                if (props.auth.signupData.success) {

                    alert(props.auth.signupData.message+" Please check your email to activate your account.");
                    history.push("/");
                } else {
                    setStatuSignup(false);
                    setMessageSignup(props.auth.signupData.message);
                }
            } else {
                setStatuSignup(false);
                setMessageSignup(props.auth.message);
            }
        }

        return () => {
            mount = true;
        }
    }, [props]);

    return (<>
        <body>
            <Header />
            {props.auth.requesting && !props.auth.signupData && <div className="loading" style={{zIndex:"10001"}} delay-hide="10"></div>}
            <div className="main-cont">
                <form onSubmit={handleSignupSubmit}>
                    <div className="body-wrapper" style={{ paddingTop: '150px'}}>
                        <div className="wrapper-padding wrapper-padding-custom">
                            <h2 style={{ textAlign: 'center', fontSize: '23px' }}>REGISTER</h2>
                            <p style={{ textAlign: 'center', marginBottom: '20px' }}>Register for Your Account</p>
                            <div className="booking-form">
                                <div>
                                    <div className="booking-form-i">
                                        <label className="custom-lbl">First Name:</label>
                                        <div className={`input ${validateError.firstName ? 'is-invalid' : ''}`} ><input type="text" name="firstName" onChange={handleChange} /></div>
                                        <div className="booking-error-input">{validateError.firstName}</div>
                                    </div>
                                    <div className="booking-form-i">
                                        <label className="custom-lbl">Last Name:</label>
                                        <div className={`input ${validateError.lastName ? 'is-invalid' : ''}`}><input type="text" name="lastName" onChange={handleChange} /></div>
                                        <div className="booking-error-input">{validateError.lastName}</div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div>
                                    <div className="booking-form-i booking-form-i-custom">
                                        <label className="custom-lbl">Username:</label>
                                        <div className={`input ${validateError.userName ? 'is-invalid' : ''}`}><input type="text" name="userName" onChange={handleChange} /></div>
                                        <div className="booking-error-input">{validateError.userName}</div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div>
                                    <div className="booking-form-i booking-form-i-custom">
                                        <label className="custom-lbl">Email:</label>
                                        <div className={`input ${validateError.email ? 'is-invalid' : ''}`}><input type="text" name="email" onChange={handleChange} /></div>
                                        <div className="booking-error-input">{validateError.email}</div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div>
                                    <div className="booking-form-i booking-form-i-custom">
                                        <label className="custom-lbl">Password:</label>
                                        <div className={`input ${validateError.password ? 'is-invalid' : ''}`}><input type="password" name="password" onChange={handleChange} /></div>
                                        <div className="booking-error-input">{validateError.password}</div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div>
                                    <div className="booking-form-i booking-form-i-custom">
                                        <label className="custom-lbl">Confirm Password:</label>
                                        <div className={`input ${validateError.confirmPassword ? 'is-invalid' : ''}`}><input type="password" name="confirmPassword" onChange={handleChange} /></div>
                                        <div className="booking-error-input">{validateError.confirmPassword}</div>
                                    </div>
                                </div>
                                <div className="clear"></div>
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="" />
                                        I want to receive Sparrow news in the future
                                    </label>
                                    <div className="booking-error-input"></div>
                                </div>
                                <div className="booking-devider"></div>
                            </div>
                            <div className="booking-complete" style={{ float: 'left' }}>
                                <button className="booking-complete-btn" type="submit" style={{ marginTop: '0' }}>REGISTER</button>
                            </div>
                            <div className={`${statusSignup ? 'booking-success-input' : 'booking-error-input'}`} style={{ float: 'left', marginLeft: '10px', marginTop: '10px' }}>{messageSignup}</div>
                            <div className="clear"></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </form>
            </div>
            <Footer />
        </body>
    </>);
}

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        doSignup: (firstname, lastname, username, email, password) => {
            dispatch(signup(firstname, lastname, username, email, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);