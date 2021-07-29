import React, { useEffect, useState } from 'react';
import SignInOptions from "./SignInOptions";
import { Link, useHistory } from "react-router-dom";
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { signin } from '../../../actions/actionUser';

function LoginBox(props) {

    const history = useHistory();
    const [errLogin, setErrLogin] = useState(false);
    const [error, setError] = useState({
        username: '',
        password: ''
    });

    const validateForm = (e) => {
        var form = e.target;
        const err = { ...error };

        if (!form.username.value) {
            err.username = 'User name is required.';
        }else{err.username = "";}
        
        if (!form.password.value) {
            err.password = 'Password is required.';
        }else{err.password = "";}

        if (err.username || err.password) {
            setError(err);
            return false;
        }
        return true;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        if (validateForm(e)) {
            props.doSignin(form.username.value, form.password.value);
        }
    }

    useEffect(() => {
        var mount = false;
        
        if (props.user.message) {
            setErrLogin(true);
        }
        if (props.user.data) {
            sessionStorage.setItem('user', props.user.data.username);
            sessionStorage.setItem('userToken', props.user.data.accessToken);
            history.push("/");
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
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="label-text" style={{ color: "#333f57" }}>Username</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser} /></span>
                                            </div>
                                            <input name='username' type="text" className={`form-control ${error.username ? 'is-invalid' : ''}`} />
                                            <div className="invalid-feedback">{error.username}</div>
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
                                            <input name='password' type="password" className={`form-control ${error.password ? 'is-invalid' : ''}`} />
                                            <div className="invalid-feedback">{error.password}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <div className="custom-checkbox mr-0 d-flex align-items-center justify-content-between">
                                            <div>
                                                <input type="checkbox" id="chb1" />
                                                <label htmlFor="chb1">Remember Me</label>
                                            </div>
                                            <div>
                                                <Link to="/recover" className="color-text font-weight-medium">
                                                    Forgot password?
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <p className="font-weight-medium">Not a member? <Link to="/sign-up" className="color-text"> Register</Link></p>
                                </div>
                                {errLogin && <div className="col-lg-12 margin-top-10px">
                                    <div className="alert alert-danger">
                                        <strong>Login fail!</strong> Wrong username or password.
                                    </div>
                                </div>}
                                <div className="col-lg-12">
                                    <div className="btn-box margin-top-10px">
                                        <button className="theme-btn border-0 w-100" type="submit">
                                            Login now
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="account-assist mt-4 mb-4 text-center">
                                        <p className="account__desc">or</p>
                                    </div>
                                </div>
                                <SignInOptions />

                            </div>
                        </form>
                    </div>
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
        doSignin: (username, password) => {
            dispatch(signin(username, password))
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginBox);