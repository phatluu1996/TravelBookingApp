import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changePassword } from '../../actions/actionAuth';
import {removeUserSession} from "../../utils";

const ChangePassword = (props) => {
    const account = props.account;
    const history = useHistory();
    const [responseMessageUpdate, setResponseMessageUpdate] = useState("");
    const [validateInput, setValidateInput] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });


    const validateForm = (e) => {
        let err = { ...validateInput }
        var form = e.target;

        if (!form.currentPassword.value) { err.currentPassword = "Password is required!"; }
        if (!form.newPassword.value) { err.newPassword = "New Password is required!"; }
        if (!form.confirmNewPassword.value) { err.confirmNewPassword = "Confirm New Password is required!"; }

        if(err.currentPassword || err.newPassword || err.confirmNewPassword){
            setValidateInput(err);
            return false;
        }

        return true;
    }

    useEffect(() => {
        var mount = false;
        if (props.changePass?.form === 'errorChange') {
            setResponseMessageUpdate("Change Password fail! " + props.changePass?.message.response.data.message);
        }
        if (props.changePass?.form === 'successChange') {
            if (!props.changePass?.data) {
                document.location.href = "/";
            }
            if (props.changePass?.account && props.changePass?.success) {
                alert("Change Password successfuly! Please login again.");
                removeUserSession();
                history.push("/");
            } else if (props.changePass?.account && !props.changePass?.success) {
                console.log(props.changePass?.message.response.data.message);
            }
        }

        return () => {
            mount = true;
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        var form = e.target;

        if (validateForm(e)) {
            let data = { ...account };

            data.password = form.currentPassword.value;
            data.resetPassword = form.newPassword.value;

            props.changePassword(data);
        }
    }

    const handleChange = (e) =>{
        e.preventDefault();
        let err = { ...validateInput };

        if (e.target.name === "newPassword" && e.target.value) {
            let regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{8,}$/;
            if (!regex.test(e.target.value)) {
                err.newPassword = "Password is invalid. (Password must be 8 or more characters, at least one digit, at least one lowercase character and at least one uppercase character.)";
            } else { err.newPassword = ""; }
        }

        if (e.target.name === "confirmNewPassword" && e.target.value) {
            if (e.target.value !== e.target.form.newPassword.value) {
                err.confirmNewPassword = "Password must match!";
            } else {
                err.confirmNewPassword = "";
            }
        }

        setValidateInput(err);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="booking-form" style={{ padding: '0 100px 0 100px' }}>
                    <div>
                        <div className="booking-form-i booking-form-i-custom" style={{ marginBottom: '10px' }}>
                            <label className="autorize-input-lbl">Current Password:</label>
                            <div className="validate-error">{ validateInput.currentPassword }</div>
                            <div className="clear"></div>
                            <div className={`input ${validateInput.currentPassword?"is-invalid":""}`}><input type="password" name="currentPassword" /></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div className="booking-form-i booking-form-i-custom" style={{ marginBottom: '10px' }}>
                            <label className="autorize-input-lbl">New Password:</label>
                            <div className="validate-error">{ validateInput.newPassword }</div>
                            <div className="clear"></div>
                            <div className={`input ${validateInput.newPassword?"is-invalid":""}`}><input type="password" name="newPassword" onChange={handleChange}/></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div className="booking-form-i booking-form-i-custom" style={{ marginBottom: '10px' }}>
                            <label className="autorize-input-lbl">Confirm New Password:</label>
                            <div className="validate-error">{ validateInput.confirmNewPassword }</div>
                            <div className="clear"></div>
                            <div className={`input ${validateInput.confirmNewPassword?"is-invalid":""}`}><input type="password" name="confirmNewPassword" onChange={handleChange}/></div>
                        </div>
                        <div className="clear"></div>
                    </div>
                    <div>
                        <div className="booking-complete" style={{ display: 'inline-block' }}>
                            <button className="booking-complete-btn" type="submit">Change Password</button>
                        </div>
                        <div style={{ color:"red", paddingLeft: '20px', display: 'inline-block' }}>{responseMessageUpdate}</div>
                    </div>

                </div>
            </form>
        </div>
    );
};
const mapStateToProps = (state, ownProps) => {
    return {
        changePass: state.auth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changePassword: (data) => {
            dispatch(changePassword(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);