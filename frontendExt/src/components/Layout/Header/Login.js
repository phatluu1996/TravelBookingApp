import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signin } from '../../../actions/actionUser';
import Common from '../../../utils/Common';

function Login(props) {

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
            case 'userName':
                return "User name";
            case 'password':
                return "Password";
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const err = { ...error };
        if(e.target.value){
            err[e.target.name] = "";
        }else{err[e.target.name] = `${getName(e.target.name)} is required!`}

        setError(err);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;
        if (validateForm(e)) {
            props.doSignin(form.username.value, form.password.value);
            setIsRequest(true);
        }
    }

    useEffect(() => {
        var mount = false;

        if (props.user.message && isRequest) {
            setErrLogin(true);
        }
        if (props.user.data && !sessionStorage.getItem("user") && !sessionStorage.getItem("userToken")) {
            Common.set1UserSession(props.user.data.accessToken, props.user.data.username);
            history.push("/");
        }
        if (Common.getUser() && Common.getToken()) {
            history.push("/");
        }
        return () => {
            mount = true;
        }
    });

    return (<>
        <form className="autorize-tab-content" onSubmit={handleSubmit}>
            <div className="autorize-padding" style={{ marginTop: '20px' }}>
                <h6 className="autorize-lbl">Welocome! Login in to Your Accont</h6>
                <input type="text" placeholder="USER NAME" name="username" onChange={handleChange} />
                <div style={{ color: 'red', marginLeft: '10px', fontSize: '13px', height: '12px' }}>{error.username}</div>
                <input type="password" placeholder="PASSWORD" name="password" onChange={handleChange} />
                <div style={{ color: 'red', marginLeft: '10px', fontSize: '13px', height: '12px' }}>{error.password}</div>
                <footer className="autorize-bottom">
                    <button className="authorize-btn" type="submit">Login</button>
                    <a href="#" className="authorize-forget-pass">Forgot your password?</a>
                    <div className="clear"></div>
                    {errLogin && <div style={{ color: 'red', marginLeft: '10px',marginTop:'15px', fontSize: '13px'}}>
                        Login Fail! Wrong user name or password.</div>}
                </footer>
            </div>
        </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);