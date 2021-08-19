import { data } from 'jquery';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { changePassForget, getAccountForget } from '../../actions/actionAuth';
import { importAll } from '../../utils/JqueryImport';
import Footer from './Footer';
import Header from './Header';
import { useLocation } from "react-router-dom";

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const ChangePasswordForget = (props) => {
    const dataAccount = props.auth;
    let queryParam = useQuery();
    let history = useHistory();
    const [errSubmit, setErrSubmit] = useState({
        password:"",
        confirmPassword:""
    });

    useEffect(() => {
        var mount = false;
        importAll();

        if (queryParam.get("id") && queryParam.get("token")) {
            props.getAccountForget(queryParam.get("id"), queryParam.get("token"));
        } else {
            history.push("/");
        }

        return () => {
            mount = true;
        }
    }, []);

    useEffect(() => {
        var mount = false;

        if (props.auth.accountForget && props.auth.form === "getAccountForget") {
            if (props.auth.accountForget?.message && !props.auth.accountForget?.success) {
                history.push("/");
            }
        }
        if(props.auth.result && props.auth.form === "changePasswordForget"){
            alert(props.auth.result.message);
            history.push("/");
        }

        return () => {
            mount = true;
        }
    });

    const handleSubmit = (e) => {
        let err = {...errSubmit};
        let data = {...dataAccount};
        e.preventDefault();
        var form = e.target;

        if(!form.password.value){
            err.password = "Password is required";
        }else{err.password = ""}
        if(!form.confirmPassword.value){
            err.confirmPassword = "Confirm Password is required."
        }else{err.confirmPassword = ""}

        setErrSubmit(err);

        if(err.password || err.confirmPassword){
            return false;
        }else{
            data.accountForget.password = form.password.value;
            props.changePass(data.accountForget);
        }
    }

    const getName = (name) => {
        switch (name) {
            case 'password':
                return "Password";
            case 'confirmPassword':
                return "Confirm Password";
            default:
                return "";
        }
    }

    const handleChange = (e) => {
        e.preventDefault();
        const err = { ...errSubmit };

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

        setErrSubmit(err);
    }

    return (
        <div>
            <Header />
            <div className="main-cont" onSubmit={handleSubmit}>
                <form>
                    <div className="body-wrapper" style={{ paddingTop: '150px' }}>
                        <div className="wrapper-padding wrapper-padding-custom">
                            <h2 style={{ textAlign: 'center', fontSize: '23px' }}>CHANGE YOUR PASSWORD</h2>
                            <p style={{ textAlign: 'center', marginBottom: '20px' }}>Please enter your new password.</p>
                            <div className="booking-form">
                                <div style={{ margin: "20px" }}>
                                    <div className="booking-form-i booking-form-i-custom">
                                        <label className="custom-lbl">New Password:</label>
                                        <div className={`input ${errSubmit.password?"is-invalid":""}`}><input type="password" name="password" onChange={handleChange}/></div>
                                        <div className="booking-error-input">{errSubmit.password}</div>
                                    </div>
                                    <div className="clear"></div>
                                </div>
                                <div style={{ margin: "20px" }}>
                                    <div className="booking-form-i booking-form-i-custom">
                                        <label className="custom-lbl">Confirm Password:</label>
                                        <div className={`input ${errSubmit.confirmPassword?"is-invalid":""}`}><input type="password" name="confirmPassword" onChange={handleChange}/></div>
                                        <div className="booking-error-input">{errSubmit.confirmPassword}</div>
                                    </div>
                                </div>
                                <div className="clear"></div>
                            </div>
                            <div className="booking-complete" style={{ float: 'left' }}>
                                <button className="booking-complete-btn" type="submit" style={{ marginTop: '0', marginLeft: "20px" }}>CHANGE PASSWORD</button>
                            </div>
                            <div className="clear"></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    return {
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAccountForget: (id, token) => {
            dispatch(getAccountForget(id, token));
        },
        changePass: (data) => {
            dispatch(changePassForget(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForget);