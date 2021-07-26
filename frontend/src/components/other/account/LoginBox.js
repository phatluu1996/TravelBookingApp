import React from 'react';
import SignInOptions from "./SignInOptions";
import { Link } from "react-router-dom";
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { connect } from 'react-redux';
import { signin } from '../../../actions/actionUser';

function LoginBox(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props);
        var form = e.target;
        props.doSignin(form.username.value, form.password.value);
    }
    return (
        <>
            <div className="billing-form-item mb-0">
                <div className="billing-title-wrap border-bottom-0 pr-0 pl-0 pb-0 text-center">
                    <h3 className="widget-title font-size-28 pb-0">
                        {/* {title} */}
                    </h3>
                    <p className="font-size-16 font-weight-medium">
                        {/* {subtitle} */}
                    </p>
                </div>
                <div className="billing-content">
                    <div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="label-text" style={{color: "#333f57"}}>Username, or email</label>         
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser} /></span>
                                            </div>
                                            <input name='username' type="text" className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label className="label-text" style={{color: "#333f57"}}>Password</label>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLock} /></span>
                                            </div>
                                            <input name='password' type="password" className="form-control"/>
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
                                <div className="col-lg-12">
                                    <div className="btn-box margin-top-20px">
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
        user : state.user,
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