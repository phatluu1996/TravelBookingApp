import React, { Component } from 'react';

const Register = () => {
    return (<>
        <form className="autorize-tab-content">
            <div className="autorize-padding">
                <h6 className="autorize-lbl">Register for Your Account</h6>
                <input type="text" placeholder="Name" />
                <input type="text" placeholder="Password" />
                <footer className="autorize-bottom">
                    <button className="authorize-btn" type="submit">Registration</button>
                    <div className="clear"></div>
                </footer>
            </div>
        </form>
    </>);
}
export default Register;