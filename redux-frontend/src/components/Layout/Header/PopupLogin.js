import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signin, googleSignin } from '../../../actions/actionAuth';
import { setUserSession, removeUserSession } from '../../../utils';
import $ from 'jquery';
import { Link, useHistory } from 'react-router-dom';
import GoogleLogin, { useGoogleLogout } from 'react-google-login';

import { CLIENT_ID, APP_ID } from '../../../config/api';



function PopupLogin(props) {
    const history = useHistory();
    const [errLogin, setErrLogin] = useState(false);
    const [isRequest, setIsRequest] = useState(false);


    const [error, setError] = useState({
        username: '',
        password: ''
    });

    const validateForm = (e) => {
        var form = e.target;
        const err = { ...error };

        if (!form.username.value) {
            err.username = 'User name is required.';
        } else { err.username = ""; }

        if (!form.password.value) {
            err.password = 'Password is required.';
        } else { err.password = ""; }

        if (err.username || err.password) {
            setError(err);
            return false;
        }
        return true;
    }

    const getName = (name) => {
        switch (name) {
            case 'username':
                return "Username";
            case 'password':
                return "Password";
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const err = { ...error };
        if (e.target.value) {
            err[e.target.name] = "";
        } else { err[e.target.name] = `${getName(e.target.name)} is required!` }

        setError(err);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        var form = e.target;
        if (validateForm(e)) {
            props.doSignin(form.username.value, form.password.value);
            setIsRequest(true);
            // history.push("/")
        }
    }

    const handleLoginGoogleSuccess = (res) => {
       var user = res.profileObj;
        props.doGoogleSignin(user.givenName, user.familyName, user.email, user.email, user.email);
        setIsRequest(true);
        history.push("/")
        closePopup();
    }

    const handleLogoutGoogleSuccess = (res) => {
        const auth2 = window.gapi.auth2.getAuthInstance()
        if (auth2 != null) {
            auth2.signOut().then(
                auth2.disconnect().then(res=>{
                    removeUserSession();
                    props.onSubmitUser(null);
                })                
            )
        }
        closePopup();
    }

    const handleLoginGoogleFail = (res) => {
        console.log('Login Fail', res);
        closePopup();
    }


    useEffect(() => {
        var mount = false;
        if (props.auth.form === 'login') {
            if (props.auth.message && isRequest) {
                setErrLogin(true);
            }
            if (props.auth.data && props.auth.success) {
                closePopup();
            }
        }

        return () => {
            mount = true;
        }
    });

    const closePopup = () => {
        $('.autorize-popup').animate({ top: '-300px' }, 300, function () {
            $('.overlay').fadeOut();
        });
    }


    return (<>
        <div className="overlay"></div>
        <div className="autorize-popup">
            <div className="autorize-tabs">
                <a href="#" className="autorize-tab-a current">Sign in</a>
                <a href="#" className="autorize-tab-b"></a>
                <a href="#" className="autorize-close"></a>
                <div className="clear"></div>
            </div>
            <form className="autorize-tab-content" onSubmit={handleSubmit} autoComplete="false">
                <div className="autorize-padding" style={{ marginTop: '20px' }}>
                    <h6 className="autorize-lbl text-center">WELCOME! SIGN IN YOUR ACCOUNT</h6>
                    <div>
                        <div className="autorize-input-lbl" style={{marginTop:'15px'}}>Username:</div>
                        <div className="validate-error" style={{marginTop:'15px'}}>{error.username}</div>
                        <input type="text" name="username" onChange={handleChange} className={`${error.username ? 'is-invalid' : ''}`} />
                    </div>

                    <div>
                        <div className="autorize-input-lbl" style={{marginTop:'15px'}}>Password:</div>
                        <div className="validate-error" style={{marginTop:'15px'}}>{error.password}</div>
                        <input type="password" name="password" onChange={handleChange} className={`${error.password ? 'is-invalid' : ''}`} />
                    </div>
                    <div>
                        {errLogin && <div style={{ color: 'red', marginLeft: '10px', marginTop: '15px', fontSize: '13px' }}>
                            Login Fail! Wrong user name or password.</div>}
                    </div>

                    <div className="autorize-bottom">
                        <button className="authorize-btn" type="submit">Login</button>
                        <Link to="/" className="authorize-forget-pass">Forgot your password?</Link>
                        <div className="clear"></div>
                    </div>
                    <div className="text-center mt-2">
                        <h6 className="autorize-lbl">OR SIGN UP AND SIGN IN WITH: </h6>
                    </div>
                    <div className="autorize-bottom text-center mt-1">


                        <GoogleLogin
                            render={renderProps => (
                                <button className="list-btn-sm mr-1" onClick={renderProps.onClick} disabled={renderProps.disabled} type="submit"><a className="team-gp list-btn-sm-icon" ></a></button>
                            )}
                            clientId={CLIENT_ID}
                            cookiePolicy={'single_host_origin'}
                            onSuccess={handleLoginGoogleSuccess}
                            onFailure={handleLoginGoogleFail}
                        />
                        
                    </div>
                </div>
            </form>
        </div>

    </>);
}
const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        doSignin: (username, password) => {
            dispatch(signin(username, password));
        },
        doGoogleSignin: (firstname, lastname, username, email, password) => {
            dispatch(googleSignin(firstname, lastname, username, email, password));
        }

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupLogin);