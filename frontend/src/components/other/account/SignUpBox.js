import React, { useEffect, useState } from 'react';
import SignInOptions from "./SignInOptions";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { signup } from '../../../actions/actionUser';
import { connect } from 'react-redux';

function SignUpBox(props) {
    //
    const history = useHistory();
    const [statusSignup, setStatuSignup] = useState(false);
    const [messageSignup, setMessageSignup] = useState("");
    const [isAlert, setIsAlert] = useState(false);
    const [validateError, setValidateError] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreePolicy:'',
        errLogic:''
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
            if(!err.errLogic){
                err.firstName = ""; 
            }
        }

        if (!form.lastName.value) {
            err.lastName = "Last name is required!";
        } else { 
            if(!err.errLogic){
                err.lastName = ""; 
            }
        }

        if (!form.userName.value) {
            err.userName = "Username is required!";
        } else { 
            if(!err.errLogic){
                err.userName = ""; 
            }
        }

        if (!form.email.value) {
            err.email = "Email is required!";
        } else { 
            if(!err.errLogic){
                err.email = ""; 
            }
        }

        if (!form.password.value) {
            err.password = "Password is required!";
        } else { 
            if(!err.errLogic){
                err.password = ""; 
            }
        }

        if (!form.confirmPassword.value) {
            err.confirmPassword = "Confirm password is required!";
        } else { 
            if(!err.errLogic){
                err.confirmPassword = ""; 
            }
        }

        if (!form.policy.isChecked){
            err.agreePolicy = "Agree Policy is required!";
        }else{ err.agreePolicy = '';}

        if (err.firstName || err.lastName || err.userName || err.email || err.password || err.confirmPassword) {
            setValidateError(err);
            return false;
        }
        return true;
    }

    const handleChange = (e) => {
        e.preventDefault();
        const err = { ...validateError };

        if (!e.target.value) {
            err[e.target.name] = `${getName(e.target.name)} is required`;
        } else { err[e.target.name] = ""; }

        if(e.target.name === "email" && e.target.value){
            let regex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if(!regex.test(e.target.value)){
                err.email = "Email is invalid.";
                err.errLogic = "email";
            }else{err.email = "";}
        }

        if(e.target.name === "password" && e.target.value){
            let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
            if(!regex.test(e.target.value)){
                err.password = "Password is invalid. (Password must be 8 or more characters, at least one digit, at least one lowercase character and at least one uppercase character.)";
                err.errLogic = "password";
            }else{err.password = "";}
        }

        if(e.target.name === "confirmPassword" && e.target.value){
            if(e.target.value !== document.getElementById('password').value){
                err.confirmPassword = "Password must match!";
                err.errLogic = "confirmPassword";
            }else{err.confirmPassword = "";}
        }
        if (!err.firstName && !err.lastName && !err.userName && !err.email && !err.password && !err.confirmPassword) {
            err.errLogic = "";
        }
        setValidateError(err);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        if (validateForm(e)) {
            props.doSignup(form.firstName.value, form.lastName.value, form.userName.value, form.email.value, form.password.value);
        }
    }

    useEffect(() => {
        var mount = false;
        
        if (props.user.data) {
            if(!props.user.data.success){
                setStatuSignup(false);
                setIsAlert(true);
                setMessageSignup(props.user.data.message);
            }else{
                setStatuSignup(true);
                setIsAlert(true);
                setMessageSignup(props.user.data.message);
            }
        }else{
            setIsAlert(false);
        }
        return () => {
            mount = true;
        }
    });

    return (
        <>
            <div className="billing-form-item mb-0">
                <div className="billing-title-wrap border-bottom-0 pr-0 pl-0 pb-0 text-center">
                    <h3 className="widget-title font-size-28 pb-0">
                        {props.title}
                    </h3>
                    <p className="font-size-16 font-weight-medium">
                        {props.subtitle}
                    </p>
                </div>
                <div className="billing-content">
                    <form onSubmit={handleSubmit}>
                        <div className="row">

                            <SignInOptions />

                            <div className="col-lg-12">
                                <div className="account-assist mt-4 mb-4 text-center">
                                    <p className="account__desc">or</p>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label className="label-text" style={{ color: "#333f57" }}>First name</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser} /></span>
                                        </div>
                                        <input name='firstName' type="text" className={`form-control ${validateError.firstName ? 'is-invalid' : ''}`} onChange={handleChange} />
                                        <div className="invalid-feedback">{validateError.firstName}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label className="label-text" style={{ color: "#333f57" }}>Last name</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser} /></span>
                                        </div>
                                        <input name='lastName' type="text" className={`form-control ${validateError.lastName ? 'is-invalid' : ''}`} onChange={handleChange} />
                                        <div className="invalid-feedback">{validateError.lastName}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label className="label-text" style={{ color: "#333f57" }}>Username</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser} /></span>
                                        </div>
                                        <input name='userName' type="text" className={`form-control ${validateError.userName ? 'is-invalid' : ''}`} onChange={handleChange} />
                                        <div className="invalid-feedback">{validateError.userName}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label className="label-text" style={{ color: "#333f57" }}>Email</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope} /></span>
                                        </div>
                                        <input name='email' type="text" className={`form-control ${validateError.email ? 'is-invalid' : ''}`} onChange={handleChange} />
                                        <div className="invalid-feedback">{validateError.email}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label className="label-text" style={{ color: "#333f57" }}>Password</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLock} /></span>
                                        </div>
                                        <input name='password' id='password' type="password" className={`form-control ${validateError.password ? 'is-invalid' : ''}`} onChange={handleChange} />
                                        <div className="invalid-feedback">{validateError.password}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <label className="label-text" style={{ color: "#333f57" }}>Confirm Password</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLock} /></span>
                                        </div>
                                        <input name='confirmPassword' type="password" className={`form-control ${validateError.confirmPassword ? 'is-invalid' : ''}`} onChange={handleChange} />
                                        <div className="invalid-feedback">{validateError.confirmPassword}</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <div className="form-group">
                                    <div className="custom-checkbox d-block mr-0">
                                        <input type="checkbox" id="chb13" name='policy' className={`${validateError.agreePolicy ? 'is-invalid' : ''}`}/>
                                        <label htmlFor="chb13">I Agree to Dirto's <Link to="#" className="color-text">Privacy Policy</Link> & <Link to="#" className="color-text">Terms of Services</Link></label>
                                        <div className="invalid-feedback">{validateError.agreePolicy}</div>
                                    </div>
                                </div>
                            </div>
                            {statusSignup === false && isAlert && <div className="col-lg-12 margin-top-10px">
                                <div className="alert alert-danger">
                                    {messageSignup}
                                </div>
                            </div>}
                            {statusSignup && isAlert && <div className="col-lg-12 margin-top-10px">
                                <div className="alert alert-success">
                                    {messageSignup}
                                </div>
                            </div>}
                            <div className="col-lg-12">
                                <div className="btn-box margin-top-20px margin-bottom-20px">
                                    <button className="theme-btn border-0" type="submit">
                                        Register account
                                    </button>
                                </div>
                            </div>
                            <div className="col-lg-12">
                                <p className="font-weight-medium">
                                    Already have an account? <Link to="/login" className="color-text">Login</Link>
                                </p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        doSignup: (firstname, lastname, username, email, password) => {
            dispatch(signup(firstname, lastname, username, email, password));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpBox);
// export default SignUpBox;