import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { signin } from '../../../actions/actionUser';
import Common from '../../../utils/Common';
import $ from 'jquery';
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            history.push("/")
        }
    }

    useEffect(() => {
        var mount = false;
        if (props.user.form === 'login') {
            if (props.user.message && isRequest) {
                setErrLogin(true);
            }
            if (props.user.data && props.user.success && !sessionStorage.getItem("user") && !sessionStorage.getItem("userToken")) {
                Common.setUserSession(props.user.data.accessToken, props.user.data.username, props.user.data.header, props.user.data.id, props.user.data.roles[0]);
                // document.location.href = "/";
                props.onSubmitUser(props.user.data);
                //TODO
                closePopup();
            }
            if (!props.user.data && Common.getUser() && Common.getToken()) {
                document.location.href = "/";
            }
        }

        return () => {
            mount = true;
        }
    });

    const closePopup = () => {
        $('.autorize-popup').animate({top: '-300px'}, 300, function(){
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
                        <div className="autorize-input-lbl">Username:</div>
                        <div className="validate-error">{error.username}</div>
                        <input type="text" name="username" onChange={handleChange} className={`${error.username ? 'is-invalid' : ''}`} />
                    </div>

                    <div>
                        <div className="autorize-input-lbl">Password:</div>
                        <div className="validate-error">{error.password}</div>
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
                        <button className="list-btn-sm mr-1" type="submit"><a className="team-fb list-btn-sm-icon" ></a></button>
                        <button className="list-btn-sm" type="submit"><a className="team-gp list-btn-sm-icon" ></a></button>
                        <div className="clear"></div>                        
                    </div>
                </div>
            </form>
        </div>

    </>);
}
const mapStateToProps = (state, ownProps) => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        doSignin: (username, password) => {
            dispatch(signin(username, password));
        },

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PopupLogin);